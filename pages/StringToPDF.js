import React from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

class StringToPDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stringToConvert: this.props.stringToConvert || '',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.stringToConvert !== prevProps.stringToConvert) {
      this.setState({ stringToConvert: this.props.stringToConvert });
    }
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
    const lines = stringToConvert.split('\n');
    const textHeight = font.heightAtSize(fontSize);
    const yStart = height - textHeight - 50; // adjust y position as needed
    let y = yStart;
    lines.forEach((line) => {
      const textWidth = font.widthOfTextAtSize(line, fontSize);
      const x = (width - textWidth) / 2;
      page.drawText(line, { x, y, size: fontSize, font });
      y -= textHeight;
    });
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'output.pdf');
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