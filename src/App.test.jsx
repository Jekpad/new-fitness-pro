import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  it('is first test', () => {
    render(<App />)
    // fireEvent.click(screen.getByRole('banner'))
    expect(screen.getByText('Измени своё тело за полгода!')).toBeInTheDocument()
  })
})