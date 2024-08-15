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

    async verifyProductNameFooter(productName: string){

        //get the product using the product index 
        const prodName=this.page.locator('.product-sticky-footer__name')
        await prodName.scrollIntoViewIfNeeded();

        //verify product name is displayed 
        await expect(prodName).toHaveText(productName,{ignoreCase:true})

    }

    

    async verifyLogo(){
 
        const logo=this.page.locator('.product-detail__logo')
        
        //verify the S.Oliver logo is displayed 
        await expect(logo).toBeVisible()


    }

    

    async openProductInfoTab(tabName: string, expectedText: string){
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
        const actualText = await contentArea.textContent();
        if (actualText !== null) {
            const normalizedActualText = actualText.replace(/\s+/g, ' ').trim();
            const normalizedExpectedText = expectedText.replace(/\s+/g, ' ').trim();
        
            expect(normalizedActualText).toContain(normalizedExpectedText);
        } else {
            throw new Error('Text content is null');
        }

    }

    async checkSizeOptionVisibilty(){

        const sizeButtons=this.page.locator('.product-detail__size-options-button')
        const sizeButtonCount=await sizeButtons.count()
        expect(sizeButtonCount).toBe(5)

        // Loop through each element and verify its visibility
        for (let i = 0; i < sizeButtonCount; i++) {
        const productItem = sizeButtons.nth(i);
        await expect(productItem).toBeVisible();
    }


    }
    
    //size can be one of the following: s,m,l,xl,xxl
    async selectSizeLabel(){

        
        const sizeButtons=this.page.locator('.product-detail__size-options-button')
        //as a proof of concept I am going to add a method here that would have been used if color selection worked properly
        
        /*
        //ideally the method would have the parameter size: string
        // Mapping object to associate each size with its corresponding index
        let sizeButton
        const sizeIndexes: { [key: string]: number } = {
            's': 0,   
            'm': 1,  
            'l': 2,  
            'xl': 3,  
            'xxl': 4  
           };

        const sizeIndex = sizeIndexes[size];

        if (sizeIndex === undefined) {
            throw new Error(`Invalid size: ${size}`);
        }
        
        sizeButton = sizeButtons.nth(sizeIndex);
        //verify that the button is enabled
        expect(sizeButton).toHaveClass('border rounded text-button-secondary border-2 border-border-secondary text-button-secondary-light cursor-default product-detail__size-options-button')

        */
   
        

        //since it is unpredictable which color is selected, and therefore the sizes available
        //the size will be selected based on enabled state 
        const count = await sizeButtons.count();

        // Iterate through each button to find the first enabled one
        for (let i = 0; i < count; i++) {
        const button = sizeButtons.nth(i);

        // Check if the button is enabled
        const isDisabled = await button.evaluate((el) => (el as HTMLButtonElement).disabled);

        if (!isDisabled) {
            // Click the first enabled button
            await button.scrollIntoViewIfNeeded();
            await button.click();

            // Verify the button's text
            const buttonText =await button.textContent();
            const sizeLabel=await this.page.locator('.product-detail__size-value').textContent()
            expect(sizeLabel).toEqual(buttonText);
        }
    }
    


        


    }

















}
