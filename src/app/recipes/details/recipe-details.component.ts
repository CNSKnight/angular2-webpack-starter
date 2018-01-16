// ``` # Recipe Details Component recipe-details.component.js (c) 2016 Codename:
// Steeve Knight ```

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  AfterViewChecked
} from '@angular/core';

import { recipeModel, RecipeI } from '../services/recipe.store';
// import { AppStore } from '../app/services/app.store';

import { isEmpty, clone, cloneDeep, padStart, isObject } from 'lodash';

import { MaterializeAction } from 'angular2-materialize';

declare var Materialize: {
  updateTextFields: Function;
};

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-details.html',
  // directives: [Rating]
})
export class RecipeDetailsComponent
  implements OnInit, OnChanges, AfterViewChecked {
  selectedRecipeR: RecipeI;
  rModel: RecipeI;
  originalTitle: string;
  recipe: RecipeI;
  test: RecipeI;

  // Assign our `recipe` to a locally scoped property Perform additional logic on
  // every update via ES6 setter Create a copy of `_recipe` and assign it to
  // `this.selectedRecipe` to which we will use to bind our form recipe is bound
  // in the parent template as recipe from its selectedRecipeR
  @Input('recipe')
  set _recipe(recipe: RecipeI) {
    this.originalTitle = (recipe && recipe.title) || 'New Recipe';
    this.recipe = Object.assign(cloneDeep(this.rModel), recipe || {});
  }

  @Input() modalActions;

  // Allow the user to save/delete a `recipe or cancel the operation. Flow events
  // up from here.
  @Output() saveUA = new EventEmitter();
  @Output() cancelUA = new EventEmitter();

  constructor() {
    this.rModel = recipeModel;
    // this.title = new Control('', Validators.required); this.rdform =
    // builder.group({   title: this.title });
  }

  ngOnInit() {
    // this.rdForm = this.builder.group({   title: [],   ingredient:
    // this.builder.group({     qty: [],     unit: [],     name: []   }) });
  }

  ngOnChanges(changed: any) {
    // placeholder
  }

  ngAfterViewChecked() {
    Materialize &&
      Materialize.updateTextFields &&
      Materialize.updateTextFields();
  }

  // get textarea ID
  getTAID(id: number, idx: number) {
    let label = id !== undefined ? id : 'newID';
    let count = idx + 1;
    return label.toString().concat('-rTA-', count.toString());
  }

  getTALabel(idx: number) {
    return 'Step #'.concat(padStart((idx + 1).toString(), 2, '0'));
  }

  // pushes an empty ingredient placeholder object onto the ingredients array on selectedRecipe
  newIngredient() {
    if (!this.recipe.ingredients) {
      this.recipe.ingredients = [];
    }
    this.recipe.ingredients.push(clone(this.rModel.ingredients[0]));
  }

  // pushes a new method placeholder object onto the method array on the selectedRecipe
  newMethod() {
    if (!this.recipe.method) {
      this.recipe.method = [];
    }
    let method = clone(this.rModel.method[0]);
    method.step = this.recipe.method.length + 1;
    this.recipe.method.push(method);
  }

  // pushes a new tag placeholder object onto the tags array on the selectedRecipe
  newTag() {
    if (!this.recipe.tags) {
      this.recipe.tags = [];
    }
    let tag = clone(this.rModel.tags[0]);
    tag.priority = this.recipe.tags.length;
    this.recipe.tags.push(tag);
  }

  // pushes a new variation placeholder object onto the variations array on the selectedRecipe
  newVariation() {
    if (!this.recipe.variations) {
      this.recipe.variations = [];
    }
    let variation = clone(this.rModel.variations[0]);
    this.recipe.variations.push(variation);
  }

  deleteIngredient(idx: number) {
    this.recipe.ingredients.splice(idx, 1);
  }

  deleteMethod(index: number) {
    this.recipe.method.splice(index, 1);
    this.recipe.method.forEach((item, idx) => {
      item.step = idx + 1;
    });
  }

  deleteTag(idx: number) {
    this.recipe.tags.splice(idx, 1);
  }

  deleteVariation(idx: number) {
    this.recipe.variations.splice(idx, 1);
  }

  orderIngredients() {
    // @todo
  }

  orderSteps() {
    // @todo
  }

  orderTags() {
    // @todo
  }

  onChangeRate(value: number) {
    // Set the value of the selectUA recipe's rating to the value passed up from the
    // `rating` component
    this.recipe.rating = value;
  }

  /*
  * @todo remove empty or blacklisted tags or blacklisted chars
  */
  onSubmit(
    recipe: RecipeI,
    next: {
      emit: Function;
    }
  ) {
    // final filters return empty []'s rather than null|undefined,
    // in order to re-init property in document. ie not passing eg tags: [],
    // will just set tags: [{}] in collection document
    recipe.tags = this.filterStrAry(recipe.tags);
    recipe.ingredients = this.filterIngredients(recipe.ingredients);
    recipe.method = this.filterStrAry(recipe.method);
    recipe.variations = this.filterStrAry(recipe.variations);
    recipe.notes = recipe.notes && recipe.notes.trim();

    if (next && next.emit) {
      next.emit(recipe);
    }
  }

  openModal() {
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }

  closeModal() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }

  private filterIngredients(ingredients) {
    if (!ingredients || !ingredients.length) {
      return [];
    }

    let valids = ingredients.filter((ing, idx, ary) => {
      if (isEmpty(ing)) {
        return false;
      }
      return (
        ing.qty.trim().length ||
        ing.unit.trim().length ||
        ing.name.trim().length
      );
    });
    return valids;
  }

  private filterStrAry(ary) {
    if (!ary || !ary.length) {
      return [];
    }

    let valids = ary.filter((item, idx, orig) => {
      if (isEmpty(item)) {
        return false;
      }
      if (isObject(item)) {
        return item.text.trim().length;
      } else {
        return item.trim().length;
      }
    });
    return valids;
  }
}
