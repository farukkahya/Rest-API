const Auth = require('../models/auth.js') // Kullanıcı işlemleri için oluşturduğumuz modeli çağrıyorum.
const bcrypt = require('bcryptjs') // Şifre hashleme işlemli için bcryptjs dahil ediliyor.
const jwt = require('jsonwebtoken') // Kullanıcının giriş ve kayıt olma işlemlerinin daha güvenli şekilde yapılabilmesi için jsonwebtoken dahil ediliyor.

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Bodyden kayıt olma işlemi için gerekli parametreleri alınıyor.

    // Girilen email ile eşleşen kullanıcı bilgisi var mı kontrolü yapılıyor ve var ise uyarı mesajı gönderiliyor.
    const user = await Auth.findOne({ email });
    if (user) {
      return res.status(500).json({ message: 'Bu email başka bir kullanıcı tarafından kullanılıyor.' })
    }

    // Şifre uzunluğu 6 karakterden az ise uyarı mesajı gönderiliyor.
    if (password.length < 6) {
      return res.status(500).json({ message: 'Şifreniz en az 6 karakterden oluşmalıdır.' })
    }

    const passwordHash = await bcrypt.hash(password, 12) // şifre hashlenerek gizleniyor.

    const newUser = await Auth.create({ username, email, password: passwordHash }) // Oluşturduğum Auth Modeli ile yeni bir kullanıcı oluşturuluyor.

    const userToken = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, { expiresIn: '1h' }) // JWT ile yeni oluşturulan kullanıcıya bir saat geçerli bir token oluşturuluyor. 

    res.status(201).json({
      status: 'OK',
      newUser,
      userToken
    }) // Yeni kullanıcı bilgileri gönderilerek kullanıcının verilerinin veritabanına kayıt edilmesi sağlanıyor.

  } catch (error) {
    return res.status(500).json({ message: error.message }) // Bir hata ile karşılaşılması durumunda hata mesajı gönderiliyor. 
  }
}


const login = async (req, res) => {
  try {
    const { email, password } = req.body;// Bodyden giriş yapma işlemi için gerekli parametreleri alınıyor.

    // Girilen email ile eşleşen kullanıcı bilgisi var mı kontrolü yapılıyor ve yok ise uyarı mesajı gönderiliyor.
    const user = await Auth.findOne({ email })
    if (!user) {
      return res.status(500).json({ message: 'Kullanıcı adı ve/veya şifre hatalı.' })
    }

    // Girilen şifre ile kullanıcı şifresi eşleşiyor mu kontrolü yapılıyor ve eşleşmiyor ise uyarı mesajı gönderiliyor.
    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) {
      return res.status(500).json({ message: 'Kullanıcı adı ve/veya şifre hatalı.' })
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, { expiresIn: '1h' }) //JWT ile giriş yapan kullanıcıya bir saat geçerli bir token oluşturuluyor. 

    res.status(200).json({
      status: 'OK',
      user,
      token
    })// Giriş yapan kullanıcının bilgileri gönderilerek kullanıcının login olması sağlanıyor.

  } catch (error) {
    res.status(500).json({ message: error.message })// Bir hata ile karşılaşılması durumunda hata mesajı gönderiliyor. 
  }
}


module.exports = { register, login } // register ve login fonksiyonları dışa aktarılıyor.