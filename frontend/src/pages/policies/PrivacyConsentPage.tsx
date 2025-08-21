import { ReactComponent as Logo } from '@assets/icons/logo.svg';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/@common/buttons/button/Button';
import { theme } from '../../styles/theme';
import * as S from './PolicyPage.common.styles';

const PrivacyConsentPage = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <S.Wrapper>
      <S.Header>
        <Logo fill={theme.colors.gray06} />
        <S.Title>개인정보 수집 및 이용 동의</S.Title>
      </S.Header>

      <S.Content>
        <S.Section>
          <S.Paragraph>
            포게더(이하 "회사")는 「개인정보보호법」 등 관련 법령에 따라
            회원님의 개인정보를 안전하게 관리하며, 아래와 같은 목적으로
            개인정보를 수집·이용합니다. 회원님께서는 동의를 거부할 권리가
            있으며, 동의를 거부할 경우 서비스 이용에 제한이 있을 수 있습니다.
          </S.Paragraph>
        </S.Section>
        <S.Section>
          <S.SectionTitle>1. 개인정보 수집 및 이용 목적</S.SectionTitle>
          <S.List>
            <S.ListItem>
              서비스 제공: 사진 공유 스페이스 생성 및 관리, 사진
              업로드/다운로드, 회원 식별
            </S.ListItem>
            <S.ListItem>
              서비스 개선: 서비스 이용 통계 분석 및 사용자 경험 개선
            </S.ListItem>
            <S.ListItem>
              보안 및 이용자 보호: 부정 이용 방지, 서비스 안정성 확보
            </S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>2. 수집하는 개인정보 항목</S.SectionTitle>
          <S.Paragraph>필수항목</S.Paragraph>
          <S.List>
            <S.ListItem>스페이스 생성 시 입력한 이름</S.ListItem>
            <S.ListItem>카카오 소셜 로그인 시: 닉네임</S.ListItem>
          </S.List>
          <S.Paragraph>선택항목</S.Paragraph>
          <S.List>
            <S.ListItem>카카오 소셜 로그인 시: 프로필 사진</S.ListItem>
          </S.List>
          <S.Paragraph>서비스 이용 과정에서 자동 수집되는 정보</S.Paragraph>
          <S.List>
            <S.ListItem>업로드된 사진 및 이미지 파일</S.ListItem>
            <S.ListItem>접속 IP, 기기 정보, 쿠키, 서비스 이용 기록</S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>3. 개인정보 보유 및 이용기간</S.SectionTitle>
          <S.List>
            <S.ListItem>업로드된 사진: 스페이스 만료 즉시 삭제</S.ListItem>
            <S.ListItem>
              스페이스 정보(스페이스명, 생성자명 등): 만료일로부터 1년
            </S.ListItem>
            <S.ListItem>서비스 이용 기록(로그, IP 등): 1년</S.ListItem>
            <S.ListItem>
              카카오 소셜 로그인 정보: 최종 접속일로부터 1년
            </S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>4. 동의 거부 시 불이익</S.SectionTitle>
          <S.Paragraph>
            회원님은 개인정보 수집 및 이용에 동의하지 않을 권리가 있습니다.
          </S.Paragraph>
          <S.Paragraph>
            단, 필수항목에 동의하지 않으면 서비스 이용(스페이스 생성 및 관리
            등)이 불가능합니다.
          </S.Paragraph>
          <S.Paragraph>
            선택항목(프로필 사진 등)은 동의하지 않아도 서비스 이용에 제한이
            없습니다.
          </S.Paragraph>
        </S.Section>
      </S.Content>
      <Button
        text={'확인했어요'}
        onClick={navigateBack}
        style={{ marginTop: '30px' }}
      />
    </S.Wrapper>
  );
};

export default PrivacyConsentPage;
