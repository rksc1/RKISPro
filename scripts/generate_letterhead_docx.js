const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

function generateRKISProLetterheadDocx() {
  const zip = new JSZip();

  // 1. [Content_Types].xml
  const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>
  <Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>
</Types>`;

  // 2. _rels/.rels
  const rootRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  // 3. word/_rels/document.xml.rels
  const documentRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>
</Relationships>`;

  // 4. word/styles.xml
  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>
        <w:sz w:val="22"/>
        <w:szCs w:val="22"/>
        <w:color w:val="1E293B"/>
        <w:lang w:val="en-US"/>
      </w:rPr>
    </w:rPrDefault>
    <w:pPrDefault>
      <w:pPr>
        <w:spacing w:after="160" w:line="276" w:lineRule="auto"/>
      </w:pPr>
    </w:pPrDefault>
  </w:docDefaults>

  <!-- Normal Paragraph -->
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
  </w:style>

  <!-- Heading 1 -->
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:qFormat/>
    <w:pPr>
      <w:spacing w:before="240" w:after="120"/>
    </w:pPr>
    <w:rPr>
      <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
      <w:b/>
      <w:sz w:val="32"/>
      <w:color w:val="0B3968"/>
    </w:rPr>
  </w:style>

  <!-- Heading 2 -->
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:qFormat/>
    <w:pPr>
      <w:spacing w:before="180" w:after="80"/>
    </w:pPr>
    <w:rPr>
      <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
      <w:b/>
      <w:sz w:val="26"/>
      <w:color w:val="118781"/>
    </w:rPr>
  </w:style>
</w:styles>`;

  // 5. word/header1.xml
  // Two-column table: Left has RKISPro brand and sub-brand; Right has Corporate details & credentials.
  // Below it: A stylish dual-color rule (Navy + Industrial Teal).
  const headerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
       xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">

  <!-- Top Accent Bar -->
  <w:p>
    <w:pPr>
      <w:spacing w:before="0" w:after="80"/>
      <w:pBdr>
        <w:top w:val="single" w:sz="24" w:space="0" w:color="118781"/>
      </w:pBdr>
    </w:pPr>
  </w:p>

  <!-- Letterhead Header Table -->
  <w:tbl>
    <w:tblPr>
      <w:tblW w:w="9026" w:type="dxa"/>
      <w:tblBorders>
        <w:top w:val="none"/>
        <w:left w:val="none"/>
        <w:bottom w:val="none"/>
        <w:right w:val="none"/>
        <w:insideH w:val="none"/>
        <w:insideV w:val="none"/>
      </w:tblBorders>
      <w:tblCellMar>
        <w:top w:w="40" w:type="dxa"/>
        <w:left w:w="40" w:type="dxa"/>
        <w:bottom w:w="40" w:type="dxa"/>
        <w:right w:w="40" w:type="dxa"/>
      </w:tblCellMar>
    </w:tblPr>
    <w:tblGrid>
      <w:gridCol w:w="5200"/>
      <w:gridCol w:w="3826"/>
    </w:tblGrid>
    <w:tr>
      <!-- Left Column: Branding -->
      <w:tc>
        <w:tcPr>
          <w:tcW w:w="5200" w:type="dxa"/>
          <w:vAlign w:val="top"/>
        </w:tcPr>

        <!-- Brand Name: RKISPRO -->
        <w:p>
          <w:pPr>
            <w:spacing w:before="0" w:after="20"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:b/>
              <w:sz w:val="48"/> <!-- 24pt -->
              <w:color w:val="0B3968"/>
            </w:rPr>
            <w:t>RKIS</w:t>
          </w:r>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:b/>
              <w:sz w:val="48"/>
              <w:color w:val="118781"/>
            </w:rPr>
            <w:t>Pro</w:t>
          </w:r>
        </w:p>

        <!-- Subtitle & Category -->
        <w:p>
          <w:pPr>
            <w:spacing w:before="0" w:after="40"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:b/>
              <w:sz w:val="18"/> <!-- 9pt -->
              <w:color w:val="118781"/>
            </w:rPr>
            <w:t>MANAGED FABRICATION &amp; INDUSTRIAL MARKETPLACE</w:t>
          </w:r>
        </w:p>

        <!-- Legal Entity Name -->
        <w:p>
          <w:pPr>
            <w:spacing w:before="0" w:after="0"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:sz w:val="17"/> <!-- 8.5pt -->
              <w:color w:val="475569"/>
            </w:rPr>
            <w:t>RKISPro Industrial Technologies Private Limited</w:t>
          </w:r>
        </w:p>
      </w:tc>

      <!-- Right Column: Corporate Identifiers & Contact -->
      <w:tc>
        <w:tcPr>
          <w:tcW w:w="3826" w:type="dxa"/>
          <w:vAlign w:val="top"/>
        </w:tcPr>
        <w:p>
          <w:pPr>
            <w:jc w:val="right"/>
            <w:spacing w:before="0" w:after="20"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:b/>
              <w:sz w:val="16"/>
              <w:color w:val="0B3968"/>
            </w:rPr>
            <w:t>CIN: </w:t>
          </w:r>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:sz w:val="16"/>
              <w:color w:val="334155"/>
            </w:rPr>
            <w:t>U28110CT2026PTC015842</w:t>
          </w:r>
        </w:p>
        <w:p>
          <w:pPr>
            <w:jc w:val="right"/>
            <w:spacing w:before="0" w:after="20"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:b/>
              <w:sz w:val="16"/>
              <w:color w:val="0B3968"/>
            </w:rPr>
            <w:t>GSTIN: </w:t>
          </w:r>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:sz w:val="16"/>
              <w:color w:val="334155"/>
            </w:rPr>
            <w:t>22AABCR1234F1Z5 (CG State 22)</w:t>
          </w:r>
        </w:p>
        <w:p>
          <w:pPr>
            <w:jc w:val="right"/>
            <w:spacing w:before="0" w:after="20"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:sz w:val="15"/>
              <w:color w:val="118781"/>
            </w:rPr>
            <w:t>DPIIT Recognized Startup | MSME Udyam</w:t>
          </w:r>
        </w:p>
        <w:p>
          <w:pPr>
            <w:jc w:val="right"/>
            <w:spacing w:before="0" w:after="20"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:sz w:val="15"/>
              <w:color w:val="475569"/>
            </w:rPr>
            <w:t>Web: www.rkispro.com | Email: contact@rkispro.com</w:t>
          </w:r>
        </w:p>
        <w:p>
          <w:pPr>
            <w:jc w:val="right"/>
            <w:spacing w:before="0" w:after="0"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:sz w:val="15"/>
              <w:color w:val="475569"/>
            </w:rPr>
            <w:t>Operations Desk &amp; WhatsApp: +91 99999 99999</w:t>
          </w:r>
        </w:p>
      </w:tc>
    </w:tr>
  </w:tbl>

  <!-- Dividing Header Rule -->
  <w:p>
    <w:pPr>
      <w:spacing w:before="80" w:after="160"/>
      <w:pBdr>
        <w:bottom w:val="single" w:sz="18" w:space="0" w:color="118781"/>
      </w:pBdr>
    </w:pPr>
  </w:p>
</w:hdr>`;

  // 6. word/footer1.xml
  const footerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
       xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">

  <!-- Top Footer Rule -->
  <w:p>
    <w:pPr>
      <w:spacing w:before="40" w:after="60"/>
      <w:pBdr>
        <w:top w:val="single" w:sz="12" w:space="0" w:color="CBD5E1"/>
      </w:pBdr>
    </w:pPr>
  </w:p>

  <!-- Two-column Footer Table -->
  <w:tbl>
    <w:tblPr>
      <w:tblW w:w="9026" w:type="dxa"/>
      <w:tblBorders>
        <w:top w:val="none"/>
        <w:left w:val="none"/>
        <w:bottom w:val="none"/>
        <w:right w:val="none"/>
        <w:insideH w:val="none"/>
        <w:insideV w:val="none"/>
      </w:tblBorders>
    </w:tblPr>
    <w:tblGrid>
      <w:gridCol w:w="6800"/>
      <w:gridCol w:w="2226"/>
    </w:tblGrid>
    <w:tr>
      <!-- Registered Office Address -->
      <w:tc>
        <w:tcPr>
          <w:tcW w:w="6800" w:type="dxa"/>
          <w:vAlign w:val="center"/>
        </w:tcPr>
        <w:p>
          <w:pPr>
            <w:spacing w:before="0" w:after="20"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:b/>
              <w:sz w:val="15"/>
              <w:color w:val="0B3968"/>
            </w:rPr>
            <w:t>Registered &amp; Corporate Office: </w:t>
          </w:r>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:sz w:val="15"/>
              <w:color w:val="475569"/>
            </w:rPr>
            <w:t>Sirgitti Industrial Area, Sector B, Bilaspur, Chhattisgarh - 495004, India</w:t>
          </w:r>
        </w:p>
        <w:p>
          <w:pPr>
            <w:spacing w:before="0" w:after="0"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:sz w:val="14"/>
              <w:color w:val="64748B"/>
            </w:rPr>
            <w:t>Operating Hubs: Bilaspur · Raipur · Pune · Bengaluru | CBIC GST &amp; SAC 9988 Compliant</w:t>
          </w:r>
        </w:p>
      </w:tc>

      <!-- Page Numbering & Confidentiality -->
      <w:tc>
        <w:tcPr>
          <w:tcW w:w="2226" w:type="dxa"/>
          <w:vAlign w:val="center"/>
        </w:tcPr>
        <w:p>
          <w:pPr>
            <w:jc w:val="right"/>
            <w:spacing w:before="0" w:after="20"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:sz w:val="15"/>
              <w:color w:val="475569"/>
            </w:rPr>
            <w:t>Page </w:t>
          </w:r>
          <w:fldSimple w:instr="PAGE"/>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:sz w:val="15"/>
              <w:color w:val="475569"/>
            </w:rPr>
            <w:t> of </w:t>
          </w:r>
          <w:fldSimple w:instr="NUMPAGES"/>
        </w:p>
        <w:p>
          <w:pPr>
            <w:jc w:val="right"/>
            <w:spacing w:before="0" w:after="0"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
              <w:b/>
              <w:sz w:val="13"/>
              <w:color w:val="118781"/>
            </w:rPr>
            <w:t>CONFIDENTIAL &amp; BINDING</w:t>
          </w:r>
        </w:p>
      </w:tc>
    </w:tr>
  </w:tbl>
</w:ftr>`;

  // 7. word/document.xml
  // Body pre-formatted with formal corporate letterhead structure:
  // Ref No, Date, Recipient, Subject, Salutation, Body, Table, Sign-off Block.
  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>

    <!-- Reference & Date Table -->
    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9026" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="none"/>
          <w:left w:val="none"/>
          <w:bottom w:val="none"/>
          <w:right w:val="none"/>
          <w:insideH w:val="none"/>
          <w:insideV w:val="none"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tblGrid>
        <w:gridCol w:w="4513"/>
        <w:gridCol w:w="4513"/>
      </w:tblGrid>
      <w:tr>
        <w:tc>
          <w:tcPr>
            <w:tcW w:w="4513" w:type="dxa"/>
          </w:tcPr>
          <w:p>
            <w:pPr>
              <w:spacing w:before="0" w:after="80"/>
            </w:pPr>
            <w:r>
              <w:rPr>
                <w:b/>
                <w:color w:val="0B3968"/>
                <w:sz w:val="20"/>
              </w:rPr>
              <w:t>Ref. No.: </w:t>
            </w:r>
            <w:r>
              <w:rPr>
                <w:color w:val="118781"/>
                <w:b/>
                <w:sz w:val="20"/>
              </w:rPr>
              <w:t>RKISPRO/OPS/2026/0148</w:t>
            </w:r>
          </w:p>
        </w:tc>
        <w:tc>
          <w:tcPr>
            <w:tcW w:w="4513" w:type="dxa"/>
          </w:tcPr>
          <w:p>
            <w:pPr>
              <w:jc w:val="right"/>
              <w:spacing w:before="0" w:after="80"/>
            </w:pPr>
            <w:r>
              <w:rPr>
                <w:b/>
                <w:color w:val="0B3968"/>
                <w:sz w:val="20"/>
              </w:rPr>
              <w:t>Date: </w:t>
            </w:r>
            <w:r>
              <w:rPr>
                <w:color w:val="334155"/>
                <w:sz w:val="20"/>
              </w:rPr>
              <w:t>20 November 2026</w:t>
            </w:r>
          </w:p>
        </w:tc>
      </w:tr>
    </w:tbl>

    <!-- Recipient Block -->
    <w:p>
      <w:pPr>
        <w:spacing w:before="80" w:after="40"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:color w:val="0B3968"/>
        </w:rPr>
        <w:t>To,</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr>
        <w:spacing w:before="0" w:after="30"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:color w:val="0B3968"/>
        </w:rPr>
        <w:t>[Recipient Name / Managing Director / Plant Head]</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr>
        <w:spacing w:before="0" w:after="30"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:color w:val="334155"/>
        </w:rPr>
        <w:t>[Company / Enterprise / Workshop Name]</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr>
        <w:spacing w:before="0" w:after="160"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:color w:val="64748B"/>
        </w:rPr>
        <w:t>[Industrial Area / Facility Address, Bilaspur / Raipur / Pune, State - PIN]</w:t>
      </w:r>
    </w:p>

    <!-- Subject Box -->
    <w:p>
      <w:pPr>
        <w:spacing w:before="100" w:after="180"/>
        <w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/>
        <w:pBdr>
          <w:left w:val="single" w:sz="24" w:space="12" w:color="118781"/>
        </w:pBdr>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:color w:val="0B3968"/>
        </w:rPr>
        <w:t>SUBJECT: </w:t>
      </w:r>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:color w:val="118781"/>
        </w:rPr>
        <w:t>OFFICIAL LETTER OF APPOINTMENT / WORK ORDER AWARD / PARTNERSHIP AUTHORIZATION</w:t>
      </w:r>
    </w:p>

    <!-- Salutation -->
    <w:p>
      <w:pPr>
        <w:spacing w:before="80" w:after="120"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:color w:val="0B3968"/>
        </w:rPr>
        <w:t>Dear Sir / Madam,</w:t>
      </w:r>
    </w:p>

    <!-- Body Paragraph 1 -->
    <w:p>
      <w:pPr>
        <w:spacing w:before="0" w:after="140" w:line="280" w:lineRule="auto"/>
      </w:pPr>
      <w:r>
        <w:t>We are pleased to issue this official communication on behalf of </w:t>
      </w:r>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:color w:val="0B3968"/>
        </w:rPr>
        <w:t>RKISPro Industrial Technologies Private Limited</w:t>
      </w:r>
      <w:r>
        <w:t>. Pursuant to our operational evaluation and commercial alignment under our Managed Industrial &amp; Fabrication Marketplace framework, this letter formalizes the scope of engagement, commercial terms, and quality commitments governing this mandate.</w:t>
      </w:r>
    </w:p>

    <!-- Body Paragraph 2 -->
    <w:p>
      <w:pPr>
        <w:spacing w:before="0" w:after="180" w:line="280" w:lineRule="auto"/>
      </w:pPr>
      <w:r>
        <w:t>RKISPro operates as the accountable managing contractor, ensuring seamless technical triage, standardized Bill of Materials (BOM) transparency, milestone-secured escrow disbursements, and strict adherence to our </w:t>
      </w:r>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:color w:val="118781"/>
        </w:rPr>
        <w:t>3-Gate Local Fabrication Protocol</w:t>
      </w:r>
      <w:r>
        <w:t> and </w:t>
      </w:r>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:color w:val="118781"/>
        </w:rPr>
        <w:t>4-Gate Precision Metrology Standards</w:t>
      </w:r>
      <w:r>
        <w:t>.</w:t>
      </w:r>
    </w:p>

    <!-- Summary / Scope Table -->
    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9026" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="8" w:space="0" w:color="CBD5E1"/>
          <w:left w:val="none"/>
          <w:bottom w:val="single" w:sz="8" w:space="0" w:color="CBD5E1"/>
          <w:right w:val="none"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>
          <w:insideV w:val="none"/>
        </w:tblBorders>
        <w:tblCellMar>
          <w:top w:w="120" w:type="dxa"/>
          <w:left w:w="140" w:type="dxa"/>
          <w:bottom w:w="120" w:type="dxa"/>
          <w:right w:w="140" w:type="dxa"/>
        </w:tblCellMar>
      </w:tblPr>
      <w:tblGrid>
        <w:gridCol w:w="1400"/>
        <w:gridCol w:w="3826"/>
        <w:gridCol w:w="1800"/>
        <w:gridCol w:w="2000"/>
      </w:tblGrid>

      <!-- Table Header -->
      <w:tr>
        <w:trPr>
          <w:tblHeader/>
        </w:trPr>
        <w:tc>
          <w:tcPr>
            <w:shd w:val="clear" w:color="auto" w:fill="0B3968"/>
          </w:tcPr>
          <w:p>
            <w:pPr><w:spacing w:before="40" w:after="40"/></w:pPr>
            <w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/><w:sz w:val="18"/></w:rPr><w:t>ITEM CODE</w:t></w:r>
          </w:p>
        </w:tc>
        <w:tc>
          <w:tcPr>
            <w:shd w:val="clear" w:color="auto" w:fill="0B3968"/>
          </w:tcPr>
          <w:p>
            <w:pPr><w:spacing w:before="40" w:after="40"/></w:pPr>
            <w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/><w:sz w:val="18"/></w:rPr><w:t>SCOPE SPECIFICATION</w:t></w:r>
          </w:p>
        </w:tc>
        <w:tc>
          <w:tcPr>
            <w:shd w:val="clear" w:color="auto" w:fill="0B3968"/>
          </w:tcPr>
          <w:p>
            <w:pPr><w:spacing w:before="40" w:after="40"/></w:pPr>
            <w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/><w:sz w:val="18"/></w:rPr><w:t>QUANTITY / UNIT</w:t></w:r>
          </w:p>
        </w:tc>
        <w:tc>
          <w:tcPr>
            <w:shd w:val="clear" w:color="auto" w:fill="0B3968"/>
          </w:tcPr>
          <w:p>
            <w:pPr><w:spacing w:before="40" w:after="40"/><w:jc w:val="right"/></w:pPr>
            <w:r><w:rPr><w:b/><w:color w:val="2DD4BF"/><w:sz w:val="18"/></w:rPr><w:t>EST. VALUE (INR)</w:t></w:r>
          </w:p>
        </w:tc>
      </w:tr>

      <!-- Row 1 -->
      <w:tr>
        <w:tc>
          <w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/><w:color w:val="0B3968"/><w:sz w:val="18"/></w:rPr><w:t>WO-FAB-01</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/></w:tcPr>
          <w:p><w:r><w:rPr><w:color w:val="334155"/><w:sz w:val="18"/></w:rPr><w:t>Custom MS Sliding Gate &amp; Boundary Railings with Anti-Rust Epoxy Primer</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/></w:tcPr>
          <w:p><w:r><w:rPr><w:color w:val="334155"/><w:sz w:val="18"/></w:rPr><w:t>1 Set (14x7 ft)</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="right"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="118781"/><w:sz w:val="18"/></w:rPr><w:t>Rs. 42,500.00</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <!-- Row 2 -->
      <w:tr>
        <w:tc>
          <w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/><w:color w:val="0B3968"/><w:sz w:val="18"/></w:rPr><w:t>WO-SRV-02</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/></w:tcPr>
          <w:p><w:r><w:rPr><w:color w:val="334155"/><w:sz w:val="18"/></w:rPr><w:t>On-Site Measurement, Structural Alignment &amp; Pillar Anchoring Erection</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/></w:tcPr>
          <w:p><w:r><w:rPr><w:color w:val="334155"/><w:sz w:val="18"/></w:rPr><w:t>Lump-Sum Service</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="right"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="118781"/><w:sz w:val="18"/></w:rPr><w:t>Rs. 6,500.00</w:t></w:r></w:p>
        </w:tc>
      </w:tr>
    </w:tbl>

    <!-- Key Milestone Schedule Bullet Points -->
    <w:p>
      <w:pPr>
        <w:spacing w:before="180" w:after="80"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:color w:val="0B3968"/>
          <w:sz w:val="22"/>
        </w:rPr>
        <w:t>Key Milestone &amp; Payment Governance:</w:t>
      </w:r>
    </w:p>

    <!-- Bullet 1 -->
    <w:p>
      <w:pPr>
        <w:spacing w:before="0" w:after="60"/>
        <w:ind w:left="360" w:hanging="240"/>
      </w:pPr>
      <w:r>
        <w:rPr><w:color w:val="118781"/><w:b/></w:rPr>
        <w:t>*  </w:t>
      </w:r>
      <w:r>
        <w:rPr><w:b/><w:color w:val="0B3968"/></w:rPr>
        <w:t>Tranche 1 (40% Material Advance): </w:t>
      </w:r>
      <w:r>
        <w:t>Locked in RBI-compliant escrow; disbursed upon primary steel invoice and Gate F1 vernier gauge verification.</w:t>
      </w:r>
    </w:p>

    <!-- Bullet 2 -->
    <w:p>
      <w:pPr>
        <w:spacing w:before="0" w:after="60"/>
        <w:ind w:left="360" w:hanging="240"/>
      </w:pPr>
      <w:r>
        <w:rPr><w:color w:val="118781"/><w:b/></w:rPr>
        <w:t>*  </w:t>
      </w:r>
      <w:r>
        <w:rPr><w:b/><w:color w:val="0B3968"/></w:rPr>
        <w:t>Tranche 2 (40% Fabrication Progress): </w:t>
      </w:r>
      <w:r>
        <w:t>Disbursed upon completion of structural welding, squaring check, and primer coat application (Gate F2).</w:t>
      </w:r>
    </w:p>

    <!-- Bullet 3 -->
    <w:p>
      <w:pPr>
        <w:spacing w:before="0" w:after="160"/>
        <w:ind w:left="360" w:hanging="240"/>
      </w:pPr>
      <w:r>
        <w:rPr><w:color w:val="118781"/><w:b/></w:rPr>
        <w:t>*  </w:t>
      </w:r>
      <w:r>
        <w:rPr><w:b/><w:color w:val="0B3968"/></w:rPr>
        <w:t>Tranche 3 (20% Final Settlement): </w:t>
      </w:r>
      <w:r>
        <w:t>Released upon physical delivery, on-site erection, and customer OTP sign-off (Gate F3).</w:t>
      </w:r>
    </w:p>

    <!-- Concluding Paragraph -->
    <w:p>
      <w:pPr>
        <w:spacing w:before="40" w:after="240" w:line="280" w:lineRule="auto"/>
      </w:pPr>
      <w:r>
        <w:t>Please countersign and return the duplicate copy of this document as an acknowledgment of your acceptance. We look forward to an enduring and mutually rewarding partnership.</w:t>
      </w:r>
    </w:p>

    <!-- Formal Sign-Off Table -->
    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9026" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="none"/>
          <w:left w:val="none"/>
          <w:bottom w:val="none"/>
          <w:right w:val="none"/>
          <w:insideH w:val="none"/>
          <w:insideV w:val="none"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tblGrid>
        <w:gridCol w:w="4513"/>
        <w:gridCol w:w="4513"/>
      </w:tblGrid>
      <w:tr>
        <!-- Left: RKISPro Authorized Signatory -->
        <w:tc>
          <w:tcPr>
            <w:tcW w:w="4513" w:type="dxa"/>
          </w:tcPr>
          <w:p>
            <w:pPr><w:spacing w:before="0" w:after="30"/></w:pPr>
            <w:r>
              <w:rPr><w:color w:val="334155"/></w:rPr>
              <w:t>Yours sincerely,</w:t>
            </w:r>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:before="0" w:after="80"/></w:pPr>
            <w:r>
              <w:rPr><w:b/><w:color w:val="0B3968"/></w:rPr>
              <w:t>For RKISPro Industrial Technologies Pvt. Ltd.</w:t>
            </w:r>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:before="80" w:after="30"/></w:pPr>
            <w:r>
              <w:rPr><w:b/><w:color w:val="118781"/></w:rPr>
              <w:t>[Authorized Signatory]</w:t>
            </w:r>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:before="0" w:after="20"/></w:pPr>
            <w:r>
              <w:rPr><w:b/><w:color w:val="0B3968"/></w:rPr>
              <w:t>Director / Authorized Operations Lead</w:t>
            </w:r>
          </w:p>
          <w:p>
            <w:pPr><w:spacing w:before="0" w:after="0"/></w:pPr>
            <w:r>
              <w:rPr><w:color w:val="64748B"/><w:sz w:val="18"/></w:rPr>
              <w:t>DIN: 09841284 | Bilaspur Operations Hub</w:t>
            </w:r>
          </w:p>
        </w:tc>

        <!-- Right: Recipient Acceptance Placeholder -->
        <w:tc>
          <w:tcPr>
            <w:tcW w:w="4513" w:type="dxa"/>
          </w:tcPr>
          <w:p>
            <w:pPr><w:jc w:val="right"/><w:spacing w:before="0" w:after="30"/></w:pPr>
            <w:r>
              <w:rPr><w:color w:val="334155"/></w:rPr>
              <w:t>Confirmed &amp; Accepted by:</w:t>
            </w:r>
          </w:p>
          <w:p>
            <w:pPr><w:jc w:val="right"/><w:spacing w:before="0" w:after="80"/></w:pPr>
            <w:r>
              <w:rPr><w:b/><w:color w:val="0B3968"/></w:rPr>
              <w:t>For [Recipient / Partner Organization]</w:t>
            </w:r>
          </w:p>
          <w:p>
            <w:pPr><w:jc w:val="right"/><w:spacing w:before="80" w:after="30"/></w:pPr>
            <w:r>
              <w:rPr><w:b/><w:color w:val="64748B"/></w:rPr>
              <w:t>[Authorized Representative Signature]</w:t>
            </w:r>
          </w:p>
          <w:p>
            <w:pPr><w:jc w:val="right"/><w:spacing w:before="0" w:after="20"/></w:pPr>
            <w:r>
              <w:rPr><w:b/><w:color w:val="0B3968"/></w:rPr>
              <w:t>Name &amp; Designation</w:t>
            </w:r>
          </w:p>
          <w:p>
            <w:pPr><w:jc w:val="right"/><w:spacing w:before="0" w:after="0"/></w:pPr>
            <w:r>
              <w:rPr><w:color w:val="64748B"/><w:sz w:val="18"/></w:rPr>
              <w:t>Date &amp; Official Company Seal</w:t>
            </w:r>
          </w:p>
        </w:tc>
      </w:tr>
    </w:tbl>

    <!-- Section Properties linking to Header & Footer -->
    <w:sectPr>
      <w:headerReference w:type="default" r:id="rId2"/>
      <w:footerReference w:type="default" r:id="rId3"/>
      <!-- Standard A4 Page Dimensions in dxa (11906 x 16838) -->
      <w:pgSz w:w="11906" w:h="16838"/>
      <!-- Margins: top=2400 dxa (leaves ample room for header), bottom=1600 dxa, left=1440 dxa, right=1440 dxa -->
      <w:pgMar w:top="2400" w:right="1440" w:bottom="1600" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>

  </w:body>
</w:document>`;

  // Add files to zip
  zip.file('[Content_Types].xml', contentTypesXml);
  zip.file('_rels/.rels', rootRelsXml);
  zip.file('word/_rels/document.xml.rels', documentRelsXml);
  zip.file('word/styles.xml', stylesXml);
  zip.file('word/header1.xml', headerXml);
  zip.file('word/footer1.xml', footerXml);
  zip.file('word/document.xml', documentXml);

  return zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });
}

// Build and save to all designated directories
generateRKISProLetterheadDocx().then((buf) => {
  const rootPath = path.join('e:', 'RKISPro Marketplace', 'RKISPro_Official_Letterhead.docx');
  const publicPath = path.join('e:', 'RKISPro Marketplace', 'public', 'RKISPro_Official_Letterhead.docx');
  const artifactPath = path.join(
    'C:',
    'Users',
    'rksc5',
    '.gemini',
    'antigravity',
    'brain',
    '437e1109-ff91-4847-9987-ee6829402543',
    'RKISPro_Official_Letterhead.docx'
  );

  fs.writeFileSync(rootPath, buf);
  console.log(`Saved root letterhead docx: ${rootPath} (${buf.length} bytes)`);

  fs.writeFileSync(publicPath, buf);
  console.log(`Saved public letterhead docx: ${publicPath} (${buf.length} bytes)`);

  try {
    fs.writeFileSync(artifactPath, buf);
    console.log(`Saved artifact letterhead docx: ${artifactPath} (${buf.length} bytes)`);
  } catch (e) {
    console.error('Artifact save error:', e.message);
  }

  console.log('Official RKISPro Word (.docx) Letterhead Template Generated Successfully.');
});
