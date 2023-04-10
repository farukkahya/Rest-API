const jwt = require('jsonwebtoken') //token işlemleri için jsonwebtoken dahil ediliyor.

// Yetki kontrolleri için kullanıcı tokenlerini kontrol ettiğim fonksiyon 
const auth = async (req,res,next) => {
  try {
    const token = req.headers.authorization.split(" ")[1] // Kullanıcınn tokeni alınıyor.
    let decodedData; // çözülen tokendaki verileri tutan değişken

    if (token) {
      decodedData = jwt.verify(token,process.env.SECRET_TOKEN) // Gönderilen token güvenlik tokenime göre çözümleniyor. 
      req.userId = decodedData?.id // Çözümlenen bilgi var ise o bilgideki id değeri userId değerine atanıyor.
    }else{
      decodedData = jwt.decode(token)
      req.userId = decodedData?.sub
    }
    next()

  } catch (error) {
    console.log(error) // Bir hata ile karşılaşılması durumunda hata mesajı gönderiliyor. 
  }
}
module.exports = auth; //auth dışa aktarılıyor.