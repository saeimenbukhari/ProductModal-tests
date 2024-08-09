import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class ProductCard{

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
      }

    
      async verifyProductCount(expectedCount: number) {
        //get the count of product cards visible in the DOM
        const productElements =this.page.locator('.product-page__card');
        //verify that product card are visible 
        await productElements.first().isVisible()
        
        //Verify against expected
        await expect(productElements).toHaveCount(expectedCount)
        
      }

      async verifyColorBoxCount(productIndex: number,expectedCount: number){

        //get the element
        const product=this.page.locator('.product-page__card').nth(productIndex)

        //get the color boxes
        const colorBoxes=product.locator('.product-page__color-box')
        await colorBoxes.isVisible()

        //verify color box count
        await expect(colorBoxes).toHaveCount(expectedCount)

         
      }


}