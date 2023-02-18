import { Component } from '@angular/core';

import { products } from '../products';
import { GatewayService } from '../services/gateway-service';
import { Data } from '../model/data';
import * as html2pdf from 'html2pdf.js';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-flow-chart',
  templateUrl: './flow-chart.component.html',
  styleUrls: ['./flow-chart.component.css']
})
export class FlowChartComponent {
 
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = true;
  data;
  constructor( private gatewayService: GatewayService,private _formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {

    var process = this.route.snapshot.paramMap.get('process');
   
    this.gatewayService.getData('/process/'+process).subscribe(
      result => {          
        this.data = result;
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  save(){
    
    this.gatewayService.putData('/process',this.data).subscribe(
      result => {
        console.log(result); 
    });    
  }
  submitted = false;

  add() {
   this.data.services.push(this.data.services[this.data.services.length-1]);
  }


  delete(index : number) {
    this.data.services.splice(index, 1);
   }
  

  onSubmit() { this.submitted = true; }
}