const express = require('express')
const { getPosts, createPost, getDetail, updatePost, deletePost, searchPost } = require('../controllers/post.js')
const auth = require('../middleware/auth.js') // Yetki kontrolleri için orta katman fonksiyonu dahil ediliyor

const router = express.Router()

// isteklere göre çalışıcak fonksiyonlar eşleniyor
router.get('/getPosts',getPosts)
router.post('/createPost',auth,createPost)
router.get('/getDetail/:id',getDetail)
router.patch('/updatePost/:id',auth,updatePost)
router.delete('/deletePost/:id',auth,deletePost)
router.delete('/searchPost',searchPost)

module.exports = router 
