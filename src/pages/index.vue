<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

const name = $ref('')

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}
</script>

<template>
  <div>
    <div i-carbon-closed-caption-alt text-4xl inline-block data-cy="title-icon" />
    <p>
      <a rel="noreferrer" href="https://github.com/TonyThorne/feedback" target="_blank">
        Feedback Form
      </a>
    </p>
    <p>
      <em text-sm op75>Example of Continuous Delivery</em>
    </p>

    <div py-4 />

    <TheInput
      v-model="name"
      placeholder="What's your name?"
      autocomplete="false"
      @keydown.enter="go"
    />

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div>
    <div>
      <button
        class="m-3 text-sm btn"
        data-cy="test-form"
        @click="router.push('/test-form')"
      >
        Feedback
      </button>
    </div>
    <!-- <div>
      <TheCounter :initial="18" />
    </div> -->
  </div>
</template>
