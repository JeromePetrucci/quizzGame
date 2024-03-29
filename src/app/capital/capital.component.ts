import { Component } from '@angular/core';
import { Capital, EMPTY_CAPITAL } from '../question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styleUrls: ['./capital.component.css']
})

export class CapitalComponent {
  getRandomInt(max: number): number {
    return Math.floor(Math.random() * (max + 1))
  }

  getIndex(i: number): boolean {
    return (i === this.randomI)
  }

  getWrongAnswerInd(correct: number, length: number): number[] {
    let listNum: number[] = []
    while (listNum.length < 3) {
      let ind: number = this.getRandomInt(length)
      while (ind === correct || listNum.includes(ind)) {
        ind = this.getRandomInt(length)
      }
      listNum.push(ind)
    }
    return listNum
  }

  getWrongAnswer(correct: Capital): Capital[] {
    let listNum: Capital[] = []
    while (listNum.length < 3) {
      let cap: Capital = this.listCapitals[this.getRandomInt(196)]
      while (cap === correct || listNum.includes(cap)) {
        cap = this.listCapitals[this.getRandomInt(196)]
      }
      listNum.push(cap)
    }
    return listNum
  }

  onAnswer(rep: boolean) {
    if (this.counter === 0) {
      this.lastCapitals = this.listCapitals
    }

    this.answered = true
    this.isCorrect = rep
    this.answerCounter += 1

    if (rep) {
      this.counter += 1;
      this.lastCapitals = this.lastCapitals.filter(cap => cap.id != this.correctReponse.id)
    }
    if (this.counter === 197) {
      this.lastCapitals = this.listCapitals
      this.counter = 0
      this.answerCounter = 0
    }
    if (this.answerCounter === this.questionNB || this.answerCounter === 197) {this.isOver = true}
    this.percentage = this.getPercentage();
  }

  nextQuestion() {

    this.answered = false;
    this.isCorrect = false;
    this.index = this.getRandomInt(this.lastCapitals.length - 1)
    this.correctReponse = this.lastCapitals[this.index]
    this.otherResponse = this.getWrongAnswer(this.correctReponse)

    this.randomI = this.getRandomInt(3);
    this.index0 = this.getIndex(0);
    this.index1 = this.getIndex(1);
    this.index2 = this.getIndex(2);
    this.index3 = this.getIndex(3);
  }

  nextSerie(){
    this.isOver = false;
    this.answerCounter = 0;
    this.counter = 0;
    this.percentage = this.getPercentage();
    this.nextQuestion();
  }

  constructor(private questionService: QuestionService) { }

  //Initialisation
  listCapitals: Capital[] = [];
  index: number = this.getRandomInt(197);
  wrongIndex: number[] = this.getWrongAnswerInd(this.index, 197)
  correctReponse: Capital = EMPTY_CAPITAL;
  otherResponse: Capital[] = [EMPTY_CAPITAL, EMPTY_CAPITAL, EMPTY_CAPITAL]
  randomI = this.getRandomInt(3);
  index0 = this.getIndex(0);
  index1 = this.getIndex(1);
  index2 = this.getIndex(2);
  index3 = this.getIndex(3);

  //Variables
  isCapital: boolean = true;

  answered: boolean = false;
  isCorrect: boolean = true;
  isOver: boolean = false;

  questionNB = this.questionService.questionNB;
  counter: number = 0;
  answerCounter: number = 0;
  percentage: number = this.getPercentage();
  lastCapitals: Capital[] = []

  ngOnInit(): void {
    this.questionService.getCapitals().subscribe(value => {
      this.listCapitals = value;
      this.correctReponse = value[this.index];
      this.otherResponse = [value[this.wrongIndex[0]], value[this.wrongIndex[1]], value[this.wrongIndex[2]]]
    }
    );
  }

  getPercentage(): number {
    if (this.answerCounter === 0) { return 0 }
    else {
      return Math.round((this.counter / this.answerCounter) * 10000) / 100;
    }
  }
}

