const Joi = require('joi');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Get all users (with pagination)
const getAllUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 25 } = req.query;

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            select: '-password',
        }

        const users = await User.paginate({}, options);

        const usersFixed = { ... users };
        usersFixed.data = usersFixed.docs;
        delete usersFixed.docs;

        return res.status(200).json(usersFixed);

    } catch(error) {
        next(error);
    }
 };

// Get a user by ID
const getUserById = async (req, res, next) => { 
    try {
        const user = await User.findById(req.params.id).select('-password');
        if(!user) {
            return res.status(404).json({error: 'User not found'});
        }
        return res.status(200).json({data: user});
    } catch(error) {
        next(error);
    }
 };
const getOwnData = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(401).json({error: 'Unauthorized'});
        }
        const user = await User.findById(req.params.id).select('-password');
        if(!user) {
            return res.status(404).json({error: 'User not found'});
        }
        return res.status(200).json({data: user});
    } catch(error) {
        next(error);
    }
 };

const createUser = async (req, res, next) => {
    // Validation schema for creating a new user
    const userSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        profilePicture: Joi.string().optional(),
        phone: Joi.string().optional(),
        visa: Joi.string().optional(),
        role: Joi.string().optional().default('user').valid('user','admin'),
    });

    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({error: error.details[0].message});
        }

        const { firstName, lastName, email, password, profilePicture, role, phone, visa } = req.body;

        const found = await User.findOne({email});

        if(found) {
            return res.status(400).json({error: 'This email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profilePicture,
            role,
            phone,
            visa,
        });

        return res.status(201).json({ created: user });
    } catch(error) {
        next(error);
    }
 };

const updateUser = async (req, res, next) => {
    // Validation schema for updating an existing user
    const userSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(0).required(),
        profilePicture: Joi.string().optional(),
        phone: Joi.string().optional(),
        visa: Joi.string().optional(),
        role: Joi.string().optional().default('user').valid('user','admin'),
    });
    
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({error: error.details[0].message});
        }

        const { firstName, lastName, email, password, profilePicture, visa, phone, role } = req.body;

        let updatedUser;
        if (password!=='') {  // we want to update the password
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    profilePicture,
                    phone,
                    visa,
                    role,
                },
                { new: true }
            ).select('-password');
        } else {
            updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    firstName,
                    lastName,
                    email,
                    profilePicture,
                    phone,
                    visa,
                    role,
                },
                { new: true }
            ).select('-password');
        }

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ updated: updatedUser });

    } catch(error) {
        next(error);
    }
 };

// patch and change only role of the user
const updateUserRole = async (req, res, next) => {
        try {
            // Extract the new role from the request body
            const { role } = req.body;

            // Check if the new role is valid (either 'admin' or 'user')
            if (role !== 'admin' && role !== 'user') {
                return res.status(400).json({ error: 'Invalid role. Role must be either "admin" or "user".' });
            }

            // Find the user by ID
            const user = await User.findById(req.params.id);

            // Check if the user exists
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Update the user role only, keeping other properties unchanged
            user.role = role;

            // Save the updated user document
            const updatedUser = await user.save();

            // Return the updated user with the new role
            return res.status(200).json({ updated: updatedUser });

        } catch (error) {
            next(error);
        }
}

// Delete use by id
const deleteUser = async (req, res, next) => { 

    try {
        const deletedUser = await User.findByIdAndRemove(req.params.id).select('-password');
    
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        return res.status(200).json({ deleted: deletedUser });

    } catch(error) {
        next(error);
    }
 };

module.exports = { getAllUsers, getUserById, getOwnData, createUser, updateUser, updateUserRole, deleteUser };