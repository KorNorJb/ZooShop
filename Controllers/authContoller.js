import bcrypt from "bcryptjs"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';
// import key from "../config.js"
import mailService from "../MailService.js"
import userServ from "../userServ.js"
import User from "../models/User.js"
import Role from "../models/Role.js"
import key from "../config.js";
// import tokenService from "../token-service.js";
// import UserDTO from "../dtos/user-dto.js";
// import Token from "../models/Token.js";




const generateAccessToken = (id, username, telephone, Email, roles) => {
    const payload = {
        id,
        username,
        telephone,
        Email,
        roles
    }
    return jwt.sign(payload, key.secret, { expiresIn: "1m" })
}

class authController {
    async registration(req, res) {
        try {
            // const errors = validationResult(req)
            // if (!errors.isEmpty()) {
            //     return res.status(400).send("Check your login or password according to the following criteria: Login cannot be empty; The password must be more than 8 characters.")
            // }
            const username = req.body.reg__username
            const password = req.body.reg__password
            const phone = req.body.reg__phone
            const email = req.body.reg__Email
            const isEmail = await User.findOne({ email })
            const isPhone = await User.findOne({ phone })
            const candidate = await User.findOne({ username })
            if (candidate) {
                return res.status(400).json(`Пользователь с именем ${username} уже есть!`)
            }
            if (isPhone) {
                return res.status(400).json(`Пользователь с номером телефона ${phone} уже есть!`)
            }
            if (isEmail) {
                return res.status(400).json(`Пользователь с почтой ${email} уже есть!`)
            }
            const hashPass = bcrypt.hashSync(password, 7)
            const activationLink = uuidv4()
            const userRole = await Role.findOne({ value: "USER" })
            const user = await User({ username, password: hashPass, roles: [userRole.value], telephone: phone, Email: email, activationLink: activationLink })
            await mailService.sendActivationMail(email, `http://localhost:4000/activation/${activationLink}`)
                // const userDto = new UserDTO(user)
                // const tokens = tokenService.generateToken({...userDto })
                // await tokenService.saveToken(userDto.id, tokens.refreshToken)
            await user.save()
                // res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
                // return res.json(tokens.refreshToken)
        } catch (error) {
            console.log(error);
            res.status(400).json("Registration failed")
        }
    }
    async logIn(req, res) {
        try {
            const { username, Authpassword } = req.body
            const user = await User.findOne({ username })
            if (!user) {
                return res.status(400).send(`Пользователь ${username} не найден!`)
            }
            console.log("найден");
            if (user.isActivated === false) {
                return res.status(400).send("Похоже что вы не активировали аккаунт! Проверьте почту)")
            }
            const validPass = bcrypt.compareSync(Authpassword, user.password)
            if (!validPass) {
                return res.status(400).send("Введен неправильный пароль")
            }
            if (user.roles == 'ADMIN') {
                res.setHeader('Content', 'text/html')
                res.redirect('/adminpanel')
            } else if (user.roles == 'COURIER') {
                res.setHeader('Content', 'text/html')
                res.redirect('/courierpanel')
            } else {
                const accessToken = generateAccessToken(user._id, user.username, user.telephone, user.Email, user.roles)
                res.cookie('accessToken', accessToken, { httpOnly: true })
                console.log('AccessToken установлен в cookie');
                user.isAuthorization = true
                await user.save()
                    // sessionStorage.setItem(user.username, user.password, user.phone, user.Email)
                    // res.status(200).json({
                    //     token: `Bearer ${token}`23938
                    // })
                    // req.session.user = user
                res.redirect('/')
            }
        } catch (error) {
            console.log(error);
            res.status(400).json("Authorization failed")
        }
    }
    async logout(req, res) {

    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userServ.activate(activationLink)
            return res.redirect("/")
        } catch (e) {
            console.log(e);
        }
    }
    async refresh(req, res) {

    }
    async getUsers(req, res) {
        try {
            const userRole = new Role()
            const adminRole = new Role({ value: "ADMIN" })
            const courierRole = new Role({ value: "COURIER" })
            await userRole.save()
            await adminRole.save()
            await courierRole.save()
                // const newRole1 = new productTypes({ type: "Корм" })
                // const newRole2 = new productTypes({ type: "Витамины" })
                // const newRole3 = new productTypes({ type: "Игрушки" })
                // await newRole1.save()
                // await newRole2.save()
                // await newRole3.save()
        } catch (error) {
            console.log(error);
        }
    }
}
export default new authController()