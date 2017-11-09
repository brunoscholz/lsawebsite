import { Directive, HostListener } from '@angular/core';

/**
* Smart body resize
*/
@Directive({
  selector: 'main',
})
export class SmartResizeDirective {

  //Check if element has class
  hasClass(target:any, elementClassName:string) {
    return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(target.className);
  }

  body = document.body;
  html = document.documentElement;
  height:number;

  constructor() {
    if (this.hasClass(document.querySelector('body'), 'fixed-nav')) {
      // if fixed-nav do ...
    } else {
      setTimeout(() => {
        this.height = Math.max( this.body.scrollHeight, this.body.offsetHeight, this.html.clientHeight, this.html.scrollHeight, this.html.offsetHeight );
        document.getElementsByTagName('body')[0].style.minHeight = this.height + "px";
      }, 100);
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.hasClass(document.querySelector('body'), 'fixed-nav')) {
      // if fixed-nav do ...
    } else {
      this.height = Math.max( this.body.scrollHeight, this.body.offsetHeight, this.html.clientHeight, this.html.scrollHeight, this.html.offsetHeight );
      document.getElementsByTagName('body')[0].style.minHeight = this.height + "px";
    }
  }
}
