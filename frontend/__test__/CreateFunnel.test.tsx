import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SpaceCreateFunnel from '../src/pages/create/SpaceCreateFunnel';

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

  const navigateToFunnel = async () => {
    render(<SpaceCreateFunnel />);
  };

  it('퍼널이 단계별로 정상 진행된다.', async () => {
    await navigateToFunnel();

    expect(screen.getByText('스페이스 이름을 정해볼까요?')).toBeInTheDocument();
    await user.click(screen.getByText('다음으로'));

    expect(screen.getByText('스페이스를 언제부터 열까요?')).toBeInTheDocument();
    await user.click(screen.getByText('다음으로'));

    expect(screen.getByText('스페이스를 몇시부터 열까요?')).toBeInTheDocument();
    await user.click(screen.getByText('다음으로'));

    expect(
      screen.getByText('스페이스 정보를 확인해 주세요.'),
    ).toBeInTheDocument();
  });
});
