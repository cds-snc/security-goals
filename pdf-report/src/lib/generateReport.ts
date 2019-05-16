import PDFDocument = require("pdfkit");

export const generateReport = (): PDFKit.PDFDocument => {
  let doc = new PDFDocument();

  doc = addTitlePage(doc, `Security Goals Report for the CRA Alpha application`);

  return doc;
};

const addTitlePage = (doc: PDFKit.PDFDocument, title: string): PDFKit.PDFDocument => {
  doc.fontSize(24);
  doc.moveDown(8);
  doc.text(title, {align: "center"});
  doc.fontSize(14);
  doc.moveDown();
  doc.text(new Date().toISOString(), {align: "center"});
  doc.image("src/assets/cds-snc.png", 450, 650, {width: 100});
  return doc;
};
