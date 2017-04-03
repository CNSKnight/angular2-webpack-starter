import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RecipeDetailsModule } from '../details/recipe-details.module';
import { RecipeService } from '../services/recipe.service';

@NgModule({
    imports: [FormsModule, RecipeDetailsModule],
    exports: [RecipeDetailsModule],
    providers: [RecipeService]
})
export class DetailsPluginModule { }
