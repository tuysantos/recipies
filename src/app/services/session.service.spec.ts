import { TestBed, inject } from '@angular/core/testing';

import { SessionService } from "./session.service";

describe('SessionService', ()=>{
    let sessionService: SessionService;

    beforeEach(() => { TestBed.configureTestingModule({
        providers: [SessionService],
        imports: [],
        });
        sessionService = TestBed.get(SessionService);
      });

      it('should be created', () => {
        expect(sessionService).toBeTruthy();
      });
    
      it('should create the default list of ingredients', ()=>{
        let ingredientList = sessionService.getIngredients();
        expect(ingredientList.length).toBe(10);
      });

      it('should avoid duplicate ingredient', ()=>{
        let total = sessionService.getIngredients().length;
        let ingredientList = sessionService.addIngredient('garlic');
        expect(total).toBe(ingredientList.length);
      });

});

 