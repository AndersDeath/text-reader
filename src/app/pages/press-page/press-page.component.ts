import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-press-page',
  templateUrl: './press-page.component.html',
  styleUrls: ['./press-page.component.scss']
})
export class PressPageComponent implements OnInit {

  public links: {
    title: string;
    href: string;
  }[] = [
    {
      title: 'Forrester',
      href: 'https://www.forrester.com/bold'
    },
    {
      title: 'Gartner/Trending topics',
      href: 'https://www.gartner.com/en/information-technology/insights/trending-topics'
    },
    {
      title: 'Techcrunch',
      href: 'https://techcrunch.com/'
    },
    {
      title: 'Hustle',
      href: 'https://thehustle.co/'
    },
    {
      title: 'CIO.com',
      href: 'https://www.cio.com/'
    },
    {
      title: 'Crunchbase',
      href: 'https://news.crunchbase.com/'
    },
    {
      title: 'Searchmetric',
      href: 'https://blog.searchmetrics.com/us/'
    },
    {
      title: 'Harward business review',
      href: 'https://hbr.org/'
    },
    {
      title: 'Digital library',
      href: 'https://www.computer.org/csdl/magazines/it'
    },
    {
      title: 'WSJ/CIO-journal',
      href: 'https://www.wsj.com/news/cio-journal'
    },
    {
      title: 'CTO vision',
      href: 'https://ctovision.com/'
    },
    {
      title: 'CTO insight',
      href: 'https://www.cioinsight.com/'
    },
    {
      title: 'Y Combinator news',
      href: 'https://news.ycombinator.com/'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
