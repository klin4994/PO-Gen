const router = require('express').Router()
const productRoutes = require('./products')
const userRoutes = require('./user')
const vendorsRoutes = require('./vendors')
const posRoutes = require('./purchaseOrders')

// Product routes
router.use('/products', productRoutes)
router.use('/user', userRoutes)
router.use('/vendors', vendorsRoutes)
router.use('/pos', posRoutes)

module.exports = router
