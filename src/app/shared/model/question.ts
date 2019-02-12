import { Statements } from './statement';

export class Question{
    statements: Statements[];
    like: string;
    dislike: string;
    valid: boolean;
    
    constructor(data: any = {}){
        this.statements = data ? this.setData(data) : null;
        this.like = data.like || "";
        this.dislike = data.dislike || "";
        this.valid = false;
    }

    setData(data : any){
        return data.map(value => 
           new Statements(value)
        )
    }
}