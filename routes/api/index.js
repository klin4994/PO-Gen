const router = require('express').Router()
const productRoutes = require('./products')
const userRoutes = require('./user')
const vendorsRoutes = require('./vendors')

// Product routes
router.use('/products', productRoutes)
router.use('/user', userRoutes)
router.use('/vendors', vendorsRoutes)
module.exports = router
