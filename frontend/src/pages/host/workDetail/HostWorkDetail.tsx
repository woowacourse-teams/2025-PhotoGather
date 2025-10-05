import { useNavigate } from 'react-router-dom';
import Button from '../../../components/@common/buttons/button/Button';
import Footer from '../../../components/@common/footer/Footer';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import * as C from '../../../styles/@common/WorkDetail.styles';
import { mockWorkDetail } from '../../mockData';
import * as S from './HostWorkDetail.styles';

const HostWorkDetail = () => {
  const navigate = useNavigate();

  if (!mockWorkDetail) {
    return (
      <S.Wrapper>
        <S.EmptyStateContainer>
          <S.EmptyMessage>아직 작품 소개를 등록하지 않았어요</S.EmptyMessage>
        </S.EmptyStateContainer>
        <S.BottomSectionContainer>
          <Button text="등록하기" onClick={() => navigate('/host/work-form')} />
        </S.BottomSectionContainer>
      </S.Wrapper>
    );
  }

  const { title, category, designer, description, images } = mockWorkDetail;

  return (
    <>
      <S.EditButton onClick={() => navigate('/host/work-form')}>
        수정
      </S.EditButton>
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
        <S.BottomSectionContainer>
          <Button text="작품 소개 수정하기" onClick={() => {}} />
          <Footer />
        </S.BottomSectionContainer>
      </S.Wrapper>
    </>
  );
};

export default HostWorkDetail;
