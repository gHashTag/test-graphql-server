import jwt from 'jsonwebtoken'

import constants from '../config/constants'
import Studio from '../models/Studio'

export async function requireAuth(studio) {
  if (!studio || !studio._id) {
    throw new Error('Вы не авторизованы!')
  } 

  const me = await Studio.findById(studio._id)
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
