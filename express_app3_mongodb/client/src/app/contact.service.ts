import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable,of } from 'rxjs';
import { catchError,map,tap} from "rxjs/operators";
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  constructor(private http : Http) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getContacts() : Observable<Contact[]>{
    return this.http.get('http://localhost:4000/api/contactsList')
    .pipe(map(res=>res.json()),
          catchError(this.handleError<Contact[]>('getHeroes', []))
    )    
  }

  addContact(newContact){
    let headers=new Headers ();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
            return this.http.post('http://localhost:4000/api/contact', newContact, options)
            .pipe(map(res=>res.json()));
  }

  editContact(editContact){
    let headers=new Headers ();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    
            return this.http.put('http://localhost:4000/api/contactedit/'+editContact._id, editContact, options)
            .pipe(map(res=>res.json()));
  }

  deleteContact(id){
    return this.http.delete('http://localhost:4000/api/contact/'+id)
    .pipe(map(res=>res.json()));
  }
}
