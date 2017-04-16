/*
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'plugin',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./plugin.component.css'],
  template: '<router-outlet></router-outlet>'
})
export class PluginComponent implements OnInit {
  name = 'Recipe Details Plugin';

  constructor() {}

  public ngOnInit() {}
}
