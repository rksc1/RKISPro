const fs = require('fs');
const path = require('path');

const outDir = path.resolve('public/logo');

// logo-dark.svg -> Dark text (Navy #0F172A + Teal #00A8AF) for light backgrounds (StickyNavbar, Sidebar, Invoices)
const darkTextPng = fs.readFileSync(path.join(outDir, 'logo-horizontal-light.png')).toString('base64');
const logoDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 180" width="760" height="180">
  <image width="760" height="180" href="data:image/png;base64,${darkTextPng}" />
</svg>`;
fs.writeFileSync(path.join(outDir, 'logo-dark.svg'), logoDarkSvg);
console.log('Updated logo-dark.svg (Dark text for light backgrounds)');

// logo-light.svg -> Light text (White #FFFFFF + Teal #00C4CC) for dark backgrounds (FooterSection, AuthShell)
const lightTextPng = fs.readFileSync(path.join(outDir, 'logo-horizontal-dark.png')).toString('base64');
const logoLightSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 180" width="760" height="180">
  <image width="760" height="180" href="data:image/png;base64,${lightTextPng}" />
</svg>`;
fs.writeFileSync(path.join(outDir, 'logo-light.svg'), logoLightSvg);
console.log('Updated logo-light.svg (Light text for dark backgrounds)');
