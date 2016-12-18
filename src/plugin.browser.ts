/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/environment';
import { bootloader } from '@angularclass/hmr';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { PluginModule } from './app'; // ie ./app/index.js

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function plugin(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(PluginModule)
    .then(decorateModuleRef)
    .catch(err => console.error(err));
}

// needed for hmr
// in prod this is replace for document ready
bootloader(plugin);
