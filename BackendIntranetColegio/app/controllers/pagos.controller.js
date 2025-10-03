import { PagoService } from "../services/pago.service.js";

const pagoService = new PagoService();

export class PagosController {

  async getAll(req, res) {
    try {
      const pagos = await pagoService.getAllPagos();
      if (pagos.length === 0) return res.status(404).json({ error: "No existen pagos registrados" });
      res.json(pagos);
    } catch (err) {
      console.error("Error en getAll:", err);
      res.status(500).json({ error: "Error al obtener pagos" });
    }
  }

  async getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const pago = await pagoService.getPagoById(id);
      if (!pago) return res.status(404).json({ error: "Pago no encontrado" });

      res.json(pago);
    } catch (err) {
      console.error("Error en getById:", err);
      res.status(500).json({ error: "Error al obtener pago" });
    }
  }

  async getByAlumno(req, res) {
    try {
      const idAlumno = parseInt(req.params.idAlumno);
      if (isNaN(idAlumno)) return res.status(400).json({ error: "ID de alumno inválido" });

      const pagos = await pagoService.getPagosByAlumno(idAlumno);
      if (pagos.length === 0) return res.status(404).json({ error: "No se encontraron pagos para este alumno" });

      res.json(pagos);
    } catch (err) {
      console.error("Error en getByAlumno:", err);
      res.status(500).json({ error: "Error al obtener pagos" });
    }
  }

  async create(req, res) {
    try {
      const { idAlumno, monto, fechaPago, estado } = req.body;
      if (!idAlumno || monto == null || !fechaPago || !estado) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const pago = await pagoService.createPago({ idAlumno, monto, fechaPago, estado });
      res.status(201).json({ message: "Pago registrado correctamente", pago });

    } catch (err) {
      console.error("Error en create:", err);
      res.status(500).json({ error: "Error al crear pago" });
    }
  }

  async delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const pago = await pagoService.deletePago(id);
      if (!pago) return res.status(404).json({ error: "Pago no encontrado" });

      res.json({ message: "Pago eliminado correctamente" });
    } catch (err) {
      console.error("Error en delete:", err);
      res.status(500).json({ error: "Error al eliminar pago" });
    }
  }
}
