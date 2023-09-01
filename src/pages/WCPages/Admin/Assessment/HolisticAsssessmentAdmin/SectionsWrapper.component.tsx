import React from 'react';
import {useAppSelector} from 'hooks/reduxHooks';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
} from '@mui/material';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';

import {InputFields} from 'common/InputFields';
import {ERROR_MESSAGE} from 'globals/global.constants';
import {toTitleCase} from 'globals/global.functions';
import globalUseStyles from 'config/global.styles';

import {sectionsWrapperStyle} from './SectionsWrapper.style';

const SectionsWrapper = ({
  children,
  headerArr,
  headerValue,
  saveError,
  updateTitle,
  handleAddQuestion,
  handleDeleteSection,
  collapseAllSection,
  collapseSection,
}: any) => {
  const {classes: globalClasses} = globalUseStyles();
  const {classes} = sectionsWrapperStyle();

  const {isHistory} = useAppSelector(
    (state: any) => state.holisticAssessmentAdmin,
  );

  const [expanded, setExpanded] = React.useState(true);

  const title = toTitleCase(headerValue.replace(/_/g, ' '));

  React.useEffect(() => {
    if (collapseSection && collapseAllSection) {
      setExpanded(false);
    }
  }, [headerArr, collapseAllSection]);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const isError = React.useMemo(() => {
    if (saveError && !title) {
      return {error: true, errorText: ERROR_MESSAGE.REQUIRED_FIELD};
    }

    if (
      saveError &&
      headerArr.filter((item: string) => item == title).length > 1
    ) {
      return {error: true, errorText: 'Duplicate Title'};
    }
  }, [headerArr, saveError]);

  return (
    <Box className={classes.container}>
      <Accordion expanded={expanded}>
        <AccordionSummary
          className={classes.accordianSummary}
          expandIcon={
            <KeyboardArrowDownSharpIcon
              data-testid = 'keyboardDownBtn'
              onClick={handleChange}
              className={classes.iconStyle}
            />
          }>
          <Box
            display='flex'
            justifyContent='space-between'
            width='100%'
            alignItems='center'>
            <Box width='50%' borderRadius='10px'>
              <InputFields
                isError={isError?.error}
                errorText={isError?.errorText}
                eventProps={{
                  value: title || '',
                  disabled: isHistory,
                  onChange: (e: any) => {
                    updateTitle(e.target.value);
                  },
                  // inputRef: (input: any) => {
                  //   if (input != null && isError?.error) {
                  //     input.focus();
                  //   }
                  // },
                }}
                multiline={true}
                withBorder={true}
                rows={1}
                inputProps={{
                  name: `title-${headerValue}`,
                  placeholder: 'Add Title',
                  required: true,
                  maxLength: 30,
                  style: {
                    fontSize: 20,
                    color: '#0186a5',
                    fontWeight: 500,
                    padding: 3,
                  },
                }}
              />
            </Box>
            {!isHistory && (
              <Box display='flex' justifyContent='space-between' width={376}>
                <Button
                  variant='outlined'
                  size='medium'
                  disabled={headerArr.length == 1 ? true : false}
                  onClick={handleDeleteSection}
                  data-tesid = 'deleteSectionBtn'
                  className={globalClasses.smallButtonOutlined}>
                  Delete Section
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  data-testid = 'addQuestionBtn'
                  className={globalClasses.smallButton}
                  onClick={handleAddQuestion}>
                  Add Question
                </Button>
              </Box>
            )}
          </Box>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <Box width='100%'>{children}</Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export {SectionsWrapper};
