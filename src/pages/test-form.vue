<script setup lang="ts">
import type { FeedbackData } from '../types/feedback-data'
import { createFeedback } from '../services/api-vespa'

const data = ref<FeedbackData>({
  dateTime: '12/12/2021 12:12:12',
  name: 'test name',
  email: 't@g.com',
  subject: 'test subject',
  details: 'test details via monday.com',
})

const returnedData = ref<FeedbackData | null>(null)

const onSubmit = (e: Event) => {
  e.preventDefault()
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
  return (data.value.name.length === 0 || data.value.email.length === 0 || data.value.subject.length === 0 || data.value.details.length === 0)
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
        <input id="dateTime" v-model="data.dateTime" form-input type="text" name="dateTime" readonly>
        <br>
        <label form-label for="name">Name</label>
        <input id="name" v-model="data.name" form-input type="text" name="name">
        <label form-label for="email">Email</label>
        <input id="email" v-model="data.email" form-input type="email" name="email">
        <br>
        <label form-label for="subject">Subject</label>
        <input id="subject" v-model="data.subject" form-input type="text" name="subject">
        <label form-label for="details">Details</label>
        <textarea id="details" v-model="data.details" form-input name="details" />
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
