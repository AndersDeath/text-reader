import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';


@UntilDestroy()
@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss']
})
export class LinksPageComponent implements OnInit {
  public userData: any;

  displayedColumns: string[] = ['icon', 'title', 'date', 'count', 'edit'];
  public dataSource: any = [];
  public filteredSource: any = [];
  public origins: Set<any> = new Set();
  public selectedOrigin = '---';
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private authService: AuthService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData;
    try {
      this.authService.authState().subscribe((state) => {
        this.userData = state?.toJSON()
      })
    } catch(e) {
      console.log(e);
    }
    try {
      this.authService.getLinks(this.userData)
      .pipe(untilDestroyed(this)).subscribe((w) => {
        w.forEach((e) => {
          const data = e.data();
          const url = new URL(data.message);

          const check = this.dataSource.some((item: any) => {
            return data.message === item.url;
          });
          if(!check) {
            this.dataSource.push({
              url: data.message,
              title: data.title || 'no title',
              icon: url.origin,
              date: new Date(data.date),
              count: 1
            });
            this.origins.add(url.origin);
          } else {
            this.dataSource.map((item: any) => {
              if(data.message === item.url) {
                item.count = item.count + 1
              }
              return item;
            });
          }
        });
        this.filteredSource = [...this.dataSource];
        this.filteredSource.sort(
          (objA: any, objB: any) => objB.date.getTime() - objA.date.getTime(),
        );
        this.table.renderRows();
      });
    } catch(e) {
      console.log(e);
    }
  }

  originsToArray() {
    return ['---', ...Array.from(this.origins)];
  }

  filterOrigin(event: any) {
    if(event === '---') {
      this.filteredSource = [...this.dataSource];
    } else {
      this.filteredSource = [...this.dataSource.filter((e: any) => {
        return e.icon === event;
      })];
    }
    this.filteredSource.sort(
      (objA: any, objB: any) => objB.date.getTime() - objA.date.getTime(),
    );
    this.table.renderRows();
  }

  logout() {
    this.authService.signOut();
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  editLink(link: any) {
    console.log(link);
  }

}
