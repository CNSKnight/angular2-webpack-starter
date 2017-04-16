import { Routes } from '@angular/router';

import { DetailsPluginComponent } from './recipes/details-plugin/details-plugin.component';

export const ROUTES: Routes = [
  { path: '',      component: DetailsPluginComponent }
  // won't be needing this here in the plugin
  // ...DetailsPluginRoutes
];
