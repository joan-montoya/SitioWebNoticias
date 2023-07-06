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
