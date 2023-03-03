import { Component } from '@angular/core';
import { Maps, Zoom, Selection } from '@syncfusion/ej2-angular-maps';
import { world_map } from '../../assets/world-map';
import { Capital } from '../question';
import { QuestionService } from '../question.service';
Maps.Inject(Zoom, Selection);

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent {
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
    if (this.counter === 197){
      this.isOver = true;
    }

  }

  onReset(){
    this.isOver = false;
    this.counter = 0;
    this.listName = this.listCapitals.map(c => { return c.country.toLowerCase() })
    this.dataSource = [];
  }

  //Initialisation varibles
  listCapitals: Capital[] = [];
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
    this.questionService.getCapitals().subscribe(value => {
      this.listCapitals = value;
      this.listName = value.map(c => { return c.country.toLowerCase() })
    });
    this.dataSource = [
      //{ "Country": "france", "population": "Neutral" },
    ];
  }

}
