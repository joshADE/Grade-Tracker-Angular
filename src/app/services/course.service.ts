import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Observable, of, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  

  selectedCourse: Course | null = null;
  selectedTerm: number = -1;
  selectedCourseChange : Subject<Course | null> = new Subject();
  terms: Course[][] = [
    [
      {
        code: 'PROG 5559',
        name: 'EJD',
        grade: 70,
        credits: 3,
      },
      {
        code: 'PROG 1207',
        name: 'OO1',
        grade: 80,
        credits: 6,
      },
      {
        code: 'PROG 5569',
        name: 'OO2',
        grade: 75,
        credits: 4,
      }
    ],
  ];

  constructor() {}

  getTerms(): Course[][] {
    return this.terms;
  }

  getSelectedCourse(): Observable<Course | null> {
    return of(this.selectedCourse);
  }

  addCourse(termIndex:number, newCourse: Course) {
    this.terms[termIndex].push(newCourse);
  }

  deleteCourse(courseToDelete: Course) {
    for(let i = 0; i < this.terms.length; i++){
      for (let j = 0; j < this.terms[i].length; j++){
        if (this.terms[i][j].code === courseToDelete.code){
          this.terms[i].splice(j, 1);
          if(this.selectedCourse?.code === courseToDelete.code){
            this.selectedCourse = null;
            this.selectedCourseChange.next(this.selectedCourse);
          }
          return;
        }
      }
      
    }
  }
  editCourse(course: Course) {
    for(let i = 0; i < this.terms.length; i++){
      for (let j = 0; j < this.terms[i].length; j++){
        if (this.terms[i][j].code === course.code){
          this.terms[i][j] = course;
          return;
        }
      }
      
    }
  }

  addTerm() {
    this.terms.push([]);
  }

  removeTerm(term: number){
    
    if (term >= 1){
      if (this.terms[term].findIndex(c => c.code === this.selectedCourse?.code) !== -1){
        this.selectedCourse = null;
        this.selectedCourseChange.next(this.selectedCourse);
      }
      this.terms.splice(term, 1);
    }
    
  }

  selectCourse(code: string) : Course | null {
    
    if(this.selectedCourse && this.selectedCourse.code === code){
      this.selectedCourse = null;
      this.selectedTerm = -1;
      this.selectedCourseChange.next(this.selectedCourse);
      console.log('course already selected');
      return null;
    }

    let y = 0;

    for (let x = 0; x < this.terms.length; x++){
      y = this.terms[x].findIndex(course => course.code === code);

      if (y >= 0){
          this.selectedCourse = this.terms[x][y];
          this.selectedTerm =  x; 
          console.log('found a course');
          this.selectedCourseChange.next(this.selectedCourse);
          return this.selectedCourse;
          
      }
    }

    return null;
  }
}
