import { MdArrowLeft, MdArrowRight, MdOutlinePhoto } from 'react-icons/md';
import Button from '../../../../components/@common/buttons/button/Button';
import Line from '../../../../components/@common/line/Line';
import * as S from './GuestbookCardPage.styles';

const GuestbookCardPage = () => {
  return (
    <S.Wrapper>
      <S.DeleteButtonContainer>
        <Button type="button" variant="error" text="삭제" />
      </S.DeleteButtonContainer>
      <S.InfoSection>
        <S.InfoTitle>“잘봤어용"의 방명록</S.InfoTitle>
        <S.InfoDescription>2025년 9월 18일 13시 38분</S.InfoDescription>
        <S.IconInfoContainer>
          <MdOutlinePhoto />
          <p>20</p>
        </S.IconInfoContainer>
      </S.InfoSection>
      <Line
        leftElement={
          <S.ButtonElementContainer>
            <MdArrowLeft />
            이전
          </S.ButtonElementContainer>
        }
        rightElement={
          <S.ButtonElementContainer>
            다음
            <MdArrowRight />
          </S.ButtonElementContainer>
        }
      />
      <S.TextSection>
        <S.Text>
          와 진짜 멋지다 👏 졸업전시 준비하느라 고생 많았어! 작품 보니까 네가
          얼마나 열심히 했는지 느껴져서 나까지 뿌듯하더라. 졸업전시 축하하고,
          앞으로도 멋진 길만 가자!!
        </S.Text>
        <S.SenderText>from. 덥고냉정한금성</S.SenderText>
      </S.TextSection>
      <S.PhotoSection>
        <S.PhotoContainer></S.PhotoContainer>
        <Button
          type="button"
          variant="secondary"
          text="사진 전체 다운로드"
          style={{ border: 'none' }}
        />
      </S.PhotoSection>
      <Line width={192} />
    </S.Wrapper>
  );
};

export default GuestbookCardPage;
