import express from 'express'
import { deleteToken, validateUserToken } from '../controllers/JWT.js'
import { checkUser, googleAuth, logoutUser, userLogin, userSignup } from '../controllers/users.js'

const UserRouter = express.Router()

UserRouter.post('/login', userLogin)

UserRouter.post('/signup', userSignup)

UserRouter.post('/google-auth', googleAuth)

UserRouter.get('/check-user', validateUserToken, checkUser)

UserRouter.get('/logout', deleteToken, validateUserToken, logoutUser)

export default UserRouter