import { Router } from 'express'
import { list,detail,create,update,moderate,view } from '../controllers/property.controller.js'
import { requireAuth } from '../middleware/auth.middleware.js'
import { requireRole } from '../middleware/role.middleware.js'
const r=Router()
r.get('/',list); r.get('/:id',detail); r.post('/:id/view',view)
r.post('/',requireAuth,requireRole('agent'),create)
r.patch('/:id',requireAuth,requireRole('agent'),update)
r.patch('/:id/moderate',requireAuth,requireRole('admin'),moderate)
export default r
