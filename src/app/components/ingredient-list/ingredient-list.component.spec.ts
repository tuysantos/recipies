import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientListComponent } from './ingredient-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IIngredient } from 'src/app/core/models/interfaces';

import { ManageIngredientComponent } from '../manage-ingredient/manage-ingredient.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { IngredientService } from 'src/app/services/ingredient.service';

describe('IngredientListComponent', () => {
  let component: IngredientListComponent;
  let fixture: ComponentFixture<IngredientListComponent>;
  let data: IIngredient[] = [];
  let defaultValues: DefaultValues;

  class IngredientServiceMock {
    LoadIngredients(): Observable<IIngredient[]> {
      return of(this.getMockData());
    }

    addIngredient(ingredient: string): Observable<IIngredient[]> {
      data[data.length] = {ingredientName: ingredient}; 
      return of(this.getMockData());
    }

    getMockData(): IIngredient[] {
      return data;
    }
  };

  class DefaultValues {
    setDefaultMockData(): void {
      if (data.length > 0) {
        return;
      }

      data[data.length] = {ingredientName: 'onions'}; 
      data[data.length] = {ingredientName: 'garlic'}; 
      data[data.length] = {ingredientName: 'carrot'}; 
      data[data.length] = {ingredientName: 'tomato'};
      data[data.length] = {ingredientName: 'spinache'};
      data[data.length] = {ingredientName: 'olive'};
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientListComponent, ManageIngredientComponent, PaginationComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule
      ],
      providers: [
        {provide: IngredientService, useClass : IngredientServiceMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    defaultValues = new DefaultValues();
    defaultValues.setDefaultMockData();
    fixture = TestBed.createComponent(IngredientListComponent);
    component = fixture.componentInstance;
    component.activeIngredientLists = component.ingredients;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of Ingredients', () => {
    expect(component.ingredients.length).toBe(6);
  });

  it('should add a new ingredient', () => {
    component.addNewIngredient('xpto');
    fixture.detectChanges();
    expect(component.ingredients.length).toBe(7);
  });

  it('should display first 10 ingredients of 13', () => {
    component.addNewIngredient('xpto 1');
    component.addNewIngredient('xpto 2');
    component.addNewIngredient('xpto 3');
    component.addNewIngredient('xpto 4');
    component.addNewIngredient('xpto 5');
    component.addNewIngredient('xpto 6');
    fixture.detectChanges();
    expect(component.ingredients.length).toBe(13);
    expect(component.activeIngredientLists.length).toBe(10);
  });

  it('should display the last 3 ingredients of 13', () => {
    component.pageChanged(2);
    fixture.detectChanges();
    expect(component.ingredients.length).toBe(13);
    expect(component.activeIngredientLists.length).toBe(3);
  });
});
