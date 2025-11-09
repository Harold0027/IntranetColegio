// config/models/alumno.model.js
class Alumno {
  constructor({ idAlumno, nombre, apellido, edad, telefono, activo }) {
    this.idAlumno = idAlumno;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.telefono = telefono;
    this.activo = activo;
  }
} 

export default Alumno;
