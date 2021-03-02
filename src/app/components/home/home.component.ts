import { Component, OnInit } from '@angular/core';
import { AddCourseOutput, Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  terms: Course[][] = [];

  selectedCourse: Course | null = null; 


  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.terms = this.courseService.getTerms();
    this.courseService.selectedCourseChange.subscribe((value) => {
      this.selectedCourse = value;
    })
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

}
