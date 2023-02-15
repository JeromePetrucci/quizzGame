import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Answer, Capital, Category, Question } from './question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  categories: Category[] = [];
  allCategories : boolean = false;
  difficulty : string = "all";
  listAnswer : Answer[] = [];
  quetionAsked : number = 0;
  constructor(private http: HttpClient) {}

  setCategories (listCategory : Category[] ) : void {
    this.categories = listCategory;
  }

  getQuestion () { 
    let newRequest: string = 'https://the-trivia-api.com/api/questions?limit=1';
    if (!this.allCategories && this.categories.length > 0 ) {
      newRequest = newRequest + "&categories="
      this.categories.forEach((c, i)  => {
        if (i == 0) {newRequest += c.requestName} 
        else {newRequest += "," + c.requestName}
      })
    }
    if (this.difficulty != "All") {
      newRequest = newRequest + "&difficulty=" + this.difficulty;
    }
    return this.http.get<Question[]>(newRequest);
    
  }
  
  addQuestion(newQuestion: Question) {
    let url: string = 'http://localhost:8081/addQuestion';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'});
  let options = { headers: headers };
    let add: Observable<void> = this.http.post<void>(url, newQuestion, options);
    add.subscribe(x => {console.log("question send")})
  }

  addAnswer(newAnswer: Answer): number {
    let url: string = 'http://localhost:8081/addAnswer';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'});
    let options = { headers: headers };
    let add: Observable<number> = this.http.post<number>(url, newAnswer, options);
    
    add.subscribe(x => {console.log("answer send");
    this.quetionAsked = x;
  })
  return this.quetionAsked
   
  }

  getStat() :Observable<Answer[]> {
    let url: string = 'http://localhost:8081/getStat';
    return this.http.get<Answer[]>(url);
   
  }

  getCapitals() :Observable<Capital[]> {
    let url: string = 'http://localhost:8081/getCapitals';
    return this.http.get<Capital[]>(url);
   
  }
}