import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule/*,FormBuilder*/ } from '@angular/forms';

import { RecipeI } from '../services/recipe.store';
import { RecipeService } from '../services/recipe.service';
import { recipesCompositeComps } from './recipes-composite.comps';
// import { RecipeDetailsModule } from '../details/recipe-details.module';
// import { recipesReducer } from './services/recipes.reducer';

// support
import { MaterializeModule } from 'angular2-materialize';
import { TransformMarkdownPipe } from '../shared/transform-markdown.pipe';
console.log('MaterializeModule', MaterializeModule);

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterializeModule
    ],
    declarations: [
        ...recipesCompositeComps,
    TransformMarkdownPipe
    ],
    exports: [...recipesCompositeComps, MaterializeModule],
    providers: [
        // Composite and Plugin independently provide RecipeService
        RecipeService
    ]
})
export class RecipesCompositeModule { }
