import { RecipesCompositeComponent } from './recipes-composite.component';
import { RecipeListComponent } from '../listing/recipe-list.component';
import { RecipeCardsComponent } from '../cards/recipe-cards.component';
import { recipeDetailsComps } from '../details/recipe-details.comps'; // includes details, preview, ?:rating

export const recipesCompositeComps = [
        RecipesCompositeComponent,
        RecipeListComponent,
        RecipeCardsComponent,
        ...recipeDetailsComps,
];
