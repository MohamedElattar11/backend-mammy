require('./config/config')
const express = require('express');
const http = require('http');
const app = express();
//soket server 

const server = http.createServer(app);
const io = require('./Socket.js').init(server);

const bodyparser = require('body-parser');
const usersRouter = require('./routes/users');
const chartsRouter = require('./routes/charts');
const CartRouter = require('./routes/cart')
const productRouter = require('./routes/productsRouter');
const ordersRouter = require('./routes/ordersRouter')
const blogsRouter = require("./routes/BlogPost")
const commentsRouter = require('./routes/comments');
const todoRouter = require('./routes/todoRoute');
const vaccinationRouter = require('./routes/vaccination');
const notificationRouter = require('./routes/notificationRoutes');

const cors = require('cors');
const path = require('path');



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './uploads')));

// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json());
// Routes
app.use('/user', usersRouter);

//Products router
app.use('/products', productRouter)
app.use('/blogs', blogsRouter)
app.use('/comments', commentsRouter)

//Orders Route 
app.use('/orders', ordersRouter);

//Todo Route 
app.use('/todo', todoRouter);


// vaccination 
app.use('/vaccination', vaccinationRouter);
app.use('/cart', CartRouter);

//charts
app.use('/charts', chartsRouter);
//vaccination 
app.use('/vaccination', vaccinationRouter);
//notfications
app.use('/notification', notificationRouter);






const PORT = 4000;

//Soket Server
io.on('connection', (socket) => {
  console.log('Client connected');

});


// Start the server

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

