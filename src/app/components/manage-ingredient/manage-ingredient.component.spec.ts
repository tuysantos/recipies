import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIngredientComponent } from './manage-ingredient.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


describe('ManageIngredientComponent', () => {
  let component: ManageIngredientComponent;
  let fixture: ComponentFixture<ManageIngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageIngredientComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the add button disabled', ()=>{
    component.ingredient = "";
    const button: DebugElement = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBe(true);
  });

  it('should have the add button enabled', ()=>{
    component.ingredient = "garlic";
    const button: DebugElement = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
    expect(button.nativeElement.disabled).toBe(false);
  });

  it('should emit an event', ()=>{
    component.ingredient = "garlic";
    spyOn(component.addIngredientEvent, 'emit').and.callThrough();
    const button: DebugElement = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
    button.nativeElement.click();
    expect(component.addIngredientEvent.emit).toHaveBeenCalled();
    expect(component.addIngredientEvent.emit).toHaveBeenCalledWith('garlic');
  });
});
