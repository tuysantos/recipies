import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeComponent implements OnInit {

  @Input() title: string = "";
  @Input() ingredients: string = "";
  @Input() href: string = "";
  @Input() thumbnail: string = "";

  constructor() { }

  ngOnInit() {
  }

}
