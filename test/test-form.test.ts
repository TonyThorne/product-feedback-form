import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import TestForm from '../src/pages/test-form.vue'

describe('UI elements', () => {
  describe('Testing the test form!', () => {
    it('should render the header Test Form', () => {
      render(TestForm)
      const header = screen.queryByRole('heading', { name: 'Test Form' })
      expect(header).toBeInTheDocument()
      expect(header).toMatchSnapshot()
    })
  })
})
