const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

var FirebaseClient = require('firebase-client');
var firebase = new FirebaseClient({
  url: "https://smarthomealert-60878.firebaseio.com/"
  //auth: "AIzaSyAtKL5MTRYMxIAI12nmi8clBbeHfBV6qUo"
});
app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })

app.get('/', (req, res) => {
  firebase
    .get('TL6TF3Lam1eDN4xUaYgHiBssuAI2/orders')
    .then(function(body){
      // var p = JSON.parse(body);
      res.json(body);

      console.log(body.length);
    })
    .fail(function(err){
      console.log(err);
    })

})

app.post('/newOrder', (req, res) => {
  firebase
    .get('TL6TF3Lam1eDN4xUaYgHiBssuAI2/orders')
    .then(function(body){
      // var p = JSON.parse(body);
      res.json(body);
      count = body.length;
      console.log(count);
      var test = req.body;
      var path = test.userId+'/orders/'+count;
      console.log(path);
      console.log("printing req.body");

      var productsCount = (((test.products).match(/,/g) || []).length)+1;
      console.log(productsCount);
      var orderDetails={};
      orderDetails.products = test.products;
      orderDetails.estimatedDelivery = "2";
      orderDetails.status = "Placed";
      orderDetails.totalPrice = (productsCount*3).toString();
      console.log(orderDetails);

      firebase
        .update(path,orderDetails)
        .then(function(body){
          console.log(body); // returns { value: true } 
        })
        .fail(function(err){
          console.log(err);
        });

      setTimeout(function() {
        orderDetails.status = "Preparing";

        firebase
          .update(path,orderDetails)
          .then(function(body){
            console.log(body); // returns { value: true } 
          })
          .fail(function(err){
            console.log(err);
          });

      }, 30000);  

      setTimeout(function() {
        orderDetails.status = "Shipped";

        firebase
          .update(path,orderDetails)
          .then(function(body){
            console.log(body); // returns { value: true } 
          })
          .fail(function(err){
            console.log(err);
          });

      }, 60000);

      setTimeout(function() {
        orderDetails.status = "Delivered";

        firebase
          .update(path,orderDetails)
          .then(function(body){
            console.log(body); // returns { value: true } 
          })
          .fail(function(err){
            console.log(err);
          });

      }, 90000);
    })
    .fail(function(err){
      console.log(err);
    })
  var test = req.body;
  console.log("printing req.body");
})

app.put('/order', (req, res) => {
  
  var test = req.body;
  console.log(test);
  firebase
    .update('milk/test9',{"age":50})
    .then(function(body){
      console.log(body); // returns { value: true } 
    })
    .fail(function(err){
      console.log(err);
    });
  res.redirect('/')

})

app.delete('/order', (req, res) => {
  
  firebase
    .delete('milk/test19')
    .then(function(body){
      console.log(body); // returns { value: true } 
    })
    .fail(function(err){
      console.log(err);
    });
    setTimeout(function() {
    res.redirect('/')
}, 9000);
})
