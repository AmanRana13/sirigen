import React, {PropsWithChildren} from 'react';
import {Box} from '@mui/material';
import {IPreviewLayoutProps} from './PreviewLayout.types';

const PreviewLayout: React.FC<PropsWithChildren<IPreviewLayoutProps>> = ({
  header: HeaderComponent,
  children,
}:IPreviewLayoutProps) => {
  return (
    <Box data-testid='preview-layout'>
      {HeaderComponent}
      <Box>{children}</Box>
    </Box>
  );
};

export default PreviewLayout;
