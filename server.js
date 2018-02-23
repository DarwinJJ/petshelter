let express = require('express')
let bodyParser = require('body-parser')
let path = require('path')
let mongoose = require('mongoose')
let app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname + "/client/dist"))

mongoose.connect('mongodb://localhost/pets')

let PetSchema = new mongoose.Schema({
    name: { type: String, minlength: 3,},
    type: { type: String, minlength: 3, },
    desc: { type: String, minlength: 3 },
    skills: [],
    like : Number,
}, { timestamps: true })

let Pet = mongoose.model("pet", PetSchema)



app.get("/pets", function (req, res) {
    Pet.find({}, function (err, data) {
        if (err) {
            res.json({
                message: 'app.get/pets',
                error: err
            })
        } else {
            res.json({ db: data })
        }
    })
})


app.post('/pets', function (req, res) {
    if(req.body.name.length < 3){
        console.log('got error server');
        res.json({error:"pet name at least 3 characters"})
    } if (req.body.type.length < 3) {
        console.log('got error server');
        res.json({ error: "pet type at least 3 characters" })
    } if (req.body.desc.length < 3) {
        console.log('got error server');
        res.json({ error: "description at least 3 characters" })
    }else{
        let pet = new Pet({
            name : req.body.name,
            type : req.body.type,
            desc : req.body.desc,
            skills : req.body.skills,
            like : 0,
        })
        pet.save(function (err, data) {
            if (err) {
                res.json({
                    message: 'app.post/pets',
                    error: err
                })
            } else {
                res.json({ success: data })
            }
        })
    }
})


app.get('/pets/:id', function (req, res) {
    Pet.findById({
        _id: req.params.id
    }, function (err, data) {
        if (err) {
            res.json({
                message: 'app.get/pets/:id',
                error: err
            })
        } else {
            res.json(data)
        }
    })
})


app.put('/pets/:id', function (req, res) {
    Pet.findByIdAndUpdate({ _id: req.params.id }, req.body, function (err, data) {
        if (err) {
            res.json({
                message: 'app.put/pets/:id',
                error: err
            })
        } else {
            res.json({ success: data })
        }
    })
})


app.delete('/pets/:id', function (req, res) {
    Pet.findByIdAndRemove({ _id: req.params.id }, function (err, data) {
        if (err) {
            res.json({
                message: 'app.delete/pets/:id',
                error: err
            })
        } else {
            res.json({ success: data })
        }
    })
})



app.all("*", (req, res, next) => {
    res.sendFile(path.resolve('./client/dist/index.html'))
})

app.listen(8000,function(){
    console.log('listening on port 8000');
})



