import { getDataFile, saveIn } from "../utils.js"
import { hash } from 'bcrypt'
import UserService from "../service/user-service.js"
import TokenService from "../service/token-service.js"
export class user {
   static registration = async (req, res, next) => {
      try {
         const { body } = req
         const userData_Tokens = await UserService.registration(body)
         res.cookie('refreshToken', userData_Tokens.refreshToken, { httpOnly: true })
         res.json(userData_Tokens)
      }
      catch (e) {
         next(e)
      }
   }
   static login = async (req, res, next) => {
      try {
         const { body } = req
         const userData_Tokens = await UserService.login(body.email, body.password)
         res.cookie('refreshToken', userData_Tokens.refreshToken, { httpOnly: true })
         res.json(userData_Tokens)
      }
      catch (e) {
         res.status(e.status).json(e.message)
         //next(e)
      }
   }
   static logon = async (req, res) => {
      const removeToken = await TokenService.removeToken(req.cookie.refreshToken)
      res.clearCookie('refreshToken');
      return res.json(removeToken);
   }
   async refresh(req, res, next) {
      try {
         const { refreshToken } = req.cookies;
         const userData = await UserService.refresh(refreshToken);
         res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
         return res.json(userData);
      } catch (e) {
         next(e);
      }
   }
}