import contactsDBModel from "./contactDBModel.js"
import asyncHandler from "express-async-handler"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//getcContacts function to get all contacts
export const getContacts = asyncHandler(async (req, res) => {
    const username = req.body.username
    if (username) {
        const searchResult = await contactsDBModel.findOne({ username: username })
        if (searchResult) {
            res.json({ massage: "Invalid Username", data: searchResult.contacts, status: true })
        }
        else res.json({ massage: "Username Not Found", status: false })
    }
    else res.json({ massage: "Invalid Username", status: false })
})


//getContactsById function to retrieve Contacts by id
export const getContactsById = asyncHandler(async (req, res, next) => {
    const contact = await contactsDBModel.findById(req.params.id, (error, data) => {
        if (error) {
            res.json(error)
            return next(error)
        }
        else {
            res.json(contact)
            console.log('Contact retrieved successfully !')
        }
    })

})


//addNewContacts function to add new contact in DB
export const addNewContact = asyncHandler(async (req, res, next) => {

    try {
        const username = req.params.username
        await contactsDBModel.updateOne({ username: username }, { $push: { contacts: [{ name: req.body.name, email: req.body.email }] } }).then((data, error) => {
            if (error) {
                res.json({ massage: "Error!", status: false })
                console.log(error)
            }

            else {
                res.json({ massage: "Created Successfully!", status: true })
                console.log('Contact created successfully !')
            }
        })
    } catch (error) {
        res.json({ massage: "Error!", status: false })
        console.log("error")
    }

})



//updateContacts function to update contacts by id
export const updateContacts = asyncHandler((req, res) => {
    contactsDBModel.updateOne(
        {
            username: req.body.username.username,
            "contacts._id": req.params.id
        },
        { $set: { "contacts.$": req.body.data } }
        , (error, data) => {
            if (error) {
                console.log(error)
                res.json({ massage: "Error!", status: false })
            }
            else {
                res.json({ massage: "Updated Successfully!", status: true })
                console.log('Contact updated successfully !')
            }
        })
})



//deleteContact function to delete Contacts by id
export const deleteContact = asyncHandler(async (req, res, next) => {
    contactsDBModel.updateOne(
        { username: req.body.username },
        { $pull: { 'contacts': { _id: req.params.id } } }
        , (error, data) => {
            if (error) {
                console.log(error)
                res.json({ massage: "Error!", status: false })
            }
            else {
                res.json({ massage: "Deleted Successfully!", status: true })
                console.log('Contact deleted successfully !')
            }
        })
})


//registerUser Function to register new user
export const registerUser = asyncHandler(async (req, res) => {
    const user = req.body;

    if (!user.username || !user.email || !user.password) return res.json({ massage: "Invalid Details !" })

    const username = await contactsDBModel.findOne({ username: user.username })
    const email = await contactsDBModel.findOne({ email: user.email })

    if (username) {
        res.json({ massage: "Username has already registered!", status: false })
    }

    else if (email) {
        res.json({ massage: "Email has already registered!", status: false })
    }

    else {
        user.password = await bcrypt.hash(req.body.password, 10)

        const dbUser = new contactsDBModel({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password
        })

        dbUser.save()
        res.json({ massage: `Registration Successfull...`, status: true })
    }
})



export const loginUser = asyncHandler(async (req, res) => {
    const user = req.body;
    if (!user.username || !user.password) return res.json({ massage: "Invalid Details !" })
    contactsDBModel.findOne({ username: user.username })
        .then(dbUser => {
            if (!dbUser) {
                return res.json({ massage: "Inavlid Username!" })
            }
            bcrypt.compare(user.password, dbUser.password)
                .then(isCorrect => {
                    if (isCorrect) {
                        const payload = { id: dbUser._id, username: dbUser.username, }

                        jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 86400 }, (error, token) => {
                            if (error) {
                                console.log(error)
                                return res.json({ massage: "error", error: error })
                            }

                            return res.json({ massage: "Success", token: "Bearer " + token })
                        })
                    }
                    else {
                        return res.json({ massage: "invalid Password!" })
                    }
                })
        })
})




export const resetPass=asyncHandler(async(req,res)=>{
    const user=req.body;
    if(!user.currPass || !user.newPass) return res.json({massage:"Invalid Details !"})
    
    const NewPass=await bcrypt.hash(user.newPass,10)
    const CurrPass=await bcrypt.hash(user.currPass,10)

    contactsDBModel.findOne({username: user.username})
    .then(dbUser =>{
        if(!dbUser){
            return res.json({massage:"Inavlid Password!"})
        }
        bcrypt.compare(user.currPass, dbUser.password)
        .then(isCorrect=>{
            if(isCorrect){
                
                contactsDBModel.updateOne({username: user.username},{$set: {password : NewPass}}, (error,response)=>{
                    if(error) return res.json({massage:"Error", status:false})
                    return res.json({massage:"Password Reset Successfully!", status:true})
                })
            }
            else{
                return res.json({massage:"Invalid Password!", status:false})
            }
        })
    })
})