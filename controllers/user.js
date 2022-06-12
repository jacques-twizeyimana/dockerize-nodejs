/* 

    apis needed!

    get all
    get by id
    create
    login
    update id
    delete id

    exports.controllerName = async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).send(error.toString())
        }
    }

*/

const { hash, genSalt, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { User, validateUser, validateUserUpdate, validateLogin } = require('../models/user')

exports.getAllUsers = async (req, res) => {
    try {

        const users = await User.find();
        return res.send(users);

    } catch (error) {
        return res.status(500).send(error.toString())
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).send("user not found");
        }
        return res.send(user);

    } catch (error) {
        return res.status(404).send("user not found");
    }
}

exports.createUser = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const duplicateUser = await User.findOne({ email: req.body.email });
        if (duplicateUser) {
            return res.status(400).send("email already exists");
        }

        req.body.password = await hash(req.body.password, await genSalt(10));

        const user = new User(req.body);

        await user.save();

        return res.status(201).send(user);

    } catch (error) {
        return res.status(500).send(error.toString());
    }
}

exports.updateUser = async (req, res) => {
    try {

        const { error } = validateUserUpdate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const duplicateUser = await User.findOne({ _id: { $ne: req.param.id }, email: req.body.email });
        if (duplicateUser) {
            return res.status(400).send("email already exists");
        }

        if (req.body.password)
            req.body.password = await hash(req.body.password, await genSalt(10));

        const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
        if (!user) {
            return res.status(404).send("user not found");
        }

        return res.send(user)


    } catch (error) {
        return res.status(404).send("user not found");
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });
        if (!user) {
            return res.status(404).send("user not found");
        }
        return res.send(user);

    } catch (error) {
        return res.status(404).send("user not found");
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send("invalid credentials");
        }

        if (! await compare(req.body.password, user.password))
            return res.status(400).send("invalid credentials");

        return res.send({
            accessToken: await sign({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender
            }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 1000 })
        })

    } catch (error) {
        return res.status(500).send(error.toString);
    }
}