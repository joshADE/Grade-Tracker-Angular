import { Component, DoCheck, Input, IterableChanges, IterableDiffer, IterableDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CoreqType, Course, PrereqType } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-bottom-view',
  templateUrl: './bottom-view.component.html',
  styleUrls: ['./bottom-view.component.css']
})
export class BottomViewComponent implements OnInit, OnChanges, DoCheck {

  prereqCourses = new FormControl([]);
  coreqCourses = new FormControl([]);
  availablePrereq: string[] = [];
  availableCoreq: string[] = [];
  selectedTerm: number = -1;
  @Input() prereq: PrereqType = {};
  @Input() coreq: CoreqType = [];
  @Input() terms: Course[][] = [];
  @Input() selectedCourse: Course | null = null; 

  termIterableDiffer!: IterableDiffer<Course[]>;
  courseIterableDiffer!: IterableDiffer<Course>;

  constructor(
    private courseService: CourseService, 
    private iterableDiffers: IterableDiffers
  ) {
    this.termIterableDiffer = this.iterableDiffers.find(this.terms).create();
    let flattenedTerms = ([].concat.apply([], this.terms as any[]) as Course[]);
    this.courseIterableDiffer = this.iterableDiffers.find(flattenedTerms).create((i, c) => (i));
  }
  ngDoCheck(): void {
    let changes2 : IterableChanges<Course[]> | IterableChanges<Course> | null = this.termIterableDiffer.diff(this.terms);
    let flattenedTerms = ([].concat.apply([], this.terms as any[]) as Course[]);
    changes2 = changes2 || this.courseIterableDiffer.diff(flattenedTerms);
    if (changes2){
      console.log(changes2);
      this.findSelectedTerm();
      this.loadAvailablePrereqAndCoreq();
      this.loadPrereqAndCoreq();
    }
  }


  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes.selectedCourse)
      this.findSelectedTerm();
    this.loadAvailablePrereqAndCoreq();
    this.loadPrereqAndCoreq();
  }


  printReq(){
    console.log('Prereq', this.prereqCourses.value);
    console.log('Coreq', this.coreqCourses.value);
  }

  findSelectedTerm(){
    let terms = this.terms;
    this.selectedTerm = terms.findIndex(term => term.findIndex(course => course.code === this.selectedCourse?.code) >= 0);
  }

  loadAvailablePrereqAndCoreq() {
    let terms = this.terms;
    if (!this.selectedCourse || this.selectedTerm === -1){
      return;
    }
    this.availablePrereq = ([].concat.apply([], terms.slice(0, this.selectedTerm) as any[]) as Course[])
                          .map(course => course.code);
    this.availableCoreq = (terms[this.selectedTerm] || [])
                          .filter(course => course.code !== this.selectedCourse?.code)
                          .map(course => course.code);
  }

  loadPrereqAndCoreq() {
    let terms = this.terms;
    if (!this.selectedCourse || this.selectedTerm === -1){
      return;
    }
    let prereq = this.prereq;
    let selectedPrereqList = prereq[this.selectedCourse.code] || [];
    let selectOptionsPrereq = ([].concat.apply([], terms.slice(0, this.selectedTerm) as any[]) as Course[])
                              .filter(course => selectedPrereqList.includes(course.code))
                              .map(course => course.code);
    this.prereqCourses.setValue(selectOptionsPrereq);

    let coreq = this.coreq;
    let selectedCoreqIndex = coreq
                              .findIndex(codeList => (codeList.findIndex(code => code === this.selectedCourse?.code) >= 0));

    let selectedCoreqList = selectedCoreqIndex < 0 ? [] : coreq[selectedCoreqIndex];

    let selectOptionsCoreq = terms[this.selectedTerm]
                              .filter(course => course.code !== this.selectedCourse?.code && selectedCoreqList.includes(course.code))
                              .map(course => course.code);
    this.coreqCourses.setValue(selectOptionsCoreq);

  }

}
