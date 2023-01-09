import axios from 'axios'
import type { FeedbackData } from '~/types/feedback-data'

export const createFeedback = async (params: FeedbackData) => {
  console.log('createFeedback', params)

  // Send a POST request
  axios({
    method: 'post',
    // url: 'http:localhost:3000/feedback',
    url: 'https://test-api-lvpopocrba-nw.a.run.app/feedback',
    data: params,
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('error', error)
  })
}
