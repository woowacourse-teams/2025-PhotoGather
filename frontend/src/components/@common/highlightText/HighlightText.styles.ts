import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';

export type TextAlign = 'left' | 'center' | 'right';

export const Wrapper = styled.div<{
  $fontStyle: keyof Theme['typography'];
  $textAlign: TextAlign;
}>`
  ${({ theme, $fontStyle }) => ({ ...theme.typography[$fontStyle] })}
  white-space: pre-line;
  text-align: ${({ $textAlign }) => $textAlign ?? 'center'};
`;

export const Text = styled.span<{ $textColorStyle: keyof Theme['colors'] }>`
  color: ${({ theme, $textColorStyle }) => theme.colors[$textColorStyle]};
`;

export const HighLight = styled.span<{
  $highlightColorStyle: keyof Theme['colors'];
}>`
  color: ${({ theme, $highlightColorStyle }) => theme.colors[$highlightColorStyle]};
`;
