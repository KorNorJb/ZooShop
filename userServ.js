import User from "./models/User.js"


// !Activation of the account
class userServ {
    async registration() {

    }
    async activate(activationLink) {
        const user = await User.findOne({ activationLink })
        if (!user) {
            throw new Error("Неверная ссылка для активации")
        }
        user.isActivated = true
        await user.save()
    }
}
export default new userServ()