import { Component } from '@angular/core';

import { FormCadCourtProcessComponent } from '../../components/template/form-cad-court-process/form-cad-court-process.component';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

//import {MatProgressBarModule} from '@angular/material/progress-bar';


@Component({
  selector: 'app-updt-court-process',
  imports: [FormCadCourtProcessComponent, MatCardModule, MatButtonModule/*, MatProgressBarModule*/],
  templateUrl: './updt-court-process.component.html',
  styleUrl: './updt-court-process.component.css'
})
export class UpdtCourtProcessComponent {



}
