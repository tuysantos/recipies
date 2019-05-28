import { Injectable } from "@angular/core";
import { IRecipe } from '../core/models/interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError, share } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    recipe: IRecipe = {title: '', ingredients: '', href: '', thumbnail: ''};
    recipes: IRecipe[] = [];

    constructor(private http: HttpClient){}

    getRecipes(ingredient: string, skip: number): Observable<IRecipe[]> {
        return this.http.get<IRecipe[]>(`${environment.apiEndPoint}/?i=${ingredient}&p=${skip}`)
                    .pipe(
                        map( (items: any) => {
                            return items.results;
                        }),
                        catchError(this.handleError)
                    ).pipe(share());
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error); 
        if (error.error instanceof Error) {
          let errMessage = error.error.message;
          return Observable.throw(errMessage);
        }
        return Observable.throw(error);
    }

}
  