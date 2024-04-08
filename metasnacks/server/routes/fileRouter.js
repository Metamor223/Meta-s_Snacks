const Router = require('express')
const router = new Router()
const fileController = require('../controllers/fileController')
const authMiddleware = require("../middleware/authMiddleware");

router.get('/download', fileController.downloadFile)

module.exports = router