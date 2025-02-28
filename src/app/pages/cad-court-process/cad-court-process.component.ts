import { Component } from '@angular/core';
import { FormCadCourtProcessComponent } from '../../components/template/form-cad-court-process/form-cad-court-process.component';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-cad-court-process',
  imports: [FormCadCourtProcessComponent, MatCardModule, MatButtonModule],
  templateUrl: './cad-court-process.component.html',
  styleUrl: './cad-court-process.component.css'
})
export class CadCourtProcessComponent {

}
