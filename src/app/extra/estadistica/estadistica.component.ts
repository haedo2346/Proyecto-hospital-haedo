import { Component, ViewChild, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, } from 'ng2-charts';

import { TurnoService } from 'src/app/services/turno.service';
import { ITurno } from 'src/app/models/Turno';
import { Router } from "@angular/router";

@Component({
  selector: 'estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})

export class EstadisticaComponent implements OnInit{
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  
  constructor(private servTurno: TurnoService,
    private router:Router){}
  
  ngOnInit(): void {
    this.servTurno.obtenerTurno().subscribe((response) => {
      this.turnos = response
    
      let mes = "";
      for (let i = 0; i < this.turnos.length; i++) {
        mes = this.turnos[i].fechaTurno[3] + this.turnos[i].fechaTurno[4];
        
        if (mes == "01") {
          this.turnosEnero.push(this.turnos[i])
          this.cantTurnosEnero += 1;
        }
        if (mes == "02") {
          this.turnosFebrero.push(this.turnos[i])
          this.cantTurnosFebrero += 1;
        }
        if (mes == "03") {
          this.turnosMarzo.push(this.turnos[i])
          this.cantTurnosMarzo += 1;
        }
        if (mes == "04") {
          this.turnosAbril.push(this.turnos[i])
          this.cantTurnosAbril += 1;
        }
        if (mes == "05") {
          this.turnosMayo.push(this.turnos[i])
          this.cantTurnosMayo += 1;
        }
        if (mes == "06") {
          this.turnosJunio.push(this.turnos[i])
          this.cantTurnosJunio += 1;
        }
        if (mes == "07") {
          this.turnosJulio.push(this.turnos[i])
          this.cantTurnosJulio += 1;
        }
        if (mes == "08") {
          this.turnosAgosto.push(this.turnos[i])
          this.cantTurnosAgosto += 1;
        }
        if (mes == "09") {
          this.turnosSeptiembre.push(this.turnos[i])
          this.cantTurnosSeptiembre += 1;
        }
        if (mes == "10") {
          this.turnosOctubre.push(this.turnos[i])
          this.cantTurnosOctubre += 1;
        }
        if (mes == "11") {
          this.turnosNoviembre.push(this.turnos[i])
          this.cantTurnosNoviembre += 1;
        }
        if (mes == "12") {
          this.turnosDiciembre.push(this.turnos[i])
          this.cantTurnosDiciembre += 1;
        }

      }

      console.log(this.cantTurnosMayo)
      
    })
  
    
  }

  turnos = [];

  turnosEnero = [];
  turnosFebrero = [];
  turnosMarzo = [];
  turnosAbril = [];
  turnosMayo = [];
  turnosJunio = [];
  turnosJulio = [];
  turnosAgosto = [];
  turnosSeptiembre = [];
  turnosOctubre = [];
  turnosNoviembre = [];
  turnosDiciembre = [];

  cantTurnosEnero = 0;
  cantTurnosFebrero = 0;
  cantTurnosMarzo = 0;
  cantTurnosAbril = 0;
  cantTurnosMayo = 0;
  cantTurnosJunio = 0;
  cantTurnosJulio = 0;
  cantTurnosAgosto = 0;
  cantTurnosSeptiembre = 0;
  cantTurnosOctubre = 0;
  cantTurnosNoviembre = 0;
  cantTurnosDiciembre = 0;

  mostrar(){
    let pieChartData: ChartData<'pie', number[], string | string[]> = {
      labels: [ 'Enero' , "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
      
      datasets: [ {
        data: [ 
          this.cantTurnosEnero, 
          this.cantTurnosFebrero,
          this.cantTurnosMarzo,
          this.cantTurnosAbril,
          this.cantTurnosMayo,
          this.cantTurnosJunio,
          this.cantTurnosJulio,
          this.cantTurnosAgosto,
          this.cantTurnosSeptiembre,
          this.cantTurnosOctubre,
          this.cantTurnosNoviembre,
          this.cantTurnosDiciembre]
            } ]
    };

    this.pieChartData = pieChartData;
  }


//---------------------------------------------------------------------
  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      
    }
  };
  
  
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [  ],
    datasets: [ {
      data: [ 
        this.cantTurnosEnero, 
        this.cantTurnosFebrero,
        this.cantTurnosMarzo,
        this.cantTurnosAbril,
        this.cantTurnosMayo,
        this.cantTurnosJunio,
        this.cantTurnosJulio,
        this.cantTurnosAgosto,
        this.cantTurnosSeptiembre,
        this.cantTurnosOctubre,
        this.cantTurnosNoviembre,
        this.cantTurnosDiciembre]
          } ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  /* changeLabels(): void {
    const words = [ 'hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny' ];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartData.labels = new Array(3).map(_ => randomWord());

    this.chart?.update();
  } */

  /* addSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.push([ 'Line 1', 'Line 2', 'Line 3' ]);
    }

    this.pieChartData.datasets[0].data.push(400);

    this.chart?.update();
  }

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.chart?.update();
  } */

  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position = this.pieChartOptions.plugins.legend.position === 'bottom' ? 'top' : 'bottom';
    }

    this.chart?.render();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display = !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }

 /*  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ 'Enero' , "Febrero", "Marzo", "Abril", "Mayo" ],
    datasets: [ {
      data: [ 
        this.cantTurnosEnero, 
        this.cantTurnosFebrero,
        this.cantTurnosMarzo,
        this.cantTurnosAbril,
        this.cantTurnosMayo,
        this.cantTurnosJunio,
        this.cantTurnosJulio,
        this.cantTurnosAgosto,
        this.cantTurnosSeptiembre,
        this.cantTurnosOctubre,
        this.cantTurnosNoviembre,
        this.cantTurnosDiciembre]
          } ]
  };  */

  volver(){
    this.router.navigate(["/menuPrincipal"])
  }
}