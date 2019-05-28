import { AppPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  const EC = browser.ExpectedConditions;
  let spTitle: any;
  let lnk: any;

  beforeEach(() => {
    page = new AppPage();
  });

  async function ingredientPage() {
    page.navigateTo();
    spTitle = page.getSpanTitle();
    lnk = page.getIngredient();
    browser.sleep(2000);
    await lnk.click();
    browser.sleep(1000);
    await browser.wait(EC.presenceOf(await page.getRecipeSpanTitle()));
  }

  async function recipePage() {
    browser.sleep(4000);
    await page.getCancelBtn().click();
    browser.sleep(2000);
  }

  it('should add a new ingredient', async() => {
    page.navigateTo();
    browser.sleep(1000);
    let txtIngredient = page.getIngredientText();
    txtIngredient.sendKeys('xpto');
    browser.sleep(1000);
    await page.getAddIngredientBtn().click();
    browser.sleep(2000);
    expect(element.all(by.css("table tbody tr")).count()).toBeGreaterThan(9);
  });

  it('should get the recipe for ingredient', async() => {
    await ingredientPage();
    //Click on back button
    await page.getBackButton().click();
    expect(spTitle.getText()).toEqual('List of Ingredients');
  });

  it('should display the refresh message', async() => {
    await ingredientPage();
    await recipePage();
    //Click on back button
    await page.getBackButton().click();
    browser.sleep(4000);
    expect(spTitle.getText()).toEqual('List of Ingredients');
  });

  it('should fetch more data', async() => {
    await ingredientPage();
    browser.sleep(4000);
    //Click on refresh button
    await page.getRefreshBtn().click();
    browser.sleep(3000);
    //Click on back button
    await page.getBackButton().click();
    browser.sleep(2000);
    expect(spTitle.getText()).toEqual('List of Ingredients');
  });
});
