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
import { ProductView } from '../pageObjects/ProductView';

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



test('Verify selecting a color opens the product view ', async ({page}) =>{


    const prodCards= new ProductCard(page);
    const prodView= new ProductView(page);
    
    
    let color: string
    //Verify clicking the white color opens the product view
    color=typedProductDetails.colorWhite
    await prodCards.openProductColor(0,color)
    await prodView.closeProductView()

    //Verify clicking the red color opens the product view
    color=typedProductDetails.colorRed
    await prodCards.openProductColor(0,color)
    await prodView.closeProductView()

    //Verify clicking the blue color opens the product view
    color=typedProductDetails.colorBlue
    await prodCards.openProductColor(0,color)
    await prodView.closeProductView()

    //Verify clicking the black color opens the product view
    color=typedProductDetails.colorBlack
    await prodCards.openProductColor(0,color)
    await prodView.closeProductView()



})




