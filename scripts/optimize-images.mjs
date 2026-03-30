/**
 * Image Optimization Script for PageSpeed performance
 * 
 * Run: node scripts/optimize-images.mjs
 * 
 * Requirements: npm install sharp
 * 
 * This script:
 * 1. Resizes images to appropriate dimensions for web
 * 2. Compresses WebP images with higher compression
 * 3. Creates multiple responsive sizes for srcset
 */

import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

const QUALITY = 65; // Higher compression (was ~80+ implicitly)

const imageConfigs = [
  // Hero images
  { input: 'hero_main.webp', outputs: [
    { name: 'hero_main.webp', width: 1920, quality: 70 },
    { name: 'hero_main_mobile.webp', width: 768, quality: 60 },
  ]},
  // Logo - resize to actual display size (max 56px height)
  { input: 'logo.webp', outputs: [
    { name: 'logo.webp', height: 112, quality: 75 }, // 2x retina of max 56px
  ]},
  // Service images - displayed at ~662x441 max
  { input: 'image_10.webp', outputs: [
    { name: 'image_10.webp', width: 700, height: 467, quality: QUALITY },
    { name: 'image_10_sm.webp', width: 400, height: 267, quality: QUALITY },
  ]},
  { input: 'image_1.webp', outputs: [
    { name: 'image_1.webp', width: 700, height: 467, quality: QUALITY },
    { name: 'image_1_sm.webp', width: 400, height: 267, quality: QUALITY },
  ]},
  { input: 'image_3.webp', outputs: [
    { name: 'image_3.webp', width: 700, height: 467, quality: QUALITY },
    { name: 'image_3_sm.webp', width: 400, height: 267, quality: QUALITY },
  ]},
  { input: 'image_2.webp', outputs: [
    { name: 'image_2.webp', width: 700, height: 467, quality: QUALITY },
  ]},
  { input: 'image_4.webp', outputs: [
    { name: 'image_4.webp', width: 700, height: 467, quality: QUALITY },
  ]},
  { input: 'image_5.webp', outputs: [
    { name: 'image_5.webp', width: 700, height: 467, quality: QUALITY },
  ]},
  { input: 'image_6.webp', outputs: [
    { name: 'image_6.webp', width: 700, height: 467, quality: QUALITY },
  ]},
  { input: 'image_7.webp', outputs: [
    { name: 'image_7.webp', width: 700, height: 467, quality: QUALITY },
  ]},
  { input: 'image_9.webp', outputs: [
    { name: 'image_9.webp', width: 700, height: 467, quality: QUALITY },
  ]},
];

async function optimize() {
  for (const config of imageConfigs) {
    const inputPath = path.join(publicDir, config.input);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${config.input} - file not found`);
      continue;
    }

    // Backup original
    const backupPath = inputPath + '.original';
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
      console.log(`📦 Backed up ${config.input}`);
    }

    for (const output of config.outputs) {
      const outputPath = path.join(publicDir, output.name);
      
      let pipeline = sharp(backupPath);
      
      if (output.width && output.height) {
        pipeline = pipeline.resize(output.width, output.height, { fit: 'cover' });
      } else if (output.width) {
        pipeline = pipeline.resize(output.width);
      } else if (output.height) {
        pipeline = pipeline.resize(null, output.height);
      }

      pipeline = pipeline.webp({ quality: output.quality, effort: 6 });

      await pipeline.toFile(outputPath + '.tmp');
      
      // Replace original
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      fs.renameSync(outputPath + '.tmp', outputPath);

      const originalSize = fs.statSync(backupPath).size;
      const newSize = fs.statSync(outputPath).size;
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

      console.log(`✅ ${output.name}: ${(newSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
    }
  }
  
  console.log('\n🎉 Image optimization complete!');
}

optimize().catch(console.error);
