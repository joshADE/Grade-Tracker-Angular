import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FocusStyle } from '../models/focusStyle';

@Injectable({
  providedIn: 'root'
})
export class FocusService {
  private _focusElement: ElementRef | null = null;
  style: FocusStyle | null = null;
  styleChange: Subject<FocusStyle | null> = new Subject();
  constructor() { }

  focusOnCourse(courseContainer: ElementRef | null, scrollContainer: ElementRef){
    this._focusElement = courseContainer;
    if (courseContainer){
      //const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = courseContainer.nativeElement;
      const { width, height, left, top } = courseContainer.nativeElement.getBoundingClientRect();
      const { scrollLeft, scrollTop } = scrollContainer.nativeElement;
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
