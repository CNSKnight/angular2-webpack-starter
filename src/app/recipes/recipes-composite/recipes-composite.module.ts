import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RecipeI } from '../services/recipe.store';
import { RecipeService } from '../services/recipe.service';
import { recipesCompositeComps } from './recipes-composite.comps';
import { DetailsPluginModule } from '../details-plugin/details-plugin.module';
// import { recipesReducer } from './services/recipes.reducer'; support
// console.log('MaterializeModule', MaterializeModule);

@NgModule({
    imports: [SharedModule, DetailsPluginModule],
    declarations: [...recipesCompositeComps],
    // Composite and Plugin independently provide RecipeService,
    exports: [],
    providers: [RecipeService]
})
export class RecipesCompositeModule { }

// If ExComponent was not in the declarations and we used it in a view template,
// Angular would throw the following error:
// Template parse errors: 'ex-component' is not a known element
