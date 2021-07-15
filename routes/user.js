const router = require('express').Router()
const UserController = require('../controllers/user')

router.get('/', UserController.getAllUsersPage)

router.post('/new', UserController.createUser)

router.get('/remove/:user_id', UserController.removeUser)

module.exports = router