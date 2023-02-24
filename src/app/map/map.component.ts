import { Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { Maps, Zoom, Selection, MapsComponent } from '@syncfusion/ej2-angular-maps';
import { Observable } from 'rxjs';
import { world_map } from '../../assets/world-map';
import { Capital, EMPTY_CAPITAL } from '../question';
import { QuestionService } from '../question.service';
Maps.Inject(Zoom, Selection);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(private questionService: QuestionService,
    public mapObj: MapsComponent
  ) { }

  getIndex(i: number): boolean {
    return (i === this.randomI)
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * (max + 1))
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
    let listNum: Capital[] = [];
    let listChoice = this.listCapitals.filter(c => c.id !== correct.id);
    let listRegion = listChoice.filter(c => c.region === correct.region);
    let rand = this.getRandomInt(2);
    for (let i = 0; i < 3; i++) {
      let cap: Capital = EMPTY_CAPITAL
      if (i === rand) {
        cap = listChoice[this.getRandomInt(listRegion.length - 1)]
      }
      else {
        cap = listRegion[this.getRandomInt(listRegion.length - 1)]
      }
      listNum.push(cap)
      listChoice = listChoice.filter(c => c.id !== cap.id);
      listRegion = listRegion.filter(c => c.id !== cap.id);
    }
    return listNum
  }

  nextCountry(): void {
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

    if (this.counter < 197) {
      this.dataSource = [{ "Country": this.lastCapitals[this.index].country, "population": "Neutral" },]
      console.log(this.lastCapitals[this.index])
    }

    this.bubbleSettings = [{
      minRadius: 20,
      maxRadius: 40,
      visible: false,
      dataSource: [{ Country: this.correctReponse.country, population: '4000000' }],
      valuePath: 'population'
    }]

    this.counter += 1;

  }

  onAnswer(rep: boolean) {
    if (this.counter === 0) {
      this.lastCapitals = this.listCapitals
    }

    this.answered = true
    this.isCorrect = rep
    this.answerCounter += 1

    this.dataSource = [{ "Country": this.lastCapitals[this.index].country, "population": "Good" },
    { "Country": this.otherResponse[0].country, "population": "Wrong" },
    { "Country": this.otherResponse[1].country, "population": "Wrong" },
    { "Country": this.otherResponse[2].country, "population": "Wrong" },
    ]

    if (rep) {
      this.counter += 1;
      this.lastCapitals = this.lastCapitals.filter(cap => cap.id != this.correctReponse.id)
    }
    if (this.counter === 197) {
      this.lastCapitals = this.listCapitals
      this.counter = 0
      this.answerCounter = 0
    }
    //this.nextQuestion()

  }

  //Initialisation Question
  listCapitals: Capital[] = [];
  index: number = this.getRandomInt(197);
  correctReponse: Capital = EMPTY_CAPITAL;
  otherResponse: Capital[] = [EMPTY_CAPITAL, EMPTY_CAPITAL, EMPTY_CAPITAL]

  wrongIndex: number[] = this.getWrongAnswerInd(this.index, 197)
  randomI = this.getRandomInt(3);
  index0 = this.getIndex(0);
  index1 = this.getIndex(1);
  index2 = this.getIndex(2);
  index3 = this.getIndex(3);

  answered: boolean = false;
  isCorrect: boolean = true;

  counter: number = 0;
  answerCounter: number = 0;
  lastCapitals: Capital[] = [];

  //form variable
  filteredOptions: Observable<string[]> | undefined ;
  myForm : Capital = EMPTY_CAPITAL;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  newList = this.questionService.getCapitals();

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  /****************Map settings*************/
  //Zoom settings
  public zoomSettings: object = {
    enable: true,
    //enablePanning: true,
    //doubleClickZoom:true
  };

  //Selection settingq
  public selectionSettings: object = {
    enable: false,
    //fill: 'blue',
    //enableMultiSelect : true,
    //border: { color: 'white', width: 1}
  };

  public bubbleSettings: object = [{
    visible: false,
    minRadius: 20,
    dataSource: [
      { Country: 'India', population: '40000' },
    ],
    maxRadius: 40,
    valuePath: 'population'
  }]


  //Initialisation data
  public shapeData: object = world_map;
  public dataSource: object[] = [];
  public shapePropertyPath: string = "name";
  public shapeDataPath: string = "Country";
  public shapeSettings: object = {

    colorValuePath: 'population',
    colorMapping: [
      { value: 'Wrong', color: '#D84444' },
      { value: 'Good', color: '#50C878' },
      { value: 'Neutral', color: '#316DB5' },
    ]
  };
  ngOnInit(): void {
    //let newList = this.questionService.getCapitals();
    this.questionService.getCapitals().subscribe(value => {
      this.listCapitals = value;
      this.correctReponse = value[this.index];
      this.otherResponse = [value[this.wrongIndex[0]], value[this.wrongIndex[1]], value[this.wrongIndex[2]]]
      this.dataSource = [
        { "Country": value[this.index].country, "population": "Neutral" },
        //{ "Country": "Antigua and Barbuda", "population": "Neutral" },
        // { "Country": "Vatican", "population": "Neutral" },


      ];
      console.log(value[this.index])
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    }
    );



  }
}
