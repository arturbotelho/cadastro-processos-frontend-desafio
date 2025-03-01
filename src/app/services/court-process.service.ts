import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourtProcess } from '../model/court-process.model';
import { Util } from '../util/util';
import { PaginationCourtProcess } from '../model/pagination-court-process.model';


@Injectable({
  providedIn: 'root'
})
export class CourtProcessService {

  constructor(private http: HttpClient) {}

  getAllCourtProcess(pageIndex: number, pageSize: number):  Observable<PaginationCourtProcess> {
    let params = {
      page: pageIndex,
      size: pageSize
    }
    return this.http.get<PaginationCourtProcess>(`${Util.getBaseUrl() + '/process/listar'}`, {params});
  }

  getCourtProcessById(id: number): Observable<CourtProcess> {
    return this.http.get<CourtProcess>(`${Util.getBaseUrl() + '/process'}/${id}`);
  }

  updateVisualizationDateById(id: number): Observable<CourtProcess> {
    return this.http.put<CourtProcess>(`${Util.getBaseUrl() + '/process'}/${id}`, {});
  }

  createOrUpdateCourtProcess(formData: FormData): Observable<CourtProcess> {
    return this.http.post<CourtProcess>(`${Util.getBaseUrl() + '/process/'}`, formData);
  }

  deleteCourtProcess(id: number): Observable<void> {
    return this.http.delete<void>(`${Util.getBaseUrl() + '/process'}/${id}`);
  }
}
