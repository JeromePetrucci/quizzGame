import { Component} from '@angular/core';
import { Observable } from 'rxjs';

import { Category, Question } from '../question';
import { QuestionService } from '../question.service'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  constructor(private questionService: QuestionService) {}

  //question
  question! :  Observable<Question[]> ;

  //counters
  questionCounter : number = 0;
  counterGoodAnswer : number = 0;

  //answers' index
  randomI: number = this.getRandomInt();
  index0 : boolean = this.getIndex(0);
  index1 : boolean = this.getIndex(1);
  index2 : boolean = this.getIndex(2);
  index3 : boolean = this.getIndex(3);
  
  //result
  result : string = "loading ...";
  answered : boolean = false;
  isCorrect : boolean = false;

  //information of menu selection
  categoryAll : boolean = this.questionService.allCategories || this.questionService.categories.length < 1;
  categories : Category[] = this.questionService.categories;
  difficultySelected: string = this.questionService.difficulty;

  onAnswer (correct: boolean, correctAnswer: string) {
    this.answered = true;
    this.questionCounter +=1;
    this.isCorrect = correct

    if (correct){
      this.counterGoodAnswer += 1;
      this.result = "Well Done !!! the answer was " +  correctAnswer;
    }
    else {this.result = "Wrong, the answer was " +  correctAnswer};
    //nextQuestion();
  }

  //relaod a new question
  nextQuestion() : void {
    this.answered = false;
    this.result = "loading ...";

    this.question = this.questionService.getQuestion();
    this.randomI = this.getRandomInt();
    this.index0  = this.getIndex(0);
    this.index1 = this.getIndex(1);
    this.index2 = this.getIndex(2);
    this.index3 = this.getIndex(3);
    console.log(this.randomI)
  }

  //functiun that return true if the parameter is the index of the good answer
  getIndex (i: number): boolean {
    if (i === this.randomI) {return true}
    else return false
  } 

  //return 0,1,2 or 3 the random place of the good answer
  getRandomInt(): number {
    let max = Math.floor(3);
    return Math.floor(Math.random() * (max + 1));
}

  ngOnInit(): void {
    this.question = this.questionService.getQuestion();
}
}
