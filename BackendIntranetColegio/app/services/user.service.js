// app/services/user.service.js
import { UserSQLDao } from "../dao/user.dao.js";
import { UserDTO } from '../dtos/user.dto.js'

const userDao = new UserSQLDao();

export class UserService {
    async getAllUsers(){
        const users = await userDao.getAll();
        return users.map(u => new UserDTO(u));
    }

    async getUserById(id){
        const user = await userDao.getById(id);
        if(!user) return null;
        return new UserDTO(user);
    }

    async createUser(data){
        const user = await userDao.create(data);
        return new UserDTO(user);
    }

    async updateUser(id,data){
        const user = await userDao.update(id,data);
        if(!user) return null;
        return new UserDTO(user);
    }

    async deleteUser(id){
        const user = await userDao.delete(id);
        if(!user) return null;
        return new UserDTO(user);
    }

    async getByUsername(usuario){
        return await userDao.getByUsername(usuario);
    }

    async getUserByIdFull(id){
        return await userDao.getByIdFull(id);
    }
}

