import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'

const addDoctor = async (req, res) => {
    try {
        //  Changed request.body -> req.body
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Validation for missing fields (including checking for imageFile)
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing details" })
        }

        if (!imageFile) {
            return res.json({ success: false, message: "Image not provided" })
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })
        }
       
        //  Fixed password length check (< 8 characters instead of < 0)
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password (at least 8 characters)" })
        }

        //  Fixed bcrypt spelling
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url
       
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: "Doctor Added" })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

//api for admin login
const loginAdmin = async (res,req) => {
    try {
        const {email , password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password, process.env.JWT_SECRET )
        res.json({success:true , token})
        }else{
            res.json({success:false, message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

export { addDoctor , loginAdmin }