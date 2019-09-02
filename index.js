const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const WIDTH = 612;
const HEIGHT = 792;
const MARGIN = 15;

const doc = new PDFDocument();
if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist");
}
doc.pipe(fs.createWriteStream("dist/school-rocks.pdf"));

const regex = new RegExp(/-(\d+)\.png/);
const images = fs
    .readdirSync("img")
    .filter(file => regex.test(file))
    .sort(
        (a, b) => +(regex.exec(a)[1]) - +(regex.exec(b)[1])
    );
console.log(images);

for (let i = 0; i < images.length; i++) {
    let offset = 0;
    if (i % 2 === 0) {
        if (i !== 0) {
            doc.addPage();
        }
    } else {
        offset = HEIGHT / 2;
    }

    doc.image(path.join("img", images[i]), MARGIN, offset + MARGIN, {
        fit: [WIDTH - MARGIN * 2, HEIGHT / 2 - MARGIN * 2],
        align: "center",
        valign: "center"
    });
}

doc.end();
