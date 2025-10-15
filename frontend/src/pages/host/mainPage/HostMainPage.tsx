import { IoLogoInstagram } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Button from '../../../components/@common/buttons/button/Button';
import IconButton from '../../../components/@common/buttons/iconButton/IconButton';
import Thumbnail from '../../../components/@common/thumbnail/Thumbnail';
import useSpaceInfo from '../../../hooks/domain/space/useSpaceInfo';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import { createInstagramUrl } from '../../../utils/createExternalLinks';
import * as MainPageStyles from '../../MainPage.common.styles';

const HostMainPage = () => {
  const { spaceCode } = useParams();
  const { spaceInfo } = useSpaceInfo({
    spaceCode: spaceCode ?? '',
  });

  return (
    <MainPageStyles.Wrapper>
      <MainPageStyles.ProfileContainer>
        <Thumbnail
          src={`${import.meta.env.VITE_IMAGE_BASE_URL}${spaceInfo.spacePhoto.path}`}
        />
        <MainPageStyles.InfoContainer>
          <MainPageStyles.Name>{spaceInfo.name}</MainPageStyles.Name>
          <MainPageStyles.Introduction>
            {spaceInfo.description}
          </MainPageStyles.Introduction>
        </MainPageStyles.InfoContainer>
      </MainPageStyles.ProfileContainer>
      <MainPageStyles.IconButtonContainer>
        <IconButton
          aria-label="인스타그램"
          icon={<IoLogoInstagram />}
          variant="default"
          onClick={() =>
            window.open(
              createInstagramUrl(spaceInfo.instagramUsername),
              '_blank',
            )
          }
          disabled={
            !spaceInfo.instagramUsername || spaceInfo.instagramUsername === ''
          }
        />
        <IconButton
          aria-label="이메일"
          icon={<MdEmail />}
          variant="default"
          onClick={() => window.open(`mailto:${spaceInfo.email}`, '_blank')}
          disabled={!spaceInfo.email || spaceInfo.email === ''}
        />
      </MainPageStyles.IconButtonContainer>
      <DividerLine width="10%" />
      <MainPageStyles.ButtonContainer>
        <Button variant="elevated" text="작품 소개 관리" onClick={() => {}} />
        <Button variant="elevated" text="방명록 관리" onClick={() => {}} />
      </MainPageStyles.ButtonContainer>
      <MainPageStyles.Footer></MainPageStyles.Footer>
    </MainPageStyles.Wrapper>
  );
};

export default HostMainPage;
