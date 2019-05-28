import { Injectable } from "@angular/core";
import { IIngredient, IItemVisited } from '../core/models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private storedIngredients = 'INGREDIENTS';
    private IngredientsVisited = 'INGREDIENTS_VISITED';
    constructor () {}

    public getIngredients(): IIngredient[] {
        let temp = sessionStorage.getItem(this.storedIngredients);
        return temp ? (JSON.parse(temp)) as IIngredient[] : this.getDefaultIngredients();
    }

    public addIngredient(ingredient: string): IIngredient[] {
        let tempIngredients: IIngredient[];
        tempIngredients = this.getIngredients();
        if(!this.isDuplicate(ingredient, tempIngredients)){
            tempIngredients.push({ingredientName:ingredient});
            sessionStorage.setItem(this.storedIngredients, JSON.stringify(tempIngredients));
        }
        return tempIngredients;
    }

    public removeAllIngredients(): void {
        sessionStorage.removeItem(this.storedIngredients);
    }

    public addVisited(ingredient: string): number {
        let result = 1;
        let temp = JSON.parse(sessionStorage.getItem(this.IngredientsVisited));
        if(temp) {
            let ffound = false;
            for(let x=0; x < temp.length; x++) {
                if(temp[x].item === ingredient) {
                    temp[x].value++;
                    result = temp[x].value;
                    ffound = true;
                    break;
                }
            }
            if(!ffound) {
                temp[temp.length] = {item: ingredient, value: 1}
            }
            sessionStorage.setItem(this.IngredientsVisited, JSON.stringify(temp));
        }
        else {
            this.setDefaultItem(ingredient);
        }
        return result;
    }

    public getVisited(ingredient: string): number {
        let result = 1;
        let temp = JSON.parse(sessionStorage.getItem(this.IngredientsVisited));
        if(temp){
            let ffound = false;
            for(let x=0; x < temp.length; x++) {
                if(temp[x].item === ingredient) {
                    result = temp[x].value;
                    ffound = true;
                    break;
                }
            }
        }
        else {
            this.setDefaultItem(ingredient);
        }
        return result;
    }

    private setDefaultItem(ingredient: string): void {
        let visited :IItemVisited[] = [];
        visited[visited.length] = {item: ingredient, value: 1}
        sessionStorage.setItem(this.IngredientsVisited, JSON.stringify(visited));
    }

    private getDefaultIngredients(): IIngredient[] {
        let temp = [
            {ingredientName: 'beef'},
            {ingredientName: 'garlic'},  
            {ingredientName: 'orzo'}, 
            {ingredientName: 'salt'}, 
            {ingredientName: 'chicken'}, 
            {ingredientName: 'onions'}, 
            {ingredientName: 'salmon'}, 
            {ingredientName: 'carrot'}, 
            {ingredientName: 'tomato'}, 
            {ingredientName: 'olive'}];

        sessionStorage.setItem(this.storedIngredients, JSON.stringify(temp));
        return temp;
    }

    private isDuplicate(ingredient: string, items: IIngredient[]): boolean {
        let ffound: boolean = false;
        for(let i=0; i< items.length; i++){
            if (items[i].ingredientName.toLowerCase() === ingredient.toLowerCase()){
                ffound = true;
                break;
            }
        }
        return ffound;
    }
}

  