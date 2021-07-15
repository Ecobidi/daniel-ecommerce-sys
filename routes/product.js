const cloudinary = require('cloudinary')
const multer = require('multer')
const streamifier = require('streamifier')
const router = require('express').Router()

const ProductController = require('../controllers/product')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const upload = multer({})

const streamUpload = (file) => {
  return new Promise((resolve, reject) => {
    
      let stream = cloudinary.v2.uploader.upload_stream({folder: 'ariaria-ecommerce-sys'},
        (error, result) => {
          console.log('Error', error)
          console.log('Result', result)
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
     streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

router.get('/', ProductController.getAllProductsPage)

router.get('/new', ProductController.createProductPage)

router.post('/new', upload.single('image'), async function (req, res, next) {
  try {
    let {url} = await streamUpload('req.file.image')
    let dao = req.body
    dao.image = url
    await ProductService.save(dao)
    req.flash('success_msg', 'Product Added')
    req.redirect('/products')
  } catch (error) {
    console.log(error)
    console.log('An Error Creating Product')
    res.redirect('/products/new')
  }
});


// router.post('/new', upload.single('image'), ProductController.createProduct)

router.get('/remove/:product_id', ProductController.removeProduct)

module.exports = router