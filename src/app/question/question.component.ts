import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Answer, Category, EMPTY_QUESTION, Question } from '../question';
import { QuestionService } from '../question.service'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  constructor(private questionService: QuestionService) { }

  //question
  //question!: Observable<Question[]>;
  question: Question[] = [EMPTY_QUESTION];
  alreadyAsked: number = 0;

  //counters
  questionCounter: number = 0;
  counterGoodAnswer: number = 0;
  percentage: number = this.getPercentage();
  actualRow: { counter: number, type: "win" | "lose" } = { counter: 0, type: "win" }

  //answers'index
  randomI: number = this.getRandomInt();
  index0: boolean = this.getIndex(0);
  index1: boolean = this.getIndex(1);
  index2: boolean = this.getIndex(2);
  index3: boolean = this.getIndex(3);

  //result
  result: string = "";
  answered: boolean = false;
  isCorrect: boolean = false;
  isOver: boolean = false;
  loading: string = "Loading..."

  //information of menu selection
  categoryAll: boolean = this.questionService.allCategories || this.questionService.categories.length < 1;
  categories: Category[] = this.questionService.categories;
  difficultySelected: string = this.questionService.difficulty;
  questionNB: number | null = this.questionService.questionNB;

  onAnswer(correct: boolean, question: Question) {
    this.answered = true;
    this.questionCounter += 1;
    this.isCorrect = correct

    if (correct) {
      this.counterGoodAnswer += 1;
      this.result = "Well Done !!! the answer was " + question.correctAnswer;
      if (this.actualRow.type === "win") { this.actualRow.counter += 1 }
      else {
        this.actualRow.type = "win";
        this.actualRow.counter = 1;
      }
    }
    else {
      this.result = "Wrong, the answer was " + question.correctAnswer;
      if (this.actualRow.type === "lose") { this.actualRow.counter += 1 }
      else {
        this.actualRow.type = "lose";
        this.actualRow.counter = 1;
      }
    };

    this.percentage = this.getPercentage();
    this.sendQuestion(question, correct);

    if (this.questionCounter === this.questionNB) { this.isOver = true }
  }

  //relaod a new question
  nextQuestion(): void {
    this.isOver = false
    this.answered = false;
    this.result = "";
    this.loading = "Loading ..."
    //this.question = this.questionService.getQuestion();
    this.questionService.getQuestion().subscribe(value => {
      this.question = value;
      this.loading = "";
    })

    this.randomI = this.getRandomInt();
    this.index0 = this.getIndex(0);
    this.index1 = this.getIndex(1);
    this.index2 = this.getIndex(2);
    this.index3 = this.getIndex(3);
    console.log(this.randomI)
  }

  nextSerie(): void {
    this.isOver = false;
    this.counterGoodAnswer = 0;
    this.questionCounter = 0;
    this.percentage = 0;
    this.nextQuestion()
  }

  //functiun that return true if the parameter is the index of the good answer
  getIndex(i: number): boolean {
    if (i === this.randomI) { return true }
    else return false
  }

  //return 0,1,2 or 3 the random place of the good answer
  getRandomInt(): number {
    let max = Math.floor(3);
    return Math.floor(Math.random() * (max + 1));
  }

  getPercentage(): number {
    if (this.questionCounter === 0) { return 0 }
    else {
      return Math.round((this.counterGoodAnswer / this.questionCounter) * 10000) / 100;
    }
  }

  sendQuestion(question: Question, answer: boolean): void {
    console.log("sending");
    this.questionService.addQuestion(question);
    let newAnswer: Answer = { category: question.category, answer: answer, difficulty: question.difficulty, id: question.id, asked: 1 }
    this.alreadyAsked = this.questionService.addAnswer(newAnswer)
  }

  ngOnInit(): void {
    //this.question = this.questionService.getQuestion();
    this.questionService.getQuestion().subscribe(value => {
      this.question = value;
      this.loading = "";
    })
  }
}
