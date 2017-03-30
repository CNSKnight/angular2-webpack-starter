import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder } from '@angular/forms';

// support
import { MaterializeModule } from 'angular2-materialize';

import { RecipeI } from './services/recipe.store';
// import { RecipeService } from './services/recipe.service';
import { RecipeService } from './services/recipe.service-preAuth';
import { recipesComps } from './recipes.comps';
// import { recipesReducer } from './services/recipes.reducer';

import { RecipeCardObserver } from './recipeCardObserver.directive';
import { transformMarkdownPipe } from './transform-markdown.pipe';

@NgModule({
    imports: [
        CommonModule, FormsModule, MaterializeModule
    ],
    declarations: [
        ...recipesComps,
        RecipeCardObserver,
        transformMarkdownPipe
    ],
    exports: [
        ...recipesComps,
        MaterializeModule
    ],
    providers: [RecipeService, FormBuilder]
})

export class RecipeDetailsModule { }