import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import {CarouselModule} from 'primeng/carousel';
import { AuthInterceptor } from './colitas/services/auth-interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdministracionUsuariosComponent } from './colitas/modules/components/administracion-usuarios/administracion-usuarios.component';



@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
        // , AdministracionUsuariosComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
    ],
    providers: [
        { 
            // provide: LocationStrategy, useClass: HashLocationStrategy,
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,CarouselModule,
        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
