import Button from '../../../components/@common/buttons/button/Button';
import Footer from '../../../components/@common/footer/Footer';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import { mockWorkDetail } from '../../mockData';
import * as S from './WorkDetail.styles';

const WorkDetail = () => {
  return (
    <>
      <S.EditButton onClick={() => {}}>수정</S.EditButton>
      <S.Wrapper>
        <S.WorkContainer>
          <S.TitleRowContainer>
            <S.TitleContainer>{mockWorkDetail.title}</S.TitleContainer>
            <S.CategoryContainer>{mockWorkDetail.category}</S.CategoryContainer>
          </S.TitleRowContainer>
          <S.DesignerContainer>{mockWorkDetail.designer}</S.DesignerContainer>
          <S.DescriptionContainer>
            {mockWorkDetail.description}
          </S.DescriptionContainer>
          {mockWorkDetail.images.map((image, index) => (
            <S.ImageContainer
              // biome-ignore lint/suspicious/noArrayIndexKey: mock data라 무시
              key={index}
              src={image}
              alt={`work-detail-${index}`}
            />
          ))}
          <DividerLine width="100%" />
        </S.WorkContainer>
        <Button text="작품 소개 수정하기" onClick={() => {}} />
        <Footer />
      </S.Wrapper>
    </>
  );
};

export default WorkDetail;
