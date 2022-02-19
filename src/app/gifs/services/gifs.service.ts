import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[]= [];
  private apiKey : string= "6XksuQ6PMly9F066phbvQMJEsqWwrNNO";

  public resultados: Gif[] = [];
  private servicioUrl: string = "https://api.giphy.com/v1/gifs";

  get historial(){
    return [...this._historial];
  }

  constructor(private http:HttpClient){

    if(localStorage.getItem("historial")){
      this._historial=JSON.parse(localStorage.getItem("historial")!) || [];
    }

    if(localStorage.getItem("ultimaBusqueda")){
      this.resultados=JSON.parse(localStorage.getItem("ultimaBusqueda")!) || [];
    }

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

      localStorage.setItem("historial", JSON.stringify(this._historial));


    }

    const params= new HttpParams()
          .set('api_key',this.apiKey)
          .set('limit',"10")
          .set('q', query);




    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
    .subscribe((resp) =>{
      this.resultados= resp.data;
      localStorage.setItem("ultimaBusqueda", JSON.stringify(this.resultados));
    });
  }
}
