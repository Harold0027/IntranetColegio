// app/dtos/alumno.dto.js
export class AlumnoDTO {
  constructor({ idAlumno, nombre, apellido, edad, telefono, activo }) {
    this.idAlumno = idAlumno;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.telefono = telefono;
    this.activo = activo;
  }

  static fromModel(alumno) {
    return new AlumnoDTO(alumno);
  }
}
