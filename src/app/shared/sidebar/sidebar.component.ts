import { Component} from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private gifsServide:GifsService){}

  get historial (){
    return this.gifsServide.historial;
  }

  buscar(argumento:string){
    this.gifsServide.buscarGifs(argumento);
  }
}


