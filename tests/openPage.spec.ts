import { test, expect } from '@playwright/test';
import { BasePage } from '../pageObjects/BasePage';

test.beforeEach(async ({ page }) => {
  // Navigate to the base URL before each test
  await page.goto('/');
  await page.waitForTimeout(15000);
});

test('should open the home page and verify the title', async ({ page }) => {
    
    const basePage = new BasePage(page);
  
    //navigate to the home page
    await basePage.navigateTo('/');
  
    // Verify the title of the home page
    const title = await page.title();
    expect(title).toBe('product_modal'); // Replace with the actual expected title
  
 });


  test('Verify the logo', async ({ page }) => {
    
    const basePage = new BasePage(page);

    //expect the logo to be visible 
    await basePage.isLogoDisplayed('img.items-center', 'items-center', 'soliver logo');
  });

