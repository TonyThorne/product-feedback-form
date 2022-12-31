<script setup lang="ts">
import type { FeedbackData } from '../types/feedback-data'

const data = ref<FeedbackData>({
  date_time: new Date().toISOString(),
  name: '',
  email: '',
  subject: '',
  details: '',
})
</script>

<template>
  <div>
    <h1>Test Form</h1>
    <br>
    <!-- Create a form based on /types/feedback-data -->
    <div card container text-left>
      <form>
        <label for="date_time">Date / Time</label>
        <input id="date_time" v-model="data.date_time" type="datetime-local" name="date_time" readonly>
        <br>
        <label for="name">Name</label>
        <input id="name" v-model="data.name" type="text" name="name">
        <label for="email">Email</label>
        <input id="email" v-model="data.email" type="email" name="email">
        <br>
        <label for="subject">Subject</label>
        <input id="subject" v-model="data.subject" type="text" name="subject">
        <label for="details">Details</label>
        <textarea id="details" v-model="data.details" name="details" />
        <br>
        <div text-center>
          <input btn type="submit" value="Submit">
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
