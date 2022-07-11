import ApiError from "../exception/api-error.js"
import { buildUserServer, getDataFile, saveInAdd, UserDto } from "../utils.js"
import TokenService from "./token-service.js"
import bcrypt from 'bcrypt'
class UserService {
   static registration = async ({ email, name, password }) => {
      const users = getDataFile('users')
      const user = await users.filter(i => i.email === email)
      if (user.length) {
         throw ApiError.BadRequest('Пользователь с такой почтой уже существует')
      }
      // работа с user
      const userToServer = await buildUserServer({ email, name, password })
      saveInAdd('users', userToServer)
      const userToClient = new UserDto(userToServer)
      // работа с tokens
      const tokens = TokenService.generateToken({ ...userToClient })
      TokenService.saveToken(userToClient.id, tokens.refreshToken)
      return {
         ...tokens,
         user: userToClient
      }
   }
   static login = async (email, password) => {
      const users = getDataFile('users')
      const user = await users.find(i => i.email === email)
      if (!user) {
         throw ApiError.UnAuthorizedError()
      }
      const isPassword = await bcrypt.compare(password, user.password)
      if (!isPassword) {
         throw ApiError.BadRequest('неверный пароль')
      }
      const userToClient = new UserDto(user)
      const tokens = TokenService.generateToken({ ...userToClient })
      TokenService.saveToken(userToClient.id, tokens.refreshToken)

      return {
         ...tokens,
         user: userToClient
      }
   }
   static logout = async (refreshToken) => {
      const token = await TokenService.removeToken(refreshToken);
      return token;
   }
   static refresh = async (refreshToken) => {
      if (!refreshToken) {
         throw ApiError.UnauthorizedError();
      }
      const userData = TokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await TokenService.findToken(refreshToken);
      if (!userData || !tokenFromDb) {
         throw ApiError.UnauthorizedError();
      }
      const users = getDataFile('users')
      const user = await users.find(i => i.email === userData.email)
      const userDto = new UserDto(user);
      const tokens = TokenService.generateTokens({ ...userDto });

      await TokenService.saveToken(userDto.id, tokens.refreshToken);
      return { ...tokens, user: userDto }
   }
}

export default UserService