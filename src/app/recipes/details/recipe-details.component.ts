// ```
// # Recipe Details Component
// recipe-details.component.js
// (c) 2016 Codename: Steeve Knight
// ```

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

import { padStart, cloneDeep, clone } from 'lodash';

import {MaterializeAction} from 'angular2-materialize';

declare var Materialize: { updateTextFields: Function };

@Component({
  moduleId: (module.id).toString(),
  selector: 'recipe-detail',
  templateUrl: 'recipe-details.html',
  // directives: [Rating]
})
export class RecipeDetailsComponent implements OnInit, OnChanges, AfterViewChecked {
  selectedRecipeR: RecipeI;
  rModel: RecipeI;
  originalTitle: string;
  recipe: RecipeI;
  test: RecipeI;

  // Assign our `recipe` to a locally scoped property
  // Perform additional logic on every update via ES6 setter
  // Create a copy of `_recipe` and assign it to `this.selectedRecipe`
  // to which we will use to bind our form
  // recipe is bound in the parent template as recipe from its selectedRecipeR
  @Input('recipe')
  set _recipe(recipe: RecipeI) {
    this.originalTitle = (recipe && recipe.title) || 'New Recipe';
    this.recipe = Object.assign(cloneDeep(this.rModel), recipe || {});
  }

  @Input() modalActions;
  
  // Allow the user to save/delete a `recipe or cancel the
  // operation. Flow events up from here.
  @Output() saveUA = new EventEmitter();
  @Output() cancelUA = new EventEmitter();

  constructor() {
    this.rModel = recipeModel;
    // this.title = new Control('', Validators.required);
    // this.rdform = builder.group({
    //   title: this.title
    // });
  }

  ngOnInit() {
    // this.rdForm = this.builder.group({
    //   title: [],
    //   ingredient: this.builder.group({
    //     qty: [],
    //     unit: [],
    //     name: []
    //   })
    // });

  }

  ngOnChanges(changed: any) {
  }

  ngAfterViewChecked() {
    Materialize && Materialize.updateTextFields && Materialize.updateTextFields();
  }

  // get textarea ID
  getTAID(id: number, idx: number) {
    let label = (id !== undefined ? id : 'newID');
    let count = (idx + 1);
    return label.toString().concat('-rTA-', count.toString());
  }

  getTALabel(idx: number) {
    return 'Step #'.concat(padStart((idx + 1).toString(), 2, '0'));
  }

  // Whenever the user needs to add a new `ingredient`, push an
  // empty `ingredient` object to the `ingredient` array on the
  // `selectedRecipe`
  newIngredient() {
    // Check to see if the `ingredients` array exists before
    // attempting to push an `ingredient` to it
    if (!this.recipe.ingredients)
      this.recipe.ingredients = [];

    this.recipe.ingredients.push(clone(this.rModel.ingredients[0]));
  }

  // Whenever the user needs to add a new `method`, push an
  // empty `method` object to the `method` array on the
  // `selectedRecipe`
  newMethod() {
    // Check to see if the `method` array exists before
    // attempting to push a `method` to it
    if (!this.recipe.method)
      this.recipe.method = [];
    let method = clone(this.rModel.method[0]);
    method.step = this.recipe.method.length + 1;
    this.recipe.method.push(method);
  }

  // Whenever the user needs to add a new `tag`, push an
  // empty `tag` object onto the `tags` array on the
  // `selectedRecipe`
  newTag() {
    // Check to see if the `tags` array exists before
    // attempting to push a `tag` to it
    this.recipe.tags || (this.recipe.tags = []);
    let tag = clone(this.rModel.tags[0]);
    tag.priority = this.recipe.tags.length;
    this.recipe.tags.push(tag);
  }

  deleteTag(idx: number) {
    this.recipe.tags.splice(idx, 1);
  }

  deleteIngredient(idx: number) {
    this.recipe.ingredients.splice(idx, 1);
  }

  deleteMethod(idx: number) {
    this.recipe.method.splice(idx, 1);
    this.recipe.method.forEach((item, idx) => {
      item.step = idx+1;
    });
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
    // Set the value of the selectUA recipe's rating to the
    // value passed up from the `rating` component
    this.recipe.rating = value;
  }

  /*
  * @todo remove empty or blacklisted tags or blacklisted chars
  */
  onSubmit(recipe: RecipeI, next: { emit: Function }) {
    // validate submitted tags
    if (recipe.tags && recipe.tags.length) {
      let fTags = recipe.tags.filter((tag, idx, ary) => {
        return !!tag.text.trim().length;
      });

      recipe.tags = fTags;
    }

    next && next.emit && next.emit(recipe);
  }

  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
}
