//importing necessary imports
const http = require('http')
const express = require('express')
const path = require('path')
const db = require('./config/mongoose')
const Contact = require('./models/contacts')

app = express()
//setting up template engine to ejs
app.set('view engine', 'ejs')
//telling the ejs to look up in views folder for ejs files
app.set('views', path.join(__dirname, 'views'))
//using middleware to encode the request before forwarding it to controller
app.use(express.urlencoded())
//telling express to look up in static folder for any static files thorugh middleware
app.use(express.static('static'))

var contactList = [
    {
        'name': 'Dhruv',
        'age': 20,
        'number': 99999999999
    },
    {
        'name': 'Rahul',
        'age': 25,
        'number': 45451558465489
    },
    {
        'name': 'Aayush',
        'age': 18,
        'number': 585448346516546
    }
]

//home route
app.get('/', (req, res) => {

    Contact.find({}, (err, contacts) => {
        if(err){
            return console.log('Error pls console log the error if unable to find it');
        }
        return res.render('index', {
            title: 'My Contact List',
            contact_list: contacts
        })
    })
})

//practice route
app.get('/practice', (req, res) => {
    res.render('practice', {
        title: 'practice.ejs'
    })
})
//create contact route
app.post('/create-contact', (req, res) => {  
    Contact.create({
        name: req.body.name,
        number: req.body.name
    }, function(err, newContact){
        if(err){console.log('Error in creating a contact!', err)
            return;}
            console.log('new-contact Created', newContact);
            return res.redirect('back');
    })
})
//delete contact route
app.get('/delete-contact', (req, res) => {
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting an object');
            return;
        }
        res.redirect('back')
    })
    // let contactIndex = contactList.findIndex(contact => contact.number == number)
    // if(contactList != -1){
    //     contactList.splice(contactIndex, 1)
    // }
   
})

//setting up  our server on mentioned port
app.listen(8000, err=>{
    if(err){
        console.log(err);
    }
    console.log('server running on port 8000');
})