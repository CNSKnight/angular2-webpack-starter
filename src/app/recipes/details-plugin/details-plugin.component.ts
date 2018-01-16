// ```
// details-plugin.component.js
// (c) 2016 Codename: Steeve Knight
// CNSKnight@dharmiWeb.net
// ```

// # (Recipe) Details Plugin Component
// a a base comp focused on providing to recipe-details, and recipe-preview
// will be extended by recipes-composite

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

import { MaterializeAction } from 'angular2-materialize';

import { recipeModel, RecipeI, RecipesStoreI } from '../services/recipe.store';
import { RecipeService } from '../services/recipe.service';

import { cloneDeep, transform, isArray, forOwn } from 'lodash';

@Component({
  selector: 'details-plugin',
  templateUrl: './details-plugin.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../shared/recipes.component.css'],
  encapsulation: ViewEncapsulation.None
})
// snippets: https://marketplace.visualstudio.com/items?itemName=johnpapa.@angular
export class DetailsPluginComponent implements OnInit, OnChanges {
  rModel: RecipeI;
  recipesR: Observable<{}>;
  selectedRecipeR: Observable<{}>;
  // child comps will use this as well
  modalActions = new EventEmitter<string | MaterializeAction>();
  id: number = null;
  constructor(protected recipesService: RecipeService, protected store: Store<RecipesStoreI>) {
    this.rModel = recipeModel;

    this.recipesService = recipesService;

    // Bind to the subscribed `recipesR` ~observable~ behavior subject from the store
    this.recipesR = recipesService.recipesR;
    // this.recipesR.subscribe(() => { }, this.onServiceError);

    // Binds/sets up the unsubscribed `selectedRecipe` observable from the store,
    // for our subcomponent(s)
    this.selectedRecipeR = store.select('selectedRecipeR');

    this.resetRecipe();
  }

  // `recipeService.loadRecipes` dispatches the `ADD_RECIPES` event
  // to our store which in turn updates the `recipesS` collection
  ngOnInit() {
    this.recipesService.loadRecipe();
  }

  ngOnChanges(changed: any) {
    // placeholder
  }

  onServiceError(errorMsg: String) {
    console.log(errorMsg);
  }

  saveRecipe(recipe: RecipeI) {
    this.recipesService.saveRecipe(recipe);
    // this.resetRecipe();
  }
  resetRecipe() {
    // clone the model and empty the Arrays
    let emptyRecipe = cloneDeep(this.rModel);
    // emptyRecipe = transform(emptyRecipe, (accum, val, idx) => {
    //     accum[idx] = isArray(val) ? [] : val;
    //   });

    forOwn(emptyRecipe, (val: any, idx: any) => {
      val = isArray(val) ? [] : val;
    });

    this.store.dispatch({
      type: 'SELECT_RECIPE',
      payload: emptyRecipe
    });
  }
}
