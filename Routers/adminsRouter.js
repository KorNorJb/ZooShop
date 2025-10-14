import Router from 'express'
import controller from '../Controllers/adminsController.js'

const router = new Router()
    // const user = await User.findOne({})

// GET REQUEST

router.get('/products', (req, res) => {
    res.render("pages/AdminPanel/products")
})
router.get('/users', (req, res) => {
    res.render("pages/AdminPanel/users")
})
router.get('/orders', (req, res) => {
    res.render("pages/AdminPanel/orders")
})
router.get('/courier', (req, res) => {
    res.render("pages/AdminPanel/couriers")
})

// POST REQUSTS
router.post('/products', controller.products)
router.post('/users', controller.users)
router.post('/orders', controller.orders)
router.post('/courier', controller.courier)


export default router