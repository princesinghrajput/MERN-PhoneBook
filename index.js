const express = require('express')
const cors = require('cors')
const app= express();
const mongoose = require('mongoose')
const PhoneBook = require('./model/PhoneBook')
app.use(express.json())
app.use(cors())

const DB = 'mongodb+srv://psr8084:qSC0l4WvW6U6KWXC@cluster0.d2kjzik.mongodb.net/PhoneBook'
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to MongoDB....')
})


//Implementing POST Routes
/*app.post('/add-phone', async(req, res)=>{
    const phoneNumber = new PhoneBook(req.body)

    try {
        await phoneNumber.save();
        res.status(200).json({
            status:"Success",
            data :{
                phoneNumber
            }
        })
    } catch (error) {
        res.status(500).json({
            status:"failed",
            message:error.message
        })
    }
})
*/


// app.post('/add-phone', async(req, res)=>{
//     const phoneNumber = new PhoneBook(req.body)
//     try {
//         await phoneNumber.save();
//         res.status(200).json({
//             status:"Success",
//             data :{
//                 phoneNumber
//             }
//         })
//     } catch (error) {
        
//     }
// })

// app.get('/get-phone', async (req,res) => {
//     const phoneNumbers = await PhoneBook.find({})
//     try{
//         res.status(200).json({
//             status : 'Success',
//             data : {
//                 phoneNumbers
//             }
//         })
//     }catch(err){
//         res.status(500).json({
//             status: 'Failed',
//             message : err
//         })
//     }
// })


app.post('/add-phone', async(req, res)=>{
    const phoneNumber = new PhoneBook(req.body)

    try {
        await phoneNumber.save()
        res.status({
            status:"Success",
            data :{
                phoneNumber
            }
        })
    } catch (error) {
        res.status(500).json({
            status:"failed",
            message:error.message
        })
        
    }
})

app.get('/get-phone', async(req, res)=>{
    const phoneNumbers = await PhoneBook.find({});

    try {
        res.status(200).json({
            status : 'Success',
            data : {
                phoneNumbers
            }
        })
        
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message : error.message
        })
        
    }
})

app.patch('/update-phone/:id', async (req,res) => {
    const updatedPhone = await PhoneBook.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true
      })
    try{
        res.status(200).json({
            status : 'Success',
            data : {
              updatedPhone
            }
          })
    }catch(err){
        console.log(err)
    }
})

app.delete('/delete-phone/:id', async(req,res) => {
    await PhoneBook.findByIdAndDelete(req.params.id)
    
    try{
      res.status(204).json({
          status : 'Success',
          data : {
            message : 'Deleted Successfully'
          }
      })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}.......`)
})