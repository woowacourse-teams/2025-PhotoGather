import Button from '../../../components/@common/buttons/button/Button';
import Footer from '../../../components/@common/footer/Footer';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import * as C from '../../../styles/@common/WorkDetail.styles';
import { mockWorkDetail } from '../../mockData';
import * as S from './GuestWorkDetail.styles';

const GuestWorkDetail = () => {
  if (!mockWorkDetail) {
    return (
      <S.Wrapper>
        <S.EmptyStateContainer>
          <S.EmptyMessage>아직 작품 소개를 등록하지 않았어요</S.EmptyMessage>
        </S.EmptyStateContainer>
      </S.Wrapper>
    );
  }

  const { title, category, designer, description, images } = mockWorkDetail;

  return (
    <S.Wrapper>
      <C.WorkContainer>
        <C.TitleRowContainer>
          <C.TitleContainer>{title}</C.TitleContainer>
          <C.CategoryContainer>{category}</C.CategoryContainer>
        </C.TitleRowContainer>
        <C.DesignerContainer>{designer}</C.DesignerContainer>
        <C.DescriptionContainer>{description}</C.DescriptionContainer>
        {images.map((image: string, index: number) => (
          <C.ImageContainer
            // biome-ignore lint/suspicious/noArrayIndexKey: mock data라 무시
            key={index}
            src={image}
            alt={`work-detail-${index}`}
          />
        ))}
        <DividerLine width="100%" />
      </C.WorkContainer>
      <S.TextContainer>축하와 응원의 한 마디를 적어주세요</S.TextContainer>
      <Button text="방명록 작성하기" onClick={() => {}} />
      <Footer />
    </S.Wrapper>
  );
};

export default GuestWorkDetail;
