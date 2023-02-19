import * as Z from 'zod'

export const feedbackSchema = Z.object({
  name: Z.string().min(2, 'Must be at least two characters'),
  dateTime: Z.string(),
  email: Z.string().email({ message: 'Invalid email address' }),
  subject: Z.string().min(1),
  details: Z.string().min(1),
  guid: Z.string().optional(),
})
