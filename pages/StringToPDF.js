import React from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import styles from "./StringToPdf.module.css";

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
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
    const pageWidth = 612; // 8.5 inches in points
    const pageHeight = 792; // 11 inches in points
    const margin = 72; // 1 inch in points
  
    let lines = this.state.stringToConvert.split('\n');
  
    let currentPage = pdfDoc.addPage();
    let cursor = { x: margin, y: pageHeight - margin };
  
    for (let i = 0; i < lines.length; i++) {
      const words = lines[i].split(' ');
  
      for (let j = 0; j < words.length; j++) {
        const word = words[j];
        const wordWidth = font.widthOfTextAtSize(word, 12);
  
        if (cursor.x + wordWidth > pageWidth - margin) {
          // Move to next line
          cursor.y -= font.heightAtSize(12);
          cursor.x = margin;
        }
  
        if (cursor.y < margin) {
          // Move to next page
          currentPage = pdfDoc.addPage();
          cursor = { x: margin, y: pageHeight - margin };
        }
  
        currentPage.drawText(word, { x: cursor.x, y: cursor.y, size: 12, font });
        cursor.x += wordWidth + font.widthOfTextAtSize(' ', 12);
      }
  
      // Move to next line
      cursor.y -= font.heightAtSize(12);
      cursor.x = margin;
    }
  
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'output.pdf');
  }
  
  

  // handleDownloadPDF = async () => {
  //   const pdfDoc = await PDFDocument.create();
  //   const page = pdfDoc.addPage();
  //   const { width, height } = page.getSize();
  //   const fontSize = 12;
  //   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  //   const stringToConvert = this.state.stringToConvert.replace(/\n/g, '\u00A0');
  //   const textLines = stringToConvert.split('\n');
  //   const lineHeight = 1.2 * fontSize; // adjust line height as desired
  //   const x = 30; // adjust x-coordinate as desired
  //   let y = height - 50; // adjust y-coordinate as desired
  
  //   for (let i = 0; i < textLines.length; i++) {
  //     const line = textLines[i];
  //     const textWidth = font.widthOfTextAtSize(line, fontSize);
  //     page.drawText(line, { x, y, size: fontSize, font });
  //     y -= lineHeight;
  //   }
  
  //   const pdfBytes = await pdfDoc.save();
  //   const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  //   saveAs(blob, 'output.pdf');
  // }
  
  

  render() {
    return (
      <div>
        <textarea value={this.state.stringToConvert} onChange={this.handleStringChange} />
        <br></br>
        {/* <input className={styles.button} type="submit" value="Download as PDF" onClick={this.handleDownloadPDF} /> */}
        <input className={styles['main input[type="submit"]']} type="submit" value="Download as PDF" onClick={this.handleDownloadPDF} />
      </div>
    );
  }
}

export default StringToPDF;