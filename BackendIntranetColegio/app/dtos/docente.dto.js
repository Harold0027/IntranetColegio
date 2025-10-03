// app/dtos/docente.dto.js
export class DocenteDTO {
  constructor({ idDocente, nombre, apellido, edad, telefono, salario, activo }) {
    this.idDocente = idDocente;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.telefono = telefono;
    this.salario = salario;
    this.activo = activo;
  }

  static fromModel(docente) {
    return new DocenteDTO(docente);
  }
}
