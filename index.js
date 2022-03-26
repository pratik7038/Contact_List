const port = 8000;

const path = require("path");

const express= require("express");
const { redirect } = require("express/lib/response");

const app = express();
//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static("assets"));

var contactList = [
    {   
        name:"Pratik",
        phone_no:"70283929390"
    },
    {
        name:"diksha",
        phone_no:"983929390"
    }
]

app.get('/',function(req,res){
    // fs.readFile(filepath,function(err,data){
    //     res.end(data);
    // // });
    // console.log(__dirname);
    // res.send("<h1>Hello</h1>") 
    res.render('home',{
        title : "Contact List",
        contact_list : contactList
    });
});
app.get('/submit',function(req,res){
  res.render('submit',{title:"submitted the page succesfully"}) ;
})

app.post('/create-contact',function(req,res){   
    contactList.push({
        name:req.body.myname,
        phone_no:req.body.myphone
    });
    console.log(contactList);
    return res.redirect('/' );
})


app.get('/delete-contact',function(req,res){ 
    let phonenum = req.query.phone;  
    var temp;
    console.log("abcd")
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