// config/models/pago.model.js
class Pago {
  constructor({ idPago, idAlumno, monto, fechaPago, estado }) {
    this.idPago = idPago;
    this.idAlumno = idAlumno;
    this.monto = monto;
    this.fechaPago = fechaPago;
    this.estado = estado; 
  }
}

export default Pago;
