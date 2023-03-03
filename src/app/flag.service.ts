import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FlagService {
  
  constructor(private http: HttpClient) {}
  

  getFlag(name: string){
    let url: string = 'https://countryflagsapi.com/png/brazil';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'});
    let options = { headers: headers };
    return this.http.get<object>(url, options);
  }

}