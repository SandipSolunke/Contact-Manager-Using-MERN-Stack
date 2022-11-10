import express from 'express'
import { getContacts, getContactsById,updateContacts,addNewContact,deleteContact, registerUser,loginUser, resetPass} from "./contactController.js";
const router = express.Router()

//express router methods to login and register user
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/:username/ResetPassword").post(resetPass)

// express router method to create route for getting all users
router.route('/').post(getContacts)

// express router method to create route for adding new user
router.route('/:username/add').post(addNewContact);


// express router method to create route for getting users by id
router.route('/:id').get(getContactsById)


// express router method to create route for updating users by id
router.route('/update/:id').put(updateContacts)


// express router method to create route for deleting users by id
router.route("/delete/:id").delete(deleteContact)

export default router