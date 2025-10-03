// config/models/user.model.js
class Usuario {
  constructor({ idUsuario, usuario, contraseña, rol }) {
    this.idUsuario = idUsuario;
    this.usuario = usuario;
    this.contraseña = contraseña;
    this.rol = rol;
  }
}
  
export default Usuario;
