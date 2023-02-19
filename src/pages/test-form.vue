<script setup lang="ts">
import type { ZodError } from 'zod'
import type { FeedbackData } from '../types/feedback-data'
// import { createFeedback } from '../services/api-vespa'
import { feedbackSchema } from '~/schema/feedback-data-zod'

const schemaValidation = feedbackSchema

const data = ref<FeedbackData>({
  // dateTime: '12/12/2021 12:12:12',
  // name: 'test name',
  // email: 't@g.com',
  // subject: 'test subject',
  // details: 'test details via monday.com',
  dateTime: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
  name: '',
  email: '',
  subject: '',
  details: '',
})

const formValidation = ref<boolean>(false)
let formErrors = ref<any>(null)

const returnedData = ref<FeedbackData | null>(null)

const validate = computed(() => {
  const result = schemaValidation.safeParse(data.value)
  if (!result.success) {
    // console.log(result.error.format())

    formValidation.value = true
    formErrors = result.error.format()
    // formErrors?.email ? console.log('email error') : console.log('no email error')
    // console.log('forRef', formValidation.value)
  }
  else {
    // console.log('success', result.data)
    formErrors = null
    formValidation.value = false
    // console.log('forRef', formValidation.value)
  }
},
)

const onSubmit = (e: Event) => {
  e.preventDefault()
  console.log('submit', data.value)
  // validate data before sending to the server
  const result = schemaValidation.safeParse(data.value)
  if (!result.success) {
    console.log('error', result.error)
    return
  }
  else {
    console.log('success', result.data)
  }
  // returnedData = await (createFeedback(data.value))
  // console.log('return', returnedData)
  // fetch('https://test-api-lvpopocrba-nw.a.run.app/feedback', {
  fetch('http://localhost:3000/feedback', {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.value),
  })
    .then(response => response.json())
    .then(data => returnedData.value = data)

    .catch((error) => {
      console.error('Error:', error)
    })
}

const isDisabled = computed(() => {
  // if (data.value.name.length === 0 || data.value.email.length === 0 || data.value.subject.length === 0 || data.value.details.length === 0)
  //   return true
  // else if
  // (formValidation.value === true)
  //   return true
  // else
  //   return false
  // console.log('computed', formValidation.value)

  return formValidation.value
})
</script>

<template>
  <div>
    <h1>Test Form</h1>
    <br>
    <!-- Create a form based on /types/feedback-data -->
    <div card container text-left>
      <form>
        <label form-label for="dateTime">Date / Time</label>
        <input id="dateTime" v-model="data.dateTime" form-input type="text" name="dateTime" readonly @change="validate">
        <br>
        <label form-label for="name">Name</label>
        <input id="name" v-model="data.name" form-input type="text" name="name" :class="{ 'border-2 border-rose-600': formErrors?.name }" @change="validate">
        <div v-if="formErrors?.name" text-red>
          {{ formErrors.name._errors[0] }}
        </div>
        <label form-label for="email">Email</label>
        <input id="email" v-model="data.email" form-input type="email" name="email" :class="{ 'border-2 border-rose-600': formErrors?.email }" @change="validate">
        <div v-if="formErrors?.email" text-red>
          {{ formErrors.email._errors[0] }}
        </div>
        <br>
        <label form-label for="subject">Subject</label>
        <input id="subject" v-model="data.subject" form-input type="text" name="subject" :class="{ 'border-2 border-rose-600': formErrors?.subject }" @change="validate">
        <div v-if="formErrors?.subject" text-red>
          {{ formErrors.subject._errors[0] }}
        </div>
        <label form-label for="details">Details</label>
        <textarea id="details" v-model="data.details" form-input name="details" :class="{ 'border-2 border-rose-600': formErrors?.details }" @change="validate" />
        <div v-if="formErrors?.details" text-red>
          {{ formErrors.details._errors[0] }}
        </div>
        <br>
        <div text-center>
          <input btn type="submit" value="Submit" :disabled="isDisabled" @click="onSubmit">
        </div>
      </form>
      <div>
        <div v-show="returnedData">
          <p>Success!</p>
          <p>{{ returnedData }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
