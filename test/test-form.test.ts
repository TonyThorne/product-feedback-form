import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
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
// Interactions
// Write interactions tests here

describe('UI interactions', () => {
  describe('Submitting the form', () => {
    it('should enable the submit button', async () => {
      render(TestForm)
      const date = screen.queryByLabelText('Date / Time')
      const name = screen.queryByLabelText('Name')
      const email = screen.queryByLabelText('Email')
      const subject = screen.queryByLabelText('Subject')
      const details = screen.queryByLabelText('Details')
      const submit = screen.queryByRole('button', { name: 'Submit' })
      await userEvent.type(date, '2021-10-10 10:10')
      await userEvent.type(name, 'John Doe')
      await userEvent.type(email, 'john.doe@gmail.com')
      await userEvent.type(subject, 'Test subject')
      await userEvent.type(details, 'Test details')
      await userEvent.click(submit)
      expect(submit).toBeEnabled()
    })
    it('should disable submit button if no data entered', async () => {
      render(TestForm)
      const submit = screen.queryByRole('button', { name: 'Submit' })
      // No data entered
      await userEvent.click(submit)
      expect(submit).toBeDisabled()
    })
    // write a test to disable submit button if data is cleared from the details field
    it('should disable submit button if data is cleared from the details field', async () => {
      render(TestForm)
      const date = screen.queryByLabelText('Date / Time')
      const name = screen.queryByLabelText('Name')
      const email = screen.queryByLabelText('Email')
      const subject = screen.queryByLabelText('Subject')
      const details = screen.queryByLabelText('Details')
      const submit = screen.queryByRole('button', { name: 'Submit' })
      await userEvent.type(date, '2021-10-10 10:10')
      await userEvent.type(name, 'John Doe')
      await userEvent.type(email, 'a@g.com')
      await userEvent.type(subject, 'Test subject')
      await userEvent.type(details, 'Test details')
      await userEvent.click(submit)
      expect(submit).toBeEnabled()
      await userEvent.clear(details)
      expect(submit).toBeDisabled()
    })
    // It should display a validation errors when the entered data does not match the validation
    it('should display a validation name entered', async () => {
      const user = userEvent.setup()
      render(TestForm)

      const name = screen.queryByLabelText('Name')
      await user.type(name, 'J')
      const nameValidationErrorMessage = screen.getByRole('nameValError')
      const text = screen.getByText('Must be at least two characters')
      expect(nameValidationErrorMessage).toBeInTheDocument()
      expect(text).toBeInTheDocument()
    })
    it('should display a validation Email entered', async () => {
      const user = userEvent.setup()
      render(TestForm)

      const email = screen.queryByLabelText('Email')
      await user.type(email, 'notanemail')
      const emailValidationErrorMessage = screen.getByRole('emailValError')
      const text = screen.getByText('Invalid email address')
      expect(emailValidationErrorMessage).toBeInTheDocument()
      expect(text).toBeInTheDocument()
    })
    it('should display a validation Subject entered', async () => {
      const user = userEvent.setup()
      render(TestForm)

      const subject = screen.queryByLabelText('Subject')
      await user.type(subject, 't')
      const ValidationErrorMessage = screen.getByRole('subjectValError')
      const text = screen.getByText('String must contain at least 2 character(s)')
      expect(ValidationErrorMessage).toBeInTheDocument()
      expect(text).toBeInTheDocument()
    })
    it('should display a validation Details entered', async () => {
      const user = userEvent.setup()
      render(TestForm)

      const details = screen.queryByLabelText('Details')
      await user.type(details, 'to')
      const ValidationErrorMessage = screen.getByRole('detailsValError')
      const text = screen.getByText('String must contain at least 3 character(s)')
      expect(ValidationErrorMessage).toBeInTheDocument()
      expect(text).toBeInTheDocument()
    })
  })
})
