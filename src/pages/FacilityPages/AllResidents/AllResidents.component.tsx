import React, {useState} from 'react';
import ResidentTable from './component/ResidentTable';
import Header from './component/ResidentHeader/Header';
import {Box, Typography} from '@mui/material';
import AutoComplete from 'common/AutoComplete/AutoComplete';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import {useAppSelector} from 'hooks/reduxHooks';
import {PaginationFetchTypes, ZoneType} from 'globals/enums';
import ZoneSelect from 'common/ZoneSelect/ZoneSelect.component';
import withPaginationTable from 'hoc/withPaginationIsolated/withPaginationTable';
import {updateSeniorListPageNumber} from 'store/commonReducer/common.action';
import {AllResidentsStyle} from './AllResidents.style';

const AllResidents = () => {
  const {classes} = AllResidentsStyle();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [wcSearchInput, setWcSearchInput] = useState<string>('');
  const [selected, setSelected] = React.useState<any[]>([]);
  const selectedWc = useAppSelector(
    (state: any) => state.common.seniorList.selectedHomeWc,
  );
  const selectedZone: ZoneType | '' = useAppSelector(
    (state: any) => state.common.seniorList.selectedHomeZone,
  );
  React.useEffect(() => {
    if (!open) {
      setWcSearchInput('');
    }
  }, [open]);

  //AutoComplete Logic Start
  const {observerRef} = useIntersectionObserver(() => {});

  // HOC props
  const withPaginationProps: any = React.useMemo(() => {
    const commonProps = {};
    return {
      fetchType: PaginationFetchTypes.LAST_EVALUATED_KEY,
      dependency: '',
      paginationProps: {
        ...commonProps,
        onPageChange: updateSeniorListPageNumber,
        loadingPath: 'common.seniorList.loading',
        tableDataPath: 'common.seniorList.data',
        isScrollOnTop: true,
      },
      searchBarProps: {
        ...commonProps,
        className: classes.searchContainer,
        onSearchChange: (value: string) => {},
        disableFrontendSearch: true,
        noRightMargin: true,
        renderLeftSideComponent: () => {
          return (
            <Box
              data-testid='allResidentsContainer'
              display='flex'
              gap='1.5rem'
              style={{
                flex: 2,
                justifyContent: 'space-between',
              }}>
              <Typography className={classes.HeaderText} component='span'>
                Residents
              </Typography>
              <Box data-testid='autoCompleteBox' 
                display='flex' style={{gap: 24}}>
                <AutoComplete
                  data-testid='autocompleteAgents' 
                  id='autocompleteAgents'
                  open={open}
                  onOpen={() => setOpen(true)}
                  onClose={() => setOpen(false)}
                  value={selectedWc}
                  onChange={(event: any, newValue: any) => {}}
                  getOptionDisabled={() => false}
                  onInputChange={(event: any, newValue: any) => {
                    if (event) {
                      setWcSearchInput(newValue);
                    }
                  }}
                  loading={false}
                  filterOptions={(x: any) => x}
                  renderOption={(props: any, option: any) => {
                    if (!option.fullName) {
                      return (
                        <Box
                          data-testid='userIdBox' 
                          key={option.userId || 'all'}
                          ref={observerRef}></Box>
                      );
                    }
                    return (
                      <Box data-testid='fullNamedBox'  
                        component='li' {...props} key={option.userId}>
                        {option.fullName}
                      </Box>
                    );
                  }}
                  options={options}
                />
                <ZoneSelect
                  zoneType={selectedZone}
                  onChange={(e) => {}}
                  hasAllOption
                />
              </Box>
            </Box>
          );
        },
      },
    };
  }, [open, selectedWc, options, wcSearchInput, observerRef, selectedZone]);

  /**
   * @description Wrap component withPagination HOC to get the pagination service
   */
  const seniorWCMappingWithPagination = React.useMemo(() => {
    return withPaginationTable(ResidentTable, {}, withPaginationProps);
  }, [selected, withPaginationProps]);

  return (
    <div>
      <Header />
      {seniorWCMappingWithPagination()}
    </div>
  );
};

export default AllResidents;
