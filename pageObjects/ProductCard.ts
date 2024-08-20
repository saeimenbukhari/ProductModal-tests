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

      //product index is esentially the index of the product cards, in this case it can be 0-3
      async getColorOptions(productIndex: number){

        const productCard=this.page.locator('.product-page__card').nth(productIndex)
        const colorTray=productCard.locator('.product-page__color-images')

        return colorTray
          
      }
      
      //product index is esentially the index of the product cards, in this case it can be 0-3
      async openProductColor(productIndex: number, color: string){

        let colorTray=await this.getColorOptions(productIndex)
        let colorOption=colorTray.locator('.product-page__color-box');

        const count = await colorOption.count();

        // Find the color box that matches the desired background color
        for (let i = 0; i < count; i++) {
          const box = colorOption.nth(i);

          // Get the background color of the box
          const backgroundColor = await box.evaluate(element => {
              return window.getComputedStyle(element).backgroundColor;
          });

          // If the background color matches the desired color, click the box
          if (backgroundColor === color) {
              await box.click();
              //verify that the product view is open 
              const productView= this.page.locator('.product-view')
              await expect(productView).toBeVisible()
              return;
          }

          
      }

      

      throw new Error(`No color box found with the color ${color}`);
    
      

      }

      

      


}