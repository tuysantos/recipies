import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientComponent } from './ingredient.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('IngredientComponent', () => {
  let component: IngredientComponent;
  let fixture: ComponentFixture<IngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientComponent ],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the ingredient', ()=> {
    component.ingredientName = 'garlic';
    const aElement: DebugElement = fixture.debugElement.query(By.css('a'));
    fixture.detectChanges();
    expect(aElement.nativeElement.innerHTML).toBe('garlic');
  });

  it('should have the correct router link', ()=> {
    component.ingredientName = 'garlic';
    const aElement: DebugElement = fixture.debugElement.query(By.css('a'));
    fixture.detectChanges();
    const href = aElement.nativeElement.getAttribute('href');
    expect(href).toBe('/recipes/garlic');
  });
});
