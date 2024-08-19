interface ProductDetails {
    detailTabContent: string;
    fitTabContent: string;
    materialTabContent: string;
    sustainabilityTabContent: string;
  }
  
  import productDetails from '../testData/productDetails.json';
  const typedProductDetails = productDetails as ProductDetails;


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
    let prodName: string
    prodName=typedProductDetails.productName
      
    await prodCards.verifyProductLogo(0)
    await prodCards.verifyProductName(0,prodName)
    //await prodCards.verifyProductPrice(0,'20.99')


})

test('Verify all product information for all product cards', async ({page}) =>{


    const prodCards= new ProductCard(page);
    //verify product info
    let prodName: string
    prodName=typedProductDetails.productName
    
      
    await prodCards.verifyProductInfos(prodName)
   


})

//implement color selection cases




