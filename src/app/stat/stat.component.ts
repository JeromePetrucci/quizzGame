import { Component } from '@angular/core';
import { Answer, Stat } from '../question';
import { QuestionService } from '../question.service';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class StatComponent {

  constructor(private questionService: QuestionService) {}
  
  displayedColumns: string[] = ['category','difficulty', 'questions', 'good_answers', 'percentage'];
  displayedColumnsExtended: string[] = ['difficulty', 'questions', 'good_answers', 'percentage'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Stat | null = null;
  dataSource: Stat[] = [];
  data: Answer[] = [];

  showData: boolean = false;

  createDataByCategories():void{
    this.showData = false;
    this.dataSource = [];
    console.log(this.data)
    let categories: string[] = [];
    this.data.map( answer => {
      if (!categories.includes(answer.category)){
          categories.push(answer.category);
          let thisCategorylist: Answer[] = this.data.filter(an => an.category === answer.category)
          let newQuestion : number=  thisCategorylist.length;
          let newGoodAnswers: number =  thisCategorylist.filter(an => an.answer === true).length;
          let newPercentage: number = Math.round((newGoodAnswers / newQuestion )*10000)/100;
         
          let newAllStat: Stat[] = this.getOtherStat(thisCategorylist,answer.category, "difficulty");

          let newStat: Stat = {category : answer.category,
            difficulty: "All", 
            questions: newQuestion,
            good_answers: newGoodAnswers,
            percentage: newPercentage,
            allStat:newAllStat,};
          this.dataSource.push(newStat)

        }
      })
      this.addAll();
      this.showData = true;
  }

  createDataByDifficulties ():void{
    this.showData = false;
    this.dataSource = [];
    let difficulties: string[] = [];
      this.data.map( answ => {
            if (!difficulties.includes(answ.difficulty)){
              difficulties.push(answ.difficulty);
              let newQuestion2 : number=  this.data.filter(an => an.difficulty === answ.difficulty).length;
              let newGoodAnswers2: number =  this.data.filter(an => an.difficulty === answ.difficulty && an.answer === true).length;
              let newPercentage2: number = Math.round((newGoodAnswers2 / newQuestion2 )*10000)/100;
              let newAllStat: Stat[] = this.getOtherStat(this.data.filter(an => an.difficulty === answ.difficulty),"All", "category");
              let newStat2: Stat = {category : "All", 
                difficulty : (answ.difficulty) ? answ.difficulty : "unknown",
                questions: newQuestion2,
                good_answers: newGoodAnswers2,
                percentage: newPercentage2,
                allStat: newAllStat,};
              this.dataSource.push(newStat2)
            }
          })
        this.addAll();
      this.showData = true;
  }

  addAll(): void {
    let newQuestion : number=  this.data.length;
    let newGoodAnswers: number =  this.data.filter(an => an.answer === true).length;
    let newPercentage: number = 0
    if (newQuestion != 0){newPercentage = Math.round((newGoodAnswers / newQuestion )*10000)/100;}
    let newStat: Stat = {category : "All",
      difficulty:"All",
      questions: newQuestion,
      good_answers: newGoodAnswers,
      percentage: newPercentage,
      allStat:[],};
    this.dataSource.push(newStat)
  }

  getOtherStat(data : Answer[], name : string, choise: "category" | "difficulty"): Stat[] {
    let addStat : Stat[] = []
    let choises: string[] = [];
    data.map( answ => {
      if (!choises.includes(answ[choise])){
        choises.push(answ[choise]);
        let newQuestion2 : number=  data.filter(an => an[choise] === answ[choise]).length;
        let newGoodAnswers2: number =  data.filter(an => an[choise] === answ[choise] && an.answer === true).length;
        let newPercentage2: number = Math.round((newGoodAnswers2 / newQuestion2 )*10000)/100;
        let newStat2: Stat = {category : name, 
          difficulty : (answ[choise]) ? answ[choise] : "unknown",
          questions: newQuestion2,
          good_answers: newGoodAnswers2,
          percentage: newPercentage2,
          allStat: []};
          addStat.push(newStat2)
      }
    })

    return addStat;

  }

  ngOnInit(): void {
    this.questionService.getStat().subscribe( response =>
      {
        this.data = response;
      }
      )
  }
  
}
