/**
 * Angular bootstrapping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/environment';
import { hmrModule  } from '@angularclass/hmr';

/**
 * App Module
 * our top level module that holds all of our components
 */
import { PluginModule } from './app'; // ie ./app/index.js

/**
 * Bootstrap our Angular app with a top level NgModule
 */
export function plugin(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(PluginModule)
    .then(decorateModuleRef)
    .then((ngModuleRef: any) => {
      // `module` global ref for webpackhmr
      // Don't run this in Prod
      return hmrModule(ngModuleRef, module);
    })
    .catch((err) => console.error(err));
}

/**
 * Needed for hmr
 * in prod this is replace for document ready
 */
switch (document.readyState) {
  case 'loading':
    document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
    break;
  case 'interactive':
  case 'complete':
  default:
    plugin();
}

function _domReadyHandler() {
 document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
 plugin();
}
