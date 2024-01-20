import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';



@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{

    responsiveOptions: any[] | undefined;

    images: string[] = [
        'assets/colitas/images/imagen1.jpg',
        'assets/colitas/images/imagen2.jpg',
        'assets/colitas/images/imagen3.jpg',


    ];

    constructor(public layoutService: LayoutService, public router: Router ) { }

ngOnInit(){
    this.responsiveOptions = [
        // {
        //     breakpoint: '1199px',
        //     numVisible: 1,
        //     numScroll: 1
        // },
        // {
        //     breakpoint: '1199px',
        //     numVisible: 2,
        //     numScroll: 1
        // },
        // {
        //     breakpoint: '1199px',
        //     numVisible: 3,
        //     numScroll: 1
        // }
    ];
}
}

