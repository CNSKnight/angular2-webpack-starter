// ``` recipe-preview.component.js (c) Codename: Steeve Knight ``` # Recipes
// Component

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges
} from '@angular/core';

import { RecipeI } from '../services/recipe.store';

// for the preview require("imports?$=jquery!materialize-css/js/velocity.min");
interface Window {
  jQuery: Function;
  $: Function;
}
declare var window: Window;
declare var $: any;

@Component({
  selector: 'recipe-preview',
  templateUrl: './recipe-preview.html',
  // directives: [Rating]
})
export class RecipePreviewComponent implements OnInit, OnChanges {
  @Input() recipe: RecipeI;

  // Allow the user to save/delete a `recipe or cancel the operation. Flow events
  // up from here.
  @Output() saveUA = new EventEmitter();
  @Output() cancelUA = new EventEmitter();
  constructor() {}

  ngOnInit() {
    // hacks window.$ = window.jQuery; let $modal = window.$('.modal');
    // $modal.length && $modal.modal();
  }

  ngOnChanges(changed: any) {
    // placeholder
  }

  getUpdated() {
    let recipe = this.recipe;
    let pd =
      (recipe.publishedDate || recipe.creationDate) &&
      new Date(recipe.publishedDate || recipe.creationDate);
    let ud = pd && recipe.updatedDate && new Date(recipe.updatedDate);
    if (
      ud &&
      ud > new Date(pd.getFullYear(), pd.getMonth(), pd.getDate() + 3)
    ) {
      return ud;
    }
  }
}
