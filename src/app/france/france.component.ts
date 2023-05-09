import { Component } from '@angular/core';
import { Maps, Zoom, Selection } from '@syncfusion/ej2-angular-maps';
import { france_map } from '../../assets/france-map';
import { Departement } from '../question';
import { QuestionService } from '../question.service';
Maps.Inject(Zoom, Selection);

@Component({
  selector: 'app-france',
  templateUrl: './france.component.html',
  styleUrls: ['./france.component.css']
})
export class FranceComponent {
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
    this.listName = this.listCapitals.map(c => { return c.name.toLowerCase() })
    this.dataSource = [];
  }

  //Initialisation varibles
  listCapitals: Departement[] = [];
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
  public shapeData: object = france_map;
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
    this.questionService.getDepartement().subscribe(value => {
      this.listCapitals = value;
      this.listName = value.map(c => { return c.name.toLowerCase() })
    });
    this.dataSource = [
      //{ "Country": "Rhône", "population": "Neutral" },
    ];
  }

}
