import { Component } from '@angular/core';
import { QuestionService } from '../question.service';
import { Category } from '../question';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

constructor(private questionService: QuestionService){}

categories :Category[]  = [{name:"General Knowledge", completed : true, requestName:"general_knowledge"},
{name:"Society & Culture", completed : true, requestName: "Society_and_culture"},
{name:"History", completed : true , requestName:"history"},
{name:"Sport & Leisure", completed : true , requestName:"sport_and_leisure"},
{name:"Geography", completed : true , requestName: "geography"},
{name:"Music", completed : true , requestName:"music"},
{name:"Film & TV", completed : true , requestName: "film_and_TV"},
{name:"Science", completed : true , requestName: "science"},
{name:"Food & Drink", completed : true , requestName: "food_and_drink"},
{name:"Arts & Literature", completed : true, requestName:"arts_and_Literature" }]

AllChecked :boolean = true;

difficulties : string[] = ["easy","medium","hard","All"]
selectedDifficulty: string = "All"

questionNBchoice: (number| null)[] = [10,20,50,100, null]
questionNB: number| null = 10
mapNB: number| null = 10
ccfNB: number| null= 10

onChage(cat : Category){
  if (cat.completed) {this.AllChecked = false}
  else {
    let allComplete : boolean = true
    this.categories.forEach(c => {if (c != cat &&  !c.completed){allComplete = false}});
    if (allComplete){this.AllChecked = true}
  }
  cat.completed = !cat.completed;
}

setAll(completed: boolean) {
  this.AllChecked = completed;
  this.categories.forEach(c => (c.completed = completed));
}

setCategories() {
  this.questionService.allCategories = this.AllChecked;
  let categoryList : Category [] = [];
  this.categories.forEach( c => {if (c.completed) { categoryList.push(c)}})
  this.questionService.setCategories(categoryList)
  this.questionService.difficulty = this.selectedDifficulty;
  this.questionService.questionNB = this.questionNB;
}

setNBmap(){
  if (this.mapNB !== null){
    this.questionService.questionNB = this.mapNB;
  }
  else {this.questionService.questionNB = 197;}
}


ngOnInit(): void {
}

}
