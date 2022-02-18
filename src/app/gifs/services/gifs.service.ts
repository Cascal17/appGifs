import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[]= [];

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query: string){
    query=query.trim().toLowerCase();
    if(!this._historial.includes(query) && query.length!==0){

      if(this._historial.length==5){
        this._historial.pop();
        this._historial.unshift(query);
      }else{
        this._historial.unshift(query);
      }
    }


    console.log(this._historial);
  }
}
