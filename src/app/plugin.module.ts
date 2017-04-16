import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules } from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './plugin.routes';
// Plugin is our top level component (eg App)
import { PluginComponent } from './plugin.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

// support
import { MaterializeModule } from 'angular2-materialize';

import { StoreModule } from '@ngrx/store';

import { recipesReducer } from './recipes/services/recipes.reducer';
import { selectedRecipeReducer } from './recipes/services/selected-recipe.reducer';

import { DetailsPluginModule } from './recipes/details-plugin/details-plugin.module';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `App/PluginModule` is the main/plugin entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [PluginComponent],
  declarations: [PluginComponent],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    }),
    StoreModule.provideStore({
      recipesR: recipesReducer,
      selectedRecipeR: selectedRecipeReducer
    }),
    MaterializeModule,
    DetailsPluginModule
  ],
  exports: [MaterializeModule],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS
//    APP_PROVIDERS
  ]
})
export class PluginModule {
  constructor() { }

};
