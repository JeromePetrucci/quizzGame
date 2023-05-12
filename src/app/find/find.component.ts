import { Component } from '@angular/core';
import { Maps, Zoom, Selection, MapsComponent } from '@syncfusion/ej2-angular-maps';
import { world_map } from '../../assets/world-map';
import { Capital, OtherName } from '../question';
import { QuestionService } from '../question.service';
Maps.Inject(Zoom, Selection);

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent {
  constructor(private questionService: QuestionService,public mapObj: MapsComponent ) {
    
   }

  handleInput() {

    let value : string = this.toNeutralString(this.formValue)

    for (let other of this.listOtherName)  {
      if (value === other.name) {
        value = other.country
        break
      }
    }

    if (this.listName.includes(value)) {
      console.log(value)
      this.dataSource = this.dataSource.concat([{ "Country": value, "population": "Neutral" }])
      this.counter++;

      this.listName = this.listName.filter(name => (name != value))
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
    this.listName = this.listCapitals.map(c => { return this.toNeutralString(c.country) })
    this.dataSource = [];
    this.formValue = "";
  }

  //Accept more input
  toNeutralString (name:string){
    return name.toLowerCase().replaceAll('ô',"o").replaceAll(' ', '').replaceAll('-', '').replaceAll("'", '')
  }

  //Initialisation varibles
  listCapitals: Capital[] = [];
  listName: string[] = [];
  listOtherName: OtherName[] = [{name:"usa",country:'unitedstatesofamerica'},
  {name:"congo",country:'republicofcongo'},
  {name:"uk",country:'unitedkingdom'},
  {name:"uae",country:'unitedarabemirates'},
  {name:"salvador",country:'elsalvador'}
  // {name:"congo",country:'democraticrepublicofcongo'}

]


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
  //Selection settings
  public selectionSettings: object = {
    enable: true,
    fill: 'blue',
    border: { color: 'white', width: 2}
};
public initialShapeSelection = [
  { shapePath: 'continent', shapeValue: 'Africa' },
  { shapePath: 'name', shapeValue: 'India' }
];


select(){
  console.log (this.mapObj.shapeSelectionItem)
  //this.mapObj.shapeSelection(0, 'name', 'France', true);
};


  ngOnInit(): void {
    this.questionService.getCapitals().subscribe(value => {
      this.listCapitals = value;
      this.listName = value.map(c => { return this.toNeutralString(c.country)})
    });
    this.dataSource = [
      // { "Country": "france", "population": "Neutral" },
    ];
  }

}
