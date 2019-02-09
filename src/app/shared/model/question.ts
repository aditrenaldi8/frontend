import { Statements } from './statement';

export class Question{
    statements: Statements[];
    like: string;
    dislike: string;
    
    constructor(data: any = {}){
        this.statements = data ? this.setData(data) : null;
        this.like = data.like || "";
        this.dislike = data.dislike || "";
    }

    setData(data : any){
        return data.map(value => 
           new Statements(value)
        )
    }
}