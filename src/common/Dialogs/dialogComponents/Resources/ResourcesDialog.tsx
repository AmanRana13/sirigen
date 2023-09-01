import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import {InputFields} from 'common/InputFields';
import {eventMaxDialogLayoutStyle} from 'common/Events/EventMaxDialog.style';

import {
  resourcesDetailStyle,
  resourcesDialogLayoutStyle,
} from './ResourcesDialogLayoutStyle';
import ResourcesDialogTable from './ResourcesDialogTable';
import {closeDialog} from 'store/commonReducer/common.action';
import UploadFiles from 'common/UploadFilesController/UploadFilesController.component';
import ResourcesDialogPdfUpload from './ResourcesDialogPdfUpload';
import React from 'react';
import clsx from 'clsx';
import {
  IInitialState,
  initialState,
  IResourcesPopupProps,
  IUploadFilesForm,
  IResource,
} from './ResourcesDialog.types';
import {
  addToListHandler,
  removeHandler,
  updateHandler,
} from './ResourcesDialog.utility';
import {resourcesConfig} from 'globals/global.constants';
import {saveResources} from './ResourcesDialog.action';
import InfoTooltip from 'common/InfoTooltip/InfoTooltip.component';
import {getMBValueInBytes} from 'globals/global.functions';
import {ResourceFormats} from 'globals/enums';
import {IConfigInitialState} from 'store/configReducer/config.action.types';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const ResourcesPopup = (props: IResourcesPopupProps) => {
  const [isError, setIsError] = React.useState(false);
  const {
    data,
    maxTotalCount = resourcesConfig.MAX_TOTAL_COUNT,
    maxUrlCount = resourcesConfig.MAX_URL_COUNT,
    position,
    fileSize = resourcesConfig.FILE_SIZE_IN_MB,
  } = props;
  const dispatch: any = useAppDispatch();
  const {messages} = useAppSelector(
    (state: any): IConfigInitialState => state.config,
  );
  const {classes: eventClasses} = eventMaxDialogLayoutStyle(position);
  const {classes} = resourcesDialogLayoutStyle();
  const [resourcesDialogState, setResourcesDialogState] =
    React.useState<IInitialState>(initialState);
  const [resourcesDialogForm, setResourcesDialogForm] =
    React.useState<IUploadFilesForm>({
      selectedFiles: [],
      errors: [],
      url: '',
      isDisabled: false,
      isUrlDisabled: false,
      isUploadDisabled: false,
      isUploadError: false,
    });
  const onCloseHandler = () => {
    dispatch(closeDialog());
  };
  const isAddDisabled = React.useMemo(
    () =>
      Boolean(
        resourcesDialogForm.isUploadError || // any error in selected files
          // total count of files >= max file count or total count of urls >= max url count
          (resourcesDialogForm.isUrlDisabled &&
            resourcesDialogForm.isUploadDisabled) ||
          // No selected file and No url
          (resourcesDialogForm.selectedFiles.length === 0 &&
            resourcesDialogForm.url.length === 0) ||
          // total count of files >= max file count and no url
          (resourcesDialogForm.isUploadDisabled &&
            resourcesDialogForm.url.length === 0) ||
          // total count of urls >= max url count and no selected files
          (resourcesDialogForm.isUrlDisabled &&
            resourcesDialogForm.selectedFiles.length === 0),
      ),
    [resourcesDialogForm],
  );

  /**
   * @description method to add selected files and url to resource list.
   */
  const onAddToListHandler = () => {
    const {resourcesRowsData, newFilesData} = addToListHandler(
      data,
      resourcesDialogState,
      resourcesDialogForm,
    );
    setResourcesDialogState({
      ...resourcesDialogState,
      resourcesRowsData,
      newFilesData,
    });
    setResourcesDialogForm({
      ...resourcesDialogForm,
      selectedFiles: [],
      errors: [],
      url: '',
    });
    setIsError(false);
  };

  /**
   * @description method to edit description pf resource in the list
   * @param {string} resourceId resourceId of the resource
   * @param {string} description description of the resource
   */
  const handleChange = (resourceId: string, description: string) => {
    const {resourcesRowsData} = updateHandler(
      resourceId,
      description,
      resourcesDialogState,
      data?.fullName,
    );
    setResourcesDialogState({
      ...resourcesDialogState,
      resourcesRowsData,
    });
  };

  /**
   * @description method to delete remove resource from the list
   * @param {string} resourceId resourceId of the resource
   */
  const handleRemove = (resourceId: string) => {
    const {resourcesRowsData, deleteRowsData, newFilesData} = removeHandler(
      resourceId,
      resourcesDialogState,
    );
    setResourcesDialogState({
      ...resourcesDialogState,
      resourcesRowsData,
      deleteRowsData,
      newFilesData,
    });
  };

  /**
   * @description method to upload & save resources to goal context
   */
  const handleSave = () => {
    const emptyDescription = resourcesDialogState.resourcesRowsData.some(
      (data: any) => data.description === '',
    );
    if (emptyDescription) {
      setIsError(true);
    } else {
      setIsError(false);
      dispatch(saveResources({resourcesDialogState, data, onCloseHandler}));
    }
  };

  React.useEffect(() => {
    setResourcesDialogState((state) => {
      return {
        ...state,
        resourcesRowsData: data?.goalData?.resource || [],
        existingResourcesData: data?.existingResourcesData || [],
      };
    });
  }, [data]);

  // setting url count error
  React.useEffect(() => {
    const urlCount = resourcesDialogState.resourcesRowsData.filter(
      (resource: IResource) => resource.format === ResourceFormats.URL,
    ).length;
    setResourcesDialogForm((form: any) => ({
      ...form,
      isUrlDisabled: urlCount >= maxUrlCount,
    }));
  }, [
    resourcesDialogState.resourcesRowsData,
    setResourcesDialogForm,
    maxUrlCount,
  ]);

  return (
    <>
      <Box
        id='resources-header'
        className={classes.dialogTitle}
        data-testid='resourcesDialog'>
        <Box className={classes.dialogHeader}>
          <Box className={classes.dialogTitleName}>
            <Typography className={classes.titleNameFontStyle}>
              Resources
            </Typography>
            <InfoTooltip>
              <Typography variant='body1'>{messages?.resourcesInfo}</Typography>
            </InfoTooltip>
          </Box>
          <CloseIcon
            data-testid='resourcesClose'
            className={classes.closeIcon}
            onClick={onCloseHandler}
          />
        </Box>
      </Box>
      <DialogContent id='callEntry-content'>
        <Grid container justifyContent='space-between' alignItems='start'>
          <Details
            firstLabel={
              <Typography
                component='label'
                variant='h5'
                className={classes.titleColor}>
                Senior/ Caregiver
              </Typography>
            }
            firstValue={
              <Typography
                paragraph={true}
                style={{textTransform: 'capitalize'}}>
                {data?.role || '-'}
              </Typography>
            }
            secondLabelWidth='35%'
            secondLabel={
              <Typography
                component='label'
                variant='h5'
                className={classes.titleColor}>
                Member Name
              </Typography>
            }
            secondValue={
              <Typography paragraph={true}>{data?.name || '-'}</Typography>
            }
          />
          <Details
            firstLabel={
              <Typography
                component='label'
                variant='h5'
                className={classes.titleColor}>
                Goal
              </Typography>
            }
            firstValue={
              <Typography paragraph={true}>
                {data?.goalData?.goal || '-'}
              </Typography>
            }
            secondLabelWidth='35%'
            secondLabel={
              <Typography
                component='label'
                variant='h5'
                className={classes.titleColor}>
                Action
              </Typography>
            }
            secondValue={
              <Typography paragraph={true}>
                {data?.goalData?.action || '-'}
              </Typography>
            }
          />
        </Grid>
        <Box display='flex' width='100%' mb={2}>
          <Typography
            variant='h5'
            style={{marginTop: 8}}
            className={classes.titleColor}>
            Upload a PDF:&nbsp;
          </Typography>
          <UploadFiles
            component={ResourcesDialogPdfUpload}
            isMultiple
            maxTotalCount={maxTotalCount}
            maxAllowedCount={3}
            fileSize={getMBValueInBytes(fileSize)}
            form={resourcesDialogForm}
            setForm={setResourcesDialogForm}
            resources={resourcesDialogState.resourcesRowsData}
            isDisabled={data?.isDisabled}
          />
          <Box paddingTop='4px'>
            <InfoTooltip placement='bottom-end'>
              <Typography variant='body1'>
                {messages?.uploadFileInfo}
              </Typography>
            </InfoTooltip>
          </Box>
        </Box>
        <Box display='flex' width='100%' alignItems='center' mb={2}>
          <Typography
            variant='h5'
            style={{marginTop: 8}}
            className={classes.titleColor}>
            Add a URL:&nbsp;
          </Typography>
          <Box
            display='flex'
            style={{borderRadius: 10, paddingRight: 5}}
            flex={1}
            flexDirection='column'
            className={classes.urlInput}>
            <InputFields
              inputProps={{
                name: `addurl`,
                placeholder: 'Enter URL',
                style: {padding: 0},
              }}
              multiline={true}
              rows={1}
              eventProps={{
                value: resourcesDialogForm.url,
                onChange: (e: any) =>
                  setResourcesDialogForm({
                    ...resourcesDialogForm,
                    url: e.target.value.trim(),
                  }),
                disabled: resourcesDialogForm.isUrlDisabled || data?.isDisabled,
              }}
            />
            {resourcesDialogForm.isUrlDisabled ? (
              <Box className={classes.errorText}>
                Max {maxUrlCount} URL Already Added.
              </Box>
            ) : null}
          </Box>
          <Box>
            <InfoTooltip placement='bottom-end'>
              <Typography variant='body1' className={classes.infoStyle}>
                {messages?.uploadUrlInfo}
              </Typography>
            </InfoTooltip>
          </Box>
        </Box>
        <Box display='flex' justifyContent='center' mb={3}>
          <Button
            size='large'
            color='primary'
            variant='contained'
            onClick={onAddToListHandler}
            disabled={isAddDisabled || data?.isDisabled}
            data-testid='resourcesAddToList'>
            Add to List
          </Button>
        </Box>
        <ResourcesDialogTable
          data={resourcesDialogState}
          isError={isError}
          handleChange={handleChange}
          handleRemove={handleRemove}
          isDisabled={data?.isDisabled}
        />
      </DialogContent>
      <DialogActions
        className={eventClasses.dialogActions}
        style={{
          justifyContent: 'center',
        }}>
        <Button
          data-testid='resourcesCancel'
          size='large'
          onClick={onCloseHandler}
          variant='outlined'>
          Cancel
        </Button>
        <Button
          data-testid='resourcesSave'
          size='large'
          onClick={handleSave}
          color='primary'
          variant='contained'
          disabled={data?.isDisabled}>
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export const Details = ({
  firstLabel,
  secondLabel,
  firstValue,
  secondValue,
  firstLabelWidth,
  secondLabelWidth,
}: any) => {
  const {classes} = resourcesDetailStyle();
  return (
    <>
      <Box className={classes.detailContainer}>
        <Box
          className={classes.detailLableContainer}
          style={{
            width: firstLabelWidth,
          }}>
          <Typography variant='h5' className={classes.detailValues}>
            {firstLabel}:
          </Typography>
        </Box>

        <Box style={{minWidth: '35%'}} className={classes.detailValues}>
          {firstValue}
        </Box>
      </Box>

      <Box className={classes.detailContainer}>
        <Box
          className={classes.detailLableContainer}
          style={{
            width: secondLabelWidth,
          }}>
          <Typography variant='h5' className={classes.detailValues}>
            {secondLabel}:
          </Typography>
        </Box>
        <Box
          className={clsx({
            [classes.detailValueContainer]: true,
            [classes.detailValues]: true,
          })}>
          {secondValue}
        </Box>
      </Box>
    </>
  );
};

const ResourcesDialog = () => {
  const {isOpen, data} = useAppSelector((state: any) => state.common.dialog);
  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        style: {
          backgroundColor: 'white',
          boxShadow: 'none',
          borderRadius: '12px',
          minWidth: '861px',
        },
      }}
      aria-labelledby='resources-dialog'>
      <ResourcesPopup
        data={data}
        maxTotalCount={resourcesConfig.MAX_TOTAL_COUNT}
        maxUrlCount={resourcesConfig.MAX_URL_COUNT}
        fileSize={resourcesConfig.FILE_SIZE_IN_MB}
      />
    </Dialog>
  );
};

export default ResourcesDialog;
