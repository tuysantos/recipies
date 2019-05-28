import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { IIngredient } from 'src/app/core/models/interfaces';
import { SorterService } from 'src/app/services/sorter.service';
import { IngredientService } from 'src/app/services/ingredient.service';


@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss']
})
export class IngredientListComponent implements OnInit {
  private subscription: Subscription;
  ingredients: IIngredient[] = [];
  activeIngredientLists: IIngredient[] = [];
  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private ingredientService: IngredientService, private sorterService: SorterService) { }

  ngOnInit() {
    this.subscription = this.ingredientService.LoadIngredients().subscribe((data: IIngredient[]) => {
      this.ingredients = data;
      this.totalRecords = this.ingredients.length;
      this.buildActiveList(0);
    });
  }

  addNewIngredient(ingredient: string): void {
    if(ingredient.length > 0) {
      this.ingredientService.addIngredient(ingredient)
          .pipe(take(1))
          .subscribe((data: IIngredient[]) => {
            this.ingredients = data;
            this.totalRecords = this.ingredients.length;
            this.buildActiveList(0);
          });
    }
  }

  pageChanged(page: number) {
    this.nextPreviousPage(page);
  }

  nextPreviousPage(id: number) {
    let page = (id - 1) * this.pageSize;
    this.buildActiveList(page);
  }

  buildActiveList(start: number) {
    this.activeIngredientLists = [];
    const max = this.pageSize;
    let counter = 0;
    this.sortItems(this.ingredients, 'ingredientName');
    for(var i=start; i< this.ingredients.length; i++){
      if(counter < max) {
        this.activeIngredientLists[this.activeIngredientLists.length] = this.ingredients[i];
      }
      counter++;
    }
  }

  sortItems(items: any[], property: string): void {
    this.sorterService.sort(items, property);
  }

  trackByFn(index, item) {
    return index;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
