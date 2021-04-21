import { Component, DoCheck, ElementRef, Inject, InjectionToken, IterableChanges, IterableDiffer, IterableDiffers, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AddCourseOutput, CoreqType, Course, PrereqType } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { 
  trigger, 
  state,
  style,
  animate,
  transition
} from '@angular/animations'
import { FocusService } from 'src/app/services/focus.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('enterExit', [
      state('enter', style({
        opacity: 1
      })),
      state('exit', style({
        opacity: 0
      })),
      transition('* => *', [
        animate('0.5s cubic-bezier(0.71, 0.03, 0.56, 0.85)')
      ])
    ])
  ]
})

export class HomeComponent implements OnInit, DoCheck, OnDestroy {
  @ViewChild('focusElement') focusElement: ElementRef | null = null;
  @ViewChild('focusParent') focusParent!: ElementRef;
  @ViewChild('scrollBody') scrollBody!: ElementRef;
  terms: Course[][] = [];
  prereq: PrereqType = {};
  coreq: CoreqType = [];

  courseSubscription!: Subscription;
  focusSubscription!: Subscription;
  selectedCourse: Course | null = null; 
  iterableDiffer!: IterableDiffer<Course[]>;

  constructor(
    private courseService: CourseService, 
    private focusService: FocusService, 
    private iterableDiffers: IterableDiffers) {
      this.iterableDiffer = this.iterableDiffers.find(this.terms).create();
  }

  ngDoCheck(){
    // covers when a term is added/removed(refocusing)
    let changes = this.iterableDiffer.diff(this.terms);
    if (changes){
      console.log(changes)
      setTimeout(() => {
        this.focusService.changeStyle();
      },0)
    }
  }

  ngOnInit(): void {
    this.terms = this.courseService.getTerms();
    this.prereq = this.courseService.getPrereqCourses();
    this.coreq = this.courseService.getCoreqCourses();
    this.courseSubscription = this.courseService.selectedCourseChange.subscribe((value) => {
      this.selectedCourse = value;
    });
    this.focusSubscription = this.focusService.styleChange.subscribe((value) => {
      if (this.focusElement){
        this.focusElement.nativeElement.style.width = value?.width;
        this.focusElement.nativeElement.style.height = value?.height;
        this.focusElement.nativeElement.style.transform = value?.transform;
      }

    })
    const isChrome = navigator.userAgent.indexOf("Chrome") != -1;
    
    console.log("Initialized")
  }



  getMaxCourseForTerms(): number {
    return Math.max(...this.terms.map((courses) => courses.length));
  }



  addTerm(){
    this.courseService.addTerm();
  }

  removeTerm(){
    this.courseService.removeTerm(this.terms.length - 1);
  }




  setClassesInnerBottom(){
    let classes = {
      'inner-bottom': true,
      expanded: this.selectedCourse !== null
    }
    return classes;
  }


  focusOnCourse(courseContainer: ElementRef | null){
    this.focusService.focusOnCourse(courseContainer, this.scrollBody);
  }

  ngOnDestroy() {
    this.courseSubscription.unsubscribe();
    this.focusSubscription.unsubscribe();
    console.log("Destroying");
  }

}
