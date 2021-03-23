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

  set elementRef(newElement: ElementRef | null){
    this._focusElement = newElement;
    if (newElement){
      const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = newElement.nativeElement;
      this.style = { 
        width: `${offsetWidth}px`, 
        height: `${offsetHeight}px`,
        transform: `translateX(${offsetLeft}px) translateY(${offsetTop}px)`
      }
      this.styleChange.next(this.style);
    }else{
      this.style = null;
      this.styleChange.next(this.style);
    }
  }

  get elementRef(){
    return this._focusElement;
  }


}
