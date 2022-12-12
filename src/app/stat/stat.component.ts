import { Component } from '@angular/core';
import { Answer, Stat } from '../question';
import { QuestionService } from '../question.service';


@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})

export class StatComponent {

  constructor(private questionService: QuestionService) {}
  
  displayedColumns: string[] = ['category','difficulty', 'questions', 'good_answers', 'percentage'];
  dataSource: Stat[] = [];
  data: Answer[] = [];

  showData: boolean = false;

  createData():void{
    console.log(this.data)
    let categories: string[] = [];
    this.data.map( answer => {
      if (!categories.includes(answer.category)){
          console.log("here");
          categories.push(answer.category);
          let thisCategorylist: Answer[] = this.data.filter(an => an.category === answer.category)
          let newQuestion : number=  thisCategorylist.length;
          let newGoodAnswers: number =  thisCategorylist.filter(an => an.answer === true).length;
          let newPercentage: number = Math.round((newGoodAnswers / newQuestion )*10000)/100;
          let newStat: Stat = {category : answer.category,
            difficulty: "All", 
            questions: newQuestion,
            good_answers: newGoodAnswers,
            percentage: newPercentage};
          console.log(answer.category+newStat.category,newQuestion)
          this.dataSource.push(newStat)

          //***********************************DIFFICULTY*******************************************************************/
          // let difficulties: string[] = [];
          // thisCategorylist.map( answ => {
          //   if (!difficulties.includes(answ.difficulty)){
          //     difficulties.push(answ.difficulty);
          //     let newQuestion2 : number=  thisCategorylist.filter(an => an.difficulty === answ.difficulty).length;
          //     let newGoodAnswers2: number =  thisCategorylist.filter(an => an.difficulty === answ.difficulty && an.answer === true).length;
          //     let newPercentage2: number = Math.round((newGoodAnswers2 / newQuestion2 )*10000)/100;
          //     let newStat2: Stat = {category : answer.category, 
          //       difficulty : answ.difficulty,
          //       questions: newQuestion2,
          //       good_answers: newGoodAnswers2,
          //       percentage: newPercentage2};
          //     this.dataSource.push(newStat2)
          //   }
          // })

        }
      })
      let newQuestion : number=  this.data.length;
      let newGoodAnswers: number =  this.data.filter(an => an.answer === true).length;
      let newPercentage: number = 0
      if (newQuestion != 0){newPercentage = Math.round((newGoodAnswers / newQuestion )*10000)/100;}
      let newStat: Stat = {category : "All",
        difficulty:"All",
        questions: newQuestion,
        good_answers: newGoodAnswers,
        percentage: newPercentage};
      this.dataSource.push(newStat)
      
      this.showData = true;
  }

  ngOnInit(): void {
    this.questionService.getStat().subscribe( response =>
      {
        console.log("here1");
        this.data = response;
      }
      )
  }
  
}
