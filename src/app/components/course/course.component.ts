import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
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
  }

  edit(){
    this.courseService.editCourse(this.newCourseDetails);
  }

  delete(){
    this.deleteCourse.emit(this.course);
  }

}
