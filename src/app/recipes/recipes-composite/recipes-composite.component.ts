// ``` recipe-details.component.js (c) 2016 Codename: Steeve Knight
// CNSKnight@dharmiWeb.net ``` # Recipe Detail Component

import {
  Component,
  EventEmitter,
  OnInit,
  OnChanges,
  Output,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { recipeModel, RecipeI, RecipesStoreI } from '../services/recipe.store';
import { RecipeService } from '../services/recipe.service';
import { DetailsPluginComponent } from '../details-plugin/details-plugin.component';

import { cloneDeep, isArray, forOwn } from 'lodash';

@Component({
  moduleId: (module.id).toString(),
  selector: 'recipes',
  templateUrl: 'recipes-composite.html'
})
// snippets:
// https://marketplace.visualstudio.com/items?itemName=johnpapa.@angular
export class RecipesCompositeComponent extends DetailsPluginComponent implements OnInit, OnChanges {
  showCards: boolean = false;
  id: number = null;
  constructor(protected recipesService: RecipeService, protected store: Store<RecipesStoreI>) {
    super(recipesService, store);
    this.resetRecipe();
    // this.selectedRecipeR.subscribe(v => console.log('selectedRecipeR: ', v));
    // this.selectedRecipeR.subscribe(this.selectRecipe.bind(this));
  }

  // `recipeService.loadRecipes` dispatches the `ADD_RECIPES` event to our store
  // which in turn updates the `recipesS` collection
  ngOnInit() {
    this.recipesService.loadRecipes();
  }

  ngOnChanges(changed: any) { }

  toggle(what: string) {
    if (what == 'cards') {
      this.showCards = (this.showCards
        ? false
        : true);
    }
  }

  selectRecipe(recipe: RecipeI) {
    this
      .store
      .dispatch({ type: 'SELECT_RECIPE', payload: recipe });
  }

  deleteRecipe(recipe: RecipeI) {
    this
      .recipesService
      .deleteRecipe(recipe);
  }

  resetRecipe() {
    // clone the model and empty the Arrays
    let emptyRecipe = cloneDeep(this.rModel);
    // emptyRecipe = transform(emptyRecipe, (accum, val, idx) => {     accum[idx] =
    // isArray(val) ? [] : val;   });

    forOwn(emptyRecipe, (val: any, idx: any) => {
      val = isArray(val)
        ? []
        : val;
    });

    this
      .store
      .dispatch({ type: 'SELECT_RECIPE', payload: emptyRecipe });
  }
}
