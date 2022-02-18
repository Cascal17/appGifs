import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[]= [];
  private apiKey : string= "6XksuQ6PMly9F066phbvQMJEsqWwrNNO";

  //Cambiar any por su tipo correspondiente
  public resultados: any[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http:HttpClient){}

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

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=6XksuQ6PMly9F066phbvQMJEsqWwrNNO&q=${query}`)
    .subscribe((resp:any) =>{
      console.log(resp.data);
      this.resultados= resp.data;
    });
  }
}
