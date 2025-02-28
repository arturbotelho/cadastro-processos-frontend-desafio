import { CadCourtProcessComponent } from './pages/cad-court-process/cad-court-process.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListCourtProcessComponent } from './pages/list-court-process/list-court-process.component';
import { UpdtCourtProcessComponent } from './pages/updt-court-process/updt-court-process.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "cadCourtProcess", component: CadCourtProcessComponent},
    {path: "updtCourtProcess", component: UpdtCourtProcessComponent},
    {path: "listCourtProcess", component: ListCourtProcessComponent},
];
