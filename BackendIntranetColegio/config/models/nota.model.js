// config/models/nota.model.js
class Nota {
  constructor({ idNota, idAlumno, nota }) {
    this.idNota = idNota;
    this.idAlumno = idAlumno;
    this.nota = nota; 
  }
}

export default Nota;

