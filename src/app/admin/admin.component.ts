import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../service/app.service';
import { AppHelper } from '../helper/app.helper';
import { Router } from '@angular/router';
import { UserList } from '../shared/model/user-list';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;

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
  data: any[] = [];
  response: any = null;

  displayedColumns: string[] = ['no','nama', 'email', 'phone', 'result', 'waktu'];

  length: number;
  pageSize:number = 10;
  pageSizeOptions: number[] = [10];
  page: number = 0;
  step: number = 0;
  pageNo: number = 1;

  title: string;

  graph:any;
  user: any;

  // MatPaginator Output
  pageChangeEvent(event : PageEvent){
    this.page = (event.pageIndex * this.pageSize);
    this.pageNo = event.pageIndex + 1;
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
    this.pageNo = 1;
    this.paginator.pageIndex = 0;
    this.getDataList();
  }

  getDataList(){
    let params = this.buildPayload()

    this.appService.changeCloak(false);
    this.appService.getUserList(params, this.pageNo).subscribe(
      response=>{
        this.appService.changeCloak(true);
        this.response = response.datas;
        this.data = response.datas.data;
        this.changeDateFormat();
        this.length = response.datas.total;
      },
      error=>{
        this.appService.changeCloak(true);
        if(error.error == 'Provided token is expired'){
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
	    "username": this.form.get('name').value,
      "endDate": this.form.get('endDate').value ? this.helper.changeDateFormat2(this.form.get('endDate').value) : '',
      "startDate": this.form.get('startDate').value ? this.helper.changeDateFormat2(this.form.get('startDate').value) : ''
    }
    return data;
  }

  changeDateFormat(){
    this.data.map(value =>{
      if(value.kuis_date){
         value.updated_at = this.helper.changesDateFormat(value.updated_at);
      }
    })
  }

  getData(data: any){
    if(data.form_data){
      this.getUserDetail(data);
    }
  }

  getUserDetail(data: any){
    let params = {id : data.id}

    this.appService.changeCloak(false);
    this.appService.getUserDetail(params).subscribe(
      response=>{
        this.appService.changeCloak(true);
        console.log(response.datas)
        this.graph = response.datas ? response.datas[0] : null;
        this.setStep(1);
        this.title = data.name;
        this.user = data.assessments_result ? JSON.parse(data.assessments_result) : null;
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
