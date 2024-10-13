import generateToken from '../../Utilis/token.js'
import Users from './user.model.js'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

// Define __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const deleteImage = file => {
  const filePath = path.join(__dirname, '../../images/User/image/', file)
  fs.unlink(filePath, unlinkError => {
    if (unlinkError) {
      console.error('Failed to delete the uploaded file:', unlinkError)
    } else {
      console.log('Uploaded file deleted successfully.')
    }
  })
}

export const createUser = async (req, res, next) => {
  try {
    const userData = req.body
    const { name, email, role } = userData

    const user = await Users.findOne({ email })
    if (user) {
      const token = generateToken(userData)
      return res.status(200).json({
        status: 'Success',
        message: 'User already exists',
        data: user,
        token: token
      })
    } else {
      const result = await Users.create(userData)
      const token = generateToken(userData)

      return res.status(200).json({
        status: 'Success',
        message: 'User created successfully',
        data: result,
        token: token
      })
    }
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to create user',
      error: error.message
    })
  }
}

export const updateImage = async (req, res) => {
  try {
    const image =
      req.protocol +
      '://' +
      req.get('host') +
      '/images/User/image/' +
      req?.file.filename

    const { email } = req.body
    const user = await Users.findOne({ email })

    if (user.photo) {
      const fileName = user.photo.split('/')[6]
      deleteImage(fileName)
    }
    const updateUser = await Users.updateOne(
      { _id: user?.id },
      {
        $set: {
          photo: image
        }
      }
    )

    res.status(200).json({
      status: 'Success',
      message: 'Category image updated successfully'
    })
  } catch (error) {
    if (req.file) {
      deleteImage(req.file.filename)
    }
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = req.body

    const getUser = await Users.findOne({ _id: id })

    if (!getUser) {
      return res.status(404).json({
        status: 'Fail',
        message: 'User not found'
      })
    }

    const result = await Users.updateOne(
        { _id: id },
        {
          $set: data
        }
    )

    res.status(200).json({
        status: 'Success',
        message: 'User updated successfully',
        data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'Failed to update user',
      error: error.message
    })
  }
}
