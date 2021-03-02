import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Course, AddCourseOutput } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  terms: Course[][] = [];
  @Input() index: number = 0;
  @Output() addCourse: EventEmitter<AddCourseOutput> = new EventEmitter();

  message: string = 'Messages will appear here';

  code: string = '';

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.terms = this.courseService.getTerms();
  }

  onSubmit() {
    if (!this.code.trim()) {
      this.message = 'Must enter a course code';
      return;
    }
    if (this.findCorse(this.code)) {
      this.message = 'Course code already exist';
      return;
    }
    const newCourse = Course.EmptyCourse();
    newCourse.code = this.code;
    this.addCourse.emit({termIndex: this.index, newCourse});
    this.message = 'Messages will appear here';
    this.code = '';
  }

  private findCorse(code: string): boolean {
    for (let i=0; i < this.terms.length; i++){
      for (let j=0; j< this.terms[i].length; j++){
        if (this.terms[i][j].code === code){
          return true;
        }
      }

    }

    return false;
  }

}
