import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getIngredient() {
    return element(by.id('linkId'));
  }

  getBackButton() {
    return element(by.id('btnBack'));
  }

  getSpanTitle() {
    return element(by.id('spMainTitle'));
  }

  getRecipeSpanTitle() {
    return element(by.id('spMainTitle1'));
  }

  getCancelBtn() {
    return element(by.id('btnCancel'));
  }
  
  getRefreshBtn() {
    return element(by.id('btnRefresh'));
  }

  getIngredientText() {
    return element(by.id('txtIngredient'));
  }

  getAddIngredientBtn() {
    return element(by.id('btnAdd'));
  }
}