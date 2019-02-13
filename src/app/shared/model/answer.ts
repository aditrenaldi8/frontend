import { Question } from './question';
import * as _ from 'lodash';

export class Answer{
    most : string;
    least : string;
    mostVal : string;
    leastVal : string;

    constructor(data : Question = null){
        if(data){
            this.setVal(data)
        }
    }

    setVal(data : Question){
        const likes = _.find(data.statements, item => item.like == true );
        const dislikes = _.find(data.statements, item => item.dislike == true );

        if(likes){
            this.most = likes.value;
            this.mostVal = likes.likeValue;
        }

        if(dislikes){
            this.least = dislikes.value;
            this.leastVal = dislikes.dislikeValue;
        }
    }
}