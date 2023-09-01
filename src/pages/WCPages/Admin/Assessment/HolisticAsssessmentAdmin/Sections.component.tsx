import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {Box} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import clsx from 'clsx';

import {InputFields} from 'common/InputFields';
import SortIcon from 'assets/icons/SortIcon.svg';
import {DIALOG_TYPES, ERROR_MESSAGE, REGEX} from 'globals/global.constants';
import {openDialog} from 'store/commonReducer/common.action';
import {toTitleCase} from 'globals/global.functions';

import {sectionsStyle} from './Sections.style';
import {SectionsWrapper} from './SectionsWrapper.component';

const Sections = ({
  allSection,
  setSectionsData,
  saveError,
  submitError,
  headerArr,
  collapseAllSection,
  isDuplicateTitle,
}: any) => {
  const {classes} = sectionsStyle();

  const dispatch: any = useAppDispatch();
  const {isHistory} = useAppSelector(
    (state: any) => state.holisticAssessmentAdmin,
  );

  const handleDeleteSection = (sectionName: string, index: number): void => {
    const openDialogProp = {
      boldMessage: `Are you sure you want to delete ${toTitleCase(
        sectionName.replace(/_/g, ' '),
      )} section?`,
      successButtonText: 'Submit',
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        setSectionsData((prevState: any) => {
          const newArr1 = JSON.parse(JSON.stringify(prevState));
          newArr1.splice(index, 1);
          return newArr1;
        });
      },
    };
    dispatch(openDialog({...openDialogProp}));
  };

  const handleDeleteQuestion = (
    topIndex: number,
    questionIndex: number,
  ): void => {
    const openDialogProp = {
      boldMessage: `Are you sure you want to delete this question?`,
      successButtonText: 'Submit',
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        setSectionsData((prevState: any) => {
          const newArr1 = JSON.parse(JSON.stringify(prevState));
          newArr1[topIndex]['data'].splice(questionIndex, 1);
          return newArr1;
        });
      },
    };
    dispatch(openDialog({...openDialogProp}));
  };

  const handleAddQuestion = (index: number) => {
    setSectionsData((prevState: any) => {
      prevState[index]['data'] = [
        ...prevState[index]['data'],
        {always: 0, never: 0, sometimes: 0, question: ''},
      ];
      return [...prevState];
    });
  };

  const handleUpdateQuestion = (
    topIndex: number,
    index: number,
    value: string,
  ) => {
    setSectionsData((prevState: any) => {
      prevState[topIndex]['data'][index]['question'] = value;
      return [...prevState];
    });
  };

  return (
    <Box data-testid='sections'>
      {allSection.map((item: any, sectionIndex: number) => {
        return (
          <SectionsWrapper
            collapseAllSection={collapseAllSection}
            collapseSection={sectionIndex !== 0}
            isDuplicateTitle={isDuplicateTitle}
            headerValue={item.header}
            headerArr={headerArr}
            key={`header-${sectionIndex}}`}
            saveError={saveError}
            updateTitle={(value: string) => {
              setSectionsData((prevState: any) => {
                const newArr = JSON.parse(JSON.stringify(prevState));
                newArr[sectionIndex]['header'] = value;
                return newArr;
              });
            }}
            handleDeleteSection={() => {
              handleDeleteSection(item.header, sectionIndex);
            }}
            handleAddQuestion={() => {
              handleAddQuestion(sectionIndex);
            }}>
            <Box className={classes.itemContainer}>
              {item.data.map((inputFields: any, index: any) => {
                return (
                  <div className={classes.itemData} key={index}>
                    {item.data.length != 1 && (
                      <img src={SortIcon} style={{marginRight: 10}} />
                    )}
                    <InputFields
                      isError={
                        saveError &&
                        !REGEX.BLANK_FIELD.test(inputFields.question)
                      }
                      multiline={true}
                      withBorder={true}
                      rows={1}
                      errorText={
                        submitError &&
                        !REGEX.BLANK_FIELD.test(inputFields.question) &&
                        ERROR_MESSAGE.REQUIRED_FIELD
                      }
                      eventProps={{
                        value: inputFields.question || '',
                        disabled: isHistory,
                        onChange: (e: any) => {
                          handleUpdateQuestion(
                            sectionIndex,
                            index,
                            e.target.value,
                          );
                        },
                        // inputRef: (input: any) => {
                        //   if (
                        //     input != null &&
                        //     submitError &&
                        //     !inputFields.question
                        //   ) {
                        //     input.focus();
                        //   }
                        // },
                      }}
                      inputProps={{
                        name: `${inputFields.question}`,
                        placeholder: 'Add questions here',
                        required: true,
                        maxLength: 120,
                        style: {
                          padding: 3,
                          color: '#A7A7A7!important',
                        },
                      }}
                    />
                    {!isHistory && (
                      <HighlightOffIcon
                        data-testid='deleteQuestion'
                        onClick={() => {
                          handleDeleteQuestion(sectionIndex, index);
                        }}
                        className={clsx({
                          [classes.removeIcon]: true,
                          [classes.removeIconDisable]: item.data.length == 1,
                        })}
                      />
                    )}
                  </div>
                );
              })}
            </Box>
          </SectionsWrapper>
        );
      })}
    </Box>
  );
};

export default Sections;
