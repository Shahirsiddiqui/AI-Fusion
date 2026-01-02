import { chromium } from 'playwright';

async function testAIFusion() {
  console.log('Starting AI Fusion test...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const errors: string[] = [];

  // Collect console errors
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(`Console Error: ${msg.text()}`);
    }
  });

  page.on('pageerror', (err) => {
    errors.push(`Page Error: ${err.message}`);
  });

  try {
    // Test 1: Landing Page
    console.log('1. Testing Landing Page...');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Check for main elements
    const heroTitle = await page.locator('h1').first().textContent();
    console.log(`   ✓ Hero title found: "${heroTitle}"`);
    
    const generateButton = await page.locator('text=Generate Project Idea').first();
    if (await generateButton.isVisible()) {
      console.log('   ✓ Generate button visible');
    }
    
    const analyzeButton = await page.locator('text=Analyze My Idea').first();
    if (await analyzeButton.isVisible()) {
      console.log('   ✓ Analyze button visible');
    }

    // Test 2: Generator Page
    console.log('\n2. Testing Generator Page...');
    await page.goto('http://localhost:3000/generator');
    await page.waitForLoadState('networkidle');
    
    const generatorTitle = await page.locator('h1').first().textContent();
    console.log(`   ✓ Page title: "${generatorTitle}"`);
    
    // Check for form elements
    const skillSelect = await page.locator('select').first();
    if (await skillSelect.isVisible()) {
      console.log('   ✓ Skill level selector visible');
    }

    // Test 3: Analyzer Page
    console.log('\n3. Testing Analyzer Page...');
    await page.goto('http://localhost:3000/analyzer');
    await page.waitForLoadState('networkidle');
    
    const analyzerTitle = await page.locator('h1').first().textContent();
    console.log(`   ✓ Page title: "${analyzerTitle}"`);
    
    // Check for textarea
    const textarea = await page.locator('textarea').first();
    if (await textarea.isVisible()) {
      console.log('   ✓ Description textarea visible');
    }

    // Test 4: Roadmap Page
    console.log('\n4. Testing Roadmap Page...');
    await page.goto('http://localhost:3000/roadmap');
    await page.waitForLoadState('networkidle');
    
    const roadmapTitle = await page.locator('h1').first().textContent();
    console.log(`   ✓ Page title: "${roadmapTitle}"`);

    // Test 5: About Page
    console.log('\n5. Testing About Page...');
    await page.goto('http://localhost:3000/about');
    await page.waitForLoadState('networkidle');
    
    const aboutTitle = await page.locator('h1').first().textContent();
    console.log(`   ✓ Page title: "${aboutTitle}"`);

    // Navigation Test
    console.log('\n6. Testing Navigation...');
    await page.goto('http://localhost:3000');
    
    // Click on Generator link
    await page.locator('text=Generator').first().click();
    await page.waitForLoadState('networkidle');
    const currentUrl = page.url();
    console.log(`   ✓ Navigated to: ${currentUrl}`);

    // Report Results
    console.log('\n' + '='.repeat(50));
    if (errors.length === 0) {
      console.log('✓ All tests passed! No console errors detected.');
    } else {
      console.log(`✗ Found ${errors.length} error(s):`);
      errors.forEach((err, i) => console.log(`  ${i + 1}. ${err}`));
    }
    console.log('='.repeat(50));

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

testAIFusion();
