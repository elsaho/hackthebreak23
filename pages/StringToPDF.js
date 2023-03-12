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
    const stringToConvert = this.state.stringToConvert;
    const textWidth = font.widthOfTextAtSize(stringToConvert, fontSize);
    const textHeight = font.heightAtSize(fontSize);
    page.drawText(stringToConvert, {
      x: (width - textWidth) / 2,
      y: (height - textHeight) / 2,
      size: fontSize,
      font: font,
    });
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'output.pdf');
  }

  handleDownloadWord = () => {
    const doc = new Document();
    doc.addSection({
      children: [new Paragraph(this.state.stringToConvert)],
    });
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'output.docx');
    });
  }

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
