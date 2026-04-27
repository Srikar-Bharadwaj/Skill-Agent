const fs = require('fs');
const pdfParse = require('pdf-parse');

async function test() {
  try {
    const dataBuffer = fs.readFileSync('C:/Users/Srikar Bharadwaj/Documents/Bharadwaj_Srikar.pdf');
    const data = await pdfParse(dataBuffer);
    console.log("Text length:", data.text.length);
    console.log("First 100 chars:", data.text.substring(0, 100).replace(/\n/g, ' '));
  } catch (err) {
    console.error("PDF Parse Error:", err);
  }
}

test();
