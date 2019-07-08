import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:13388/api/';
const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    observe:'response'
    };

@Injectable({
  providedIn: 'root'
})
export class RestService {

  
  constructor(private http: HttpClient) { 
    
  }

  login(Username: string, Password: string) {
      return this.http.post<string>(endpoint+'Token', { Username, Password })
      .pipe(map(user => {
        if (user) {
            localStorage.setItem('currentUser', user);
        }
        return user;
    }));
    }
  getMovie(movieTitle:string): Observable<any> {
    var token = "Bearer "+localStorage.getItem('currentUser').replace('"','').replace('"','');
    return this.http.get(endpoint+'Movie?Title='+movieTitle,{
      headers: new HttpHeaders({ 'Content-Type': 'application/json',"Authorization":token })})
    .pipe(
      map(this.extractData));
  }

    
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
}
