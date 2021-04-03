import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  links: [string,string][] = [['Home', '/'], ['Settings', '/settings']];
  activeLink: string = this.links[0][0];
  constructor() { }

  ngOnInit(): void {
  }

}
