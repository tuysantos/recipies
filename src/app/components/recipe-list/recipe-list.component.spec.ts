import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { RecipeListComponent } from './recipe-list.component';
import { RecipeComponent } from '../recipe/recipe.component';
import { PaginationComponent } from '../pagination/pagination.component';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeListComponent, RecipeComponent, PaginationComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh and hid the div & show top refresh button', ()=>{
    const button: DebugElement = fixture.debugElement.query(By.css('button[id=btnRefresh2]'));
    fixture.detectChanges();
    button.nativeElement.click();
    const div: DebugElement = fixture.debugElement.query(By.css('div[id=rowFooter]'));
    let styleText = div.nativeElement.getAttribute("style");
    expect(styleText).toEqual('display:none');
  });

  it('should display refresh div & hide top refresh button', fakeAsync(()=>{
    component.startTimer();
    tick(10000);
    fixture.detectChanges();
    const div: DebugElement = fixture.debugElement.query(By.css('div[id=rowFooter]'));
    let styleText = div.nativeElement.getAttribute("style");
    expect(styleText).toEqual('display:');
  }));
});
