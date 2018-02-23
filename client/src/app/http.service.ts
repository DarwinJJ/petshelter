import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {

  constructor( private _http: HttpClient) { }

  getAllPets(){
    return this._http.get('/pets');
  }

  addAPet(pet){
    return this._http.post('/pets', pet);
  }

  findOnePet(petID){
    return this._http.get('/pets/'+petID)
  }

  updateOnePet(petID, pet) {
    return this._http.put('/pets/' + petID, pet)
  }

  deleteOnePet(petID){
    return this._http.delete('/pets/'+petID)
  }

}

