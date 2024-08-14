import { test, expect } from '@playwright/test';
import { ProductCard } from '../pageObjects/ProductCard';

test.beforeEach(async ({ page }) => {
    // Navigate to the base URL
    await page.goto('/');
    await page.waitForTimeout(15000);
    
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

test('Verify all product information for a product card',async ({page}) =>{


    const prodCards= new ProductCard(page);
    //verify product info
    let productName='T-shirt with an embroidered logo'
      
    await prodCards.verifyProductLogo(0)
    await prodCards.verifyProductName(0,productName)
    //await prodCards.verifyProductPrice(0,'20.99')


})

test('Verify all product information for all product cards', async ({page}) =>{


    const prodCards= new ProductCard(page);
    //verify product info
    let productName='T-shirt with an embroidered logo'
    
      
    await prodCards.verifyProductInfos(productName)
   


})




