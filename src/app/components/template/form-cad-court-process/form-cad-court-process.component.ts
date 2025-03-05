import { MaskDateInputDirective } from './../../../directive/mask-date-input.directive';
import { CourtProcessService } from './../../../services/court-process.service';
import { MaskNpuInputDirective } from './../../../directive/mask-npu-input.directive';
import { IbgeService } from './../../../services/ibge.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import {FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {City} from '../../../model/city.model';
import {Uf} from '../../../model/uf.model';

import {formatDate} from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, Router} from '@angular/router';
import {CourtProcess} from '../../../model/court-process.model';

import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

import { MAT_DATE_FORMATS } from '@angular/material/core';

import {provideMomentDateAdapter} from '@angular/material-moment-adapter';

import 'moment/locale/pt';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-form-cad-court-process',
  imports: [MaskDateInputDirective, MaskNpuInputDirective, FormsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },    
        provideMomentDateAdapter(),
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
  templateUrl: './form-cad-court-process.component.html',
  styleUrl: './form-cad-court-process.component.css',
  standalone: true,
})
export class FormCadCourtProcessComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private ibgeService: IbgeService, private route: ActivatedRoute, private courtProcessService: CourtProcessService){} 

  ufs: Uf[] = [];
  cities: City[] = [];

  fileSelected: File | null = null;

  courtProcessDataToUpdate: CourtProcess | null = null;

  base64String: string = '';

  form: FormGroup = new FormGroup({
    npu: new FormControl('', [Validators.required, Validators.minLength(16)]),
    city: new FormControl('', [Validators.required]),
    creationDate: new FormControl('', [Validators.required]),
    visualizationDate: new FormControl('', []),
    uf: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.loadUfs();

    this.route.queryParams.subscribe(params => {
      const {id} = params;
      if (id) {
        this.loadDataForm(id);
      } else {
        this.form.setValue({
              npu: '',
              city:  '',
              creationDate:  '',
              visualizationDate:  '',
              uf:  '',
              file:  '',
            });
      }
      this.form.get('visualizationDate')?.disable();
    });
  }

  loadDataForm(id: number) : void {
    this.courtProcessService.updateVisualizationDateById(id).subscribe({
      next: (data) => {
        this.courtProcessDataToUpdate = data;

        this.base64String = data.pdfFileBase64;

        this.loadCitiesByUf(data.uf);

        this.form.patchValue({
          npu: data.npu,
          creationDate: this.addAdjustmentDate(data.creationDate),
          visualizationDate: this.addAdjustmentDate(data.visualizationDate!),
          uf: data.uf,
          file: data.pdfFileBase64
        });
      },
      error: (error) => {
        this.showError(error);
      }
    });
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.form.patchValue({
        creationDate: event.value
      })
    }
  }

  addAdjustmentDate(dateStr: string): Date {
    let date = new Date(dateStr);
    date.setDate(date.getDate() +1);
    return date;
  }

  downloadFile(event: Event){
    event.preventDefault();

    const linkSource = `data:application/pdf;base64,${this.base64String}`;
    const downloadLink = document.createElement('a');
    const fileName = 'sample.pdf';

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  
  loadUfs(): void {
    this.ibgeService.getUfs().subscribe({
      next: (data) => {
        this.ufs = data;
      }, 
      error: (error) => {
       this.showError(error);
      }
    });
  }

  showError(error: any, message: string = "Aconteceu um erro inesperado no servidor!"): void {
    console.error('Error:', error);
    this.openErrorDialog(message);
  }

  onFileSelected(event: any): void {
    this.fileSelected = event.target.files[0];
    this.form.get('file')?.patchValue(this.fileSelected);
  }

  loadCitiesByUf(ufSelected: string): void {
    this.ibgeService.getCitiesByUf(ufSelected).subscribe({
      next: (data) => {
        this.cities = data;
        this.form.patchValue({
          city: this.courtProcessDataToUpdate?.city
        });
      }, 
      error: (error) => {
        this.showError(error);
      }
    });
  }

  loadCitiesByUfOnSelectEvent(ufSelected: string) {
    this.ibgeService.getCitiesByUf(ufSelected).subscribe(data => {
        this.cities = data;

        this.form.patchValue({
          city: ''
        });
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const {city, creationDate, npu, uf, visualizationDate} = this.form.value;
      const formData = new FormData();

      if (this.courtProcessDataToUpdate) {
        formData.append("id", this.courtProcessDataToUpdate.id?.toString()!);
      }

      formData.append("npu", npu);
      formData.append("city", city);
      formData.append("creationDate", formatDate(creationDate,'yyyy-MM-dd','en-US'));

      if (this.courtProcessDataToUpdate && this.courtProcessDataToUpdate.visualizationDate) {
        formData.append("visualizationDate", formatDate(this.courtProcessDataToUpdate.visualizationDate,'yyyy-MM-dd','en-US'));
      }
      
      formData.append("uf", uf);

      if (this.fileSelected) {
        formData.append("pdfFile", this.fileSelected!);
      }
      
      this.courtProcessService.createOrUpdateCourtProcess(formData).subscribe({
        next: () => {
          if (this.courtProcessDataToUpdate) {
            this.openSuccessDialog("Processo atualizado com sucesso!");
          }else {
            this.openSuccessDialog("Processo inserido com sucesso!");
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.openErrorDialog("Não foi possível realizar essa operação!");
        }
      }); 
    }
  }

  openSuccessDialog(message: String): void {
      const dialogRef = this.dialog.open(CustomAlertComponent, {
        data: {
          title: "Atenção!",
          message 
        }
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/listCourtProcess']);  
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

  cancelEvent(): void {
    this.router.navigate(['/']);
  }
}
