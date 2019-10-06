import { Component, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {

  @ViewChild('revenueLineChart') chart: ElementRef;

  public texts = [
    { i: 0, t: `<p>I'm dealing with <b>a client</b> for this situation</p>`, x:-1000, y:-1000 },
    { i: 1, t: `<p>This situation <b>is unknonw</b></p>`, x:-1000, y:-1000 },
    { i: 2, t: `<p>My actions have <b>some effect</b> on the situation</p>`, x:-1000, y:-1000 },
    { i: 3, t: `<p>I feel anxious, <b>kind of scared</b></p>`, x:-1000, y:-1000 },
    { i: 4, t: `<p>Everything is blurred. My thoughts <b>are confused</b></p>`, x:-1000, y:-1000 },
    { i: 5, t: `<p>If I could, <b>I would run away</b></p>`, x:-1000, y:-1000, p: '' },
  ];

  public positions = [];

  ngAfterViewInit() { this.createChart() }

  randomScalingFactor() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
  }

  createChart() {
    const that = this;
    var config = {
      type: 'line',
      data: {
        labels: ["", "", "", "", "", ""],
        datasets: [{
          label: "My First dataset",
          backgroundColor: 'rgb(255, 255, 255)',
          pointRadius: 10,
          borderColor: 'rgb(255, 255, 255)',
          data: [ 3, 1, 2, 4, 1, 3 ],
          fill: false,
          lineTension: 0,
        }]
      },
      options: {
        //responsive: true,
        maintainAspectRatio: false,
        onResize: (chart) => {
          this.placeTexts(chart);
        },
        layout: {
          padding: {
            left: 200,
            right: 200,
            top: 20,
            bottom: 20
          }
        },
        hover: {
          animationDuration: 0
        },
        animation: {
          duration: 1,
          onComplete: (animation) => {
            this.placeTexts(animation.chart);
          }
        },
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltips: {
          mode: 'label',
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
              drawBorder: false,
            },
            scaleLabel: {
              display: false
            },
            ticks: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            scaleLabel: {
              display: false
            },
            ticks: {
              display: false,
              reverse: true,
            }
          }],
        }
      }
    };

    const ctx = this.chart.nativeElement.getContext('2d');
    const revenueLineChart = new Chart(ctx, config);
  }

  placeTexts(chart) {
    this.positions = [];
    chart.config.data.datasets.forEach((dataset, i) => {
      var meta = chart.controller.getDatasetMeta(i);
      meta.data.forEach((bar, index) => {
        var data = dataset.data[index];
        const o = {i: index, p: 'top', x: bar._model.x+10, y: bar._model.y};
        if(data > 2) {
          o.p = 'bottom';
        }
        this.positions.push(o);
      });
    });
            
    console.log(this.positions)
    this.texts.forEach(x => {
      const pos = this.positions.find(y => y.i === x.i);
      x.x = pos.x;
      x.y = pos.y;
      x.p = pos.p;
    });
  }

}
