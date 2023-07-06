import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { MenuConfiguracionComponent } from './Components/menu-configuracion/menu-configuracion.component';
import { RegistroGrupoComponent } from './Components/registro-grupo/registro-grupo.component';
import { MenuGruposComponent } from './Components/menu-grupos/menu-grupos.component';
import { TableroGruposComponent } from './Components/tablero-grupos/tablero-grupos.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent},
  { path: 'menu-conf', component: MenuConfiguracionComponent},
  { path: 'rgrupo', component: RegistroGrupoComponent},
  { path: 'menugrupo', component: MenuGruposComponent},
  { path: 'tablerog', component: TableroGruposComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
