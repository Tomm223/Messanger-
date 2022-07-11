import jwt from 'jsonwebtoken'
import { getDataFile, saveIn, saveInAdd, saveInUpDate } from '../utils.js'
class TokenService {
   static generateToken(payload) {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
      return {
         accessToken,
         refreshToken
      }
   }
   static saveToken = async (userId, refreshToken) => {
      const newTokenBody = { userId, refreshToken }
      const tokens = await getDataFile('tokens')
      const isToken = await tokens.filter(i => i.userId === userId)
      if (isToken) {
         saveInUpDate('tokens', isToken, newTokenBody)
      }
      else {
         saveInAdd('tokens', newTokenBody)
      }
      return newTokenBody
   }
   static validateAccessToken(token) {
      try {
         const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
         return userData;
      } catch (e) {
         return null;
      }
   }

   static validateRefreshToken(token) {
      try {
         const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
         return userData;
      } catch (e) {
         return null;
      }
   }
   static removeToken = async (refreshToken) => {
      const tokens = await getDataFile('tokens')
      const newTokens = await tokens.filter(i => i.refreshToken !== refreshToken)
      saveIn('tokens', newTokens)
   }
   static findToken = async (refreshToken) => {
      const tokenData = await getDataFile('tokens')
      const token = await tokenData.find(i => i.refreshToken === refreshToken)
      return token
   }

}

export default TokenService