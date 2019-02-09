import { DISC } from './disc';

export class Result{
    public : DISC;
    private: DISC;
    percieved: DISC;

    constructor(){
        this.public = new DISC();
        this.private = new DISC();
        this.percieved = new DISC();
    }

    setValue(val : string, type: string){
        let data;
        if(type == 'public'){
            data = this.public;
        }else{
            data = this.private;
        }

        if(val == 'd'){
            data.d += 1;
        }

        if(val == 'i'){
            data.i += 1;
        }

        if(val == 's'){
            data.s += 1;
        }

        if(val == 'c'){
            data.c += 1;
        }

        if(val == 'all'){
            data.all += 1;
        }

        this.setPercievedData();
    }

    setPercievedData(){
        this.percieved.d = this.public.d - this.private.d;
        this.percieved.i = this.public.i - this.private.i;
        this.percieved.s = this.public.s - this.private.s;
        this.percieved.c = this.public.c - this.private.c;
    }

    reset(){
        this.public = new DISC();
        this.percieved = new DISC();
        this.private = new DISC();
    }
}