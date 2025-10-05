import Button from '../../../components/@common/buttons/button/Button';
import Footer from '../../../components/@common/footer/Footer';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import * as C from '../../../styles/@common/WorkDetail.styles';
import { mockWorkDetail } from '../../mockData';
import * as S from './HostWorkDetail.styles';

const HostWorkDetail = () => {
  return (
    <>
      <S.EditButton onClick={() => {}}>수정</S.EditButton>
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
        <Button text="작품 소개 수정하기" onClick={() => {}} />
        <Footer />
      </S.Wrapper>
    </>
  );
};

export default HostWorkDetail;
