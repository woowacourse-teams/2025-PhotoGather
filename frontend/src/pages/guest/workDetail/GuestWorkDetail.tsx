import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { workService } from '../../../apis/services/work/work.service';
import Button from '../../../components/@common/buttons/button/Button';
import { useToast } from '../../../hooks/@common/useToast';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import type { WorkDetail } from '../../../types/domain/work.type';
import { buildThumbnailUrl } from '../../../utils/buildImageUrl';
import * as C from '../../WorkDetail.common.styles';
import * as S from './GuestWorkDetail.styles';

const GuestWorkDetail = () => {
  const { spaceCode } = useParams<{ spaceCode: string }>();
  const [workDetail, setWorkDetail] = useState<WorkDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  // biome-ignore lint/correctness/useExhaustiveDependencies: showToast is stable
  useEffect(() => {
    const fetchWorkDetail = async () => {
      if (!spaceCode) return;

      try {
        const response = await workService.getWork(spaceCode);

        if (response.success) {
          setWorkDetail(response.data);
        } else {
          setWorkDetail(null);
        }
      } catch (error) {
        console.error(error);
        showToast({ text: '작품 정보를 불러오는 데 실패했습니다.' });
        setWorkDetail(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkDetail();
  }, [spaceCode]);

  if (isLoading) {
    return null;
  }

  if (!workDetail || !spaceCode) {
    return (
      <S.Wrapper>
        <S.EmptyStateContainer>
          <S.EmptyMessage>아직 작품 소개를 등록하지 않았어요</S.EmptyMessage>
        </S.EmptyStateContainer>
      </S.Wrapper>
    );
  }

  const { title, category, authorName, description, photos } = workDetail;

  return (
    <S.Wrapper>
      <C.WorkContainer>
        <C.TitleRowContainer>
          <C.TitleContainer>{title}</C.TitleContainer>
          <C.CategoryContainer>{category}</C.CategoryContainer>
        </C.TitleRowContainer>
        <C.DesignerContainer>{authorName}</C.DesignerContainer>
        <C.DescriptionContainer>{description}</C.DescriptionContainer>
        {photos.map((photo, index) => (
          <C.ImageContainer
            key={photo.id}
            src={buildThumbnailUrl({
              path: photo.path,
              replacePath: 'product',
              preset: '800',
            })}
            alt={`work-detail-${index}`}
          />
        ))}
        <DividerLine width="100%" />
      </C.WorkContainer>
      <S.TextContainer>축하와 응원의 한 마디를 적어주세요</S.TextContainer>
      <Button text="방명록 작성하기" onClick={() => {}} />
    </S.Wrapper>
  );
};

export default GuestWorkDetail;
