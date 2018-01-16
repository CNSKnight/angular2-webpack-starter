// ```
// recipe-details.component.js
// (c) 2016 Codename: Steeve Knight
// CNSKnight@dharmiWeb.net
// ```

// # Recipe Detail Component
// # Details Plugin Component

import {
  Component,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { RecipesStoreI } from '../services/recipe.store';

import { recipeModel, RecipeI } from '../services/recipe.store';
import { RecipeService } from '../services/recipe.service';

import { cloneDeep, transform, isArray, forOwn } from 'lodash';

// this may show up in future version
// import { MaterializeActions } from 'angular2-materialize/dist/materialize-directive';

interface MaterializeAction {
  action: string;
  params: [any];
}

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
  // @Input() recipesR: Observable<{}>;
  // @Output() recipesR: Observable<{}>;
  selectedRecipeR: Observable<{}>;

  showCards: boolean = false;

  id: number = null;

  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private recipesService: RecipeService, // so that we can loadRecipes below
              private store: Store<RecipesStoreI>) {
    this.rModel = recipeModel;

    this.recipesService = recipesService;

    // Bind to the subscribed `recipesR` ~observable~ behavior subject from the store
    this.recipesR = recipesService.recipesR;
    // this.recipesR = store.select('recipesR');
    this.recipesR.subscribe(r => console.log('recipesR', r));

    // Binds/sets up the unsubscribed `selectedRecipe` observable from the store,
    // for our subcomponent(s)
    this.selectedRecipeR = store.select('selectedRecipeR');

    this.resetRecipe();
    // DEBUG
    console.log(this.selectedRecipeR);
    this.selectedRecipeR.subscribe(v => console.log('selectedRecipeR: ', v));
  }
  // `recipeService.loadRecipes` dispatches the `ADD_RECIPES` event
  // to our store which in turn updates the `recipesS` collection
  ngOnInit() {
    if (!this.recipesService.loadRecipe()) {
      this.recipesService.loadRecipes();
    }
  }

  ngOnChanges(changed: any) {
    this.recipesR.subscribe(r => console.log('recipesR', r));
  }

  toggle(what: string) {
    if (what == 'cards') {
      this.showCards = (this.showCards ? false : true);
    }
  }

  selectRecipe(recipe: RecipeI) {
    this.store.dispatch({
      type: 'SELECT_RECIPE',
      payload: recipe
    });
  }

  deleteRecipe(recipe: RecipeI) {
    this.recipesService.deleteRecipe(recipe);
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
    console.log(emptyRecipe);
    this.store.dispatch({
      type: 'SELECT_RECIPE',
      payload: emptyRecipe
    });
  }

  saveRecipe(recipe: RecipeI) {
    this.recipesService.saveRecipe(recipe);
    this.resetRecipe();
  }

  openModal() {
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }
}
