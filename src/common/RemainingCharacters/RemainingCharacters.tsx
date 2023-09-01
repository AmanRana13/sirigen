import React from 'react';
import clsx from 'clsx';

import {IRemainingCharactersProps} from './RemainingCharacters.types';
import {remainingCharacterStyle} from './RemainingCharacter.style';
import {Box, Typography} from '@mui/material';
import {ThemeVersion} from 'globals/enums';

const RemainingCharacters: React.FC<IRemainingCharactersProps> = ({
  limit,
  value,
  themeVersion,
  float,
}) => {
  const {classes} = remainingCharacterStyle();

  if (themeVersion === ThemeVersion.v2) {
    return (
      <Box>
        <Typography variant='body1' style={{float: float}}>
          Remaining characters: &nbsp;
          <span
            className={clsx({[classes.characterLimit]: value.length > limit})}>
            {limit - value.length}
          </span>
        </Typography>
      </Box>
    );
  }
  return (
    <div>
      Remaining characters:
      <span className={clsx({[classes.characterLimit]: value.length > limit})}>
        {limit - value.length}
      </span>
    </div>
  );
};

export default RemainingCharacters;
