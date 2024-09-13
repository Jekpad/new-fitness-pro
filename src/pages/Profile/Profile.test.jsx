import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from './index';
import UserContextProvider from "@/contexts/UserContextProvider";

describe('<Profile/>', () => {
  it('renders the profile when user is present', () => {
    const mockUser = {
      uid: '12345'
    };

    render(
      <MemoryRouter>
        <UserContextProvider value={ mockUser }>
          <Profile />
        </UserContextProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});