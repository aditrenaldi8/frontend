export class Statements{
    statement : string;
    value : string;
    like : boolean;
    dislike : boolean;
    likeValue : string;
    dislikeValue : string;

    constructor(data: any = []){
        this.statement = data.statement || '';
        this.value = data.value || '';
        this.like = data.like || false;
        this.dislike = data.dislike || false;
        this.likeValue = data.likeValue || '';
        this.dislikeValue = data.dislikeValue || '';
    }
}