import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  pet = {}
  p_id : any

  constructor(
    private _httpService : HttpService,
    private _route : ActivatedRoute,
    private _router : Router,

  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {this.p_id = params.id})
    this._httpService.findOnePet(this.p_id).subscribe(data =>{
      this.pet = data
      console.log(this.pet);
      
    })
  }

  likePet(){
    this.pet['like'] += 1
    this._httpService.updateOnePet(this.p_id, this.pet).subscribe()
  }

  deletePet(petID){
    let observabel = this._httpService.deleteOnePet(petID).subscribe()
    this._router.navigate([''])

  }

}
