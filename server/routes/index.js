import { Router } from "express"
import { user } from "../controllers/user.js"

export const rout = Router()

rout.post('/registration', user.registration)
rout.post('/login', user.login)
rout.post('/logon',)