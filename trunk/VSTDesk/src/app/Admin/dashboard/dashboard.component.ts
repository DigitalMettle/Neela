import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AdminService } from './../services/admin.service';
import 'rxjs'
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { HeaderService } from '../../core/services/header.sevice';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit, OnDestroy {
    @ViewChild("baseChart1") chart1: BaseChartDirective;
    @ViewChild("baseChart2") chart2: BaseChartDirective;
    @ViewChild("baseChart3") chart3: BaseChartDirective;
    public headerData: any;
    public projectSummary: string;
    public subscription: any;
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
    public lineChartOptions: any = { responsive: true };
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

    constructor(public adminService: AdminService, private _headerService: HeaderService) {

        //initialize charts by raw data.
        this.barChartData = [
            { data: [0, 0, 0], label: '' },
            
        ];

        this.lineChartData1 = [
            { data: [0, 0, 0, 0], label: '' },
           
        ];

        this.lineChartData2 = [
            { data: [0, 0, 0, 0], label: '' },
         
        ];

    }

    ngOnInit(): void {

        //set header Data
        this.setHeaderData();

        //add subscription when sub-header button click.
        this.subscription = this._headerService.headerChanges$.subscribe(action => {
            if (action == 'syncproject')
                this.syncProject();
        });
        //perform action when the header fire and event.
        this.adminService.getProjectList().subscribe(res => {
            if (res && res.Data.length > 0)
            this.projectList = res.Data;
            this.setChartData(this.projectList[0].Id);
        });

    }

    onSelected(projectId: any) {      
        this.setChartData(projectId);
    }

    syncProject() {
        this.adminService.SyncProject().subscribe(res => { })
    }

    setChartData(projectId: any) {

        this.adminService.getChartData(projectId).subscribe(res => {
            if (res.Data) {
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

    // events
    public chartClicked(e: any): void {
    }

    public chartHovered(e: any): void {

    }

    setHeaderData() {

        //create Header Data.
        this.headerData = { Title: "DASHBOARD" }
        this.headerData['buttons'] = [{ actionType: 'syncproject', type: "SYNC DASHBOARD", disabled: false, isIcon: true, iconText: 'sync' }];

        //emit header data to the subheader component.
        this._headerService.emitChildChanges(this.headerData);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this._headerService.emitChildChanges('');
    }



}