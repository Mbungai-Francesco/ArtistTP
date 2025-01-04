"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.DeleteUser = exports.UpdateUser = exports.GetUser = exports.GetUsers = exports.CreateUser = void 0;
const db_1 = require("../lib/db");
const jwt_1 = require("../utils/jwt");
const CreateUser = async (req, res) => {
    try {
        const { email } = await req.body;
        if (!email) {
            return res.status(400).json({
                message: 'email is required. please try again with these value added',
            });
        }
        // find user in db
        const finduser = await db_1.db.user.findUnique({
            where: {
                email,
            },
        });
        if (finduser) {
            return res
                .status(400)
                .json({ message: 'user already exists', data: finduser });
        }
        const createUser = await db_1.db.user.create({
            data: {
                ...req.body,
            },
        });
        if (!createUser) {
            return res.status(400).json({ message: 'user not created' });
        }
        return res.status(201).json({ message: 'User created', data: createUser });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.CreateUser = CreateUser;
const GetUsers = async (req, res) => {
    try {
        const users = await db_1.db.user.findMany({
            include: {
                followings: true
            }
        });
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json({ message: 'Users found', data: users });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.GetUsers = GetUsers;
const GetUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db_1.db.user.findUnique({
            where: {
                id: id,
            },
            include: {
                followings: true
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User found', data: user });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.GetUser = GetUser;
const UpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateUser = await db_1.db.user.update({
            where: {
                id: id,
            },
            data: {
                ...req.body,
            },
        });
        if (!updateUser) {
            return res.status(400).json({ message: 'User not updated' });
        }
        return res.status(200).json({ message: 'User updated', data: updateUser });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.UpdateUser = UpdateUser;
const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await db_1.db.user.delete({
            where: {
                id: id,
            },
        });
        if (!deleteUser) {
            return res.status(400).json({ message: 'User not deleted' });
        }
        return res.status(200).json({ message: 'User deleted', data: deleteUser });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.DeleteUser = DeleteUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'email and password required' });
        }
        const user = await db_1.db.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = (0, jwt_1.generateToken)(user.id);
        return res.status(200).json({ message: 'User logged in', token, data: user });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.loginUser = loginUser;
