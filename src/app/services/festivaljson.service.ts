import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Festival } from '../models/festival';

@Injectable({
  providedIn: 'root',
})
export class FestivaljsonService {
  constructor(private http: HttpClient) {}

  json2Festival(json: any): Festival {
    return new Festival(
      json.name,
      json.id,
      json.tablemax_1,
      json.tablemax_2,
      json.tablemax_3,
      json.tableprice_1,
      json.tableprice_2,
      json.tableprice_3,
      json.sqmprice_1,
      json.sqmprice_2,
      json.sqmprice_3
    );
  }
  getFestivals(): Observable<Festival[]> {
    return this.http
      .get<Festival[]>('/assets/festivals.json')
      .pipe(map((data) => data.map((json) => this.json2Festival(json))));
  }

  getFestival(id: any): Observable<Festival | undefined> {
    return this.http
      .get<Festival[]>('/assets/festivals.json')
      .pipe(map((data) => data.find((festival) => festival.id === id)));
  }
}
