/* eslint-disable max-len */
import React from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import useAutoSave from 'hooks/useAutoSave';
import {Box, Button, Typography} from '@mui/material';
import {theme} from 'config/theme.config';
import {AssessmentStatus, PaginationFetchTypes} from 'globals/enums';
import useAutoScroll from 'hooks/useAutoScroll';
import SearchBar from 'common/SearchBar/SearchBar';
import globalUseStyles from 'config/global.styles';
import {
  DIALOG_TYPES,
  FETCH_LIMIT,
  PAGINATION_LIMIT,
} from 'globals/global.constants';
import {PAGINATION_TYPE} from 'globals/enums';
import {openDialog} from 'store/commonReducer/common.action';
import MedicalConditionTable from './MedicalConditionTable';
import {AssessmentActionButtons} from '../AssessmentActionButtons.component';
import {
  getMedicalCondition,
  getMedicalConditionError,
  getMedicalConditionSuccess,
  postMedicalCondition,
  searchMedicalCondition,
  submitMedicalCondition,
  toggleMedicalConditionViewState,
} from './MedicalCondition.action';
import {
  IMedicalConditionData,
  IMedicalConditionSection,
} from './MedicalCondition.types';
import {
  RESET_SEARCH,
  TOGGLE_IS_COMPLETED,
  updateAssessmentPageNumber,
} from '../Assessments.action';
import {getCurrentSenior} from 'globals/global.functions';
import withPaginationTable from 'hoc/withPaginationIsolated/withPaginationTable';
import {IWithPaginationProps} from 'hoc/withPaginationIsolated/withPaginationTable.types';

const MedicalConditionSection = ({
  formError,
  setFormError,
  medicalConditionData,
  setMedicalConditionData,
  deletedMedicalConditions,
  setDeletedMedicalConditions,
  modifiedMedicalConditions,
  setModifiedMedicalConditions,
  isAssessmentDataUpdated,
}: IMedicalConditionSection) => {
  const dispatch: any = useAppDispatch();
  const {classes: globalClasses} = globalUseStyles();
  const searchInputRef: any = React.useRef(); //using ref to hightlight the search results
  const {seniorID} = getCurrentSenior();
  const [isDisable, setIsdisable] = React.useState(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const {
    isHistory,
    assessmentStatus,
    searchResult,
    versionNumber,
    searchLoading,
    assessmentId,
  } = useAppSelector((state: any) => state.assessments);
  const careAgentName = useAppSelector((state: any) => state.auth.userName);
  const autoSaveTimeOut = useAppSelector(
    (state: any) => state.config.autoSaveTimeOut,
  );
  const savedMedicalConditionData: IMedicalConditionData[] = useAppSelector(
    (state: any) => state.assessments.surveys,
  );

  const {ref, scrollToFirstError} = useAutoScroll();
  const {onChangeAutoSave, resetAutoSave} = useAutoSave({
    onSave: (isUnMount?: boolean) => {
      dispatch(
        submitMedicalCondition({
          type: AssessmentStatus.Save,
          isAutoSave: true,
          data: medicalConditionData,
          deletedData: deletedMedicalConditions,
          modifiedData: modifiedMedicalConditions,
          formError: formError,
          assessmentId,
          isUnMount,
          seniorID,
          careAgentName,
        }),
      );
      setIsError(false);
    },
    timeOut: autoSaveTimeOut,
  });

  /**
   * @description list of already added medical condition
   */
  const addedMedicalConditions = React.useMemo(() => {
    return medicalConditionData?.map((item: IMedicalConditionData) => {
      return item.condition;
    });
  }, [medicalConditionData]);

  /**
   * @description list of auto suggested value excluding already added values
   */
  const searchList = React.useMemo(() => {
    return searchResult?.filter((item: string) => {
      if (addedMedicalConditions.includes(item)) {
        const conditionData = medicalConditionData.find(
          (data: IMedicalConditionData) => data.condition === item,
        );
        return conditionData?.resolved;
      }
      return true;
    });
  }, [searchResult, medicalConditionData, addedMedicalConditions]);

  /**
   * @function handleClose
   * @description to handle close event on viewing previously submitted assessment
   */
  const handleClose = () => {
    dispatch(toggleMedicalConditionViewState(false, ''));
  };

  /**
   * @function handleAddMedicalCondition
   * @description to handle addition of new medical condition into the list
   */
  const handleAddMedicalCondition = () => {
    //if value is selected from the list only then add that medical condition to table otherwise show error
    if (
      searchInputRef?.current?.value &&
      searchList.includes(searchInputRef.current.value)
    ) {
      const defaultValues: IMedicalConditionData = {
        date_of_onset: null,
        condition: searchInputRef.current.value,
        notes: null,
        severity_level: null,
        resolved: '',
        modification_date: '',
      };
      setMedicalConditionData((prevState: IMedicalConditionData[]) => {
        return [defaultValues, ...prevState];
      });
    } else {
      setIsError(true);
    }
    dispatch({type: RESET_SEARCH});
    searchInputRef.current.value = '';
  };

  /**
   * @function handleSearchChange
   * @description to handle change event of search input field
   * @param value
   */
  const handleSearchChange = async (value: string) => {
    if (value) {
      //dispatch action creator to fetch medical condition matched with search value
      dispatch(searchMedicalCondition(value));
      setIsError(false);
    } else {
      // reset the search result if we do not have value in searchBar
      dispatch({type: RESET_SEARCH});
    }
  };

  /**
   * @function handleReset
   * @description to handle Resetting of assessment on click cancel button
   * @param type
   */
  const handleReset = (type: AssessmentStatus) => {
    const params = {
      data: medicalConditionData,
      versionNumber: versionNumber,
      type: type,
      isAutoSave: false,
      assessmentId,
      seniorID,
      careAgentName,
    };
    const cancelMessage = `Are you sure you want to Cancel the changes made so far?`;
    const successButtonText = 'Yes';
    const cancelButtonText = 'No';
    const openDialogProp = {
      boldMessage: cancelMessage,
      successButtonText,
      cancelButtonText,
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        // If assessment is saved then we do api call otherwise we revert the changes from frontend
        if (assessmentStatus === AssessmentStatus.Save) {
          dispatch(postMedicalCondition(params));
        } else {
          setMedicalConditionData(savedMedicalConditionData);
        }
        dispatch({type: RESET_SEARCH});
        searchInputRef.current.value = '';
        setFormError(false);
        dispatch({
          type: TOGGLE_IS_COMPLETED,
          payload: {isCompleted: true},
        });
      },
    };
    dispatch(openDialog({...openDialogProp}));
  };
  /**
   * @function disableActionButtons
   * @description to disable save submit and cancel buttons
   */
  const disableActionButtons = React.useMemo(() => {
    return (
      (medicalConditionData?.length === 0 &&
        deletedMedicalConditions.length === 0) ||
      (!isAssessmentDataUpdated && assessmentStatus === AssessmentStatus.Submit)
    );
  }, [
    medicalConditionData,
    isAssessmentDataUpdated,
    assessmentStatus,
    deletedMedicalConditions,
  ]);

  //change disable state and remove validation error from searchBar on change of status or version and during viewing history
  React.useEffect(() => {
    setDeletedMedicalConditions([]);
    setModifiedMedicalConditions([]);
    setIsdisable(assessmentStatus === AssessmentStatus.Submit || isHistory);
    setIsError(false);
    dispatch({type: RESET_SEARCH});
    searchInputRef.current.value = '';
    if (isHistory) {
      resetAutoSave();
    }
  }, [assessmentStatus, versionNumber, isHistory]);

  /**
   * @function getData
   * @description apiFunction for getting paginated MedicalConditions
   * @param {number} offset
   * @param {number} limit
   */
  const getData = React.useCallback(
    (offset: number, limit: number) => {
      const conditionId = isHistory ? assessmentId : ''; // only required when viewing history
      return getMedicalCondition(offset, limit, conditionId);
    },
    [isHistory, assessmentId],
  );

  const withPaginationProps: IWithPaginationProps = {
    fetchType: PaginationFetchTypes.OFFSET,
    dependency: isHistory ? assessmentId : true,
    paginationOffsetProps: {
      getData,
      onSuccess: getMedicalConditionSuccess,
      onError: getMedicalConditionError,
      onPageChange: updateAssessmentPageNumber,
      rowsPerPage: PAGINATION_LIMIT.medicalCondition,
      className: '',
      offsetPath: 'assessments.offset',
      limit: FETCH_LIMIT.medicalCondition,
      loadingPath: 'assessments.loading',
      paginationType: PAGINATION_TYPE.SECONDARY,
      pagePath: 'assessments.currentPage',
      tableData: medicalConditionData,
      isScrollOnTop: true,
    },
  };

  const medicalConditionTable = withPaginationTable(
    MedicalConditionTable,
    {
      setError: setFormError,
      disabled: isDisable,
      setMedicalConditionData: (data: IMedicalConditionData[]) => {
        setMedicalConditionData(data);
        // call onChangeAutoSave
        onChangeAutoSave();
      },
      setDeletedMedicalConditions: (
        medicalCondition: IMedicalConditionData,
      ) => {
        if (medicalCondition.modification_date) {
          setDeletedMedicalConditions(
            (deletedMedicalConditions: IMedicalConditionData[]) => {
              const removeExisting = deletedMedicalConditions.filter(
                (data) => data.condition !== medicalCondition.condition,
              );
              return [...removeExisting, medicalCondition];
            },
          );
        }
      },
      setModifiedMedicalConditions: (
        medicalCondition: IMedicalConditionData,
      ) => {
        if (medicalCondition.modification_date) {
          setModifiedMedicalConditions(
            (modifiedMedicalConditions: string[]) => {
              if (
                modifiedMedicalConditions.includes(medicalCondition.condition)
              ) {
                return modifiedMedicalConditions;
              } else {
                return [
                  ...modifiedMedicalConditions,
                  medicalCondition.condition,
                ];
              }
            },
          );
        }
      },
    },
    withPaginationProps,
  );

  return (
    <Box ref={ref}>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h2' color={theme.palette.customColor.primaryLight}>
          Add Medical Conditions-Diseases
        </Typography>
        {!isHistory &&
          [AssessmentStatus.Save, AssessmentStatus.Submit].includes(
            assessmentStatus,
          ) && (
            <Button
              size='large'
              color='primary'
              variant='contained'
              onClick={() => {
                setIsdisable(false);
              }}
              className={globalClasses.smallButton}
              style={{color: '#fff'}}
              disabled={!isDisable}>
              Edit
            </Button>
          )}
      </Box>
      <Box display='flex' mt={2}>
        <SearchBar
          width='33.3%'
          value={searchInputRef?.current?.value}
          handleSearchChange={(value: any) => {
            handleSearchChange(value);
          }}
          isError={isError}
          searchLoading={searchLoading}
          inputRef={searchInputRef}
          errorText='Please select a Condition'
          isNewDesign
          searchList={searchList || []}
          disabled={isDisable}
          placeholder='Search with minimum 3 characters'
        />
        <Box>
          <Button
            size='large'
            color='primary'
            variant='contained'
            className={globalClasses.smallButton}
            onClick={() => {
              handleAddMedicalCondition();
              onChangeAutoSave();
            }}
            style={{marginLeft: 30, color: '#fff'}}
            disabled={isDisable}>
            Add Medical Condition
          </Button>
        </Box>
      </Box>
      <Box mt='30px'>
        <Typography variant='h2' color={theme.palette.customColor.primaryLight}>
          Medical Conditions/Diseases
        </Typography>
        {medicalConditionTable()}
      </Box>
      <Box>
        <AssessmentActionButtons
          isHistory={isHistory}
          handleClose={handleClose}
          disableSave={!isAssessmentDataUpdated}
          handleReset={() => {
            handleReset(AssessmentStatus.Reset);
            resetAutoSave();
          }}
          handleSaveSubmit={(type: AssessmentStatus) => {
            // if there is form error then scroll and focus to the first error
            if (formError && type == AssessmentStatus.Submit) {
              scrollToFirstError();
            } else {
              dispatch(
                submitMedicalCondition({
                  type: type,
                  isAutoSave: false,
                  data: medicalConditionData,
                  deletedData: deletedMedicalConditions,
                  modifiedData: modifiedMedicalConditions,
                  formError: formError,
                  assessmentId,
                  seniorID,
                  careAgentName,
                }),
              );
            }
            setIsError(false);
            setDeletedMedicalConditions([]);
            setModifiedMedicalConditions([]);
            dispatch({type: RESET_SEARCH});
            searchInputRef.current.value = '';
            //call resetAutoSave
            resetAutoSave();
          }}
          disabled={disableActionButtons}
          buttonText='Cancel'
        />
      </Box>
    </Box>
  );
};

export default MedicalConditionSection;
