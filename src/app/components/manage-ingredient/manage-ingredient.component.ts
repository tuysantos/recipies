import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-manage-ingredient',
  templateUrl: './manage-ingredient.component.html',
  styleUrls: ['./manage-ingredient.component.scss']
})
export class ManageIngredientComponent implements OnInit {

  @Output() addIngredientEvent: EventEmitter<string> = new EventEmitter<string>();
  ingredient: string = "";
  constructor() { }

  ngOnInit() {
  }

  addIngredient(): void {
    if(this.ingredient.trim().length > 0) {
      this.addIngredientEvent.emit(this.ingredient);
    }
    this.ingredient = "";
  }

}
