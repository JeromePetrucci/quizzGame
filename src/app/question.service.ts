import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Answer, Category, Question } from './question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  categories: Category[] = [];
  allCategories : boolean = false;
  difficulty : string = "all"
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
    let url: string = 'http://127.0.0.1:8081/test';
    this.http.get<string>(url);
    return this.http.get<Question[]>(newRequest);
    
  }
  
  addQuestion(newQuestion: Question) {
    console.log("in addQuestion")
    let url: string = 'http://localhost:8081/addQuestion';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'});
  let options = { headers: headers };
    let add: Observable<void> = this.http.post<void>(url, newQuestion, options);
    add.subscribe(x => {console.log("question send")})
  }

  addAnswer(newAnswer: Answer) {
    console.log("in addAnswer")
    let url: string = 'http://localhost:8081/addAnswer';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'});
    let options = { headers: headers };
    let add: Observable<void> = this.http.post<void>(url, newAnswer, options);
    add.subscribe(x => {console.log("answer send")})
  }
}