const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../schema/userSchema")
const { generatePasswordHash, checkExistingUser } = require("../utility")
const router = express.Router()
router.post("/register", (req, res) => {
    const userData = userModel.findOne({ email: req.body.email })
    if (userData.length) {
        return res.status(400).send("User Already Exists")
    } else {
        generatePasswordHash(req.body.password).then((passwordHash) => {
            userModel.create({
                name: req.body.name,
                email: req.body.email,
                password: passwordHash,
                phone: req.body.phone,
                address: req.body.address,
                role: req.body.role
            }).then(() => {
                res.status(200).send(`${req.body.email} added successfully`);
            }).catch((err) => {
                console.log(err);
                res.status(400).send(err.message)
            })
        });
    }

});
router.post("/login", (req, res) => {
    userModel.find({ email: req.body.email }).then((userData) => {
        if (userData.length) {
            bcrypt.compare(req.body.password, userData[0].password).then((val) => {
                if (val) {
                    const authToken = jwt.sign(userData[0].email, process.env.SECRET_KEY);
                    res.status(200).send({ authToken });
                } else {
                    res.status(400).send("Invalid Password");
                }
            })
        } else {
            userModel.find({ phone: req.body.phone }).then((userData) => {
                if (userData.length) {
                    bcrypt.compare(req.body.password, userData[0].password).then((val) => {
                        if (val) {
                            const authToken = jwt.sign(userData[0].email, process.env.SECRET_KEY);
                            res.status(200).send({ authToken });
                        } else {
                            res.status(400).send("Invalid Password");
                        }
                    })
                } else {
                    res.status(400).send("No user with given Details")
                }
            })
        }
    })
});
router.get("/admin", (req, res) => {
    const admin = userModel.find({ role: "Admin" })
    if (req.headers.token) {
        if (admin) {
            userModel.find({ role: "User" }).then((data) => {
                res.status(200).send({ data })
            })
        } else{
            res.status(400).send("Access Denied")           
        } 
    }else {
        res.status(400).send("Invalid Token")
    }

})


router.post("/logout", (req, res) => {
    res.status(200).send("logout works");
});
module.exports = router
