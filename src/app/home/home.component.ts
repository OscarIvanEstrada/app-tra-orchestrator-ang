import { Component } from '@angular/core';

import { GatewayService } from '../services/gateway-service';
import { Router } from '@angular/router';
import { WebSocketAPI } from '../services/WebSocketAPI';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 
  processes;
  responses;
  showProgress: boolean = false;

  webSocketAPI: WebSocketAPI;
  greeting: any;
  name: string;

  messages: string[] = new Array();
  
  constructor(private router: Router , private gatewayService: GatewayService) { 
    this.webSocketAPI = new WebSocketAPI(this);
    
    this.gatewayService.getData('/process').subscribe(
      result => {
        this.processes = result; 
    }); 
    this.connect();
  }

  goToFlowChart(name:string){

    this.router.navigateByUrl('orchestrator/'+name);
    
  }


  runProcess(name:string){
    this.showProgress = true;
    this.messages = new Array();
    this.gatewayService.postData('/excecute',name).subscribe(
      result => {
        
        this.responses = result;
        if(result != null){
          this.showProgress=false;
        }
    });    
  }


  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message){
   
    var obj = JSON.parse(message);
        console.log(JSON.parse(obj));  
    this.messages.push(JSON.parse(obj)); 
  }


}

