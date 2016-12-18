// ```
// recipe-preview.component.js
// (c) Codename: Steeve Knight
// ```

// # Recipes Component

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges
} from '@angular/core';

import { RecipeI } from './services/recipe.store';

@Component({
  moduleId: (module.id).toString(),
  selector: 'recipe-preview',
  templateUrl: 'recipe-preview.html',
  // directives: [Rating]
})
export class RecipePreviewComponent implements OnInit, OnChanges {
  @Input() recipe: RecipeI;

  // Allow the user to save/delete a `recipe or cancel the
  // operation. Flow events up from here.
  @Output() saveUA = new EventEmitter();
  @Output() cancelUA = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changed: any) {
  }
}
