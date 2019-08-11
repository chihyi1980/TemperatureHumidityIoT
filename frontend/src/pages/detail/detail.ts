import { Component, AfterViewInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { GlobalVars } from '../../providers/globalVars';

import * as Chart from 'chart.js'

declare var andJS: any;

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})

export class DetailPage implements AfterViewInit
{
  canvas: any;
  ctx: any;

  currDev = {};
  logs = [];
  chartLabels = [];
  chartTemp = [];
  chartHumi = [];

  constructor(navParams: NavParams,private globalVar: GlobalVars,) {
    this.currDev = navParams.data;
    this.init();
  }

  ngAfterViewInit() 
  {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
          labels: this.chartLabels,
          datasets: 
          [
            {
              label: this.globalVar.lang.temperature + ' °C',
              // label: ' °C',
              data: this.chartTemp,
              backgroundColor: 'blue',
              borderColor:'blue',
              borderWidth: 0,
              fill: false,
            },
            {
              label: this.globalVar.lang.humidity + ' ％',
              // label: ' ％',
              data: this.chartHumi,
              backgroundColor: 'red',
              borderColor:'red',
              borderWidth: 0,
              fill: false,
            }
          ]
      },
      options: {
        responsive: true,
      }
    });
  }

  init()
  {
    var data = andJS.getLast24HrRec(this.currDev['name']);
    for(var i = 23 ; i >= 0 ; i --)
    {
      var hour = new Date().getHours();
      var hourNew = (hour - i) >= 0 ? (hour - i) : 24 + (hour - i);
      var key = JSON.stringify(hourNew);
      var newKey = (key.length == 2) ? key : '0' + key; 
      var aryRecInHour = data[newKey];
      if(aryRecInHour)
      {
        for(var k = 0 ; k < aryRecInHour.length ; k++)
        {
          this.logs.unshift(aryRecInHour[k]);
        }
      }

      this.chartLabels.push(key);
    }

    for(var u = 0 ; u < this.chartLabels.length ; u++)
    {
      var key1 = this.chartLabels[u];
      var newKey1 = (key1.length == 2) ? key1 : '0' + key1; 
      var aryRecInHour = data[newKey1];
      if(aryRecInHour && aryRecInHour.length > 0 )
      {
        this.chartTemp.push(aryRecInHour[0]['temperature']);
        this.chartHumi.push(aryRecInHour[0]['humidity']);
      }else
      {
        this.chartTemp.push(null);
        this.chartHumi.push(null);
      }
    }

  }
}