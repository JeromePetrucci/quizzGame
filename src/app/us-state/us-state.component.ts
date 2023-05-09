import { Component } from '@angular/core';
import { Maps, Zoom, Selection } from '@syncfusion/ej2-angular-maps';
import { us_map } from '../../assets/us-map';
import { alaska_map } from '../../assets/alaska-map';
import { State } from '../question';
import { QuestionService } from '../question.service';
Maps.Inject(Zoom, Selection);

@Component({
  selector: 'app-us-state',
  templateUrl: './us-state.component.html',
  styleUrls: ['./us-state.component.css']
})
export class UsStateComponent {
  constructor(private questionService: QuestionService) { }

  handleInput() {

    if (this.listName.includes(this.formValue.toLocaleLowerCase())) {
      console.log(this.formValue)
      this.dataSource = this.dataSource.concat([{ "Country": this.formValue, "population": "Neutral" }])
      this.counter++;

      this.listName = this.listName.filter(name => (name != this.formValue))
      //console.log(this.listName)
      this.formValue = "";
    }
    if (this.counter === 96){
      this.isOver = true;
    }

  }

  onReset(){
    this.isOver = false;
    this.counter = 0;
    this.listName = this.listCapitals.map(c => { return c.state.toLowerCase() })
    this.dataSource = [];
  }

  //Initialisation varibles
  listCapitals: State[] = [];
  listName: string[] = [];

  formValue: string = "";
  counter: number = 0;
  isOver: boolean = false;

  /*************************************Map settings**************************************/
  //Zoom setting
  public zoomSettings: object = {
    enable: true,
    //enablePanning: true,
    //doubleClickZoom:true
  };

 
  //Initialisation map data
  public shapeData: object = us_map;
  public shapeData2: object = alaska_map;
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
    this.questionService.getState().subscribe(value => {
      this.listCapitals = value;
      this.listName = value.map(s => { return s.state.toLowerCase() })
    });
    this.dataSource = [
      //{ "Country": "Rhône", "population": "Neutral" },
    ];
  }

}
