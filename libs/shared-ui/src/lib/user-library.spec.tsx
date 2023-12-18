import { render } from '@testing-library/react';

import UserLibrary from './user-library';

describe('UserLibrary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserLibrary />);
    expect(baseElement).toBeTruthy();
  });
});
