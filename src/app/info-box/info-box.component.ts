import { Component } from '@angular/core';

import { products } from '../products';
import { GatewayService } from '../services/gateway-service';
import { Data } from '../model/data';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css']
})
export class InfoBoxComponent {
  products = products;

  entry: any[] ;
  data: Data[] =[];
  
  constructor( private gatewayService: GatewayService) {
    
  }

  
share(url : string){
  if(url != ''){
    this.gatewayService.getData(url).subscribe(
      result => {
        this.entry = result.feed.entry;
        this.fill();
    });
    
  }
  
}

  fill() {
    var j = 0;
    var times = 0;
    for (var i = 0 ; i < this.entry.length ; i++){
      
      if(this.entry[i]['gs$cell'].row != 1){  
        
        if(times == 0){
          this.data[j] = new Data(); 
        }
        if(this.entry[i]['gs$cell'].col == 1){         
          this.data[j].name = this.entry[i]['gs$cell'].inputValue; 
          times++;     
        }
        if(this.entry[i]['gs$cell'].col == 2){
          this.data[j].value = this.entry[i]['gs$cell'].inputValue;                
          times++;
        }     
        
        if(times == 2){
          this.data[j].index = j;
          j++;
          times = 0;
        }
        
      }     
    }
  }

  generatePDF() {
    const options = {
      filename: 'export.pdf',
      html2canvas: {},
      jsPDF: { orientation: 'landscape' }
    }

    const content: Element = document.getElementById('info-wrapper');
    html2pdf().from(content).set(options).save();
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/