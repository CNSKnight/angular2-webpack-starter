import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule/*,FormBuilder*/ } from '@angular/forms';

// support
import { MaterializeModule } from 'angular2-materialize';

import { RecipeI } from '../services/recipe.store';
// import { RecipeService } from './services/recipe.service';
import { recipeDetailsComps } from './recipe-details.comps';
// import { recipesReducer } from './services/recipes.reducer';

import { RecipeCardObserver } from '../cards/recipeCardObserver.directive';
import { TransformMarkdownPipe } from '../shared/transform-markdown.pipe';

/**
 * binds together RecipeDetailsComponent and RecipePreviewComponent
 * via DetailsPluginComponent
 */
@NgModule({
    imports: [
        CommonModule, FormsModule, MaterializeModule
    ],
    declarations: [
        ...recipeDetailsComps,
        RecipeCardObserver,
        TransformMarkdownPipe
    ],
    exports: [
        ...recipeDetailsComps,
        MaterializeModule
    ],
    providers: [/*FormBuilder*/]
})

export class RecipeDetailsModule { }


/*
Type RecipeDetailsComponent is part of the declarations of 2 modules:
DetailsPluginModule and RecipesCompositeModule!

Please consider moving RecipeDetailsComponent to a higher module that imports
DetailsPluginModule and RecipesCompositeModule.

You can also create a new NgModule that exports and includes RecipeDetailsComponent
then import that NgModule in DetailsPluginModule and RecipesCompositeModule
*/
