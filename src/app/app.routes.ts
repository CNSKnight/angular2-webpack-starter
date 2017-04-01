import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

import { RecipesCompositeRoutes } from './recipes/recipes-composite/recipes-composite.routes';
import { DetailsPluginRoutes } from './recipes/details-plugin/details-plugin.routes';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule' },
  { path: 'barrel', loadChildren: './+barrel#BarrelModule' },
  ...RecipesCompositeRoutes,
  ...DetailsPluginRoutes,
  { path: '**', component: NoContentComponent },
];
