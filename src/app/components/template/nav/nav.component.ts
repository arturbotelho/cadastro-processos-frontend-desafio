import { Component } from '@angular/core';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [MatSidenavModule, MatListModule, MatIconModule, RouterOutlet, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  standalone: true
})
export class NavComponent {

}
