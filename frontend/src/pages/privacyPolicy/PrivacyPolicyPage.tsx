import { ReactComponent as Logo } from '@assets/icons/logo.svg';
import { theme } from '../../styles/theme';
import * as S from './PrivacyPolicyPage.styles';

const PrivacyPolicyPage = () => {
  return (
    <S.Wrapper>
      <S.Header>
        <Logo fill={theme.colors.gray06} />
        <S.Title>개인정보처리방침</S.Title>
      </S.Header>

      <S.Content>
        <S.Section>
          <S.SectionTitle>1. 개인정보의 수집 및 이용 목적</S.SectionTitle>
          <S.Paragraph>
            포게더(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다.
            처리한 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며 이용
            목적이 변경될 시에는 사전동의를 구할 예정입니다.
          </S.Paragraph>
          <S.List>
            <S.ListItem>
              서비스 제공: 사진 공유 스페이스 생성 및 관리, 사진 업로드 및
              다운로드 서비스 제공
            </S.ListItem>
            <S.ListItem>서비스 개선: 서비스 이용 통계 분석 및 개선</S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>2. 수집하는 개인정보의 항목</S.SectionTitle>
          <S.Paragraph>
            회사는 다음의 개인정보 항목을 처리하고 있습니다.
          </S.Paragraph>
          <S.List>
            <S.ListItem>필수항목: 스페이스 생성 시 입력하는 이름</S.ListItem>
            <S.ListItem>
              자동수집항목: 접속 IP 정보, 쿠키, 서비스 이용 기록, 방문 기록
            </S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>3. 개인정보의 보유 및 이용기간</S.SectionTitle>
          <S.Paragraph>
            회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
            개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서
            개인정보를 처리·보유합니다.
          </S.Paragraph>
          <S.List>
            <S.ListItem>
              스페이스 관련 정보: 스페이스 만료일로부터 30일
            </S.ListItem>
            <S.ListItem>서비스 이용 기록: 3개월</S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>4. 개인정보의 파기</S.SectionTitle>
          <S.Paragraph>
            회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
            불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
          </S.Paragraph>
          <S.List>
            <S.ListItem>
              파기절차: 이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져
              내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 파기됩니다.
            </S.ListItem>
            <S.ListItem>
              파기방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적
              방법을 사용합니다.
            </S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>5. 개인정보의 제3자 제공</S.SectionTitle>
          <S.Paragraph>
            회사는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조
            및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            6. 정보주체의 권리·의무 및 그 행사방법
          </S.SectionTitle>
          <S.Paragraph>
            이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
          </S.Paragraph>
          <S.List>
            <S.ListItem>개인정보 열람요구</S.ListItem>
            <S.ListItem>오류 등이 있을 경우 정정 요구</S.ListItem>
            <S.ListItem>삭제요구</S.ListItem>
            <S.ListItem>처리정지 요구</S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>7. 개인정보의 안전성 확보 조치</S.SectionTitle>
          <S.Paragraph>
            회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한
            기술적/관리적 및 물리적 조치를 하고 있습니다.
          </S.Paragraph>
          <S.List>
            <S.ListItem>개인정보 취급 직원의 최소화 및 교육</S.ListItem>
            <S.ListItem>개인정보의 암호화</S.ListItem>
            <S.ListItem>해킹 등에 대비한 기술적 대책</S.ListItem>
            <S.ListItem>개인정보에 대한 접근 제한</S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>8. 개인정보 보호책임자</S.SectionTitle>
          <S.Paragraph>
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
            처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
            같이 개인정보 보호책임자를 지정하고 있습니다.
          </S.Paragraph>
          <S.List>
            <S.ListItem>개인정보 보호책임자: 포게더 운영팀</S.ListItem>
            <S.ListItem>이메일: privacy@photogather.com</S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>9. 개인정보처리방침의 변경</S.SectionTitle>
          <S.Paragraph>
            이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른
            변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일
            전부터 공지사항을 통하여 고지할 것입니다.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>10. 쿠키(Cookie) 사용에 관한 사항</S.SectionTitle>
          <S.Paragraph>
            회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를
            저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.
          </S.Paragraph>
          <S.List>
            <S.ListItem>
              쿠키의 사용 목적: 이용자가 방문한 서비스 정보 등을 파악하여
              이용자에게 최적화된 정보 제공을 위해 사용됩니다.
            </S.ListItem>
            <S.ListItem>
              쿠키의 설치·운영 및 거부: 웹브라우저 상단의 도구 {'>'} 인터넷 옵션{' '}
              {'>'} 개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수
              있습니다.
            </S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>11. 미성년자의 개인정보 보호</S.SectionTitle>
          <S.Paragraph>
            회사는 만 14세 미만 아동의 개인정보를 수집하지 않습니다. 만 14세
            미만 아동의 개인정보 수집이 필요한 경우, 법정대리인의 동의를 받아
            수집하며, 법정대리인의 동의 없이 수집된 정보는 즉시 파기합니다.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            12. 개인정보 자동 수집 장치의 설치·운영 및 거부
          </S.SectionTitle>
          <S.Paragraph>
            회사는 이용자의 정보를 수시로 저장하고 찾아내는 쿠키(cookie) 등을
            운용합니다. 쿠키란 웹사이트를 운영하는데 이용되는 서버가 이용자의
            브라우저에 보내는 작은 텍스트 파일로서 이용자의 컴퓨터에 저장됩니다.
          </S.Paragraph>
          <S.List>
            <S.ListItem>
              쿠키 수집 거부 방법: 이용자는 쿠키 설치에 대한 선택권을 가지고
              있습니다. 웹브라우저 설정을 통해 모든 쿠키를 허용하거나, 쿠키 저장
              시 확인을 요구하거나, 모든 쿠키의 저장을 거부할 수 있습니다.
            </S.ListItem>
            <S.ListItem>
              쿠키 저장 거부 시 서비스 이용 제한: 쿠키 저장을 거부할 경우, 일부
              서비스 이용에 제한이 있을 수 있습니다.
            </S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>13. 분석 도구 사용에 관한 사항</S.SectionTitle>
          <S.Paragraph>
            회사는 서비스 개선과 사용자 경험 향상을 위해 다음과 같은 분석 도구를
            사용하고 있습니다.
          </S.Paragraph>
          <S.List>
            <S.ListItem>
              Google Analytics: 웹사이트 방문자 통계, 사용자 행동 분석, 트래픽
              소스 분석 등을 위해 사용됩니다. Google Analytics는 쿠키를 사용하여
              익명화된 사용자 정보를 수집합니다.
            </S.ListItem>
            <S.ListItem>
              Microsoft Clarity: 사용자 세션 기록, 히트맵, 스크롤 깊이 등을
              분석하여 사용자 경험을 개선하는데 사용됩니다. Clarity는 개인을
              식별할 수 없는 익명화된 데이터만을 수집합니다.
            </S.ListItem>
            <S.ListItem>
              Sentry: 서비스 오류 모니터링 및 성능 추적을 위해 사용됩니다.
              Sentry는 오류 발생 시 기술적 정보(브라우저 정보, 오류 내용, 페이지
              URL 등)를 수집하여 서비스 안정성을 개선하는데 활용됩니다.
            </S.ListItem>
          </S.List>
          <S.Paragraph>
            이러한 분석 도구들은 모두 익명화된 데이터를 수집하며, 개인을 식별할
            수 있는 정보는 수집하지 않습니다. 수집된 데이터는 서비스 개선
            목적으로만 사용되며, 제3자에게 판매되거나 마케팅 목적으로 사용되지
            않습니다.
          </S.Paragraph>
        </S.Section>

        <S.Footer>
          <S.Paragraph>
            <strong>시행일자: 2025년 8월 18일</strong>
          </S.Paragraph>
        </S.Footer>
      </S.Content>
    </S.Wrapper>
  );
};

export default PrivacyPolicyPage;
