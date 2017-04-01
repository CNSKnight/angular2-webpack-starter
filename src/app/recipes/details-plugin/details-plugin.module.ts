import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RecipeDetailsModule } from '../details/recipe-details.module';
import { RecipeService } from '../services/recipe.service';
import { TransformMarkdownPipe } from '../shared/transform-markdown.pipe';

@NgModule({
    imports: [FormsModule, RecipeDetailsModule],
    exports: [RecipeDetailsModule],
    declarations: [TransformMarkdownPipe],
    providers: [RecipeService]
})
export class DetailsPluginModule { }
