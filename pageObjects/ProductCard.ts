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

      async verifyProductLogo(productIndex: number){
        
        //get the product using the product index 
        const product=this.page.locator('.product-page__card').nth(productIndex)
        
        //verify the S.Oliver logo is displayed 
        const logo=product.locator('.product-page__logo')
        await expect(logo).toHaveText('S.Oliver',{ignoreCase:true})


      }

      async verifyProductName(productIndex: number, productName: string){
        
        //get the product using the product index 
        const product=this.page.locator('.product-page__card').nth(productIndex)

        //verify product name is displayed 
        const prodName=product.locator('.product-page__name')
        await expect(prodName).toHaveText(productName,{ignoreCase:true})

      }

      
      //the price is randomly generated in the module, thats why this method cant be properly used 
      async verifyProductPrice(productIndex: number, productPrice: string){
        
        //get the product using the product index 
        const product=this.page.locator('.product-page__card').nth(productIndex)

        //verify product price 
        const prodPrice=product.locator('.product-page__price')
        //a regular expression will be used here for the price
        const priceRegex = new RegExp(`^${productPrice.replace('.', '\\.')}\u00A0€$`);
        await expect(prodPrice).toHaveText(priceRegex)

      }

      async countProductCards(){

        const productCards = this.page.locator('.product-page__card');

        // Counting the number of elements found
        const count = await productCards.count();

        return count;

      }

      async verifyProductInfos( productDescription: string){
        
        
        //get the product count on the page
        const productCount=await this.countProductCards()
         

        //this method can later be used to implement data-driven testing with data from a CSV or a database 
        for (let i = 0; i < productCount; i++) {
          await this.verifyProductLogo(i)
          await this.verifyProductName(i,productDescription)
        }




      }


}