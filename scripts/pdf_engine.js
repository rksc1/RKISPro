// Standard Adobe Type 1 Helvetica Character Widths (units per 1000 em)
const HELVETICA_METRICS = {
  32: 278, 33: 278, 34: 355, 35: 556, 36: 556, 37: 889, 38: 667, 39: 191,
  40: 333, 41: 333, 42: 389, 43: 584, 44: 278, 45: 333, 46: 278, 47: 278,
  48: 556, 49: 556, 50: 556, 51: 556, 52: 556, 53: 556, 54: 556, 55: 556,
  56: 556, 57: 556, 58: 278, 59: 278, 60: 584, 61: 584, 62: 584, 63: 556,
  64: 1015, 65: 667, 66: 667, 67: 722, 68: 722, 69: 667, 70: 611, 71: 778,
  72: 722, 73: 278, 74: 500, 75: 667, 76: 556, 77: 833, 78: 722, 79: 778,
  80: 667, 81: 778, 82: 722, 83: 667, 84: 611, 85: 722, 86: 667, 87: 944,
  88: 667, 89: 667, 90: 611, 91: 278, 92: 278, 93: 278, 94: 469, 95: 556,
  96: 333, 97: 556, 98: 556, 99: 500, 100: 556, 101: 556, 102: 278, 103: 556,
  104: 556, 105: 222, 106: 222, 107: 500, 108: 222, 109: 833, 110: 556, 111: 556,
  112: 556, 113: 556, 114: 333, 115: 500, 116: 278, 117: 556, 118: 500, 119: 722,
  120: 500, 121: 500, 122: 500, 123: 334, 124: 260, 125: 334, 126: 584
};

const HELVETICA_BOLD_METRICS = {
  32: 278, 33: 333, 34: 474, 35: 556, 36: 556, 37: 889, 38: 722, 39: 238,
  40: 333, 41: 333, 42: 389, 43: 584, 44: 278, 45: 333, 46: 278, 47: 278,
  48: 556, 49: 556, 50: 556, 51: 556, 52: 556, 53: 556, 54: 556, 55: 556,
  56: 556, 57: 556, 58: 333, 59: 333, 60: 584, 61: 584, 62: 584, 63: 611,
  64: 975, 65: 722, 66: 722, 67: 722, 68: 722, 69: 667, 70: 611, 71: 778,
  72: 722, 73: 278, 74: 556, 75: 722, 76: 611, 77: 833, 78: 722, 79: 778,
  80: 667, 81: 778, 82: 722, 83: 667, 84: 611, 85: 722, 86: 667, 87: 944,
  88: 667, 89: 667, 90: 611, 91: 333, 92: 278, 93: 333, 94: 584, 95: 556,
  96: 333, 97: 556, 98: 611, 99: 556, 100: 611, 101: 556, 102: 333, 103: 611,
  104: 611, 105: 278, 106: 278, 107: 556, 108: 278, 109: 889, 110: 611, 111: 611,
  112: 611, 113: 611, 114: 389, 115: 556, 116: 333, 117: 611, 118: 556, 119: 778,
  120: 556, 121: 556, 122: 500, 123: 389, 124: 280, 125: 389, 126: 584
};

class PDFEngine {
  constructor(options = {}) {
    this.pages = [];
    this.fonts = {
      F1: 'Helvetica',
      F2: 'Helvetica-Bold',
      F3: 'Helvetica-Oblique',
      F4: 'Courier',
      F5: 'Courier-Bold'
    };
    this.width = options.width || 595.28; // Standard A4 (8.27 x 11.69 inches)
    this.height = options.height || 841.89;
    this.headerTitle = options.headerTitle || 'RKISPRO INDUSTRIAL TECHNOLOGIES';
    this.headerSubtitle = options.headerSubtitle || 'STANDARD OPERATING BLUEPRINT';
    this.footerText = options.footerText || 'CONFIDENTIAL & PROPRIETARY | ISO 9001:2015 COMPLIANT';
  }

  addPage(options = {}) {
    const page = {
      ops: [],
      width: this.width,
      height: this.height,
      skipHeaderFooter: !!options.skipHeaderFooter,
      pageNumber: this.pages.length + 1
    };
    this.pages.push(page);
    return page;
  }

  toPdfY(y) {
    return this.height - y;
  }

  escapeText(str) {
    if (!str && str !== 0) return '';
    return String(str)
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, '-')
      .replace(/[\u2022]/g, '-')
      .replace(/[\u00D7]/g, 'x')
      .replace(/[\u00B1]/g, '+/-')
      .replace(/[\u00B0]/g, ' deg ')
      .replace(/[\u00D8\u00F8]/g, 'Dia ')
      .replace(/[\u03BC]/g, 'u')
      .replace(/[\u2264]/g, '<=')
      .replace(/[\u2265]/g, '>=')
      .replace(/[\u00A9]/g, '(c)');
  }

  measureText(str, size, font = 'F1') {
    if (!str) return 0;
    const cleanStr = this.escapeText(str);
    const isBold = font === 'F2' || font === 'F5';
    const isCourier = font === 'F4' || font === 'F5';
    if (isCourier) {
      return cleanStr.length * size * 0.60;
    }
    const metrics = isBold ? HELVETICA_BOLD_METRICS : HELVETICA_METRICS;
    let total = 0;
    for (let i = 0; i < cleanStr.length; i++) {
      const code = cleanStr.charCodeAt(i);
      const width = metrics[code] || 556;
      total += (width / 1000) * size;
    }
    return total;
  }

  wrapText(str, maxWidth, size, font = 'F1') {
    if (!str) return [];
    const cleanStr = this.escapeText(str);
    if (this.measureText(cleanStr, size, font) <= maxWidth) {
      return [cleanStr];
    }

    const words = cleanStr.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (this.measureText(testLine, size, font) > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  }

  hexToRgb(hex) {
    let clean = hex.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }
    const num = parseInt(clean, 16);
    return {
      r: ((num >> 16) & 255) / 255,
      g: ((num >> 8) & 255) / 255,
      b: (num & 255) / 255
    };
  }

  rect(page, x, y, w, h, options = {}) {
    const { fill = true, stroke = false, fillColor = '#000000', strokeColor = '#CBD5E1', lineWidth = 1 } = options;
    const pdfY = this.toPdfY(y + h);
    let op = 'q\n';
    if (fill && fillColor) {
      const rgb = this.hexToRgb(fillColor);
      op += `${rgb.r.toFixed(3)} ${rgb.g.toFixed(3)} ${rgb.b.toFixed(3)} rg\n`;
    }
    if (stroke && strokeColor) {
      const rgb = this.hexToRgb(strokeColor);
      op += `${rgb.r.toFixed(3)} ${rgb.g.toFixed(3)} ${rgb.b.toFixed(3)} RG\n`;
      op += `${lineWidth} w\n`;
    }
    op += `${x.toFixed(2)} ${pdfY.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re\n`;
    if (fill && stroke) {
      op += 'B\n';
    } else if (fill) {
      op += 'f\n';
    } else if (stroke) {
      op += 'S\n';
    }
    op += 'Q';
    page.ops.push(op);
  }

  line(page, x1, y1, x2, y2, options = {}) {
    const { color = '#CBD5E1', lineWidth = 1 } = options;
    const pdfY1 = this.toPdfY(y1);
    const pdfY2 = this.toPdfY(y2);
    const rgb = this.hexToRgb(color);
    let op = `q\n${rgb.r.toFixed(3)} ${rgb.g.toFixed(3)} ${rgb.b.toFixed(3)} RG\n${lineWidth} w\n`;
    op += `${x1.toFixed(2)} ${pdfY1.toFixed(2)} m ${x2.toFixed(2)} ${pdfY2.toFixed(2)} l S\nQ`;
    page.ops.push(op);
  }

  bullet(page, x, y, color = '#0D9488', size = 3) {
    this.rect(page, x, y - size - 1, size, size, { fill: true, stroke: false, fillColor: color });
  }

  text(page, str, x, y, options = {}) {
    const {
      font = 'F1',
      size = 9.5,
      color = '#0F172A',
      align = 'left',
      maxWidth = null,
      lineHeight = null
    } = options;

    if (!str && str !== 0) return 0;
    const cleanStr = this.escapeText(str);
    const rgb = this.hexToRgb(color);
    const actualLineHeight = lineHeight || size * 1.38;

    if (maxWidth) {
      const lines = this.wrapText(cleanStr, maxWidth, size, font);
      lines.forEach((line, idx) => {
        const lineY = y + idx * actualLineHeight;
        this.renderSingleLine(page, line, x, lineY, size, font, rgb, align);
      });
      return lines.length * actualLineHeight;
    } else {
      this.renderSingleLine(page, cleanStr, x, y, size, font, rgb, align);
      return actualLineHeight;
    }
  }

  renderSingleLine(page, lineStr, x, y, size, font, rgb, align) {
    let drawX = x;
    const width = this.measureText(lineStr, size, font);
    if (align === 'center') {
      drawX = x - width / 2;
    } else if (align === 'right') {
      drawX = x - width;
    }
    const pdfY = this.toPdfY(y);
    const op = `BT /${font} ${size} Tf ${rgb.r.toFixed(3)} ${rgb.g.toFixed(3)} ${rgb.b.toFixed(3)} rg ${drawX.toFixed(2)} ${pdfY.toFixed(2)} Td (${lineStr}) Tj ET`;
    page.ops.push(op);
  }

  badge(page, str, x, y, options = {}) {
    const {
      bgColor = '#CCFBF1',
      textColor = '#0F766E',
      fontSize = 8,
      paddingX = 8,
      paddingY = 4,
      font = 'F2',
      align = 'left'
    } = options;
    const cleanStr = this.escapeText(str);
    const textWidth = this.measureText(cleanStr, fontSize, font);
    const width = textWidth + paddingX * 2;
    const height = fontSize + paddingY * 2;
    
    let boxX = x;
    if (align === 'right') {
      boxX = x - width;
    } else if (align === 'center') {
      boxX = x - width / 2;
    }

    this.rect(page, boxX, y - paddingY, width, height, { fill: true, stroke: false, fillColor: bgColor });
    this.text(page, cleanStr, boxX + paddingX, y + fontSize - 1, { font, size: fontSize, color: textColor });
    return width;
  }

  applyHeadersAndFooters() {
    const totalPages = this.pages.length;
    for (const page of this.pages) {
      if (page.skipHeaderFooter) continue;
      
      // Top Running Header with clean enterprise border
      this.rect(page, 40, 22, 515.28, 24, { fill: true, stroke: false, fillColor: '#F8FAFC' });
      this.line(page, 40, 46, 555.28, 46, { color: '#E2E8F0', lineWidth: 0.75 });
      this.text(page, this.headerTitle, 45, 38, { font: 'F2', size: 8, color: '#0F172A' });
      this.text(page, this.headerSubtitle, 550, 38, { font: 'F1', size: 7.5, color: '#64748B', align: 'right' });

      // Bottom Running Footer
      this.line(page, 40, 805, 555.28, 805, { color: '#E2E8F0', lineWidth: 0.75 });
      this.text(page, this.footerText, 40, 820, { font: 'F1', size: 7.5, color: '#94A3B8' });
      this.text(page, `Page ${page.pageNumber} of ${totalPages}`, 555.28, 820, { font: 'F2', size: 8, color: '#0D9488', align: 'right' });
    }
  }

  build() {
    this.applyHeadersAndFooters();
    let objects = [];
    let objCount = 0;
    const newObj = (content) => {
      objCount++;
      objects.push({ id: objCount, content });
      return objCount;
    };

    const catalogId = newObj('');
    const pagesId = newObj('');

    const fontIds = {};
    for (const [key, baseFont] of Object.entries(this.fonts)) {
      fontIds[key] = newObj(`<< /Type /Font /Subtype /Type1 /BaseFont /${baseFont} >>`);
    }

    const fontResourceDict = Object.entries(fontIds).map(([k, id]) => `/${k} ${id} 0 R`).join(' ');

    const pageObjIds = [];
    for (const page of this.pages) {
      const streamContent = page.ops.join('\n');
      const contentId = newObj(`<< /Length ${Buffer.byteLength(streamContent, 'latin1')} >>\nstream\n${streamContent}\nendstream`);
      const pageId = newObj(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Contents ${contentId} 0 R /Resources << /Font << ${fontResourceDict} >> >> >>`);
      pageObjIds.push(pageId);
    }

    objects[0].content = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
    objects[1].content = `<< /Type /Pages /Kids [${pageObjIds.map(id => id + ' 0 R').join(' ')}] /Count ${pageObjIds.length} >>`;

    let out = '%PDF-1.4\n';
    const xref = [0];
    for (const obj of objects) {
      xref.push(out.length);
      out += `${obj.id} 0 obj\n${obj.content}\nendobj\n`;
    }

    const startXref = out.length;
    out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i <= objects.length; i++) {
      out += String(xref[i]).padStart(10, '0') + ' 00000 n \n';
    }
    out += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${startXref}\n%%EOF`;
    return Buffer.from(out, 'latin1');
  }
}

module.exports = { PDFEngine };
