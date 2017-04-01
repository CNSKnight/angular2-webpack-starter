// ```
// recipe-list.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipe-list.component.js may be freely distributed under the MIT license
// ```

// # Recipe List Component

import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { RecipeI } from '../services/recipe.store';

@Component({
  moduleId: (module.id).toString(),
  selector: 'recipe-cards',
  templateUrl: 'recipe-card.html'
})

export class RecipeCardsComponent implements OnInit, OnChanges {
  selectedRecipe: RecipeI; // binder matches inherited property

  // The RecipesComponent hands-off `recipesR` (and `selectedRecipeR`)
  // via property bindings to its child components
  // Here we pick up the `recipesR` collection by annotating our local
  // `recipesR` property with `@Input()`
  @Input() recipesR: RecipeI[];

  // could not get this to work on this comp
  @Input('selectedRecipeR')
  set _selectedRecipe(recipe: RecipeI) {
    this.selectedRecipe = recipe ? recipe : null;
  }

  // Two event outputs for when a recipe is selectUA or deleteUA
  @Output() selectUA = new EventEmitter();
  @Output() deleteUA = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.selectUA.subscribe(this.trapSelected.bind(this));
  }

  ngOnChanges(changed: any) {
  }

  trapSelected(recipe: RecipeI) {
    this.selectedRecipe = recipe;
  }

  isSelected(which: any) {
    return (this.selectedRecipe && which.id == this.selectedRecipe.id);
  }
}
