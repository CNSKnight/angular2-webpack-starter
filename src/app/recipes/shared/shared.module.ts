/**
 * shared.module.ts (a widget module)
 * Create a SharedModule with the components, directives, and pipes that you
 * use everywhere in your app.
 * This module should consist entirely of declarations, most of them exported.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';
import { TransformMarkdownPipe } from './transform-markdown.pipe';
import { RecipeCardObserver } from './recipeCardObserver.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterializeModule
    ],
    declarations: [
        TransformMarkdownPipe,
        RecipeCardObserver
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterializeModule,
        TransformMarkdownPipe,
        RecipeCardObserver
    ]
})
export class SharedModule { }