import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  pet = {}
  p_id : any
  errMessage : any
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => { this.p_id = params.id })
    this._httpService.findOnePet(this.p_id).subscribe(data => {
      this.pet = data
      console.log(this.pet);
    })
  }

  onSubmit(){
    this._httpService.updateOnePet(this.p_id, this.pet).subscribe(data => {
      if(data["error"]){
        this.errMessage = data['error']
      }else{
        console.log(data['db']);
        this._router.navigate([''])
      }
    })
  }


}
