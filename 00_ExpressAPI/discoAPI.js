//IMPORTS
import express from 'express'
import { productsRouter } from './routes/products/products.route.js'
import { categoriesRouter } from './routes/categories/categories.route.js'
import { customerRouter } from './routes/customer/customer.route.js'
import { basketRouter } from './routes/basket/basket.route.js'

//VARIABLES
const app = express()
const PORT = 3000

//CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

// JSON PARSER
app.use(express.json())

// PATHS
app.use(productsRouter)
app.use(categoriesRouter)
app.use(customerRouter)
app.use(basketRouter)

// 404
app.get('*', (req, res) => {
  res.send('This is an invalid URL.')
})

//STARTUP
app.listen(PORT, function (err) {
  if (err) console.log('An error occured')
  console.log('Server listening on port', PORT)
})
