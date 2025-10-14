import { useToast } from './@common/useToast';

interface UseCopyLinkProps {
  text: string;
}

const useCopyLinkWithToast = ({ text }: UseCopyLinkProps) => {
  const { showToast } = useToast();

  const copyWithMessage = (link: string) => {
    navigator.clipboard.writeText(link);
    showToast({
      text,
    });
  };

  return { copyWithMessage };
};

export default useCopyLinkWithToast;
