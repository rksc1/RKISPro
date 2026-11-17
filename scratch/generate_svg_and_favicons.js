const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve('public/logo');
const publicDir = path.resolve('public');

async function main() {
  console.log('Generating favicons...');
  const iconSrc = path.join(outDir, 'icon.png');
  const iconBuffer = fs.readFileSync(iconSrc);

  // Favicons
  await sharp(iconBuffer).resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16x16.png'));
  await sharp(iconBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
  await sharp(iconBuffer).resize(48, 48).png().toFile(path.join(publicDir, 'favicon.ico'));
  await sharp(iconBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Favicons generated in public/');

  // Convert transparent horizontal PNGs into crisp embedded SVG wrappers for immediate zero-loss Next.js rendering
  const lightPngBase64 = fs.readFileSync(path.join(outDir, 'logo-horizontal-light.png')).toString('base64');
  const darkPngBase64 = fs.readFileSync(path.join(outDir, 'logo-horizontal-dark.png')).toString('base64');
  const iconPngBase64 = fs.readFileSync(path.join(outDir, 'icon.png')).toString('base64');

  // 1. logo-light.svg
  const logoLightSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 180" width="760" height="180">
  <image width="760" height="180" href="data:image/png;base64,${lightPngBase64}" />
</svg>`;
  fs.writeFileSync(path.join(outDir, 'logo-light.svg'), logoLightSvg);
  console.log('Created logo-light.svg');

  // 2. logo-dark.svg
  const logoDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 180" width="760" height="180">
  <image width="760" height="180" href="data:image/png;base64,${darkPngBase64}" />
</svg>`;
  fs.writeFileSync(path.join(outDir, 'logo-dark.svg'), logoDarkSvg);
  console.log('Created logo-dark.svg');

  // 3. logo-mark.svg
  const logoMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image width="512" height="512" href="data:image/png;base64,${iconPngBase64}" />
</svg>`;
  fs.writeFileSync(path.join(outDir, 'logo-mark.svg'), logoMarkSvg);
  console.log('Created logo-mark.svg');

  // 4. Monochrome variants
  // Create pure white monochrome lockup
  const { data: darkData, info: darkInfo } = await sharp(path.join(outDir, 'logo-horizontal-dark.png'))
    .raw()
    .toBuffer({ resolveWithObject: true });

  const monoWhiteData = Buffer.from(darkData);
  for (let i = 0; i < monoWhiteData.length; i += 4) {
    if (monoWhiteData[i + 3] > 10) {
      monoWhiteData[i] = 255;
      monoWhiteData[i + 1] = 255;
      monoWhiteData[i + 2] = 255;
    }
  }

  const monoWhiteBuffer = await sharp(monoWhiteData, { raw: darkInfo }).png().toBuffer();
  const monoWhiteBase64 = monoWhiteBuffer.toString('base64');
  const logoMonoWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 180" width="760" height="180">
  <image width="760" height="180" href="data:image/png;base64,${monoWhiteBase64}" />
</svg>`;
  fs.writeFileSync(path.join(outDir, 'logo-mono-white.svg'), logoMonoWhiteSvg);
  await sharp(monoWhiteBuffer).toFile(path.join(outDir, 'logo-mono-white.png'));
  console.log('Created logo-mono-white.svg and logo-mono-white.png');

  // Create pure black monochrome lockup
  const monoDarkData = Buffer.from(darkData);
  for (let i = 0; i < monoDarkData.length; i += 4) {
    if (monoDarkData[i + 3] > 10) {
      monoDarkData[i] = 15;
      monoDarkData[i + 1] = 23;
      monoDarkData[i + 2] = 42;
    }
  }
  const monoDarkBuffer = await sharp(monoDarkData, { raw: darkInfo }).png().toBuffer();
  const monoDarkBase64 = monoDarkBuffer.toString('base64');
  const logoMonoDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 180" width="760" height="180">
  <image width="760" height="180" href="data:image/png;base64,${monoDarkBase64}" />
</svg>`;
  fs.writeFileSync(path.join(outDir, 'logo-mono-dark.svg'), logoMonoDarkSvg);
  await sharp(monoDarkBuffer).toFile(path.join(outDir, 'logo-mono-dark.png'));
  console.log('Created logo-mono-dark.svg and logo-mono-dark.png');

  console.log('All SVG and favicon assets generated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
