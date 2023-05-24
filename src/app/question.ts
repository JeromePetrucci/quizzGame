export interface Question{
    category: string,
id: string,	//"622a1c367cc59eab6f95011b"
correctAnswer: string,	//"Holy Grail"
incorrectAnswers :string[]	,
// 0	"Sacred Grail"
// 1	"Holy Chalice"
// 2	"Sacred Chalice"
question:string,	//"What is the holy cup of Christ called?"
tags : string[],	
// 0	"christianity"
// 1	"society_and_culture"
type: string, //"Multiple Choice"
difficulty: string,//"easy"
regions: string[],//	[]
isNiche: boolean,//false
}

export interface Category{
    name:string,
    completed: boolean,
    requestName: string,
}

export interface Answer{
    category:string,
    difficulty: string,
    answer: boolean,
    id: string,
    asked: number,
}

export interface Capital{
    id: number,
    country:string,
    capital: string,
    region: string,
    code: string 
}

export let EMPTY_CAPITAL: Capital = {
    id : 0,
    country : "null",
    capital: "null",
    region: "Europe",
    code: "null"
}

export interface Stat{
    category:string,
    difficulty: string,
    questions: number,
    good_answers: number,
    percentage: number,
    allStat: Stat[],
}

export let EMPTY_QUESTION: Question = {
    category: "",	
    id: "0",	
    correctAnswer: "",	
    incorrectAnswers :[],
    question: "",	
    tags: [],	
    type: "", 
    difficulty: "",
    regions: [],
    isNiche:false,
}

export interface Departement{
    number: string,
    name:string,
    prefecture: string,
    region: number
}

export interface State{
    code: string,
    state:string,
    capital: string
}

export interface OtherName {
    name : string,
    country : string
}
