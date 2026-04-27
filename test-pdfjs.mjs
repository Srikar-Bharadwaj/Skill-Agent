import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

async function extractText(filePath) {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const doc = await pdfjsLib.getDocument({
    data,
    useSystemFonts: true,
    standardFontDataUrl: "node_modules/pdfjs-dist/standard_fonts/"
  }).promise;

  let fullText = "";
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();
    fullText += textContent.items.map(item => item.str).join(' ');
  }
  return fullText;
}

extractText('C:/Users/Srikar Bharadwaj/Documents/Bharadwaj_Srikar.pdf')
  .then(text => console.log("Success! Length:", text.length))
  .catch(err => console.error(err));
