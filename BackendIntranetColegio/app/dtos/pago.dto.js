export class PagoDTO {
  constructor({ idPago, idAlumno, monto, fechaPago, estado }) {
    this.idPago = idPago;
    this.idAlumno = idAlumno;
    this.monto = monto;
    this.fechaPago = fechaPago;
    this.estado = estado;
  }

  static fromModel(pago) {
    return new PagoDTO(pago);
  }
}
