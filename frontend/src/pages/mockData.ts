import img1 from '../@assets/workDetail_mock_1.png';
import img2 from '../@assets/workDetail_mock_2.png';
import img3 from '../@assets/workDetail_mock_3.png';

export const mockData = {
  title: '2025 PKNU VCD',
  thumbnail: 'https://picsum.photos/200/300',
  introduction: '매일 오후 1시부터 6시까지 상주합니다',
  instagramId: 'forgather_official',
  email: 'forgather@forgather.me',
};

export const mockDashboardData = {
  title: '스페이스 대시보드',
  thumbnail: 'https://picsum.photos/200/300',
  publicRange: '비공개',
  introduction: '매일 오후 1시부터 6시까지 상주합니다',
  instagramId: 'forgather_official',
  email: 'forgather@forgather.me',
};

export const mockAccess = {
  introduce: true,
  writeGuestbook: true,
  viewGuestbook: false,
};

export const MyPageMockData = {
  name: 'Noma',
  img: 'https://picsum.photos/200/300',
};

export const SpaceMockData = {
  spaces: [
    {
      id: 1,
      spaceCode: 'space1',
      title: '스페이스 1',
      thumbnail: 'https://picsum.photos/200/300',
      guestCount: 5,
      createdAt: '2025-09-25T14:58:00',
      isPublic: true,
    },
    {
      id: 1,
      spaceCode: 'space1',
      title: '스페이스 1',
      thumbnail: 'https://picsum.photos/200/300',
      guestCount: 1,
      createdAt: '2025-09-28T20:02:00',
      isPublic: false,
    },
  ],
};

//TODO: null 타입추론으로 임시 interface 지정
export interface WorkDetailData {
  title: string;
  category: string;
  designer: string;
  description: string;
  images: string[];
}

export const mockWorkDetail: WorkDetailData | null = {
  title: '프로스페로 series 1.',
  category: 'Chair',
  designer: 'leesomyeong',
  description:
    '485 x 710 x 700\nBioplastic, Walnut\n\n3D 모델링으로 설계한 바이오 플라스틱 구조는 밴딩우드의 미세한 곡률 변화를 통제하고 고정한다. 이는 예측할 수 없는 것을 통제하려는 시도인 동시에 바라는 바를 가시화한 형태다. 이러한 작업과정과 형태는, 불확실한 미래에 대한 본능적 공포에서 탈피하고자한 주술적 행위의 총체가 된다.',
  images: [img1, img2, img3],
};
