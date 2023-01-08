import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import RelaseNotes from '../src/pages/release-notes.vue'

describe('The release notes', () => {
  it('should render the release notes title', () => {
    render(RelaseNotes)
    const header = screen.queryByRole('heading', { name: 'Release Notes' })
    expect(header).toBeInTheDocument()
    expect(header).toMatchSnapshot()
  })
  it('should display a Last build time', () => {
    render(RelaseNotes)
    const buildTime = screen.getByText(/Last build time:/)
    expect(buildTime).toBeInTheDocument()
  })
  // create a test to check if there is an HtML unordered list in the page
  it('should contain an unordered list', () => {
    render(RelaseNotes)
    const unorderedList = screen.getByRole('list')
    expect(unorderedList).toBeInTheDocument()
    const { getAllByRole } = within(unorderedList)
    const items = getAllByRole('listitem')
    expect(items.length).toBeGreaterThan(1)
  })
})
