import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import TestForm from '../src/pages/release-notes.vue'

describe('The release notes', () => {
  it('should render the release notes title', () => {
    render(TestForm)
    const header = screen.queryByRole('heading', { name: 'Release Notes' })
    expect(header).toBeInTheDocument()
    expect(header).toMatchSnapshot()
  })
})
