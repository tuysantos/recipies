import { Injectable, OnInit } from "@angular/core";
import { Observable, of } from 'rxjs';
import { IIngredient } from '../core/models/interfaces';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root'
})
export class IngredientService {

    constructor(private sessionService: SessionService) { }

    public LoadIngredients(): Observable<IIngredient[]> {
        return of(this.sessionService.getIngredients());
    }

    public addIngredient(ingredient: string): Observable<IIngredient[]> {
        return of(this.sessionService.addIngredient(ingredient));
    }

    public removeAllIngredients(): void {
        this.sessionService.removeAllIngredients();
    }
}
  