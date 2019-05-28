import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RecipeService } from './recipe.service';
import { environment } from 'src/environments/environment';
import { IRecipe } from '../core/models/interfaces';

describe('RecipeService', ()=>{
    let recipeService: RecipeService;
    let httpMock: HttpTestingController;

    const instanceMock: IRecipe[] = [
        {
            title: "Bol Renversé (The Original One)",
            href: "http://www.nibbledish.com/people/AmyDelight/recipes/bol-renvers-the-original-one",
            ingredients: "carrot",
            thumbnail: "http://img.recipepuppy.com/511732.jpg"
        },
        {
            title: "Turkish Pasta with Bison Sauce",
            href: "http://www.eatingwell.com/recipes/turkish_bison_pasta.html",
            ingredients: "carrot",
            thumbnail: "http://img.recipepuppy.com/692185.jpg"
        },
        {
            title: "Veggie Stuffing \r\n\r\n",
            href: "http://www.kraftfoods.com/kf/recipes/veggie-stuffing-66162.aspx",
            ingredients: "stuffing, carrot",
            thumbnail: "http://img.recipepuppy.com/637996.jpg" 
        },
        {
            title: "Roasted Carrots \r\n\t\t\r\n\t\r\n\t\t\r\n\t\r\n\t\r\n\r\n",
            href: "http://www.kraftfoods.com/kf/recipes/roasted-carrots-57078.aspx",
            ingredients: "carrot, italian dressing",
            thumbnail: "http://img.recipepuppy.com/641291.jpg"
        },
        {
            title: "Roasted Carrots \r\n\t\t\r\n\t\r\n\t\t\r\n\t\r\n\t\r\n\r\n",
            href: "http://www.kraftfoods.com/kf/recipes/roasted-carrots-57078.aspx?cm_re=1-_-1-_-RecipeAlsoEnjoy",
            ingredients: "carrot, italian dressing",
            thumbnail: "http://img.recipepuppy.com/661095.jpg"
        },
        {
            title: "Whipped Carrot Salad",
            href: "http://allrecipes.com/Recipe/Whipped-Carrot-Salad/Detail.aspx",
            ingredients: "carrot, water",
            thumbnail: "http://img.recipepuppy.com/22570.jpg"
        },
        {
            title: "Zesty Carrots A.k.a. Clean out the Veggie Bin",
            href: "http://www.recipezaar.com/Zesty-Carrots-Aka-Clean-out-the-Veggie-Bin-38316",
            ingredients: "barbecue sauce, carrot",
            thumbnail: "http://img.recipepuppy.com/740685.jpg"
        },
        {
            title: "Creamy Coleslaw",
            href: "http://www.recipezaar.com/Creamy-Coleslaw-109347",
            ingredients: "cabbage, carrot",
            thumbnail: "http://img.recipepuppy.com/334187.jpg"
        },
        {
            title: "Butter Roasted Carrots",
            href: "http://www.recipezaar.com/Butter-Roasted-Carrots-137144",
            ingredients: "butter, carrot",
            thumbnail: "http://img.recipepuppy.com/40723.jpg"
        },
        {
            title: "Campbell's&#174; Slow Cooker Savory Pot Roast",
            href: "http://allrecipes.com/Recipe/Campbells-Slow-Cooker-Savory-Pot-Roast/Detail.aspx",
            ingredients: "carrot, red potatoes",
            thumbnail: "http://img.recipepuppy.com/20903.jpg"
        }
    ];

    beforeEach(() => { TestBed.configureTestingModule({
        providers: [RecipeService],
        imports: [
          HttpClientTestingModule
          ],
        });
        recipeService = TestBed.get(RecipeService);
        httpMock = TestBed.get(HttpTestingController);
      });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(recipeService).toBeTruthy();
      });

    it('should get Recipes',
        inject([HttpTestingController, RecipeService],
            (httpMock: HttpTestingController, service: RecipeService) => {
                let ingredient = 'garlic';
                let skip = 1
                service.getRecipes('garlic', 1).subscribe(data => {
                    expect(data.length).toEqual(10);
                    expect(data).toEqual(instanceMock);
                });
            //${environment.apiEndPoint}/?i=${ingredient}&p=${skip}
            const req = httpMock.expectOne(`${environment.apiEndPoint}/?i=${ingredient}&p=${skip}`);
            expect(req.request.method).toEqual('GET');
            req.flush(instanceMock);
            })
        );
});