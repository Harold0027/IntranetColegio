// config/models/docente.model.js
class Docente {
  constructor({ idDocente, nombre, apellido, edad, telefono, salario, activo }) {
    this.idDocente = idDocente;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.telefono = telefono;
    this.salario = salario;
    this.activo = activo;
  }
}

export default Docente;
