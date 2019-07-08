import { Component } from '@angular/core';
import { RestService } from './rest.service';
import { HttpErrorResponse } from '../../node_modules/@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  movie:any;
  movieTitle = "";
  title = 'Movie App';

  constructor(public rest:RestService){}
  ngOnInit(){
     this.getToken();
     this.getMovie(this.movieTitle);
  }

  getToken() {
    this.movie = {};
    this.rest.login("johndoe","Ab123456*-").subscribe((data:{})=>{
      
    });
  }
  getMovie(movieTitle:string){    
    this.rest.getMovie(movieTitle).subscribe(
      data => this.movie = data,
        error => this.movie=null
    );
  }
}
