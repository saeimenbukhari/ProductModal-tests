interface ProductDetails {
  detailTabContent: string;
  fitTabContent: string;
  materialTabContent: string;
  sustainabilityTabContent: string;
}

import productDetails from '../testData/productDetails.json';
const typedProductDetails = productDetails as ProductDetails;

import { test, expect } from '@playwright/test';
import { ProductView } from '../pageObjects/ProductView';

test.beforeEach(async ({ page }) => {
    // Navigate to the base URL

    await page.goto('/');
    await page.waitForTimeout(15000);
    
  });

test('Open and close a product view', async ({page})=>{
    
   
    const prodView= new ProductView(page);

    await prodView.openProductView(0)
    await prodView.closeProductView()
   

})


test('Verify that images can be browsed',async ({page})=>{

  
  const prodView= new ProductView(page);

  await prodView.openProductView(0)
  //browse and verify that the next image is active
  //this method needs to be improved to check the status of previous image as well 
  await prodView.navigateToNextImage('right',1)
  await prodView.navigateToNextImage('left',0)

})


//this test will fail beacuse the color feature is buggy
test('Verify product colors can be selected',async ({page})=>{

  const prodView= new ProductView(page);
  await prodView.openProductView(0)
  await prodView.changeProductColor(4)



})

test.only('Verify product information tabs are clickable, and display correct info',async ({page})=>{

  const prodView= new ProductView(page);
  await prodView.openProductView(0)

  let productContent: string
  
  //verify the details tab
  productContent=typedProductDetails.detailTabContent
  await prodView.openProductInfoTab('details',productContent)

  //verify the fit tab
  productContent=typedProductDetails.fitTabContent
  await prodView.openProductInfoTab('fit',productContent)
   
  //verify the material tab
  productContent=typedProductDetails.materialTabContent
  await prodView.openProductInfoTab('material',productContent)

  //verify the sustainibilty tab
  productContent=typedProductDetails.sustainabilityTabContent
  await prodView.openProductInfoTab('sustainibilty',productContent)


})


test('Verify product details',async ({page})=>{

  const prodView= new ProductView(page);
  await prodView.openProductView(0)

  //verify that the s.oliver logo is visible
  await prodView.verifyLogo()

  //verify that the product name is visible and correct
  let prodName: string
  prodName=typedProductDetails.productName
  await prodView.verifyProductName(prodName)

  //verify product name in footer
  await prodView.verifyProductNameFooter(prodName)

  //price can not be verified as in the given module prices are generated randomly
  //await prodView.verifyProductPrice()



})

test('Verify size options',async ({page})=>{

  const prodView= new ProductView(page);
  await prodView.openProductView(0)

  //verify that size buttons are available and visible 
  await prodView.checkSizeOptionVisibilty()
  //verify that after seleting a size the correct size is displayed in the size field
  await prodView.selectSizeLabel()


})

//this case should fail because a size is not selected 
test('Verify footer options',async ({page})=>{

  const prodView= new ProductView(page);
  await prodView.openProductView(0)
  //add 2 products to card
  await prodView.addProductToCart('2')
  await prodView.verifyNotification()

  


})
 
test('Verify items can not be added to cart without a quantity',async ({page})=>{

  const prodView= new ProductView(page);
  await prodView.openProductView(0)
  //add 2 products to card
  await prodView.addProductToCart('0')
  //test fails if product view is not visible
  await prodView.checkProductView()
  

  


})









