import jwt from 'jsonwebtoken'

import constants from '../config/constants'
import User from '../models/User'

export async function requireAuth(user) {
  if (!user || !user._id) {
    throw new Error('Вы не авторизованы!')
  } 
  const me = await User.findById(user._id)

  if (!me) {
    throw new Error('Вы не авторизованы!')
  }

  return me
}

export function decodeToken(token) {
  const arr = token.split(' ')

  if (arr[0] === 'Bearer') {
    return jwt.verify(arr[1], constants.JWT_SECRET)     
  }

  throw new Error('Token не валидный!')
}
