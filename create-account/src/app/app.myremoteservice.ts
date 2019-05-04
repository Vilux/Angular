import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
 
import { Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
 
@Injectable()
export class MyRemoteService {
    public site:string;
    constructor(private http: Http) { 
       this.site = "https://asgn1webapi20190128094358.azurewebsites.net/api/clientaccount/"
    }
 
    // GET temperature in Celsius.
    getList(): Observable<string[]> {
        return this.http.get(this.site)
        .pipe(map(this.extractData),
         catchError(this.handleError.bind(this)))
    }

    getAccount(cliId, accId): Observable<string[]> {
        let url     = this.site + 'accountinfo?accId=' + accId + '&cliId=' + cliId;;
        return this.http.get(url)
        .pipe(map(this.extractData),
         catchError(this.handleError.bind(this)))
    }
 
    // POST 
    createItem(balance, cliId, accId): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/json',
                                    'Accept':'application/json'}); 
        let data = {"balance":balance, "accountID":accId, "clientID":cliId};
        return this.http.post(this.site, data, {headers}) 
                        .pipe(map(this.extractData),
                         catchError(this.handleError.bind(this)))
    } 
 
    // Edit (PUT) 
    editItem(cliId, accId, balance): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/json',
                                    'Accept':'application/json'}); 
        let url     = this.site + "MyEdit";
        let data    = {"accountID":accId, "clientID":cliId, "balance":balance};
        return this.http.put(url, data, {headers}) 
        .pipe(map(this.extractData),
         catchError(this.handleError.bind(this)));
    } 
 
    // Delete (delete) 
    deleteItem(cliId, accId): Observable<Comment[]> {
        let url     = this.site + "MyDelete?accID=" + accId + "&cliID=" + cliId;
 
        return this.http.delete(url)
        .pipe(map(this.extractData),
         catchError(this.handleError.bind(this)));
    } 
 
    // Retreival of JSON from .NET is a success.
    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
 
    // An error occurred. Notify the user.
    private handleError(error: any) {
        throw(error);
    }
}
