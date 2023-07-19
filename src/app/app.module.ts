import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { MenuConfiguracionComponent } from './Components/menu-configuracion/menu-configuracion.component';
import { HomeComponent } from './Components/home/home.component';
import { RegistroGrupoComponent } from './Components/registro-grupo/registro-grupo.component';
import { MenuGruposComponent } from './Components/menu-grupos/menu-grupos.component';
import { TableroGruposComponent } from './Components/tablero-grupos/tablero-grupos.component';
import { PublicarNoticiaComponent } from './Components/publicar-noticia/publicar-noticia.component';
import { NoticiasComponent } from './Components/noticias/noticias.component';
import { TableroCatComponent } from './Components/tablero-cat/tablero-cat.component';
import { ConfiguracionGrupoComponent } from './Components/configuracion-grupo/configuracion-grupo.component';
import { MisFavoritosComponent } from './Components/mis-favoritos/mis-favoritos.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MenuConfiguracionComponent,
    HomeComponent,
    RegistroGrupoComponent,
    MenuGruposComponent,
    TableroGruposComponent,
    PublicarNoticiaComponent,
    NoticiasComponent,
    TableroCatComponent,
    ConfiguracionGrupoComponent,
    MisFavoritosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
