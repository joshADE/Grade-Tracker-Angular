import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { FocusService } from 'src/app/services/focus.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnChanges {
  @ViewChild('container') containerElement!: ElementRef;
  @Input() isSelected: boolean = false;
  @Input() course: Course = Course.EmptyCourse();
  @Output() deleteCourse: EventEmitter<Course> = new EventEmitter();
  @Output() focusCourse: EventEmitter<ElementRef | null> = new EventEmitter();
  // newCourseDetails: Course = Course.EmptyCourse();
  courseForm = this.fb.group({
    code: [this.course.code, Validators.required],
    name: [this.course.name, Validators.required],
    grade: [this.course.grade, Validators.compose([Validators.required, Validators.min(0), Validators.max(100)])],
    credits: [this.course.credits, Validators.compose([Validators.required, Validators.min(0)])]
  })
  constructor(
    private courseService: CourseService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    // this.newCourseDetails.code = this.course.code;
    // this.newCourseDetails.name = this.course.name;
    // this.newCourseDetails.credits = this.course.credits;
    // this.newCourseDetails.grade = this.course.grade;
    this.courseForm.setValue({ 
      code: this.course.code, 
      name: this.course.name, 
      grade: this.course.grade, 
      credits: this.course.credits 
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
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
      this.focusCourse.emit(this.containerElement);
      setTimeout(() => {
        this.containerElement.nativeElement.focus();
        this.containerElement.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      }, 500);
    }else{
      this.focusCourse.emit(null);
    }
  }

  edit(){
    //this.courseService.editCourse(this.newCourseDetails);
    console.log('submited')
    console.log(this.courseForm.value);
    let newCourse = new Course(
      this.courseForm.value.name, 
      this.courseForm.value.code, 
      this.courseForm.value.grade, 
      this.courseForm.value.credits 
    );
    this.courseService.editCourse(newCourse);
  }

  delete(){
    this.deleteCourse.emit(this.course);
  }

}
