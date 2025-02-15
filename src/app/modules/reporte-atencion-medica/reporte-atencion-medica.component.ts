import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Paciente } from 'src/app/models/paciente.model';
import { Persona } from 'src/app/models/persona.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-atencion-medica',
  templateUrl: './reporte-atencion-medica.component.html',
  styleUrls: ['./reporte-atencion-medica.component.css']
})
export class ReporteAtencionMedicaComponent implements OnInit,OnDestroy {

  pacientes: Paciente[]=[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor(private api:ApiService) { }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive:true
    };
    this.api.obtenerPacientes().subscribe(r=>{
      if(r.status="success"){
        this.parsearPaciente(r.res);
        this.dtTrigger.next();
        /* this.pacientes = r.res; */
      }
    });
    
  }
  parsearPaciente(res:any){
    
    res.forEach((r:any)=>{
      var paciente = new Paciente();
      var persona = new Persona();
      paciente.Persona  = persona;

      paciente.Persona.idPersona = r["idPersona"];
      paciente.Persona.DNI = r["DNI"];
      paciente.Persona.Nombre = r["Nombre"];
      paciente.Persona.Apellido_Materno = r["Apellido_Materno"];
      paciente.Persona.Apellido_Paterno = r["Apellido_Paterno"];
      paciente.Persona.Edad = r["Edad"];
      paciente.Persona.Fecha_Nacimiento = r["Fecha_Nacimiento"];
      paciente.Persona.Sexo = r["Sexo"];
      paciente.Persona.Celular = r["Celular"];
      paciente.Estatura = r["Estatura"];
      paciente.Peso = r["Peso"];
      paciente.Alergeno = r["Alergeno"];
      paciente.Enfermedad = r["Enfermedad"];
      paciente.Saturacion = r["Saturacion"];
      paciente.Pulso = r["Pulso"];
      paciente.Persona_idPersona = r["idPersona"];
      paciente.PresionPecho = r["PresionPecho"];
      paciente.DificultadRespirar = r["DificultadRespirar"];
      paciente.TosPersistente = r["TosPersistente"];
      paciente.SilbidoPecho = r["SilbidoPecho"];
      this.pacientes.push(paciente);
    });
    
  }
  salir(){
    Swal.fire({
      title: 'Confirmación',
      text:'Si sale, se perderán los datos',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Salir`,
      denyButtonText: `Cancelar`,
      allowOutsideClick:false,
      icon:'info'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      } else if (result.isDenied) {
      }
    });
  }

}
