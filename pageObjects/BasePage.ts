import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class BasePage{

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
      }
    

      //review later!! seems unecessary
    async navigateTo(path: string) {
        await this.page.goto(path);
      }

    //check that the logo is visible on top
    async isLogoDisplayed(selector: string, expectedClass: string, expectedAlt: string) {
      const imageElement = this.page.locator(selector);

      // Ensure the element is visible
      await expect(imageElement).toBeVisible({ timeout: 5000 });
  
      // Check the class attribute
      const classValue = await imageElement.getAttribute('class');
      expect(classValue).toContain(expectedClass);
  
      // Check the alt attribute
      const altValue = await imageElement.getAttribute('alt');
      expect(altValue).toBe(expectedAlt);
    }



}