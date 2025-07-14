import { Global } from '@emotion/react';
import { reset } from './reset';

const GlobalStyle = () => <Global styles={[reset]} />;

export default GlobalStyle;
