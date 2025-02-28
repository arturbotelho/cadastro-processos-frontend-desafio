import { Component } from '@angular/core';
import { CourtProcessTableComponent } from '../../components/template/court-process-table/court-process-table.component';

import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-list-court-process',
  imports: [CourtProcessTableComponent, MatCardModule],
  templateUrl: './list-court-process.component.html',
  styleUrl: './list-court-process.component.css'
})
export class ListCourtProcessComponent {

}
