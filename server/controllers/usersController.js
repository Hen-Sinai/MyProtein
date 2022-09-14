const User = require('../models/User')
const Protein = require('../models/Protein')
const Clothing = require('../models/Clothing')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find().select('-password').lean()

    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

const updateUser = asyncHandler(async (req, res) => {
    const { id, username, password } = req.body

    if (!id || !username) {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username

    if (password) {
        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

const deleteUser = asyncHandler(async(req, res) => {
    const { username } = req.body

    if (!username) {
        return res.status(400).json({ message: 'username Required' })
    }

    const user = await User.findOne({ username }).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    await User.deleteOne({ username: username })

    res.json(`User deleted`)
})

module.exports = {
    getAllUsers,
    updateUser,
    deleteUser
}