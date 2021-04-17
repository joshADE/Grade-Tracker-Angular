import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { AddCourseOutput, Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { FocusService } from 'src/app/services/focus.service';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent implements OnInit {

  isEditing: boolean = false;
  @Input() term: Course[] = [];
  @Input() index: number = -1;
  @Input() selectedCourse: Course | null = null;
  @Output() focusCourse: EventEmitter<ElementRef | null> = new EventEmitter();
  constructor(
    private courseService: CourseService,
    private focusService: FocusService
  ) { }

  ngOnInit(): void {
  }
  getClasses(){
    return {
      "edit-icon": true,
      "editing": this.isEditing
    }
  }

  addCourse({ termIndex, newCourse }: AddCourseOutput){
    this.courseService.addCourse(termIndex, newCourse);
    // covers when a course is added(refocusing)
    setTimeout(() => {
      this.focusService.changeStyle();
    },0)
  }

  deleteCourse(courseToDelete: Course){
    this.courseService.deleteCourse(courseToDelete);
    // covers when a course is deleted(refocusing)
    setTimeout(() => {
      this.focusService.changeStyle();
    },0)
    
  }

  focusOnCourse(courseContainer: ElementRef | null){
    this.focusCourse.emit(courseContainer);
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
    setTimeout(() => {
      this.focusService.changeStyle();
    },500)
  }

}
