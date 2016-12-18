import { DOM } from 'rx';
import { Directive, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

interface Window {
    parent: Window;
    acap: any;
}
declare var window: Window;
@Directive({
    selector: '.recipe-card',
})
export class BodyObserver {
    constructor(private body: ElementRef) { }

    ngAfterViewInit() {
        // meh - 
        if (!window || "MutationObserver" ! in window) return;

        try {
            var details = window.parent.acap.ADMIN_TAPPADS.contUnitsMgr.details;
            var lastHgt;
            if (details) {
                details.onMuts = function (mutation) {
                    var hgt = this.body.nativeElement.clientHeight;
                    if (hgt < 900 || lastHgt == hgt) return; // matches parent container min-height;
                    details.setIframeWrapperHgt(hgt + 10);
                    lastHgt = hgt;
                };

                var observer = DOM.fromMutationObserver(this.body.nativeElement, {
                    childList: true,
                    subTree: true
                });

                observer.subscribe(function (mutations) {
                    mutations.forEach(details.onMuts);
                });

            }
        } catch (except) {
            console.log(except.message);
        }
    }
}