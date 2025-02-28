import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Util } from '../util/util';
import { HttpClient } from '@angular/common/http';
import { Uf } from '../model/uf.model';
import { City } from '../model/city.model';


@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  constructor(private http: HttpClient) {}

  getUfs(): Observable<Uf[]> {
    return this.http.get<Uf[]>(`${Util.getBaseUrl() + '/ibge/ufs'}`);
  }

  getCitiesByUf(uf: string): Observable<City[]> {
    return this.http.get<City[]>(`${Util.getBaseUrl() + '/ibge/cities/'+ uf }`);
  }

}
