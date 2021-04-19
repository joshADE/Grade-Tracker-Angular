import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-bottom-view',
  templateUrl: './bottom-view.component.html',
  styleUrls: ['./bottom-view.component.css']
})
export class BottomViewComponent implements OnInit {

  prereqCourses = new FormControl([]);
  coreqCourses = new FormControl([]);
  availablePrereq: string[] = ['OO1', 'SYST 1596', 'ECOR 10010'];
  availableCoreq: string[] = ['OO2', 'TECH 6767', 'PYSC 2345'];

  @Input() selectedCourse: Course | null = null; 
  constructor() { }

  ngOnInit(): void {
  }

  printReq(){
    console.log('Prereq', this.prereqCourses.value);
    console.log('Coreq', this.coreqCourses.value);
  }

}
