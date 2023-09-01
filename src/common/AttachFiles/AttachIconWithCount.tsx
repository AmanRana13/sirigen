import clsx from 'clsx';
import {Box, Typography} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {attachIconWithCountStyle} from './AttachIconWithCount.style';

export interface IAttachIconWithCount {
  onClick: () => void;
  disableAttach: boolean;
  filesCount: number;
}
export const AttachIconWithCount = ({
  onClick,
  disableAttach,
  filesCount,
}: IAttachIconWithCount) => {
  const {classes} = attachIconWithCountStyle();

  return (
    <>
      <Box
        onClick={() => onClick()}
        style={{height: 'fit-content', cursor: 'pointer'}}
        className={clsx({
          [classes.attachDisableText]: disableAttach,
        })}>
        <AttachFileIcon
          data-testid='attachFileIcon'
          className={clsx({
            [classes.attachFileIcon]: true,
            [classes.attachDisableText]: disableAttach,
          })}
        />
        <Typography
          variant='h5'
          className={clsx({
            [classes.attachFileText]: true,
            [classes.attachDisableText]: disableAttach,
          })}>
          Attach
        </Typography>
      </Box>
      <Box>
        <Typography
          className={clsx({
            [classes.attachDisableText]: disableAttach,
          })}>{`${filesCount || 'No'} ${
          filesCount === 1 ? 'Item' : 'Items'
        }`}</Typography>
      </Box>
    </>
  );
};
