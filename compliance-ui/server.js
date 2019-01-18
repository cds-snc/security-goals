const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const bodyParser = require("body-parser");
const renderPDF = require("./util/pdf");

const request = require("graphql-request").request;

const sendPDF = async (res, html, filename) => {
  const buffer = await renderPDF(html);
  res.setHeader("Content-disposition", `inline; filename='${filename}.pdf'`);
  res.type("application/pdf");
  res.send(buffer);
};

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.urlencoded({ extended: false }));

  server.get("/", (req, res) => {
    return app.render(req, res, "/", req.query);
  });

  server.get("/controls/:control", (req, res) => {
    const actualPage = "/details";
    const queryParams = { control: req.params.control };
    app.render(req, res, actualPage, queryParams);
  });

  server.get("/singlerelease/:release", (req, res) => {
    const queryParams = { release: req.params.release };
    const actualPage = "/singleRelease";
    app.render(req, res, actualPage, queryParams);
  });

  server.get("/alive", (req, res) => {
    res.status(200).send("yes");
  });

  server.get("/ready", (req, res) => {
    res.status(200).send("yes");
  });

  server.get("/badge/", async (req, res) => {
    const allControlsQuery = require("./api/queries").allControlsQuery;
    const passFailData = require("./util/passFailData").passFailData;
    const endpoint = process.env.API_URL;
    const data = await request(endpoint, allControlsQuery()).catch(err => {
      res.send(err.message);
    });

    const { passed, total } = await passFailData(data);

    res.redirect(
      303,
      `https://img.shields.io/badge/Compliance-${passed}%2F${total}-red.svg`
    );
  });

  server.get("/pdf-releases", async (req, res) => {
    let html = await app.renderToHTML(req, res, "/pdf-releases");
    sendPDF(res, html, "releases");
  });

  server.get("/pdf-singlerelease/:release?", async (req, res) => {
    //let html = "<strong>SINGLE RELEASE</strong>";

    let html = await app.renderToHTML(req, res, "/pdf-singlerelease");
    sendPDF(res, html, "singlerelease");
  });

  server.get("/pdf-details/:control?", async (req, res) => {
    let html = await app.renderToHTML(req, res, "/pdf-details");
    sendPDF(res, html, "details");
  });

  /*
  server.get("/pdf/:control?", async (req, res) => {
    let html = await app.renderToHTML(req, res, "/pdf");
    const buffer = await renderPDF(html);

    let id = "";

    if (req.params.control) {
      id = req.params.control;
    }
    const buffer = await renderPDF(html);
    res.setHeader(
      "Content-disposition",
      `inline; filename='compliant-yet-${id}.pdf'`
    );
    res.type("application/pdf");
    res.send(buffer);
  });
  */

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
