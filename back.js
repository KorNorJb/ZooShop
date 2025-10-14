// !LIBRARIES
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser'
import passport from 'passport'
import dotenv from 'dotenv'
import { log } from 'console'
import { v4 as uuidv4 } from 'uuid';


import Products from './models/Products.js'
import authRouter from '../Back-end/Routers/authRouter.js'
import adminsRouter from '../Back-end/Routers/adminsRouter.js'
import Courier from './models/Courier.js'
import DelivaryM from './models/DelivaryM.js'
import Companies from './models/Companies.js'
import Order from './models/Orders.js'
import productTypes from './models/productTypes.js'



dotenv.config()
const app = express()
const port = process.env.PORT
const __dirname = path.resolve()
let orders = [];

const start = async() => {
    try {
        // !CONNECTION TO THE DATABASE
        const con = await mongoose.connect('mongodb+srv://Admin:Pvv3A2Iy1fqlRvds@cluster0.r9czvcj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            maxPoolSize: 50,
            wtimeoutMS: 2500,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true   
        })


        // !APP CONFIGURATION
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json());
        app.use(express.static('views'))
        app.use(express.json())
        app.use(cookieParser());
        app.use('/', authRouter)
        app.use('/api/admin', adminsRouter)
        app.use((err, req, res, next) => {
            console.log(err.stack);
            res.status(404).sendFile('pages/Errors/404')
        })
        app.set('views', path.resolve(__dirname, 'views'))
        app.set('view engine', 'ejs')


        // !ROUTS
        // todo Home page
        app.get('/', (req, res) => {
            const accessToken = req.cookies.accessToken
            res.render('pages/index', { accessToken })
        })




        // todo Catalog Page
        app.get('/catalog', (req, res) => {

            const { type_product, age_product, flavour_product, brand_product, form_product } = req.query;
            const accessToken = req.cookies.accessToken

            let filter = {};
            if (type_product) filter.type_product = type_product;
            if (age_product) filter.age_product = age_product;
            if (flavour_product) filter.flavour_product = flavour_product;
            if (brand_product) filter.brand_product = brand_product;
            if (form_product) filter.form_product = form_product;

            Products.find(filter)
                .then(result => {
                    res.render('pages/catalog', { data: result, filters: req.query, accessToken });
                })
                .catch(error => {
                    res.status(500).send(error.message);
                });
        });
        app.post('/create-order', (req, res) => {
            console.log("Received POST request to /create-order"); // Лог для проверки запроса
            const order = req.body;
            console.log("Received order:", order); // Лог для проверки полученных данных

            // Проверка правильности данных заказа
            if (order && order.items && order.total) {
                orders.push(order);
                res.json({ success: true });
            } else {
                res.status(400).json({ success: false, message: 'Invalid order data' });
            }
        });

        app.get('/order-confirmation', (req, res) => {
            const accessToken = req.cookies.accessToken
            res.render('pages/ConfirmOrder', { accessToken });
        });
        app.post('/order-confirmation', async(req, res) => {
            const { orderId, orderTotal, address } = req.body;
            const orderNumber = uuidv4();
            try {

                // Создаем новый заказ
                const newOrder = new Order({
                    order_number: orderId,
                    order: orderNumber,
                    total: orderTotal,
                    adress: address
                });

                // Сохраняем заказ в базу данных
                await newOrder.save();

                console.log('Order saved successfully:', newOrder);

                // Отправляем ответ клиенту
                res.status(201).json({ message: 'Order saved successfully', order: newOrder });
            } catch (err) {
                console.error('Error saving order:', err);
                res.redirect('/catalog')
            }
        });

        // todo Privacy Policy
        app.get('/privacy', (req, res) => {
            res.render('pages/privacy')
        })


        // ?ADDING PRODUCT TYPES
        app.post('/api/admin', async(req, res) => {
                try {

                    const { name, desc, coast, image, type, articul, brand, weight, netQua, form, age, flavour, available } = req.body
                    const isName = await Products.findOne({ name })
                    const isArticul = await Products.findOne({ articul })
                    if (isName) {
                        return res.status(400).send("Товар с таким именем уже существует!")
                    }
                    if (isArticul) {
                        return res.status(400).send("Товар с таким артикулом уже существует!")
                    }
                    const newType = await productTypes.findOne({ type: req.body.type })
                    if (!newType) {
                        return res.status(400).json("Неверный тип продукта!")
                    }
                    const newProduct = new Products({ name_product: name, desc_product: desc, coast_product: coast, image_product: image, type_product: type, articul_product: articul, brand_product: brand, weight_product: weight, netQua_product: netQua, form_product: form, age_product: age, flavour_product: flavour, available_product: available })
                    await newProduct.save()
                    return res.redirect("/adminpanel")
                } catch (error) {
                    res.send("Adding Failed")
                    console.log(error);
                }
            })
            // !ADMIN PANEL AND REQUESTS
        app.get('/adminPanel', (req, res) => {
            Products.find()
                .then(result => {
                    res.render('pages/AdminPanel/adminPanel', { data: result })
                    console.log(result);
                })
        })


        app.post('/courierpanel', async(req, res) => {
            const { orderId, newStatus } = req.body;

            console.log('Received orderId:', orderId);
            console.log('Received newStatus:', newStatus);
            console.log(req.body);

            if (!mongoose.Types.ObjectId.isValid(orderId)) {
                return res.status(400).send({ message: 'Invalid orderId format' });
            }

            try {
                const result = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });

                if (result) {
                    res.status(200).send({ message: 'Order status updated successfully', order: result });
                } else {
                    res.status(404).send({ message: 'Order not found' });
                }
            } catch (error) {
                res.status(500).send({ message: 'Error updating order status', error });
            }
        });


        // !Couriers Page
        app.get('/courierpanel', (req, res) => {
            Order.find()
                .then(result => {
                    res.render('pages/OrdersForCouriers', { data: result })
                    console.log(result);
                })
        })

        // ?REQUEST FOR DELETION
        app.delete('/adminpanel/:id', (req, res) => {
            Products.findByIdAndDelete(req.params.id)
                .then(result => {
                    console.log(result)
                })
        })



        app.listen(port, function() {
            console.log(`Server running on port: ${port}`)
        })


    } catch (error) {
        console.log(error);
    }
}
start()










// Todo IN CASE THE DATABASE IS DELETED