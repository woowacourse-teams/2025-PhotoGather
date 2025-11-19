import * as S from './VideoPlayer.styles';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  return (
    <S.VideoImageWrapper>
      <iframe
        width="100%"
        height="100%"
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </S.VideoImageWrapper>
  );
};

export default VideoPlayer;
