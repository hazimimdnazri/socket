import express from 'express'
import {ApiController} from './controllers/ApiController.js'

const routes = express.Router()

routes.get('/', ApiController.index)
routes.post('/alert', ApiController.postAlert)
routes.get('*', ApiController.unknownRoute)
routes.post('*', ApiController.unknownRoute)

export default routes