import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { MenuConfiguracionComponent } from './Components/menu-configuracion/menu-configuracion.component';
import { RegistroGrupoComponent } from './Components/registro-grupo/registro-grupo.component';
import { MenuGruposComponent } from './Components/menu-grupos/menu-grupos.component';
import { TableroGruposComponent } from './Components/tablero-grupos/tablero-grupos.component';
import { PublicarNoticiaComponent } from './Components/publicar-noticia/publicar-noticia.component';
import { NoticiasComponent } from './Components/noticias/noticias.component';
import { TableroCatComponent } from './Components/tablero-cat/tablero-cat.component';
import { ConfiguracionGrupoComponent } from './Components/configuracion-grupo/configuracion-grupo.component';
import { MisFavoritosComponent } from './Components/mis-favoritos/mis-favoritos.component';
import { EditarNoticiaComponent } from './Components/editar-noticia/editar-noticia.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent},
  { path: 'menu-conf', component: MenuConfiguracionComponent},
  { path: 'rgrupo', component: RegistroGrupoComponent},
  { path: 'menugrupo', component: MenuGruposComponent},
  { path: 'tablerog', component: TableroGruposComponent},
  { path: 'pubnoticia', component: PublicarNoticiaComponent},
  { path: 'noticias', component: NoticiasComponent},
  { path: 'tableroc', component: TableroCatComponent},
  { path: 'confgrupos', component: ConfiguracionGrupoComponent},
  { path: 'misfav', component: MisFavoritosComponent},
  { path: 'editn', component: EditarNoticiaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
