import Rx from 'rx-dom';
import { Directive, ElementRef, OnInit, DoCheck } from '@angular/core';
// import { Observable } from 'rxjs/Observable'; import { DOCUMENT } from
// '@angular/platform-browser'; import { bind } from 'lodash';

interface Window {
  parent: Window;
  acap: any;
}
declare var $: any;
declare var parent;
declare var acap;
@Directive({ selector: '.recipe-card' })
export class RecipeCardObserver implements OnInit, DoCheck {
  contUnitsMgr = null;
  $wrapper = null;
  lastHgt = null;
  constructor(private _el: ElementRef) {}

  ngOnInit() {
    if (!window || window.parent == window) {
      return;
    }
    try {
      this.contUnitsMgr =
        (parent.acap &&
          parent.acap.ADMIN_TAPPADS &&
          parent.acap.ADMIN_TAPPADS.contUnitsMgr) ||
        (typeof acap !== 'undefined' &&
          acap.ADMIN_TAPPADS &&
          acap.ADMIN_TAPPADS.contUnitsMgr);
      this.$wrapper = $(this._el.nativeElement).parents('div');
    } catch (except) {
      console.log(except.message);
    }
  }

  checkElemHgt() {
    if (!this.contUnitsMgr || ! this.contUnitsMgr.details) {
      return;
    }
    let hgt = this.$wrapper.height();
    if (hgt < 900 || this.lastHgt == hgt) {
      return; // matches parent container min-height;
    }
    this.contUnitsMgr.details.setIframeWrapperHgt(hgt + 20);
    this.lastHgt = hgt;
  }

  ngDoCheck() {
    setTimeout(() => this.checkElemHgt(), 20);
  }

  // ngAfterViewInit() {     console.log('BodyObserver.ngAfterViewInit')     //
  // meh -     if (!window || !window.parent || ! ("MutationObserver" in window))
  // return; try {     var details =
  // window.parent.acap.ADMIN_TAPPADS.contUnitsMgr.details;     var lastHgt;
  // if (details) {         details.onMuts = function (mutation, elem) {
  //   var hgt = elem.clientHeight;             console.log(lastHgt, '|', hgt);
  //          console.log(typeof details);             if (hgt < 900 || lastHgt ==
  // hgt) return; // matches parent container min-height;
  // details.setIframeWrapperHgt(hgt + 10);             lastHgt = hgt;         };
  //        var observer =
  // this.Rx.DOM.fromMutationObserver(this.body.nativeElement, {
  // childList: true,             subTree: true         });
  // observer.subscribe(mutations => {             mutations.forEach(mutation =>
  // details.onMuts(mutation, this.body.nativeElement));         });         }
  // } catch (except) {         console.log(except.message);     } }
}
