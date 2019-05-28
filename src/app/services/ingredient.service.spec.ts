import { TestBed, inject } from '@angular/core/testing';
import { IngredientService } from './ingredient.service';
import { SessionService } from './session.service';

describe('IngredientService', ()=>{
    let ingredientService: IngredientService;

    beforeEach(() => { TestBed.configureTestingModule({
        providers: [IngredientService, SessionService],
        imports: [ ],
        });
        ingredientService = TestBed.get(IngredientService);
      });

      it('should be created', () => {
        expect(ingredientService).toBeTruthy();
      });
});     