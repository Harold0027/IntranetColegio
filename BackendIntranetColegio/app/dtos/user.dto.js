// app/dtos/user.dto.js
export class UserDTO {
  constructor({ idUsuario, usuario, rol }) {
    this.idUsuario = idUsuario;
    this.usuario = usuario;
    this.rol = rol;
  }

  static fromModel(user) {
    return new UserDTO(user);
  }
}


