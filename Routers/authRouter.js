import Router from 'express'
import contoller from '../Controllers/authContoller.js'
import { check } from 'express-validator'
import session from 'express-session'
import key from '../config.js'

const router = new Router()
    // const user = await User.findOne({})

router.post('/registration', [
        check('username', "Имя пользователя не может быть пустым").notEmpty(),
        check('password', "Пароль должен быть больше 8 символов!").isLength({ min: 8, max: 255 })
    ], contoller.registration)
    // router.get('/', (req, res) => {
    //     res.render("pages/index")
    // })
router.post('/authorization', contoller.logIn)
    // router.get("/", (req, res) => {
    //     res.render("pages/index")
    // })
router.post('/logOut')
router.get('/users', contoller.getUsers)
router.get('/activation/:link', contoller.activate, () => {})
router.get('/refreshToken');

export default router