import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-press-page',
  templateUrl: './press-page.component.html',
  styleUrls: ['./press-page.component.scss']
})
export class PressPageComponent implements OnInit {

  public links: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
