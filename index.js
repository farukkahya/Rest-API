const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database'); // Database bağlantısını yaptığım dosya
const Auth = require('./routes/auth.js'); // Kayıt olma ve giriş yapma işlemlerini yaptığım dosya
const Post = require('./routes/post.js'); // Postlar için CRUD işlemlerini yaptığım dosya 

dotenv.config()

const app = express();
app.use(cors())
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))

app.use('/', Auth) 
app.use('/', Post)

const PORT = process.env.PORT || 5000;

db()

app.listen(PORT, console.log(`Server is running on port: ${PORT}`))