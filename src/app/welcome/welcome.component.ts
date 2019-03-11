import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, AfterViewInit {

  // graphVal : any;
  // canAnswer : boolean;

  /** Template reference to the canvas element */
  @ViewChild('canvasEl') canvasEl: ElementRef;

  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;

  dominant = 5;
  constructor(
  ) { 

  }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
  
    this.draw();
  }


  draw(){
        this.context.beginPath();
        this.context.font = "12px Arial";
        this.context.lineWidth = 1;
        this.context.strokeStyle = "orange";

        this.context.fillText("Graph 1, MOST",60,15);
        this.context.fillText("Mask, Public",65,35);

        this.context.fillText("D = "+this.dominant,30,55);
        this.context.fillText("I = "+this.dominant,70,55);
        this.context.fillText("S = "+this.dominant,110,55);
        this.context.fillText("C = "+this.dominant,150,55);

        
        // vertical
        this.context.fillText("D",30,90);
        this.context.moveTo(20, 500);
        this.context.lineTo(20, 100);
        
        this.context.fillText("I",70,90);
        this.context.moveTo(60, 500);
        this.context.lineTo(60, 100);
        
        this.context.fillText("S",110,90);
        this.context.moveTo(100, 500);
        this.context.lineTo(100, 100);
        
        this.context.fillText("C",150,90);
        this.context.moveTo(140, 500);
        this.context.lineTo(140, 100);
        
        this.context.moveTo(180, 500);
        this.context.lineTo(180, 100);
        
        //horizontal
        // axis zero
        this.context.fillText("0",190,310);
        this.context.moveTo(20, 300);
        this.context.lineTo(180, 300);
        
        //up
        this.context.fillText("8",190,110);
        this.context.moveTo(20, 100);
        this.context.lineTo(180, 100);   
        
        //botttom
        this.context.fillText("-8",190,500);
        this.context.moveTo(20, 500);
        this.context.lineTo(180, 500);
        
        this.context.stroke();
        this.context.closePath();
        
        this.context.beginPath();  
        this.context.lineWidth = 1;
        this.context.strokeStyle = "orange";
        this.context.setLineDash([5, 3]);
        
        //up   
        this.context.fillText("6",190,160);
        this.context.moveTo(20, 150);
        this.context.lineTo(180, 150);
        
        this.context.fillText("4",190,210);
        this.context.moveTo(20, 200);
        this.context.lineTo(180, 200); 
        
        this.context.fillText("2",190,260);
        this.context.moveTo(20, 250);
        this.context.lineTo(180, 250); 
        
        //bottom
        this.context.fillText("-2",190,360);
        this.context.moveTo(20, 350);
        this.context.lineTo(180, 350);        

        this.context.fillText("-4",190,410);
        this.context.moveTo(20, 400);
        this.context.lineTo(180, 400);
        
        this.context.fillText("-6",190,455);
        this.context.moveTo(20, 450);
        this.context.lineTo(180, 450);        
        
        this.context.stroke();
        this.context.closePath();

        //value 
        this.context.beginPath();
        this.context.lineWidth = 2;
        this.context.setLineDash([0, 0]);
        this.context.strokeStyle = "blue";
        this.context.fillStyle = "blue";
        
        this.context.arc(40,300, 2, 0, 2 * Math.PI);
        this.context.moveTo(40, 300);
        this.context.lineTo(80, 290);  
        
        this.context.arc(80,290, 2, 0, 2 * Math.PI);
        this.context.moveTo(80, 290);
        this.context.lineTo(120, 280); 
        
        this.context.arc(120,280, 2, 0, 2 * Math.PI);
        this.context.moveTo(120, 280);
        this.context.lineTo(160, 270); 
        
        this.context.arc(160,270, 2, 0, 2 * Math.PI);

        this.context.stroke();
        this.context.closePath();
  }

}
