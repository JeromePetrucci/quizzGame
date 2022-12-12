export interface Question{
    category: string,	//"Society & Culture"
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

