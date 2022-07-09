import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CardsComponent } from '../cards/cards.component';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [
    CardsComponent
  ]
})
export class DataTableComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  @Input() playerScore!: string;
  dataSource: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'score'];
  constructor(private cardsComponent: CardsComponent) {
    this.dataSource = new DataTableDataSource();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;
  }
}
