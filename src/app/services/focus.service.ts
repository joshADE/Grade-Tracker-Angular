import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FocusStyle } from '../models/focusStyle';

@Injectable({
  providedIn: 'root'
})
export class FocusService {
  private _focusElement: ElementRef | null = null;
  private _scrollContainer: ElementRef | null = null;
  style: FocusStyle | null = null;
  styleChange: Subject<FocusStyle | null> = new Subject();
  constructor() { }

  focusOnCourse(courseContainer: ElementRef | null, scrollContainer: ElementRef){
    this._focusElement = courseContainer;
    this._scrollContainer = scrollContainer;
    this.focus();
  }

  // refocus
  changeStyle(){
    this.focus();
  }


  private focus(){
    if (this._focusElement && this._scrollContainer){
      
    console.log(this._focusElement, this._scrollContainer);
      const { width, height, left, top } = this._focusElement.nativeElement.getBoundingClientRect();
      const { scrollLeft, scrollTop } = this._scrollContainer.nativeElement;
      this.style = { 
        width: `${width}px`, 
        height: `${height}px`,
        transform: `translateX(${left + scrollLeft}px) translateY(${top + scrollTop}px)`
      }
      this.styleChange.next(this.style);
    }else{
      this.style = null;
      this.styleChange.next(this.style);
    }
  }


}
