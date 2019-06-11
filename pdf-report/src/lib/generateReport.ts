// tslint:disable: max-line-length

import PDFDocument = require("pdfkit");

const placeHolderTitle = "Lorem ipsum dolor sit amet";
const placeHolderDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel bibendum turpis, et lobortis risus. Praesent ac odio ligula. Etiam vehicula lobortis ornare. Aliquam erat volutpat. Praesent id magna leo. Morbi commodo metus in tortor condimentum, vel egestas ante ullamcorper. Sed nec viverra neque, eu hendrerit lorem. Nam eget maximus metus, at molestie felis. Pellentesque quis feugiat massa, in sodales nibh.";

export const generateReport = (release: any, controls: any): PDFKit.PDFDocument => {
  let doc = new PDFDocument();

  doc = addTitlePage(doc, `Security Goals Report for ${process.env.APP_NAME}`, release.release);
  doc = addSummaryPage(doc);
  doc = addTableOfContents(doc, release, controls);
  doc = release.controls.reduce((document: PDFKit.PDFDocument, control: any, index: number) => {
    return addControl(document, control, controls, index);
  }, doc);
  return doc;
};

const addControl = (doc: PDFKit.PDFDocument, control: any, controls: any, index: number): PDFKit.PDFDocument => {
  doc.addPage();
  doc.fontSize(18);
  doc.text(`${index + 1}. ${control.control} - ${(controls[control.control] ? controls[control.control].name : placeHolderTitle)}`);
  doc.fontSize(12);
  doc.moveDown();
  doc.text("Control description", {underline: true});
  doc.moveDown();
  doc.text(`${(controls[control.control] ? controls[control.control].description : placeHolderDescription)}`);
  doc.moveDown();
  doc.text(`Status:`, {underline: true});
  doc.moveDown();

  const status = control.verifications.every((v: any) => v.passed === "true");

  doc.text(`${(status ? "PASSED" : "FAILED")}`);
  doc.moveDown();
  doc.moveDown();
  doc.text(`Verifications:`, {underline: true});
  doc.fontSize(10);
  doc.moveDown();
  doc = control.verifications.reduce((document: PDFKit.PDFDocument, verification: any) => {
    return addVerification(document, verification);
  }, doc);
  return doc;
};

const addVerification = (doc: PDFKit.PDFDocument, verification: any): PDFKit.PDFDocument => {
  doc.text(`Description: ${verification.description}`);
  doc.moveDown();
  doc.text(`Passed: ${verification.passed === "true" ? "Yes" : "No"}`);
  doc.moveDown();
  doc.text(`Timestamp: ${verification.timestamp}`);
  doc.moveDown();
  doc.text(`Origin: ${verification.origin}`);
  doc.moveDown();
  doc.text(`Component: ${verification.component}`);
  doc.moveDown();
  doc.text(`References: ${verification.references}`);
  doc.moveDown();
  doc.text(`------------------------------------------------------------------------------------------------------------`);
  doc.moveDown();
  return doc;
};

const addPage = (doc: PDFKit.PDFDocument, title: string): PDFKit.PDFDocument => {
  doc.addPage();
  doc.fontSize(18);
  doc.text(title);
  doc.fontSize(12);
  doc.moveDown();
  return doc;
};

const addSummaryPage = (doc: PDFKit.PDFDocument): PDFKit.PDFDocument => {

  const summary = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel bibendum turpis, et lobortis risus. Praesent ac odio ligula. Etiam vehicula lobortis ornare. Aliquam erat volutpat. Praesent id magna leo. Morbi commodo metus in tortor condimentum, vel egestas ante ullamcorper. Sed nec viverra neque, eu hendrerit lorem. Nam eget maximus metus, at molestie felis. Pellentesque quis feugiat massa, in sodales nibh.

  Integer et auctor turpis, nec congue purus. Integer consectetur gravida ligula, ut consectetur mauris. Aliquam et bibendum magna, at aliquet justo. Aliquam eleifend, lacus ac gravida pretium, velit metus facilisis sem, at sodales justo risus id augue. Ut iaculis sagittis dui vel ornare. Ut varius quis ipsum eget consequat. Maecenas posuere, ipsum sit amet semper blandit, nisi dui condimentum mi, sed sagittis ex turpis quis sapien. Vivamus condimentum placerat auctor. Ut lobortis a nunc ac facilisis. Mauris euismod magna at lobortis vulputate. Sed a dignissim elit. Nullam at odio rhoncus, pharetra risus eu, pretium sem. Nunc quis quam finibus, blandit eros aliquet, ullamcorper elit. Cras malesuada leo nec odio elementum, nec sodales quam viverra.

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lorem ligula, porta sit amet euismod eget, tempor ut mi. Ut dignissim sodales massa non commodo. Morbi ultrices tempus nunc a varius. Donec eu placerat nunc. Aliquam finibus velit et libero iaculis iaculis. Nunc posuere ex at purus aliquet, et dignissim metus mollis. Fusce aliquam dictum lectus, consequat vehicula dui dignissim vitae. Etiam elementum dui at dui facilisis, sed tincidunt nisi tempor. Curabitur eget feugiat metus, vitae sodales quam. Etiam nec felis ut libero convallis viverra. Fusce tempus felis eu risus ornare vestibulum. Maecenas pulvinar lacus ornare elit maximus varius.
  `;

  doc = addPage(doc, "Summary");
  doc.text(summary);
  return doc;
};

const addTableOfContents = (doc: PDFKit.PDFDocument, release: any, controls: any): PDFKit.PDFDocument => {
  doc = addPage(doc, "Table of Contents");
  doc.text("This document covers the following ITSG-33a Controls:");
  const controlList = release.controls.map( (c: any, index: number) => `${index + 1}. ${c.control} - ${(controls[c.control] ? controls[c.control].name : placeHolderTitle)}`);
  doc.moveDown(2);
  doc.list(controlList, {lineGap: 15});
  return doc;
};

const addTitlePage = (doc: PDFKit.PDFDocument, title: string, release: string): PDFKit.PDFDocument => {
  doc.image("src/assets/cds-snc.png", 450, 650, {width: 100});

  doc.fontSize(24);
  doc.moveDown(8);
  doc.text(title, {align: "center"});
  doc.fontSize(14);
  doc.moveDown();
  doc.text(new Date().toISOString(), {align: "center"});
  doc.moveDown(4);
  doc.fontSize(10);
  doc.text(`Release: ${release}`, {align: "center"});

  return doc;
};
