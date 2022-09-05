const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');//importing node mailer



exports.getUser = async (req, res, next) => {
    const user = await User.findOne({ userEmailId: req.body.userEmailId });
    if (user) {
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (validPassword) {
            res
                .status(200)
                .json({
                    message: "Valid Password",
                    user: {
                        userName: user.userName,
                        userEmailId: user.userEmailId,
                        groupsInvolved: user.groupsInvolved,
                    },
                });
        } else {
            res.status(400).json({ error: "Invalid password" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const oldUser = await User.findOne({ userEmailId: req.body.userEmailId });
        if (oldUser) {
            return res.status(400).send("User Already exist, Please Login");
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        User.create(req.body)
            .then((docs) => {
                res.status(201).json(docs);
            })
            .catch((err) => res.json(err));
    } catch (err) {
        res.json(err);
    }
};


exports.updateUser = async (req, res, next) => {
    await User.findOneAndUpdate({ userEmailId: req.body.userEmailId }, req.body, {
        new: true,
    })
        .then((response) => {
            res.status(200).json({
                code: 200,
                message: response
                    ? "User updated successfully"
                    : "Either User was not updated or UserId does not exist",
            });
        })
        .catch((err) => {
            res.json(err);
        });
};

exports.sendinvite = async (req, res, next) => {
    const user = await User.findOne({ userEmailId: req.body.userEmailId });
    if (user) {
        res.status(401).json({ error: "User Exist" });

    } else {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'quicksplittor@gmail.com',//replace with your email
                pass: 'ijcgotjqsgdthiaj'
            },
            port: 465,
            host: 'smtp.gmail.com'
        });

        /*
          In mail options we specify from and to address, subject and HTML content.
          In our case , we use our personal email as from and to address,
          Subject is Contact name and 
          html is our form details which we parsed using bodyParser.
        */
        var mailOptions = {
            from: 'quicksplittor@gmail.com',//replace with your email
            to: req.body.userEmailId,//replace with your email
            subject: `Join Quick Splitter`,
            html: '<p> Hi </p> <p>Join Quick Splittor and Start splitting your expenses.</p><a href="https://billsplitter.learnandinvest.in/">Click Here<a/>',

        };

        /* Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
         call back as parameter 
        */

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(401).json(error); // if error occurs send error as response to client
            } else {
                res.status(200).json({ message: 'Sent Successfully' })//if mail is sent successfully send Sent successfully as response
            }
        });

    }
}