import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AddCourseOutput, Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { 
  trigger, 
  state,
  style,
  animate,
  transition
} from '@angular/animations'
import { FocusService } from 'src/app/services/focus.service';
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
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('focusElement') focusElement!: ElementRef;
  @ViewChild('focusParent') focusParent!: ElementRef;
  @ViewChild('scrollBody') scrollBody!: ElementRef;
  terms: Course[][] = [];

  selectedCourse: Course | null = null; 


  constructor(private courseService: CourseService, private focusService: FocusService) {}

  ngOnInit(): void {
    this.terms = this.courseService.getTerms();
    this.courseService.selectedCourseChange.subscribe((value) => {
      this.selectedCourse = value;
    });
    this.focusService.styleChange.subscribe((value) => {
      this.focusElement.nativeElement.style.width = value?.width;
      this.focusElement.nativeElement.style.height = value?.height;
      this.focusElement.nativeElement.style.transform = value?.transform;

    })
    const isChrome = navigator.userAgent.indexOf("Chrome") != -1;
    
    console.log("Initialized")
  }



  getMaxCourseForTerms(): number {
    return Math.max(...this.terms.map((courses) => courses.length));
  }

  addCourse({ termIndex, newCourse }: AddCourseOutput){
    this.courseService.addCourse(termIndex, newCourse);
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

  deleteCourse(courseToDelete: Course){
    this.courseService.deleteCourse(courseToDelete);
  }

  focusOnCourse(courseContainer: ElementRef | null){
    this.focusService.focusOnCourse(courseContainer, this.scrollBody);
  }

  ngOnDestroy() {
    //this.courseService.selectedCourseChange.unsubscribe();
    console.log("Destroying");
  }

}
