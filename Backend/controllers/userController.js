import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"

//api to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !password || !email) {
            return res.json({ success: false, message: "All fields are required" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid Email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be atleast 8 characters long" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashPassword,
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//api for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token })
        }
        else {
            return res.json({ success: false, message: "Invalid password" })
        }


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//api to get user profile data
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select('-password');
        if (userData) {
            res.json({ success: true, userData })
        }
        else {
            res.json({ success: false, message: "User not found" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//api to update user profile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, gender, dob } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "All fields are required" })
        }
        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender });
        if (imageFile) {
            // upload image to cloudinary 
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }
        res.json({ success: true, message: "Profile updated successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//api to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotTime, slotDate } = req.body;
        const docData = await doctorModel.findById(docId).select('-password');
        if (!docData.available) {
            return res.json({ success: false, message: "Doctor is not available" })
        }

        let slots_booked = docData.slots_booked;

        //checking for slots availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot is already booked" })
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        const appointmentData = {
            userId,
            docId,
            slotTime,
            slotDate,
            userData,
            docData,
            amount: docData.fees,
            date: Date.now()
        }
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment booked successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment }