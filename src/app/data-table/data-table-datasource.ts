import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Component } from '@angular/core';

export interface DataTableItem {
  name: string;
  id: number;
  score: string
}

let card: string = '1'

let player = {
  id: 1,
  name: 'Adrian',
  score: card
}

// TODO: replace this with real data from your application
const Table: DataTableItem[] = [
  player
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
@Component({
  template: ''
})
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = Table;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {

      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
    return merge(observableOf(this.data))
      .pipe(map(() => {
        return [...this.data ];
      }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}


}

