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
    await prodView.closeProductView(0)
   

})


test('Verify that images can be browsed',async ({page})=>{

  
  const prodView= new ProductView(page);

  await prodView.openProductView(0)
  //browse and verify that the next image is active
  await prodView.navigateToNextImage('right',2)

})

test('Verify product colors can be selected',async ({page})=>{

  const prodView= new ProductView(page);
  await prodView.openProductView(0)
  await prodView.changeProductColor(4)



})

test.only('Verify product information tabs are clickable, and display correct info',async ({page})=>{

  const prodView= new ProductView(page);
  await prodView.openProductView(0)
  //await prodView.openProductInfoTab('details')
  //await prodView.openProductInfoTab('fit')
  //await prodView.openProductInfoTab('material')
  //await prodView.openProductInfoTab('sustainibilty')





})







