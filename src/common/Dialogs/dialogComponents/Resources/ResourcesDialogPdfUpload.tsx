import React from 'react';
import {Box, Button, TextField, Chip} from '@mui/material';
import {makeStyles} from 'tss-react/mui';
import {UploadFileUIProps} from 'common/UploadFilesController/UploadFilesController.types';
import {IResource} from './ResourcesDialog.types';
import clsx from 'clsx';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    flex: 1,
    borderRadius: '10px',
    border: 'solid 1px #cbcbcb',
    backgroundColor: '#fafafa',
  },
  emptyFiles: {
    color: '#a7a7a7',
    fontFamily: '"SFUIText", sans-serif',
    margin: `${theme.spacing(0.75)} ${theme.spacing(0.75)}`,
    fontSize: '16px',
  },
  chip: {
    margin: `${theme.spacing(0.65)} ${theme.spacing(0.5)}`,
    fontSize: '16px',
  },
  chipError: {
    color: theme.palette.error.light,
    borderColor: theme.palette.error.light,
  },
  error: {
    color: theme.palette.error.light,
    borderColor: theme.palette.error.light,
  },
  chooseButton: {
    maxWidth: '133px',
    fontSize: '16px',
    borderRadius: '25px',
    padding: '6px 20px',
  },
}));

const ResourcesDialogPdfUpload = (props: UploadFileUIProps) => {
  const {
    isMultiple = false,
    isDisabled = false,
    handleChange,
    handleRemove,
    selectedFiles,
    fileSize,
    errors = [],
    existingFiles = [],
    isUploadError,
  } = props;
  const {classes} = useStyles();
  return (
    <div style={{flexGrow: 1}}>
      <div style={{display: 'flex', gap: '4px'}}>
        <Box
          component='ul'
          className={clsx({
            [classes.root]: true,
            [classes.error]: isUploadError,
          })}
          data-testid='resourcesPdfUpload'>
          {selectedFiles.length ? (
            ''
          ) : (
            <li className={classes.emptyFiles}>No Files Chosen</li>
          )}
          {selectedFiles.map((f: File, i: number) => {
            const isError =
              f.size > fileSize ||
              existingFiles.some((ef: IResource) => ef.name === f.name);
            return (
              <li key={f.name} data-testid='resourcesChip'>
                <Chip
                  label={f.name}
                  title={f.name}
                  key={f.name}
                  onDelete={() => handleRemove(i)}
                  color={isError ? 'error' : 'primary'}
                  variant='outlined'
                  size='small'
                  style={{
                    maxWidth: '164px',
                  }}
                  sx={{
                    '& .MuiChip-deleteIcon': {
                      color: isError ? '#CC0000' : '#00A9CF',
                    },
                  }}
                  className={clsx(classes.chip, {[classes.chipError]: isError})}
                />
              </li>
            );
          })}
        </Box>
        <Button
          color='primary'
          variant='contained'
          className={classes.chooseButton}
          component='label'
          size='small'
          data-testid='resourcesChooseFile'
          disabled={isDisabled}>
          Choose File
          <TextField
            style={{display: 'none'}}
            type='file'
            inputProps={{
              accept: 'application/pdf',
              multiple: isMultiple,
              onChange: handleChange,
              onClick: (e: any) => (e.target.value = null),
              disabled: isDisabled,
            }}
          />
        </Button>
      </div>
      <div>
        {errors.map((er: string) => (
          <div key={er} className={classes.error}>
            {er}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesDialogPdfUpload;
