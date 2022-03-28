const port = 8000;

const path = require("path");

const express= require("express");
const { redirect } = require("express/lib/response");

const db = require('./config/mongoose')

const Contact = require('./models/contact')
 

const app = express();
//body parser
const bodyParser = require('body-parser');
const req = require("express/lib/request");
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static("assets"));

// code for mongodb atlas // cloud based approach
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://pratik:pratik@cluster0.nwome.mongodb.net/CONTACT_LIST?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//     console.log(collection)
//   client.close();
// });


 
app.get('/',function(req,res){
    // fs.readFile(filepath,function(err,data){
    //     res.end(data);
    // // });
    // console.log(__dirname);
    // res.send("<h1>Hello</h1>") 


    Contact.find({},function(err,ContactListFromDb ){  
        
        if(err)console.log(err);
        else

        return res.render('home',{
        title : "Contact List",
        contact_list :  ContactListFromDb
        });
    
    });
});
app.get('/submit',function(req,res){
  res.render('submit',{title:"submitted the page succesfully"}) ;
})

app.post('/create-contact',function(req,res){   

    Contact.create({
        name:req.body.myname,
        phone_no:req.body.myphone
    },(err,newContact)=>{
        if(err)console.log(err);
        else console.log(newContact);
    });
 
    return res.redirect('back' );
})


app.get('/delete-contact',function(req,res){ 
    let phonenum = req.query.phone;   
    console.log(req.query)

    for( var i = 0; i < contactList.length; i++){ 
    
        if ( contactList[i].phone_no === phonenum) { 
    
            contactList.splice(i, 1); 
        }
    
    } 

    return res.redirect('/');
})

// app.get('/deleteContact',function(req,res){
//     let cont,n=0;
//     for(let i in contactList){
//         if(req.body.name == i.name){
//             cont = i;
//             break;
//             n++;
//         }
//     }
//     delete contactList[n];
//     return res.redirect('/');
// })

app.listen(port,function(err){
    if(err){console.log(err);return;}
    console.log("Yup! My server is running on port ",port);
});