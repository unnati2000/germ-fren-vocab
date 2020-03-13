const express = require('express');
const app = express();
const bp = require('body-parser');
app.use(bp.urlencoded({
    extended: true
}));

//*******************************************EMAIL SECTIOMN ****************************************************** */
var nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

var d = new Date();


if(d.getHours()===8 && d.getMinutes()===0){
var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'localhost:3000',
    auth: {
      user: 'unnatibamania8@gmail.com',
      pass: '$m@ll$h00p'
    }

  });
  
  var mailOptions = {
    from: 'unnatibamania8@gmail.com',
    to:'unnatibamania2000@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: '<h1> Its time for Practice! Fill Wordaforum with your learned activites</h1>'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }

  })
  console.log('hhh');
}

//*********************************************** MONGOOSE ************************************************************/
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/languageDB', {useNewUrlParser:true, useUnifiedTopology: true});


//********************************************* FRENCH DBMS ************************************************************0/
const FrenchSchema = new mongoose.Schema({
    title: String,
    meaning: String
});

const French = new mongoose.model('French', FrenchSchema);

 //******************************************** GERMAN  **************************************************************/
 const GermanSchema = new mongoose.Schema({
    title: String,
    meaning: String
});

const German = new mongoose.model('German', GermanSchema);

//********************************************* word **************************************************************/
const VocabSchema = new mongoose.Schema({
    title: String,
    meaning: String
});

const Vocab = new mongoose.model('Vocab', VocabSchema);



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(express.static('public'));

//******************************************  HOME ****************************************************************** */
app.get('/', (req, res, next) => {
    res.render('home.ejs');
});

// *********************************************** GERMAN *********************************************************************
app.get('/german', (req,res,next) =>{
    res.render('german.ejs')
});

  
app.post('/german', (req, res, next) => {
    German.findOne({title: req.body.gword}, function(err, foundWord) {
        if (err) {
            res.send(err);
        } else {
            if (foundWord) {
                res.render("result.ejs", {word: foundWord});
            } else {
                res.render("result.ejs", {word: {
                    title: "Oops !",
                    eng_meaning: "Trying adding the word first !"
                }});
            }
        }
    });
});

//************************************************ FRENCH ********************************************************************** 
app.get('/french', (req,res,next) =>{
    res.render('french.ejs');
})
app.post('/french', (req, res, next) => {
    French.findOne({title: req.body.fword}, function(err, foundWord) {
        if (err) {
            res.send(err);
        } else {
            if (foundWord) {
                res.render("result.ejs", {word: foundWord});
            } else {
                res.render("result.ejs", {word: {
                    title: "Oops !",
                    eng_meaning: "Trying adding the word first !"
                }});
            }
        }
    });
});

// ********************************************** VOCAB ***********************************************************************
app.get('/vocab', (req,res,next) =>{
    res.render('vocab.ejs');
})
const msg = 'please add that word';
app.post('/vocab', (req, res, next) => {
    Vocab.findOne({title: req.body.word}, function(err, foundWord) {
        if (err) {
            res.send(err);
        } else {
            if (foundWord) {
                res.render("result.ejs", {word: foundWord,
                                            });
            } else {
                res.render("result.ejs", {word: {
                    title: "Oops !",
                    eng_meaning: "Trying adding the word first !"
                }});
            }
        }
    });
});






// ********************************************* ADD ***************************************************************************
app.get('/add', (req,res,next) =>{
    res.render('add.ejs');
});
app.post('/add', (req,res,next) =>{
    const op = (req.body.select);
    if(op==='German'){
        const german = new German({
            title: req.body.word,
            eng_meaning: req.body.meaning
        })
        german.save();
    }
    else if(op=='French'){
        const french = new French({
            title: req.body.word,
            eng_meaning: req.body.meaning
        })
        french.save();
    }
    else if (op=='Vocab'){
        const vocab = new Vocab({
            title: req.body.word,
            meaning: req.body.meaning
        });
        vocab.save();
        console.log('e');

    }

    // Call karu ? wait main arti hu ok
    
    res.redirect('/');
})
// *********************************************** PROGRESS ******************************************************************

let frenchCount = 0;
let germanCount = 0;
let vocabCount = 0;

app.get("/progress", function (req, res) {

    French.find({}, function (err, results) {
        frenchCount = results.length;
    });

    German.find({}, function (err, results) {
        germanCount = results.length;
    });

    Vocab.find({}, function (err, results) {
        vocabCount = results.length;
        res.render("progress.ejs", {
            frenchCount: frenchCount,
            germanCount: germanCount,
            vocabCount: vocabCount
        });
    });

});app.listen(3000);