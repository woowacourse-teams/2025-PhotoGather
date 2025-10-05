import Button from '../../../components/@common/buttons/button/Button';
import Footer from '../../../components/@common/footer/Footer';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import * as C from '../../../styles/@common/WorkDetail.styles';
import { mockWorkDetail } from '../../mockData';
import * as S from './GuestWorkDetail.styles';

const GuestWorkDetail = () => {
  return (
    <S.Wrapper>
      <C.WorkContainer>
        <C.TitleRowContainer>
          <C.TitleContainer>{mockWorkDetail.title}</C.TitleContainer>
          <C.CategoryContainer>{mockWorkDetail.category}</C.CategoryContainer>
        </C.TitleRowContainer>
        <C.DesignerContainer>{mockWorkDetail.designer}</C.DesignerContainer>
        <C.DescriptionContainer>
          {mockWorkDetail.description}
        </C.DescriptionContainer>
        {mockWorkDetail.images.map((image, index) => (
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
