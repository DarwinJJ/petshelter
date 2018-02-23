import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  pets : any

  constructor(private _httpService : HttpService) { }

  ngOnInit() {
    this.showAll();
  }

  showAll(){
    let observabel = this._httpService.getAllPets()
    observabel.subscribe(data =>{
      this.pets = data['db'].sort((a, b) => a.type < b.type ? -1 : a.type > b.type ? 1 : 0)
    })
  }

}
