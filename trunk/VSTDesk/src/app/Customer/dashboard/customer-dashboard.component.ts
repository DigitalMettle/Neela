import { Component, OnInit, ViewChild } from '@angular/core'
import { CustomerService } from '../services/customer-services';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
    selector: 'customer-dashboard',
    templateUrl: 'customer-dashboard.component.html'
})

export class CustomerDashboardComponent implements OnInit {
    @ViewChild("baseChart1") chart1: BaseChartDirective;
    @ViewChild("baseChart2") chart2: BaseChartDirective;
    @ViewChild("baseChart3") chart3: BaseChartDirective;
    public projectSummary: string;
    public barChartData: Array<any>;
    public lineChartData1: Array<any>;
    public lineChartData2: Array<any>;
    public projectList: any
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';
    public barChartLabels: string[] = [''];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public lineChartLabels: Array<any> = ['3 Weeks Ago', '2 Weeks Ago', 'Last Week', 'Today'];

    public barChartOptions: any = {
        scaleShowVerticalLines: true,
        responsive: true,
        plugins: {
            datalabels: {
                display: true,
                align: 'center',
                anchor: 'center'
            }
        },
        scales: {
            xAxes: [{
                stacked: true,
                stackLabels: {
                    enabled: true
                }
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    public barChartColors: Array<any> = [
        {
            backgroundColor: '#02B8D3',
        },
        {
            backgroundColor: '#028497',
        },
        {
            backgroundColor: '#04536E',
        },
        {
            backgroundColor: '#15a1b6',
        },
        {
            backgroundColor: '#00CED1',
        },
        {
            backgroundColor: '#20B2AA'
        },
        {
            backgroundColor: '#5F9EA0'
        },
        {
            backgroundColor: '#008B8B'
        }
    ];
    public lineChartColors: Array<any> = [
        {
            backgroundColor: 'transparent',
            borderColor: '#02B8D3',
            pointBackgroundColor: 'transparent',
            pointBorderColor: '#02B8D3',

        },
        {
            backgroundColor: 'transparent',
            borderColor: '#028497',
            pointBackgroundColor: 'transparent',
            pointBorderColor: '#028497',
        },
        {
            backgroundColor: 'transparent',
            borderColor: '#04536E',
            pointBackgroundColor: 'transparent',
            pointBorderColor: '#04536E',
        },
        {
            backgroundColor: 'transparent',
            borderColor: '#15a1b6',
            pointBackgroundColor: 'transparent',
            pointBorderColor: '#15a1b6',
        }, {
            backgroundColor: 'transparent',
            borderColor: '#00CED1',
            pointBackgroundColor: 'transparent',
            pointBorderColor: '#00CED1',
        }, {
            backgroundColor: 'transparent',
            borderColor: '#20B2AA',
            pointBackgroundColor: 'transparent',
            pointBorderColor: '#20B2AA',
        }, {
            backgroundColor: 'transparent',
            borderColor: '#5F9EA0',
            pointBackgroundColor: 'transparent',
            pointBorderColor: '#5F9EA0',
        }, {
            backgroundColor: 'transparent',
            borderColor: '#008B8B',
            pointBackgroundColor: 'transparent',
            pointBorderColor: '#008B8B',
        }
    ];




    ngOnInit(): void {

        this._customerService.getAssignedProjectList().subscribe(res => {
            if (res && res.Data.length > 0) {
                this.projectList = res.Data;
                this.setChartData(this.projectList[0].Id);
            }

        })

    }

    constructor(private _customerService: CustomerService) {
        this.barChartData = [
            { data: [0, 0, 0], label: '' }
        ];

        this.lineChartData1 = [
            { data: [0, 0, 0, 0], label: '' }
        ];
        this.lineChartData2 = [
            { data: [0, 0, 0, 0], label: '' }
        ];
    }

    onSelected(projectId: any) {
        this.setChartData(projectId);
    }

    onSelect(projectId: any) {
        //if (projectId != -1) {
        this.setChartData(projectId);
        //}
    }
    setChartData(projectId: any) {

        this._customerService.getChartData(projectId).subscribe(res => {
            if (res) {
                debugger;
                this.chart1.chart.destroy();
                this.chart1.chart = 0;
                this.chart1.datasets = res.Data.BarChartModel;
                this.chart1.labels = res.Data.BarChartLabels;
                this.chart1.ngOnInit();

                this.chart2.chart.destroy();
                this.chart2.chart = 0;
                this.chart2.datasets = res.Data.FistLineChartModel;
                this.chart2.labels = this.lineChartLabels;
                this.chart2.ngOnInit();

                this.chart3.chart.destroy();
                this.chart3.chart = 0;
                this.chart3.datasets = res.Data.SecondLineChartModel;
                this.chart3.labels = this.lineChartLabels;
                this.chart3.ngOnInit();

                this.projectSummary = res.Data.Description;
            }
        });


    }













}