import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RegistrarPacienteComponent } from './modules/registrar-paciente/registrar-paciente.component';
import { RegistrarPersonalMedicoComponent } from './modules/registrar-personal-medico/registrar-personal-medico.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  {
    component: LoginPageComponent,
    path: 'login'
  },
  {
    component: InicioPageComponent,
    path: 'inicio',
    children:[
      {
        path:'reg-personal-medico',
        component: RegistrarPersonalMedicoComponent
      },
      {
        path:'reg-paciente',
        component: RegistrarPacienteComponent
      },
    ],
    canActivate:[AuthGuard]
  }
  ,
  {
    path: '**', redirectTo:'/login',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
