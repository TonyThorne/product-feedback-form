// Define an interface for the feedback data that includes the name, email, subject and details fields.

export interface FeedbackData {
  dateTime: Date
  name: string
  email: string
  subject: string
  details: string
}
