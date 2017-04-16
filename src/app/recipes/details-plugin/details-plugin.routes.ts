import { DetailsPluginComponent } from '../details-plugin/details-plugin.component';

export const DetailsPluginRoutes: any[] = [
  {
    path: 'recipe-detail',
    component: DetailsPluginComponent,
    // lazy-loaded module might need it's own details-plugin-routing.module
    // loadChildren: './details-plugin.module#DetailsPluginModule'
  }
];
