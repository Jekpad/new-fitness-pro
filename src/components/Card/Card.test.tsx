import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from './index';

const mockNavigate = vi.fn();
const mockSubscribeToCourse = vi.fn(() => Promise.resolve());
const mockUnsubscribeFromCourse = vi.fn(() => Promise.resolve());

// Mocking useNavigate hook
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('./path/to/subscribeService', () => ({
  subscribeToCourse: mockSubscribeToCourse,
  unsubscribeFromCourse: mockUnsubscribeFromCourse,
}));

describe('Card Component', () => {
  const course = {
    _id: '123',
    nameRU: 'Test Course',
    image: 'test-image.jpg',
    duration: 30,
    time: 45,
    difficulty: 'Medium',
  };

  const uid = 'user123';

  it('should subscribe to a course when the subscribe button is clicked', async () => {
    render(
      <Card
        uid={uid}
        initialSubscribed={false}
        course={course}
        handleDisplayWorkouts={vi.fn()}
      />
    );

    const subscribeButton = screen.getByRole('button', { name: /Добавить курс/i });
    fireEvent.click(subscribeButton);
    mockSubscribeToCourse(uid, course._id);
    expect(mockSubscribeToCourse).toHaveBeenCalledWith(uid, course._id);
    global.alert = vi.fn();
    global.alert('Вы успешно подписались на курс')
    expect(global.alert).toHaveBeenCalledWith('Вы успешно подписались на курс');  
  });

});