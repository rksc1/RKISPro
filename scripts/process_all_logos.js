const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const HORIZONTAL_SRC = 'C:/Users/rksc5/.gemini/antigravity/brain/437e1109-ff91-4847-9987-ee6829402543/.user_uploaded/media_1795415888142_deaec57e.png';
const STACKED_SRC = 'C:/Users/rksc5/.gemini/antigravity/brain/437e1109-ff91-4847-9987-ee6829402543/.user_uploaded/media_1795415888123_c3c370ab.png';

const PUBLIC_DIR = path.resolve(__dirname, '../public');
const LOGO_DIR = path.join(PUBLIC_DIR, 'logo');

// Helper to create ICO file from array of PNG buffers
function createIco(images) {
  // images: array of { width, height, buffer }
  const count = images.length;
  const headerSize = 6;
  const entrySize = 16;
  let offset = headerSize + count * entrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type (1 = icon)
  header.writeUInt16LE(count, 4); // count

  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...images.map(img => img.buffer)]);
}

function dematPixel(r, g, b) {
  // If pure white or almost pure white, make transparent
  if (r >= 252 && g >= 252 && b >= 252) {
    return { r: 0, g: 0, b: 0, a: 0, isNavy: false, isTeal: false };
  }

  // Check if Navy or Teal
  // Solid Navy: (11, 57, 104) -> B is significantly > G, R is low
  // Solid Teal: (17, 135, 129) -> G >= B or G > 90, R is low
  const isTeal = (g >= b && g > r) || (g > 80 && g > r * 1.5);
  const isNavy = !isTeal;

  let solidR, solidG, solidB;
  if (isTeal) {
    solidR = 17; solidG = 135; solidB = 129;
  } else {
    solidR = 11; solidG = 57; solidB = 104;
  }

  // Alpha estimation based on red channel distance from 255
  let alpha = (255 - r) / (255 - solidR);
  alpha = Math.max(0, Math.min(1, alpha));

  if (alpha < 0.03) {
    return { r: 0, g: 0, b: 0, a: 0, isNavy, isTeal };
  }

  // Unmix foreground color
  let fr = Math.round((r - (1 - alpha) * 255) / alpha);
  let fg = Math.round((g - (1 - alpha) * 255) / alpha);
  let fb = Math.round((b - (1 - alpha) * 255) / alpha);

  fr = Math.max(0, Math.min(255, fr));
  fg = Math.max(0, Math.min(255, fg));
  fb = Math.max(0, Math.min(255, fb));

  const aByte = Math.round(alpha * 255);

  return { r: fr, g: fg, b: fb, a: aByte, isNavy, isTeal };
}

async function processLogos() {
  console.log('--- Processing Horizontal Logo ---');
  // 1. Crop Horizontal Logo
  // Bounding box: left: 113, top: 433, width: 733, height: 229
  const horizRaw = await sharp(HORIZONTAL_SRC)
    .extract({ left: 113, top: 433, width: 733, height: 229 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = horizRaw.info;
  const darkBuf = Buffer.alloc(width * height * 4);
  const lightBuf = Buffer.alloc(width * height * 4);
  const monoWhiteBuf = Buffer.alloc(width * height * 4);
  const monoDarkBuf = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    const r = horizRaw.data[idx];
    const g = horizRaw.data[idx + 1];
    const b = horizRaw.data[idx + 2];

    const p = dematPixel(r, g, b);

    // Dark version (original Navy + Teal on transparent)
    darkBuf[idx] = p.r;
    darkBuf[idx + 1] = p.g;
    darkBuf[idx + 2] = p.b;
    darkBuf[idx + 3] = p.a;

    // Light version (White text/mark for Navy, vibrant Teal for Teal on dark background)
    if (p.a === 0) {
      lightBuf[idx] = 0;
      lightBuf[idx + 1] = 0;
      lightBuf[idx + 2] = 0;
      lightBuf[idx + 3] = 0;
    } else if (p.isNavy) {
      lightBuf[idx] = 255;
      lightBuf[idx + 1] = 255;
      lightBuf[idx + 2] = 255;
      lightBuf[idx + 3] = p.a;
    } else {
      // Vibrant teal
      lightBuf[idx] = 20;
      lightBuf[idx + 1] = 165;
      lightBuf[idx + 2] = 158;
      lightBuf[idx + 3] = p.a;
    }

    // Mono White
    monoWhiteBuf[idx] = 255;
    monoWhiteBuf[idx + 1] = 255;
    monoWhiteBuf[idx + 2] = 255;
    monoWhiteBuf[idx + 3] = p.a;

    // Mono Dark (Navy)
    monoDarkBuf[idx] = 11;
    monoDarkBuf[idx + 1] = 57;
    monoDarkBuf[idx + 2] = 104;
    monoDarkBuf[idx + 3] = p.a;
  }

  // Write PNG files
  const darkPng = await sharp(darkBuf, { raw: { width, height, channels: 4 } }).png().toBuffer();
  const lightPng = await sharp(lightBuf, { raw: { width, height, channels: 4 } }).png().toBuffer();
  const monoWhitePng = await sharp(monoWhiteBuf, { raw: { width, height, channels: 4 } }).png().toBuffer();
  const monoDarkPng = await sharp(monoDarkBuf, { raw: { width, height, channels: 4 } }).png().toBuffer();

  fs.writeFileSync(path.join(LOGO_DIR, 'logo-horizontal-dark.png'), darkPng);
  fs.writeFileSync(path.join(LOGO_DIR, 'logo-horizontal-light.png'), lightPng);
  fs.writeFileSync(path.join(LOGO_DIR, 'logo-mono-white.png'), monoWhitePng);
  fs.writeFileSync(path.join(LOGO_DIR, 'logo-mono-dark.png'), monoDarkPng);

  console.log('Saved horizontal PNGs.');

  // Create SVGs
  const darkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">\n  <image width="${width}" height="${height}" href="data:image/png;base64,${darkPng.toString('base64')}" />\n</svg>\n`;
  const lightSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">\n  <image width="${width}" height="${height}" href="data:image/png;base64,${lightPng.toString('base64')}" />\n</svg>\n`;
  const monoDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">\n  <image width="${width}" height="${height}" href="data:image/png;base64,${monoDarkPng.toString('base64')}" />\n</svg>\n`;
  const monoWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">\n  <image width="${width}" height="${height}" href="data:image/png;base64,${monoWhitePng.toString('base64')}" />\n</svg>\n`;

  fs.writeFileSync(path.join(LOGO_DIR, 'logo-dark.svg'), darkSvg);
  fs.writeFileSync(path.join(LOGO_DIR, 'logo-light.svg'), lightSvg);
  fs.writeFileSync(path.join(LOGO_DIR, 'logo-mono-dark.svg'), monoDarkSvg);
  fs.writeFileSync(path.join(LOGO_DIR, 'logo-mono-white.svg'), monoWhiteSvg);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'rkispro-logo.svg'), darkSvg);

  console.log('Saved horizontal SVGs.');

  // --- Processing Standalone Mark / Icon ---
  console.log('--- Processing Standalone Mark ---');
  // From stacked image: left: 305, top: 190, width: 369, height: 368
  const markRaw = await sharp(STACKED_SRC)
    .extract({ left: 305, top: 190, width: 369, height: 368 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const mWidth = markRaw.info.width;
  const mHeight = markRaw.info.height;
  const markDematBuf = Buffer.alloc(mWidth * mHeight * 4);

  for (let i = 0; i < mWidth * mHeight; i++) {
    const idx = i * 4;
    const r = markRaw.data[idx];
    const g = markRaw.data[idx + 1];
    const b = markRaw.data[idx + 2];

    const p = dematPixel(r, g, b);
    markDematBuf[idx] = p.r;
    markDematBuf[idx + 1] = p.g;
    markDematBuf[idx + 2] = p.b;
    markDematBuf[idx + 3] = p.a;
  }

  // Center on a 512x512 transparent canvas with 10% breathing padding
  // Scale 369x368 to fit comfortably inside 512x512 (e.g. 430x430)
  const trimmedMarkPng = await sharp(markDematBuf, { raw: { width: mWidth, height: mHeight, channels: 4 } })
    .resize(440, 440, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const icon512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: trimmedMarkPng, gravity: 'center' }])
    .png()
    .toBuffer();

  // Save 512 icon
  fs.writeFileSync(path.join(LOGO_DIR, 'icon.png'), icon512);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'icon-512.png'), icon512);

  // SVG for mark
  const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">\n  <image width="512" height="512" href="data:image/png;base64,${icon512.toString('base64')}" />\n</svg>\n`;
  fs.writeFileSync(path.join(LOGO_DIR, 'logo-mark.svg'), markSvg);

  // 192 icon
  const icon192 = await sharp(icon512).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(LOGO_DIR, 'icon-192.png'), icon192);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'icon-192.png'), icon192);

  // Apple touch icon 180x180
  const appleTouchIcon = await sharp(icon512).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), appleTouchIcon);

  // Favicons
  const favicon32 = await sharp(icon512).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(LOGO_DIR, 'favicon.png'), favicon32);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-32x32.png'), favicon32);

  const favicon16 = await sharp(icon512).resize(16, 16).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-16x16.png'), favicon16);

  const favicon48 = await sharp(icon512).resize(48, 48).png().toBuffer();

  // Multi-res favicon.ico
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: favicon16 },
    { width: 32, height: 32, buffer: favicon32 },
    { width: 48, height: 48, buffer: favicon48 }
  ]);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuffer);

  console.log('Saved all icons and favicons successfully!');
}

processLogos().catch(console.error);
