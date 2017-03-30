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

import { MaterializeAction } from 'angular2-materialize';

import { recipeModel, RecipeI, RecipesStoreI } from './services/recipe.store';
//import { RecipeService } from './services/recipe.service';
import { RecipeService } from './services/recipe.service-preAuth';

import { cloneDeep, transform, isArray, forOwn } from 'lodash';

@Component({
  moduleId: (module.id).toString(),
  selector: 'recipes',
  templateUrl: 'recipes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['shared/recipes.component.css'],
  encapsulation: ViewEncapsulation.None
})
// snippets:
// https://marketplace.visualstudio.com/items?itemName=johnpapa.@angular
export class RecipesComponent implements OnInit,
  OnChanges {
  rModel: RecipeI;
  recipesR: Observable<{}>;
  // @Input() recipesR: Observable<{}>; @Output() recipesR: Observable<{}>;
  selectedRecipeR: Observable<{}>;

  showCards: boolean = false;

  // child comps will use this as well
  modalActions = new EventEmitter<string | MaterializeAction>();

  id: number = null;

  constructor(private recipesService: RecipeService, // so that we can loadRecipes below
    private store: Store<RecipesStoreI>) {
    this.rModel = recipeModel;

    this.recipesService = recipesService;

    // Bind to the subscribed `recipesR` ~observable~ behavior subject from the
    // store
    this.recipesR = recipesService.recipesR;
    this
      .recipesR
      .subscribe(() => { }, this.onServiceError);

    // Binds/sets up the unsubscribed `selectedRecipe` observable from the store,
    // for our subcomponent(s)
    this.selectedRecipeR = store.select('selectedRecipeR');

    this.resetRecipe();
    // this.selectedRecipeR.subscribe(v => console.log('selectedRecipeR: ', v));
    // this.selectedRecipeR.subscribe(this.selectRecipe.bind(this));
  }

  // `recipeService.loadRecipes` dispatches the `ADD_RECIPES` event to our store
  // which in turn updates the `recipesS` collection
  ngOnInit() {
    let subscribable = this
      .recipesService
      .loadRecipe();
    if (!subscribable) {
      // this.recipesService.loadRecipes();
    }
  }

  ngOnChanges(changed: any) { }

  onServiceError(errorMsg: String) {
    console.log(errorMsg);
  }

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

  saveRecipe(recipe: RecipeI) {
    this
      .recipesService
      .saveRecipe(recipe);
    // this.resetRecipe();
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
