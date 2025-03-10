const AdminModel = require('../../model/AdminModel/AdminModel')
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer')

// async function transportmailer(req,body ,email){





// }

module.exports.Login = (req, res) => {
    try {
        res.render('Login/login')
    }
    catch (err) {
        console.log(err)
        res.redirect('back')
    }
}
module.exports.VerifieEmail = (req, res) => {
    try {

    }
    catch (err) {

    }
}
module.exports.forgot_password = (req, res) => {
    try {
        res.render('Forgot_password/recover_pasword')
    }
    catch (err) {
        console.log(err)
        return res.redirect()
    }
}
module.exports.recoverpasword = (req, res) => {
    try {
        res.render('Forgot_password/recover_pasword')
    }
    catch (err) {
        console.log(err)
        return res.redirect()
    }
}
module.exports.Dashboard = async (req, res) => {
    try {
        res.render('Dashboard/dashboard');
    }
    catch (err) {
        console.log(err);
        res.redirect('back');
    }
}
module.exports.AddAdmin = async (req, res) => {
    try {
        res.render('Admin/AddAdmin')
    }
    catch (err) {
        console.log(err);
        res.redirect('back');
    }
}
module.exports.InsertAdmin = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        let Image = ''
        if (req.file) {
            Image = await AdminModel.ImgPath + '/' + req.file.filename
        }
        req.body.image = Image
        req.body.name = req.body.fname + req.body.lname

        await AdminModel.create(req.body)
        // res.redirect('back')

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: "bogharajenish94@gmail.com",
                pass: "iwdcmqnfumzdngky",
            },
        });
        const info = await transporter.sendMail({
            from: 'bogharajenish94@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "Verify the Admin User ✔", // Subject line
            text: "Admi Data inserted  With user", // plain text body
            html: "<a href=/>Click Here to Verify the Email</a>", // html body
        });

        console.log("verification is on her email..")
        return res.redirect('back')
    }
    catch (err) {
        console.log(err);
        res.redirect('back');
    }
}
module.exports.ViewAdmin = async (req, res) => {
    try {

        let search = ''
        if (req.query.search) {
            search = req.query.search;
        }
        let page = 0;
        let perPage = 3;
        if (req.query.page) {
            page = req.query.page
        }

        let AdminData = await AdminModel.find({
            $or: [
                { name: { $regex: search } },
                { email: { $regex: search } }
            ]
        }).skip(page * perPage).limit(perPage)

        res.render('Admin/ViewAdmin', {
            AdminData, search, page
        })

    } catch (err) {
        console.log(err);
        res.redirect('back');
    }
}
module.exports.DeleteData = async (req, res) => {
    try {
        let SingleObj = await AdminModel.findById(req.query.id)
        console.log(SingleObj)

        if (SingleObj) {
            let deletepath = path.join(__dirname, '..', SingleObj.image);
            fs.unlinkSync(deletepath);
        }
        else {
            console.log('No Data Found')
        }

        await AdminModel.findByIdAndDelete(req.query.id)
        return res.redirect('back')

    } catch (err) {
        console.log(err);
        res.redirect('back');
    }
}
module.exports.update = async (req, res) => {
    try {
        let singleAdmin = await AdminModel.findById(req.params.id)
        // console.log(singleAdmin)
        res.render('Admin/EditAdmin', {
            singleAdmin
        })
    }
    catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}

module.exports.EditAdmin = async (req, res) => {
    try {
        let id = req.body.id
        let updateData = await AdminModel.findById(id)
        if (req.file) {
            //  UPDATE WITH IAMGE
            let oldImagePath = updateData.image
            if (oldImagePath) {
                fs.unlinkSync(path.join(__dirname, oldImagePath))
                req.body.image = AdminModel.ImgPath + '/' + req.file.filename
            }
            await AdminModel.findByIdAndUpdate(id, req.body)
            res.redirect('/viewAdmin')

        }
        else {
            // update without image
            console.log(updateData);
            req.body.image = updateData.image
            await AdminModel.findByIdAndUpdate(id, req.body)
            res.redirect('/viewAdmin')
        }
    }
    catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}