const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const ImagePath = '../../uploads/AdminImage'
const AdminSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    hobby:{
        type:Array,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default: true
    }
})

const StorageImage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,path.join(__dirname,ImagePath))
    },
    filename:(req,file,cb) => {
        cb(null,file.fieldname+'-'+Date.now())
    }
})
AdminSchema.statics.uploadImage = multer({storage:StorageImage}).single('image')
AdminSchema.statics.ImgPath = ImagePath

const Admin = mongoose.model('Admin',AdminSchema)
module.exports = Admin
