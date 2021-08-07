const Router = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const fileServices = require('../services/fileService')
const File = require('../models/File')




router.post('/registration',
    [
        check('email', 'Uncorrect email').isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({min:3, max:12})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({message: "Uncorrect request", errors})
            }

            const {firstName, lastName, email, password} = req.body
            const candidate = await User.findOne({email})

            if(candidate) {
                return res.status(400).json({message: "User with email ${email} already exist"})
            }

            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({firstName: firstName, lastName: lastName, email, password: hashPassword})
            await user.save()
            await fileServices.createDir(req, new File({user: user.id, name: ''}))
            const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})
            return res.json({
                token,
                user
            })
        }
        catch(e) {
            res.send({message: "Server error"})
        }
    }
)

router.post('/login',
    async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})

            if(!user) {
                return res.status(404).json({message: "User not found"})
            }

            const isPassValid = bcrypt.compareSync(password, user.password)

            if(!isPassValid) {
                return res.status(400).json({message: "Invalid password"})
            }

            const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})
            return res.json({
                token,
                user
            })
        }
        catch(e) {
            res.send({message: "Server error"})
        }
    }
)

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})
            return res.json({
                token,
                user
            })
        } 
        catch(e) {
            res.send({message: "Server error"})
        }
    }
)


module.exports = router