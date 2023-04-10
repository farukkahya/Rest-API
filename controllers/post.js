const PostSchema = require('../models/post.js') // Post işlemleri için oluşturduğumuz modeli çağrıyorum.

// Postların hepsini çağırmak için oluşturduğum fonksiyon
const getPosts = async (req, res) => {
  try {
    const getPosts = await PostSchema.find() // Postlar alınıyor.
    res.status(200).json(getPosts)// Postlar gönderiliyor.
  } catch (error) {
    res.status(500).json({ message: error.message }) // Bir hata ile karşılaşılması durumunda hata mesajı gönderiliyor. 
  }
}

// Post oluşturmak için oluşturduğum fonksiyon
const createPost = async (req, res) => {
  try {
    const newPost = await PostSchema.create(req.body) // Body'den gelen veriler ile yeni bir post oluşturuluyor.
    res.status(201).json(newPost) // Oluşturulan post gönderiliyor.
  } catch (error) {
    res.status(500).json({ message: error.message })// Bir hata ile karşılaşılması durumunda hata mesajı gönderiliyor. 
  }
}

// Belirtilen id değeri ile eşleşen postun detaylarını almak için oluşturduğum fonksiyon
const getDetail = async (req, res) => {
  try {
    const { id } = req.params // id değeri alınıyor.
    const getDetail = await PostSchema.findById(id) // id ile eşleşen postun detay bilgileri alınıyor
    res.status(200).json(getDetail) // Post detayları gönderiliyor.
  } catch (error) {
    res.status(500).json({ message: error.message })// Bir hata ile karşılaşılması durumunda hata mesajı gönderiliyor. 
  }
}

// Belirtilen id değeri ile eşleşen postun güncelleme işlemi için oluşturduğum fonksiyon
const updatePost = async (req, res) => {
  try {
    const { id } = req.params // id değeri alınıyor.
    const update = await PostSchema.findByIdAndUpdate(id, req.body, { new: true }) // id ile eşleşen postun yeni bilgilerini güncelliyorum.
    res.status(200).json(update) // Güncellenen post gönderiliyor. 
  } catch (error) {
    res.status(500).json({ message: error.message })// Bir hata ile karşılaşılması durumunda hata mesajı gönderiliyor. 
  }
}

// Belirtilen id değeri ile eşleşen postun silme işlemi için oluşturduğum fonksiyon
const deletePost = async (req, res) => {
  try {
    const { id } = req.params // id değeri alınıyor.
    await PostSchema.findByIdAndRemove(id) // id ile eşleşen postu siliyorum.
    res.status(200).json({
      message: 'Silme işlemi başarılı.'
    }) // Silme işleminin başarılı olduğunu belirten bir mesaj gönderiliyor.
  } catch (error) {
    res.status(500).json({ message: error.message })// Bir hata ile karşılaşılması durumunda hata mesajı gönderiliyor. 
  }
}


// Belirtilen arama parametlerine uyan postlaraı bulmak için oluşturduğum fonksiyon
const searchPost = async (req,res) => {
  const {serach,tag} = req.query; // Arama parametreleri alınıyor.
  try {
    const title = new RegExp(serach,"i") // Title oluşturuluyor.
    const posts = await PostSchema.find({$or:[{title}], tag:{$in:tag.split(",")}}) // Parametrelere uyan postlar alınıyor.
    res.status(200).json(
      {posts}
    )// Parametrelere uyan postlar gönderiliyor.
  } catch (error) {
    res.status(500).json({ message: error.message })// Bir hata ile karşılaşılması durumunda hata mesajı gönderiliyor. 
  }
}

module.exports = { getPosts, getDetail, createPost, deletePost, updatePost, searchPost }// getPosts, getDetail, createPost, deletePost, updatePost, searchPost fonksiyonları dışa aktarılıyor.