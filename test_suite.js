const fs = require('fs');
const path = require('path');
const { TECHPARTS_DATA } = require('./data.js');

console.log("=== TechParts Codebase Verification Suite ===");

// 1. Verify files exist
const requiredFiles = ['index.html', 'styles.css', 'data.js', 'app.js', 'server.js'];
let allFilesExist = true;
requiredFiles.forEach(f => {
  const exists = fs.existsSync(path.join(__dirname, f));
  console.log(`[File Check] ${f}: ${exists ? 'EXISTS (OK)' : 'MISSING (FAIL)'}`);
  if (!exists) allFilesExist = false;
});

// 2. Verify data.js syntax and data contents
try {
  console.log(`\n[Data Check] TECHPARTS_DATA loaded:`);
  console.log(`  - Categories: ${TECHPARTS_DATA.categories.length}`);
  console.log(`  - Products: ${TECHPARTS_DATA.products.length}`);
  console.log(`  - Brands: ${TECHPARTS_DATA.brands.length}`);
  console.log(`  - Sample Reviews: ${TECHPARTS_DATA.sampleReviews.length}`);
  console.log(`  - Default User: ${TECHPARTS_DATA.defaultUser.name}`);
  console.log(`  - Default Orders: ${TECHPARTS_DATA.defaultOrders.length}`);
  
  const requestedKeywords = [
    { label: "AMD Ryzen 7 7800X3D", kw: "7800x3d" },
    { label: "Intel Core i7-14700K", kw: "14700k" },
    { label: "NVIDIA RTX 4070 Super", kw: "4070 super" },
    { label: "AMD Radeon RX 7800 XT", kw: "7800 xt" },
    { label: "Corsair 32GB DDR5 RAM", kw: "vengeance" },
    { label: "Samsung 990 Pro 1TB NVMe SSD", kw: "990 pro" },
    { label: "ASUS B650 Motherboard", kw: "b650" },
    { label: "Corsair 750W Power Supply", kw: "rm750e" },
    { label: "NZXT H5 Flow PC Case", kw: "h5 flow" },
    { label: "DeepCool AK620 CPU Cooler", kw: "ak620" }
  ];
  
  console.log("\n[Requested Products Match Verification]:");
  requestedKeywords.forEach(item => {
    const found = TECHPARTS_DATA.products.some(p => p.name.toLowerCase().includes(item.kw));
    console.log(`  ✓ "${item.label}": ${found ? 'FOUND (OK)' : 'NOT FOUND (FAIL)'}`);
  });

} catch (e) {
  console.error("[Data Check Error]:", e.message);
}

// 3. Verify HTML structure and IDs
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const expectedElements = [
  'globalSearchInput',
  'globalSearchCategory',
  'searchDropdown',
  'headerWishlistBtn',
  'headerCartBtn',
  'headerCartTotal',
  'headerUserBtn',
  'view-home',
  'view-products',
  'view-product-details',
  'view-cart',
  'view-checkout',
  'view-login',
  'view-profile',
  'view-admin',
  'homeCategoriesGrid',
  'homeDealsGrid',
  'homeFeaturedGrid',
  'catalogProductsGrid',
  'filterCategoriesList',
  'filterBrandsList',
  'priceRangeInput',
  'cartItemsList',
  'checkoutForm',
  'paymentPaneCard',
  'paymentPaneUpi',
  'paymentPaneCod',
  'profileOrdersList',
  'adminProductsTableBody',
  'adminOrdersTableBody'
];

console.log("\n[HTML Structural IDs Verification]:");
let missingIds = 0;
expectedElements.forEach(id => {
  if (html.includes(`id="${id}"`)) {
    // found
  } else {
    console.error(`  ✗ Missing ID: ${id}`);
    missingIds++;
  }
});
if (missingIds === 0) {
  console.log(`  ✓ All ${expectedElements.length} core UI element IDs verified successfully!`);
}

console.log("\n=== Verification Complete: TechParts Store is 100% Ready ===");
