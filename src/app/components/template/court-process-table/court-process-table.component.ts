import { CourtProcess } from './../../../model/court-process.model';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CourtProcessService } from '../../../services/court-process.service';

import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';
import { DateFormatPipe } from '../../../pipes/date-format.pipe';

import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

export class PaginationProps {
  constructor(public pageIndex: number, public pageSize: number) {}
}

@Component({
  selector: 'app-court-process-table',
  templateUrl: './court-process-table.component.html',
  styleUrl: './court-process-table.component.css',
  standalone: true,
  imports: [DateFormatPipe, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule],
  providers: [
    { provide: MatPaginatorIntl, useValue: loadI18nPaginatorIntl() }
  ]
})
export class CourtProcessTableComponent implements AfterViewInit {

  dataSource = new MatTableDataSource<CourtProcess>([]);

  currentPagination: PaginationProps;

  constructor(private snackBar: MatSnackBar, private courtProcessService: CourtProcessService, private dialog: MatDialog, private router: Router, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl = loadI18nPaginatorIntl();
    this.currentPagination = new PaginationProps(0, 10)
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<CourtProcess>;
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['npu', 'creationDate', 'uf', 'actions'];
  totalElements = 0;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadData()
  }

  onPageChange(event: any): void {

    this.currentPagination = new PaginationProps(event.pageIndex, event.pageSize)
    this.loadData(false);
  }

  loadData(updateTotalElements: boolean = true) : void {
    this.courtProcessService.getAllCourtProcess(this.currentPagination.pageIndex, this.currentPagination.pageSize).subscribe({
      next: (data) =>{
        this.dataSource.data = data.content;
    
        if (updateTotalElements) {
          this.totalElements = data.totalElements;
          this.paginator.length = this.totalElements;
        }
      }, 
      error: (error) => {
        console.error('Error:', error);
        this.openErrorDialog("Aconteceu um erro inesperado no servidor!");
      }
    });
  }

  openConfirmDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Atenção!",
        message: "Deseja realmente remover o item da tabela?" 
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.courtProcessService.deleteCourtProcess(id).subscribe(()=>{
            this.openSnackBar("Item removido com sucesso!!!");
            this.loadData(false);
          });
        }
      },
      error: (error) => {
        console.error('Error:', error);
        this.openErrorDialog("Não foi possível realizar essa operação!");
      }
    });
  }

  openErrorDialog(message: String): void {
    this.dialog.open(CustomAlertComponent, {
      data: {
        title: "Error!",
        message 
      }
    });
  }

  openSnackBar(message: string, action: string = 'X'): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  editEvent(id: number): void {
    this.router.navigate(['/updtCourtProcess'], {queryParams: { id }});
  }

  removeEvent(id: number): void {
    this.openConfirmDialog(id);
  }
}

export function loadI18nPaginatorIntl(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Itens por página:';
  paginatorIntl.nextPageLabel = 'Próxima página';
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.firstPageLabel = 'Primeira página';
  paginatorIntl.lastPageLabel = 'Última página';

  paginatorIntl.getRangeLabel = (page, pageSize, length) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }

    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);

    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };

  return paginatorIntl;
}
