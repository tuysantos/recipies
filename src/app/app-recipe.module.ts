import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { IngredientListComponent } from './components/ingredient-list/ingredient-list.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { ManageIngredientComponent } from './components/manage-ingredient/manage-ingredient.component';
import { RefreshDataComponent } from './components/refresh-data/refresh-data.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        RecipeComponent,
        RecipeListComponent,
        PaginationComponent,
        IngredientListComponent,
        IngredientComponent,
        ManageIngredientComponent,
        RefreshDataComponent
      ],
      imports: [
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        CommonModule
      ],
      exports: [AppRoutingModule]
}) 
export class RecipeModule { }  