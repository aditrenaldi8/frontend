import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { AppHelper } from '../helper/app.helper';
import { Router } from '@angular/router';
import { UserList } from '../shared/model/user-list';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private appService: AppService,
    private helper : AppHelper,
    private router : Router
  ) { }


  ngOnInit() {
    const account = JSON.parse(localStorage.getItem('account'));
    if(account != 'ADMIN'){
      this.router.navigate(['/home']);
    }
    this.initForm();
    this.getDataList();
  }

  form: FormGroup;
  data: UserList[] = [];

  displayedColumns: string[] = ['no','nama', 'email', 'phone', 'result', 'waktu'];

  length: number;
  pageSize:number = 10;
  pageSizeOptions: number[] = [10];
  page: number = 0;
  step: number = 0;

  title: string;

  graph:any;
  user: any;

  // MatPaginator Output
  pageChangeEvent(event : PageEvent){
    this.page = (event.pageIndex * this.pageSize);
    this.getDataList();
  }

  initForm(){
    this.form = new FormGroup({
      name : new FormControl(''),
      email : new FormControl(''),
      startDate : new FormControl(),
      endDate : new FormControl()
    })
  }

  setStep(index: number) {
    this.step = index;
  }

  search(){
    this.page = 0;
    this.getDataList();
  }

  getDataList(){
    let params = this.buildPayload()

    this.appService.changeCloak(false);
    this.appService.getUserList(params).subscribe(
      response=>{
        this.appService.changeCloak(true);
        this.data = response.data;
        this.changeDateFormat();
        this.length = response.countFilterData;
      },
      error=>{
        this.appService.changeCloak(true);
        if(error.status == 401){
          this.appService.changeMessage('Otorisasi tidak Sah, Silahkan Login Ulang');
        }else{
          this.appService.changeMessage('Gagal mendapatkan data')
        }
        this.helper.openSnackBar();
        console.log(error);
      }
    )
  }

  buildPayload(){
    const data =  {
      "email": this.form.get('email').value,
	    "name": this.form.get('name').value,
      "endDate": this.form.get('endDate').value ? this.helper.changeDateFormat2(this.form.get('endDate').value) : '',
      "length": this.pageSize,
      "start": this.page,
      "startDate": this.form.get('startDate').value ? this.helper.changeDateFormat2(this.form.get('startDate').value) : ''
    }
    return data;
  }

  changeDateFormat(){
    this.data.map(value =>{
      if(value.kuis_date){
         value.kuis_date = this.helper.changesDateFormat(value.kuis_date);
      }
    })
  }

  getData(data: any){
    if(data.has_kuis){
      this.getUserDetail(data);
    }
  }

  getUserDetail(data: any){
    let params = {id : data.id}

    this.appService.changeCloak(false);
    this.appService.getUserDetail(params).subscribe(
      response=>{
        this.appService.changeCloak(true);
        this.graph = response;
        this.setStep(1);
        this.title = data.name;
        this.user = data;
      },
      error=>{
        this.appService.changeCloak(true);
        if(error.status == 401){
          this.appService.changeMessage('Otorisasi tidak Sah, Silahkan Login Ulang');
        }else{
          this.appService.changeMessage('Gagal mendapatkan data')
        }
        this.helper.openSnackBar();
        console.log(error);
      }
    )
  }

}
