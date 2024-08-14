import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class ProductView{
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
      }

    async openProductView(productIndex: number){

        //locate a product
        const product=this.page.locator('.product-page__card').nth(productIndex);
        const prodImage=product.locator('.lazy-image.bg-white.product-page__card-image')
        //await expect(prodImage).toBeVisible({ timeout: 15000 });
        
        await prodImage.click({ force: true });
        

        //ensure that the product view is open 
        let productView=this.page.locator('.product-view')
        await expect(productView).toBeVisible()
        await this.page.waitForTimeout(15000)
        

       

    }

    async closeProductView(productIndex: number){
        this.openProductView(productIndex)

        let closeButton=this.page.locator('.close-button-container__button')
        await closeButton.click();
        

        //verify that its closed
        


    }

    async navigateToNextImage(buttonInput: string, imageIndex: number){

        let carouselButton
        if(buttonInput=='right')
            carouselButton=this.page.locator('.arrow--right')
        else if(buttonInput=='left')
            carouselButton=this.page.locator('.arrow--left') 
        else {
            throw new Error(`Invalid buttonInput: ${buttonInput}. Expected 'right' or 'left'.`);
        }
        

        //active images have the class component 'product-gallery__carousel-item--active'
        //const imageToCheck = this.page.locator('.product-gallery__carousel-item').nth(imageIndex);

        //Click to navigate to the next image
        carouselButton.click({ force: true });
        //Verify that the previous image no longer has the active class
        //await expect(imageToCheck).toHaveClass('product-gallery__carousel-item--active');
       
        
   
            


    }

    
    //this will fail because clicks are flaky, theres a bug here
    async changeProductColor(colorIndex: number){

        const colorIcons=this.page.locator('.product-detail__color-options')
        const childElement=colorIcons.locator(':scope > *').nth(colorIndex)

        await childElement.click({ force: true });

        //verify that the correct color has been selected 
        expect(childElement).toHaveClass('border-black')

      
    }

    async verifyProductPrice(){

        const prodPrice=this.page.locator('.product-detail__price')
        //a regular expression will be used here for the price
        //const priceRegex = new RegExp(`^${prodPrice.replace('.', '\\.')}\u00A0€$`);
        //await expect(prodPrice).toHaveText(priceRegex)





    }

    async verifyProductName(productName: string){

        //get the product using the product index 
        const prodName=this.page.locator('.product-detail__name')

        //verify product name is displayed 
        await expect(prodName).toHaveText(productName,{ignoreCase:true})

    }

    async verifyLogo(){
 
        const logo=this.page.locator('.product-detail__logo')
        
        //verify the S.Oliver logo is displayed 
        await expect(logo).toBeVisible()


    }

    async openProductInfoTab(tabName: string, tabContent: string){
        const prodInfoTabs=this.page.locator('.product-info__tab-item')
        //productDetails tab
        let prodElement 

        if(tabName=='details')
            prodElement=prodInfoTabs.nth(0)
        else if(tabName=='fit')
            prodElement=prodInfoTabs.nth(1)
        else if(tabName=='material')
            prodElement=prodInfoTabs.nth(2)
        else if(tabName=='sustainibilty')
            prodElement=prodInfoTabs.nth(3)
        else {
            throw new Error(`Invalid buttonInput: ${tabName}.`);
        }

        
        //verify that the correct tab is open 
        await prodElement.click({force: true})
        await expect(prodElement).toHaveClass('product-info__tab-item product-info__tab-item--active')

        //verify the content 
        const contentArea=this.page.locator('.product-info__tab-content')

    }

















}
