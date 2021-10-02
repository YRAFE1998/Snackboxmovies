import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegularbuttonComponent } from './reusable/regularbutton/regularbutton.component';
import { SearchboxComponent } from './reusable/searchbox/searchbox.component';
import { ShadowedboxComponent } from './reusable/shadowedbox/shadowedbox.component';
import { MovietableComponent } from './moviecomponents/movietable/movietable.component';
import { NofuncbuttonComponent } from './reusable/nofuncbutton/nofuncbutton.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginpanelComponent } from './authentication/loginpanel/loginpanel.component';
import { MoviesComponent } from './moviecomponents/movies/movies.component';
import { HeadmoviecontainerComponent } from './moviecomponents/headmoviecontainer/headmoviecontainer.component';
import { MovieservicesService } from './services/movieservices.service';
import { MoviepreviewmodalComponent } from './moviecomponents/moviepreviewmodal/moviepreviewmodal.component';
import { ModalopenbuttonComponent } from './reusable/modalopenbutton/modalopenbutton.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { SigninComponent } from './pages/signin/signin.component';
import { MoviepageComponent } from './pages/moviepage/moviepage.component';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { LoaderComponent } from './reusable/loader/loader.component';
import { GenrePipe } from './reusable/pipes/genre.pipe';
import { DurationinhoursPipe } from './reusable/pipes/durationinhours.pipe';
import { ProductionCountryStringifyPipe } from './reusable/pipes/production-country-stringify.pipe';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './authentication/auth.guard';
import { AuthLoginGuard } from './authentication/auth.login.guard';
import { MoviecardComponent } from './moviecomponents/moviecard/moviecard.component';
const appRoutes: Routes = [
  {path: '', component: CatalogComponent,canActivate:[AuthGuard]},
  {path: 'movie/:id', component: MoviepageComponent,canActivate:[AuthGuard]},
  {path: 'auth', component: SigninComponent, canActivate:[AuthLoginGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

    RegularbuttonComponent,
    SearchboxComponent,
    ShadowedboxComponent,
    MovietableComponent,
    NofuncbuttonComponent,
    AuthenticationComponent,
    LoginpanelComponent,
    MoviesComponent,
    HeadmoviecontainerComponent,
    MoviepreviewmodalComponent,
    ModalopenbuttonComponent,
    CatalogComponent,
    SigninComponent,
    MoviepageComponent,
    LoaderComponent,
    GenrePipe,
    DurationinhoursPipe,
    ProductionCountryStringifyPipe,
    MoviecardComponent
    ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [MovieservicesService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
