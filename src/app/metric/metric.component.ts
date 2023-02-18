import { Component, OnInit } from '@angular/core';

import { products } from '../products';
import { GatewayService } from '../services/gateway-service';
import { Data } from '../model/data';
import * as html2pdf from 'html2pdf.js';
import { Metric } from '../model/metric';

declare var jQuery: any;

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.css']
})
export class MetricComponent  implements OnInit {
  metric = new Metric();

  entry: any[] ;
  data: Data[] =[];
  title : string = '';
  constructor( private gatewayService: GatewayService) {
    
  }

  ngOnInit(){
    (function ($) {
      $(document).ready(function() {
        window.onload = function() {
          
        }
        $(document).on('click', 'button', function() {
          $('.sa-container').toggleClass('sa-animation-forwards');
          actionTimer();
        });
      });
      
      
      function actionTimer() {
        $('.sa-container').addClass('sa-animation-forwards');
          (function ($) {
            $.fn.countTo = function (options) {
              options = options || {};
      
              return $(this).each(function () {
                // set options for current element
                var settings = $.extend({}, $.fn.countTo.defaults, {
                  from:            $(this).data('from'),
                  to:              $(this).data('to'),
                  speed:           $(this).data('speed'),
                  refreshInterval: $(this).data('refresh-interval'),
                  decimals:        $(this).data('decimals')
                }, options);
      
                // how many times to update the value, and how much to increment the value on each update
                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                  increment = (settings.to - settings.from) / loops;
      
                // references & variables that will change with each update
                var self = this,
                  $self = $(this),
                  loopCount = 0,
                  value = settings.from,
                  data = $self.data('countTo') || {};
      
                $self.data('countTo', data);
      
                // if an existing interval can be found, clear it first
                if (data.interval) {
                  clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);
      
                // initialize the element with the starting value
                render(value);
      
                function updateTimer() {
                  value += increment;
                  loopCount++;
      
                  render(value);
      
                  if (typeof(settings.onUpdate) == 'function') {
                    settings.onUpdate.call(self, value);
                  }
      
                  if (loopCount >= loops) {
                    // remove the interval
                    $self.removeData('countTo');
                    clearInterval(data.interval);
                    value = settings.to;
      
                    if (typeof(settings.onComplete) == 'function') {
                      settings.onComplete.call(self, value);
                    }
                  }
                }
      
                function render(value) {
                  var formattedValue = settings.formatter.call(self, value, settings);
                  $self.html(formattedValue);
                }
              });
            };
      
            $.fn.countTo.defaults = {
              from: 0,               // the number the element should start at
              to: 0,                 // the number the element should end at
              speed: 1000,           // how long it should take to count between the target numbers
              refreshInterval: 100,  // how often the element should be updated
              decimals: 0,           // the number of decimal places to show
              formatter: formatter,  // handler for formatting the value before rendering
              onUpdate: null,        // callback method for every time the element is updated
              onComplete: null       // callback method for when the element finishes updating
            };
      
            function formatter(value, settings) {
              return value.toFixed(settings.decimals);
            }
          }(jQuery));
      
          jQuery(function ($) {
            // custom formatting example
            $('#count-number-1, #count-number-2').data('countToOptions', {
            formatter: function (value, options) {
              return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
            }
            });
      
            // start all the timers
            $('.timer').each(count);
      
            function count(options) {
            var $this = $(this);
            options = $.extend({}, options || {}, $this.data('countToOptions') || {});
            $this.countTo(options);
            }
          });
      }
    })(jQuery);
  }



  
share(url : string){
 
 
 
  if(url != ''){
    this.gatewayService.getData(url).subscribe(
      result => {
        this.entry = result.feed.entry;
        this.title = result.feed.title['$t'];
        console.log(result.feed);
        this.fill();
        jQuery.actionTimer(); 
    });
    
  }
 
}

  fill() {
       
    this.metric.leftName1 = this.entry[4].content['$t']; 
    this.metric.leftValue1 = this.entry[5].content['$t'];

    this.metric.rightName1 = this.entry[6].content['$t'];
    this.metric.rightValue1 = this.entry[7].content['$t'];  

    this.metric.leftName2 = this.entry[8].content['$t'];   
    this.metric.leftValue2 = this.entry[9].content['$t'];   
    
    this.metric.rightName2 = this.entry[10].content['$t']; 
    this.metric.rightValue2 = this.entry[11].content['$t']; 

    this.metric.leftName3 = this.entry[12].content['$t'];        
    this.metric.leftValue3 = this.entry[13].content['$t'];    
    
    this.metric.rightName3 = this.entry[14].content['$t']; 
    this.metric.rightValue3 = this.entry[15].content['$t']; 
    

    this.metric.leftTotalLabel = this.entry[16].content['$t']; 
    this.metric.leftTotal = this.entry[17].content['$t']; 
    
    this.metric.rightTotalLabel = this.entry[18].content['$t']; 
    this.metric.rightTotal = this.entry[19].content['$t']; 

    
    this.metric.total = this.entry[20].content['$t']; 
    this.metric.totalLabel = this.entry[21].content['$t']; 

    console.log(this.metric);
    
    
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