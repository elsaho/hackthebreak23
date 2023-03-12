import React from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

class StringToPDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stringToConvert: '',
    };
  }

  handleStringChange = (event) => {
    this.setState({ stringToConvert: event.target.value });
  }

  handleDownloadPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const stringToConvert = this.state.stringToConvert.replace(/\n/g, '\u00A0');
    const maxWidth = 500; // set the maximum width for the text
    const lines = font.layout(stringToConvert, { fontSize, maxWidth });
    const textHeight = lines.reduce((height, line) => height + line.height, 0);
    let y = (height - textHeight) / 2;
    for (const line of lines) {
      page.drawText(line.text, {
        x: (width - line.width) / 2,
        y,
        size: fontSize,
        font: font,
      });
      y -= line.height;
    }
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'output.pdf');
  }
  

  // handleDownloadWord = () => {
  //   const doc = new Document();
  //   doc.addSection({
  //     children: [new Paragraph(this.state.stringToConvert)],
  //   });
  //   Packer.toBlob(doc).then((blob) => {
  //     saveAs(blob, 'output.docx');
  //   });
  // }

  render() {
    return (
      <div>
        <textarea value={this.state.stringToConvert} onChange={this.handleStringChange} />
        <button onClick={this.handleDownloadPDF}>Download as PDF</button>
      </div>
    );
  }
}

export default StringToPDF;