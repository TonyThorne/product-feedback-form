import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TestForm from '../src/pages/test-form.vue'

describe('Testing the test form!', () => {
  it('should render', () => {
    const wrapper = mount(TestForm)
    expect(wrapper.text()).toContain('Test Form')
    // expect(wrapper.html()).toMatchSnapshot()
  })
})
