import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IRecipe } from 'src/app/core/models/interfaces';
import { RecipeService } from 'src/app/services/recipe.service';
import { SessionService } from 'src/app/services/session.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes$: Observable<IRecipe[]>;
  totalRecords: number = 0;
  pageSize: number = 10;
  searchriteria: string = "";
  totalRecipes: number = 0;
  skip: number = 1;
  isDisabled: boolean = false;
  myTimer: any;

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService, private sessionService: SessionService) { }

  ngOnInit() {
    //let obj = document.getElementById('rowFooter');
    //obj.style.display = 'none';
    document.querySelector('div[id=rowFooter]').setAttribute("style", "display:none");
    this.searchriteria = this.route.snapshot.paramMap.get('id');
    let page = this.sessionService.getVisited(this.searchriteria);
    this.recipes$ = this.recipeService.getRecipes(this.searchriteria, page).pipe(map(items => items.sort(this.sortByName)));
    this.recipes$.subscribe( (items: IRecipe[])=> {
      if(items.length > 0){
        this.startTimer();
        this.totalRecords = items.length;
      }
    });
  }

  sortByName(a: IRecipe, b: IRecipe): number {
    if (a.title < b.title)
      return -1;
    if (a.title > b.title)
      return 1;
    return 0;
  }

  startTimer() {
    document.querySelector('div[id=rowFooter]').setAttribute("style", "display:none");
    document.querySelector('button[id=btnRefresh2]').setAttribute("style", "display:");
    this.myTimer = setTimeout(this.timerFunc, 10000);
  }

  timerFunc() {
    document.querySelector('div[id=rowFooter]').setAttribute("style", "display:");
    document.querySelector('button[id=btnRefresh2]').setAttribute("style", "display:none");
  }

  goBack(): void {
    clearTimeout(this.myTimer);
    this.router.navigate(['/ingredients']);
  }

  manualRefresh(reload: boolean): void {
    clearTimeout(this.myTimer);
    if(reload){
      this.refreshData(reload);
    }
  }

  refreshData(reload: boolean): void {
    document.querySelector('div[id=rowFooter]').setAttribute("style", "display:none");
    document.querySelector('button[id=btnRefresh2]').setAttribute("style", "display:");

    if(reload){
      let page = this.sessionService.addVisited(this.searchriteria);
      this.recipes$ = this.recipeService.getRecipes(this.searchriteria, page).pipe(map(items => items.sort(this.sortByName)));
    }
    this.startTimer();
  }

  pageChanged(page: number) {
    //TODO: NO TIME TO IMPLMENT PAGINATION
  }
}
