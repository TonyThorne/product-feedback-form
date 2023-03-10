import * as Z from 'zod'

export const feedbackSchema = Z.object({
  name: Z.string().min(2, 'Must be at least two characters'),
  dateTime: Z.date(),
  email: Z.string().email({ message: 'Invalid email address' }),
  subject: Z.string().min(2),
  details: Z.string().min(3),
  guid: Z.string().optional(),
})
