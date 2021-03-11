import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @ViewChild('container') containerElement!: ElementRef;
  @Input() isSelected: boolean = false;
  @Input() course: Course = Course.EmptyCourse();
  @Output() deleteCourse: EventEmitter<Course> = new EventEmitter();
  newCourseDetails: Course = Course.EmptyCourse();
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.newCourseDetails.code = this.course.code;
    this.newCourseDetails.name = this.course.name;
    this.newCourseDetails.credits = this.course.credits;
    this.newCourseDetails.grade = this.course.grade;
  }

  setClasses(){
    let classes = {
      course: true,
      selected: this.isSelected
    }
    return classes;
  }

  selectCourse(){
    this.courseService.selectCourse(this.course.code);
    if (!this.isSelected){
      setTimeout(() => {
        this.containerElement.nativeElement.focus();
        this.containerElement.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      }, 500);
    }
  }

  edit(){
    this.courseService.editCourse(this.newCourseDetails);
  }

  delete(){
    this.deleteCourse.emit(this.course);
  }

}
