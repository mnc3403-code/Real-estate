import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { checkDatabaseConnection } from './config/database.js'
import authRoutes from './routes/auth.routes.js'
import propertyRoutes from './routes/property.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import savedRoutes from './routes/saved.routes.js'
import inquiryRoutes from './routes/inquiry.routes.js'
import appointmentRoutes from './routes/appointment.routes.js'
import adminRoutes from './routes/admin.routes.js'
import notificationRoutes from './routes/notification.routes.js'
import imageRoutes from './routes/image.routes.js'
import { errorHandler, notFound } from './middleware/error.middleware.js'

const app = express()
const port = Number(process.env.PORT) || 5000

app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json({ limit: '10kb' }))

app.get('/api/health', async (req, res) => {
  try {
    await checkDatabaseConnection()
    res.json({ success: true, database: 'connected' })
  } catch {
    res.status(503).json({ success: false, database: 'unavailable' })
  }
})

app.use('/api/auth', authRoutes)
app.use('/api/properties', propertyRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/saved-properties', savedRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/properties', imageRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})
