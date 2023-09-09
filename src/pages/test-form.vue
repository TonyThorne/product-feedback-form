<script setup lang="ts">
import type { FeedbackData } from '../types/feedback-data'
import { feedbackSchema } from '~/schema/feedback-data-zod'

const schemaValidation = feedbackSchema

const data = ref<FeedbackData>({
  dateTime: new Date(),
  name: '',
  email: '',
  subject: '',
  details: '',
})

const dateFormat = computed(() => {
  const date = new Date(data.value.dateTime)
  return date.toLocaleString('en-GB', { timeZone: 'UTC' })
})

// const formValidation = ref<boolean>(true)
const formErrors = ref<Record<string, string[] | null>>({})
const isDisabled = computed(() => Object.values(formErrors.value).some(error => error !== null))

const returnedData = ref<FeedbackData | null>(null)

function validate() {
  const validationResult = schemaValidation.safeParse(data.value)
  formErrors.value = validationResult.success ? {} : validationResult.error.flatten().fieldErrors
}

const API_URL = import.meta.env.VITE_VUE_APP_API_URL

const onSubmit = async () => {
  try {
    validate()
    if (Object.keys(formErrors.value).length === 0) {
      // createFeedback(data.value)
      // console.log('Feedback submitted:', data.value)
    }
    // console.log(import.meta.env)

    const response = await fetch(API_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.value),
    })
    if (!response.ok)
      throw new Error('Network response was not ok')
    const responseData = await response.json()
    returnedData.value = responseData
  }
  catch (error) {
    console.error('Error:', error)
  }
}
</script>

<template>
  <div>
    <h1>Test Feedback Form</h1>
    <br>
    <!-- Create a form based on /types/feedback-data -->
    <div card container text-left>
      <form @submit.prevent="onSubmit">
        <label form-label for="dateTime">Date / Time</label>
        <input id="dateTime" v-model="dateFormat" form-input type="text" name="dateTime" readonly>
        <br>
        <label form-label for="name">Name</label>
        <input id="name" v-model="data.name" form-input type="text" name="name" :class="{ 'border-2 border-rose-600': formErrors?.name }" @input="validate">
        <div v-if="formErrors?.name" text-red>
          {{ formErrors.name[0] }}
        </div>
        <label form-label for="email">Email</label>
        <input id="email" v-model="data.email" form-input type="email" name="email" :class="{ 'border-2 border-rose-600': formErrors?.email }" @input="validate">
        <div v-if="formErrors?.email" text-red>
          {{ formErrors.email[0] }}
        </div>
        <br>
        <label form-label for="subject">Subject</label>
        <input id="subject" v-model="data.subject" form-input type="text" name="subject" :class="{ 'border-2 border-rose-600': formErrors?.subject }" @input="validate">
        <div v-if="formErrors?.subject" text-red>
          {{ formErrors.subject[0] }}
        </div>
        <label form-label for="details">Details</label>
        <textarea id="details" v-model="data.details" form-input name="details" :class="{ 'border-2 border-rose-600': formErrors?.details }" @input="validate" />
        <div v-if="formErrors?.details" text-red>
          {{ formErrors.details[0] }}
        </div>
        <br>
        <div text-center>
          <input btn type="submit" value="Submit" :disabled="isDisabled">
          <!-- <input btn type="submit" value="Submit" :disabled="isDisabled" @click="onSubmit"> -->
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
