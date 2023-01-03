import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import TestForm from '../src/pages/test-form.vue'

describe('UI elements', () => {
  describe('Displaying the title', () => {
    it('should render the header Test Form', () => {
      render(TestForm)
      const header = screen.queryByRole('heading', { name: 'Test Form' })
      expect(header).toBeInTheDocument()
      expect(header).toMatchSnapshot()
    })
  })
  describe('Displaying the form', () => {
    it('has a date & time field', () => {
      render(TestForm)
      const date = screen.queryByLabelText('Date / Time')
      expect(date).toBeInTheDocument()
    })
    it('has a name field', () => {
      render(TestForm)
      const name = screen.queryByLabelText('Name')
      expect(name).toBeInTheDocument()
    })
    it('has a email field', () => {
      render(TestForm)
      const email = screen.queryByLabelText('Email')
      expect(email).toBeInTheDocument()
    })
    it('has a subject field', () => {
      render(TestForm)
      const subject = screen.queryByLabelText('Subject')
      expect(subject).toBeInTheDocument()
    })
    it('has a details field', () => {
      render(TestForm)
      const details = screen.queryByLabelText('Details')
      expect(details).toBeInTheDocument()
    })
    it('has a submit button', () => {
      render(TestForm)
      const submit = screen.queryByRole('button', { name: 'Submit' })
      expect(submit).toBeInTheDocument()
    })
  })
})
