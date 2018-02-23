import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { HttpService } from '../http.service';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  pet = {}
  errMessage :any

  constructor(
    private _httpService :HttpService,
    private _route : ActivatedRoute,
    private _router : Router
  ) { }

  ngOnInit() {
    this.pet = {
      name: '',
      type: '',
      desc: '',
      skills: [],
      like : 0
    }
  }

  onSubmit(){
    let observable = this._httpService.addAPet(this.pet)
    observable.subscribe(data =>{
      console.log(data);
      if (data['error']){
        this.errMessage = data['error']
      }else{
        console.log("success");
        this.pet = {name: '', type: '', desc: '', skills: []}
        this._router.navigate([''])
      }
    })
  }

}

