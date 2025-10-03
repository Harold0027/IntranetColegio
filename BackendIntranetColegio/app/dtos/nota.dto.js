export class NotaDTO {
  constructor({ idNota, idAlumno, nota }) {
    this.idNota = idNota;
    this.idAlumno = idAlumno;
    this.nota = nota;
  }

  static fromModel(nota) {
    return new NotaDTO(nota);
  }
}
