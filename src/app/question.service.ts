import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Category, Question } from './question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  categories: Category[] = [];
  allCategories : boolean = false;
  difficulty : string = "all"
  constructor(private http: HttpClient) {}
  //request: string = 'https://the-trivia-api.com/api/questions?limit=1';

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
}