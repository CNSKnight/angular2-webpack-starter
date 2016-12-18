// ng2 decorators and services
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

// Plugin Top Level Component
@Component({
  selector: 'plugin',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './plugin.component.css'
  ],
  template: '<router-outlet></router-outlet>'
})
export class PluginComponent {
  name = 'Recipe Details Plugin';

  constructor(
    public appState: AppState) {
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
