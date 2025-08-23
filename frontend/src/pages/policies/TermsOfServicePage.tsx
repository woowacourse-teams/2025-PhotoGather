import { ReactComponent as Logo } from '@assets/icons/logo.svg';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/@common/buttons/button/Button';
import { theme } from '../../styles/theme';
import * as S from './PolicyPage.common.styles';

const TermsOfServicePage = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <S.Wrapper>
      <S.Header>
        <Logo fill={theme.colors.gray06} />
        <S.Title>서비스 이용약관</S.Title>
      </S.Header>

      <S.Content>
        <S.Section>
          <S.SectionTitle>제1조 (목적)</S.SectionTitle>
          <S.Paragraph>
            이 약관은 포게더(이하 "회사")가 제공하는 사진 공유 스페이스
            서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리·의무
            및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>제2조 (정의)</S.SectionTitle>
          <S.Paragraph>
            1. 이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          </S.Paragraph>
          <S.List>
            <S.ListItem>
              "회원"이란 이 약관에 동의하고 회사가 제공하는 서비스를 이용하는
              자를 말합니다.
            </S.ListItem>
            <S.ListItem>
              "계정"이란 회원이 카카오 소셜 로그인을 통해 생성·이용하는 로그인
              계정을 의미합니다.
            </S.ListItem>
            <S.ListItem>
              "스페이스"란 회원이 사진을 업로드하고 공유할 수 있도록 생성한
              공간을 말합니다.
            </S.ListItem>
            <S.ListItem>
              "서비스"란 회사가 회원에게 제공하는 사진 공유 스페이스 생성 및
              관리, 사진 업로드 및 다운로드 등 관련 기능을 말합니다.
            </S.ListItem>
          </S.List>
          <S.Paragraph>
            2. 본 조에서 정하지 않은 사항은 관계 법령 및 서비스 안내에 따릅니다.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>제3조 (약관의 효력 및 변경)</S.SectionTitle>
          <S.Paragraph>
            1. 본 약관은 회원이 서비스에 접속하여 동의 절차를 완료한 시점부터
            효력이 발생합니다.
          </S.Paragraph>
          <S.Paragraph>
            2. 회사는 관련 법령을 위배하지 않는 범위 내에서 약관을 개정할 수
            있습니다. 개정 시에는 개정 내용 및 시행일을 서비스 내 공지사항을
            통해 최소 7일 전부터 공지합니다.
          </S.Paragraph>
          <S.Paragraph>
            3. 회원은 개정된 약관에 동의하지 않을 경우 서비스 이용을 중단하고
            탈퇴할 수 있으며, 별도의 거부 의사 표시가 없으면 개정 약관에 동의한
            것으로 간주됩니다.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>제4조 (이용계약의 체결 및 해지)</S.SectionTitle>
          <S.Paragraph>
            1. 서비스 이용계약은 회원이 약관에 동의하고 카카오 소셜 로그인으로
            계정을 생성한 때에 성립합니다.
          </S.Paragraph>
          <S.Paragraph>
            2. 회원은 언제든지 서비스 탈퇴를 통해 이용계약을 해지할 수 있으며,
            탈퇴 시 보관 중인 사진 및 스페이스 정보는 복구할 수 없게 삭제됩니다.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>제5조 (개인정보 보호)</S.SectionTitle>
          <S.Paragraph>
            회사는 개인정보 보호법 등 관련 법령에 따라 회원의 개인정보를
            보호합니다. 개인정보의 수집, 이용, 보관, 파기 등 구체적인 사항은
            회사의 「개인정보처리방침」에 따릅니다.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>제6조 (회사의 의무)</S.SectionTitle>
          <S.Paragraph>
            1. 회사는 안정적이고 지속적인 서비스 제공을 위해 최선을 다합니다.
          </S.Paragraph>
          <S.Paragraph>
            2. 회원이 제기한 의견이나 불만이 정당하다고 인정될 경우 신속히
            처리하며, 즉시 처리하기 어려운 경우 그 사유와 일정을 안내합니다.
          </S.Paragraph>
          <S.Paragraph>
            3. 회사는 관계 법령 및 개인정보처리방침에서 정한 경우를 제외하고는
            회원의 개인정보를 제3자에게 제공하지 않습니다.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>제7조 (회원의 의무)</S.SectionTitle>
          <S.Paragraph>회원은 다음 행위를 하여서는 안 됩니다.</S.Paragraph>
          <S.List>
            <S.ListItem>
              타인의 계정, 개인정보 등을 무단으로 이용하거나 도용하는 행위
            </S.ListItem>
            <S.ListItem>
              음란물, 불법 정보 등을 게재하거나 전송하는 행위
            </S.ListItem>
            <S.ListItem>
              서비스를 영리, 영업, 광고 등 본래 목적 외 용도로 사용하는 행위
            </S.ListItem>
            <S.ListItem>
              버그·해킹 등을 악용하거나 서비스 운영을 방해하는 행위
            </S.ListItem>
            <S.ListItem>
              타인의 권리(저작권, 초상권 등)를 침해하거나 명예를 훼손하는 행위
            </S.ListItem>
          </S.List>
          <S.Paragraph>
            회원의 고의 또는 과실로 발생한 문제에 대해 회사는 책임을 지지
            않습니다.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>제8조 (서비스의 제한 및 중단)</S.SectionTitle>
          <S.Paragraph>
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
            처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
            같이 개인정보 보호책임자를 지정하고 있습니다.
          </S.Paragraph>
          <S.Paragraph>
            1. 회사는 회원이 본 약관을 위반한 경우 사전 통지 후 서비스 이용을
            제한할 수 있습니다. 긴급한 경우 사후 통지할 수 있습니다.
          </S.Paragraph>
          <S.Paragraph>
            2. 회사는 시스템 점검, 천재지변, 불가피한 사정 등으로 서비스를 일시
            중단할 수 있으며, 이 경우 사전 또는 사후에 공지합니다.
          </S.Paragraph>
          <S.Paragraph>
            3. 회사가 서비스를 종료할 경우 최소 7일 전부터 서비스 내 공지를 통해
            회원에게 안내합니다. 종료 시 회원의 개인정보 및 데이터는 파기됩니다.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>제9조 (저작권 등)</S.SectionTitle>
          <S.Paragraph>
            서비스 내 제공되는 콘텐츠의 저작권은 회사에 귀속됩니다.
          </S.Paragraph>
          <S.Paragraph>
            2. 회원이 업로드한 사진 및 게시물에 대한 권리는 해당 회원에게
            있으며, 관련 법령에 위반되지 않는 범위에서 서비스 내 노출·운영될 수
            있습니다.
          </S.Paragraph>
          <S.Paragraph>
            3. 회원은 다른 회원의 게시물을 무단으로 사용하거나 외부에 배포할 수
            없습니다.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>제10조 (손해배상 및 면책)</S.SectionTitle>
          <S.Paragraph>
            1. 회사 또는 회원이 본 약관을 위반하여 상대방에게 손해를 입힌 경우
            고의 또는 과실이 없는 한 책임을 지지 않습니다.
          </S.Paragraph>
          <S.Paragraph>
            2. 회사는 다음의 경우 발생한 손해에 대해 책임을 지지 않습니다.
          </S.Paragraph>
          <S.List>
            <S.ListItem>천재지변, 시스템 장애 등 불가항력적 사유</S.ListItem>
            <S.ListItem>회원의 귀책사유로 인한 서비스 이용 장애</S.ListItem>
            <S.ListItem>회원이 서비스를 통해 기대한 이익의 상실</S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>제11조 (재판권 및 준거법)</S.SectionTitle>
          <S.Paragraph>
            이 약관은 대한민국 법률에 따라 해석되며, 회사와 회원 간 분쟁이
            발생할 경우 관할 법원은 「민사소송법」에 따릅니다.
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

export default TermsOfServicePage;
