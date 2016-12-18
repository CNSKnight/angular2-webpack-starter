import { Routes, RouterModule } from '@angular/router';

import { DataResolver } from './app.resolver';

import { RecipesComponent } from './just-recipe-details/recipes.component';
import { RecipesRoutes } from './just-recipe-details/recipes.routes';

export const ROUTES: Routes = [
  { path: '',      component: RecipesComponent },
  ...RecipesRoutes
];
