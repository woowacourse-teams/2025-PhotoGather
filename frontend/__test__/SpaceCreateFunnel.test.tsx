import { ThemeProvider } from '@emotion/react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider } from '../src/contexts/ToastContext';
import SpaceCreateFunnel from '../src/pages/create/funnel/SpaceCreateFunnel';
import { theme } from '../src/styles/theme';

describe('스페이스 생성 퍼널 테스트', () => {
  let user: ReturnType<typeof userEvent.setup>;
  let mockFetch: ReturnType<typeof jest.fn>;

  beforeEach(() => {
    user = userEvent.setup();
    mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      }),
    );
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  beforeAll(() => {
    const fixedNow = new Date('2025-07-31T00:00:00Z').getTime();
    global.Date.now = () => fixedNow;
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const navigateToFunnel = async () => {
    render(
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <SpaceCreateFunnel />
        </ToastProvider>
      </ThemeProvider>,
    );
  };

  it('퍼널이 단계별로 정상 진행된다.', async () => {
    await navigateToFunnel();

    expect(screen.getByText('이름')).toBeInTheDocument();

    await user.type(
      screen.getByPlaceholderText('나만의 스페이스'),
      '민성제 스페이스',
    );
    await user.click(screen.getByText('다음으로'));

    expect(screen.getByText('언제부터')).toBeInTheDocument();

    const dateInput = screen.getByTestId('date-input');
    fireEvent.change(dateInput, { target: { value: '2025-08-01' } });
    await user.click(screen.getByText('다음으로'));

    expect(screen.getByText('몇시부터')).toBeInTheDocument();

    const timeInput = screen.getByTestId('time-input');
    fireEvent.change(timeInput, { target: { value: '18:00' } });
    await user.click(screen.getByText('다음으로'));

    expect(screen.getByText('스페이스 정보')).toBeInTheDocument();
  });
});
