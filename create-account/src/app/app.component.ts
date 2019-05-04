import { Component }        from '@angular/core';
import {  MyRemoteService } from './app.myremoteservice';
 
// This component consumes the re-usable service.
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    // Providers allow us to inject an object instance through the constructor.
    providers: [MyRemoteService]
})
export class AppComponent {
    
    remoteService: MyRemoteService;
 
    // For GET request of list.
    clientaccounts: Array<any>;
    accountinfo: Array<any>;
 
    // For single GET request.
    accountId:string;
    clientId:string;
 
    newAccId:string;
    newCliId:string;
    newItemBalance:string;
    editBalance:string
 
    // For newly created object (POST)
    newClientAccount: any;
 
    // Since using a provider above we can receive service.
    constructor(_remoteService: MyRemoteService) {
        this.remoteService = _remoteService;
        this.getClientAccountList();
    }

    balanceUpdate(e){
      this.editBalance = e.target.value;
  }
 
    getClientAccountList() {
        this.remoteService.getList()
        // Subscribe to observable.
        .subscribe(
            // Success.
            data => {
              let tempArray = []
              for(var i=0; i<data.length; i++) {
                  var obj = {"balance": data[i]["balance"], "clientID":data[i]["clientID"],
                              "accountID":data[i]["accountID"]}
                  console.log(JSON.stringify(obj));
                  tempArray.push(obj)
              }
              this.clientaccounts = tempArray;
            },
            // Error.
            error => {
                alert(error)
            });
    }

    getClientAccount(accId, cliId) {
        this.accountId = "";
        this.clientId = "";
        this.remoteService.getAccount(cliId, accId)
        // Subscribe to observable.
        .subscribe(
            // Success.
            data => {
              let tempArray = []
              for(var i=0; i<data.length; i++) {
                var obj = {"Balance": data[i]["Balance"], "Description": data[i]["Description"], 
                "FirstName": data[i]["FirstName"], "LastName":data[i]["LastName"]}     
                  console.log(JSON.stringify(obj));
                  tempArray.push(obj)
              }
              this.accountinfo = tempArray;
            },
            // Error.
            error => {
                alert(error)
            });
    }
 
    createClientAccount(balance, cliId, accId) {
        this.newAccId = ""; 
        this.newCliId = "";  
        this.newItemBalance = "";   
        this.remoteService.createItem(balance, cliId, accId)
            // Subscribe to observable.
            .subscribe(
                // Success.
                data => {
                    this.newClientAccount    = data;
                    this.getClientAccountList();
                },
                // Error.
                error => {
                    alert(error)
                });
    }
 
    editClientAccount(cliId, accId, balance) {
        this.remoteService.editItem(cliId, accId, balance)
            // Subscribe to observable.
            .subscribe(
                // Success.
                data => {
                    console.log(data);
                    this.getClientAccountList();
                },
                // Error.
                error => {
                    alert(error)
                }); 
    }
 
    deleteClientAccount(delCliId, delAccId) {
        this.remoteService.deleteItem(delCliId, delAccId)
            // Subscribe to observable.
            .subscribe(
                // Success.
                data => {
                    this.getClientAccountList();
                    console.log(data)
                },
                // Error.
                error => {
                    alert(error)
                });
    }
}
