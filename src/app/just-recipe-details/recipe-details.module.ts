import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder } from '@angular/forms';

// support
import { MaterializeModule } from 'angular2-materialize';

import { RecipeI } from './services/recipe.store';
import { RecipeService } from './services/recipe.service';
import { recipesComps } from './recipes.comps';
// import { recipesReducer } from './services/recipes.reducer';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterializeModule
    ],
    declarations: [
        ...recipesComps
    ],
    exports: [...recipesComps, MaterializeModule],
    providers: [
        RecipeService,
        FormBuilder
    ]
})

export class RecipeDetailsModule { }
