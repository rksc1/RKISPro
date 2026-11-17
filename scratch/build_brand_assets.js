const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcPath = 'C:/Users/rksc5/.gemini/antigravity/brain/437e1109-ff91-4847-9987-ee6829402543/.user_uploaded/media_1794935862662_a7d82252.jpg';
const outDir = path.resolve('public/logo');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log('Loading source image...');
  const { data, info } = await sharp(srcPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const rgbaData = Buffer.from(data);

  // Remove white background with smooth edge anti-aliasing
  for (let i = 0; i < rgbaData.length; i += 4) {
    const r = rgbaData[i];
    const g = rgbaData[i + 1];
    const b = rgbaData[i + 2];

    // Compute distance from pure white (255, 255, 255)
    const minVal = Math.min(r, g, b);
    if (minVal > 248) {
      rgbaData[i + 3] = 0; // Pure transparent
    } else if (minVal > 220) {
      // Smooth alpha feathering on edges
      const alpha = Math.round(255 * (1 - (minVal - 220) / (248 - 220)));
      rgbaData[i + 3] = alpha;
    }
  }

  console.log('Transparent buffer created.');

  // 1. Extract Icon Mark (bounds: left 257, top 170, width 510, height 476)
  const iconPadding = 15;
  const iconLeft = Math.max(0, 257 - iconPadding);
  const iconTop = Math.max(0, 170 - iconPadding);
  const iconWidth = 510 + iconPadding * 2;
  const iconHeight = 476 + iconPadding * 2;

  const iconBuffer = await sharp(rgbaData, { raw: { width, height, channels: 4 } })
    .extract({ left: iconLeft, top: iconTop, width: iconWidth, height: iconHeight })
    .png()
    .toBuffer();

  // Save 512x512 Master Icon
  await sharp(iconBuffer)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outDir, 'icon.png'));
  console.log('Created icon.png (512x512)');

  // Save 192x192 PWA Icon
  await sharp(iconBuffer)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outDir, 'icon-192.png'));
  console.log('Created icon-192.png');

  // Save 48x48 Favicon PNG
  await sharp(iconBuffer)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outDir, 'favicon.png'));
  console.log('Created favicon.png');

  // 2. Extract Text "RKISPro" (left: 148, top: 712, width: 731, height: 143)
  const textPadding = 10;
  const textLeft = Math.max(0, 148 - textPadding);
  const textTop = Math.max(0, 712 - textPadding);
  const textWidth = 731 + textPadding * 2;
  const textHeight = 143 + textPadding * 2;

  const textBuffer = await sharp(rgbaData, { raw: { width, height, channels: 4 } })
    .extract({ left: textLeft, top: textTop, width: textWidth, height: textHeight })
    .png()
    .toBuffer();

  // 3. Create Horizontal Lockup (Icon Left + Text Right)
  // Target dimensions: 800px width, 200px height
  const iconResized = await sharp(iconBuffer)
    .resize(160, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const textResized = await sharp(textBuffer)
    .resize(560, 110, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const horizontalLockupLight = await sharp({
    create: {
      width: 760,
      height: 180,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: iconResized, left: 15, top: 10 },
      { input: textResized, left: 190, top: 35 }
    ])
    .png()
    .toBuffer();

  await sharp(horizontalLockupLight).toFile(path.join(outDir, 'logo-horizontal-light.png'));
  console.log('Created logo-horizontal-light.png');

  // 4. Create Dark Theme Variants (Convert dark navy pixels to crisp white/light silver while preserving vibrant teal)
  const darkRgba = Buffer.from(rgbaData);
  for (let i = 0; i < darkRgba.length; i += 4) {
    if (darkRgba[i + 3] > 0) {
      const r = darkRgba[i];
      const g = darkRgba[i + 1];
      const b = darkRgba[i + 2];

      // If pixel is in the navy spectrum (low red, medium green, medium-low blue, not teal)
      // Navy in source: r < 40, g < 50, b < 70
      if (r < 50 && g < 60 && b < 85) {
        darkRgba[i] = 250;     // Turn to white
        darkRgba[i + 1] = 252;
        darkRgba[i + 2] = 255;
      }
    }
  }

  const iconDarkBuffer = await sharp(darkRgba, { raw: { width, height, channels: 4 } })
    .extract({ left: iconLeft, top: iconTop, width: iconWidth, height: iconHeight })
    .resize(160, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const textDarkBuffer = await sharp(darkRgba, { raw: { width, height, channels: 4 } })
    .extract({ left: textLeft, top: textTop, width: textWidth, height: textHeight })
    .resize(560, 110, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const horizontalLockupDark = await sharp({
    create: {
      width: 760,
      height: 180,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: iconDarkBuffer, left: 15, top: 10 },
      { input: textDarkBuffer, left: 190, top: 35 }
    ])
    .png()
    .toBuffer();

  await sharp(horizontalLockupDark).toFile(path.join(outDir, 'logo-horizontal-dark.png'));
  console.log('Created logo-horizontal-dark.png');

  console.log('All brand bitmap assets generated successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
