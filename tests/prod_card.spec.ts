import { test, expect } from '@playwright/test';
import { ProductCard } from '../pageObjects/ProductCard';

test.beforeEach(async ({ page }) => {
    // Navigate to the base URL
    await page.goto('/');
    
  });

test('Verify product count', async ({page})=>{
    
   
    const prodCards= new ProductCard(page);
    //verify product card count 
    let prodCount=4
    prodCards.verifyProductCount(prodCount)

})

test('Verify each products color box count', async ({page})=>{
    
   
    const prodCards= new ProductCard(page);
    //verify product card count 
    let prodCount=4
    let prodIndex=0
    prodCards.verifyColorBoxCount(prodIndex,prodCount)

})




