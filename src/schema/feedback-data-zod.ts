import * as Z from 'zod'

export const feedbackSchema = Z.object({
  name: Z.string(),
  dateTime: Z.string(),
  email: Z.string(),
  subject: Z.string(),
  details: Z.string(),
  guid: Z.string().optional(),
})
