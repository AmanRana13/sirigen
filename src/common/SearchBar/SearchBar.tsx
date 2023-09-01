import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import {
  Box,
  CircularProgress,
  ClickAwayListener,
  InputAdornment,
  InputBase,
  Typography,
} from '@mui/material';
import {withStyles} from 'tss-react/mui';
import {IBoldStringProps, ISerachBarProps} from './SearchBar.types';
import {escapeStringRegexp, searchDelay} from 'globals/global.functions';
import {SEARCH_MINIMUM_CHAR_COUNT} from 'globals/global.constants';
import {useSearchBarStyles} from './SearchBar.styles';

/**
 * @description to bold selected string of any particular string
 * @param param
 * @returns
 */
const BoldString = ({text, shouldBeBold}: IBoldStringProps) => {
  const escapedString = escapeStringRegexp(shouldBeBold);
  const textArray = text.split(new RegExp(escapedString, 'i'));
  const searchedTextIndex = text.search(new RegExp(escapedString, 'i'));
  const searchedText = text.slice(
    searchedTextIndex,
    searchedTextIndex + shouldBeBold.length,
  );

  return (
    <span>
      {textArray.map((item: string, index: number) => (
        <>
          {item}
          {index !== textArray.length - 1 && <b>{searchedText}</b>}
        </>
      ))}
    </span>
  );
};

const SearchBarField = withStyles(InputBase, {
  root: {
    border: '1px solid #707070',
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#ffff',
    minWidth: '270px',
    height: '35px',
    padding: '0px 0px 0px 15px',
  },
});

/**
 * @description Search bar component to provide search input field
 * @function SearchBar
 * @return {JSX}
 */
const SearchBar = ({
  handleSearchChange,
  lastEvaluatedKey,
  tableData,
  isNewDesign,
  placeholder,
  width,
  value,
  isError,
  errorText,
  disabled,
  inputRef,
  searchList,
  searchLoading,
  minHeight,
  maxLength,
  searchListWidth = '30.5%',
  isSelected = false,
  errorMessage = '',
  onSearchTextChange = (searchQuery: string) => {},
  noRightMargin = false,
}: ISerachBarProps) => {
  const [searchQuery, setSearchQuery] = React.useState<any>('');

  // isOpen state is used to show and hide dropDown list of matched value
  const [isOpen, setIsopen] = React.useState<boolean>(false);
  const {classes} = useSearchBarStyles();

  React.useMemo(() => {
    // set value into searchQuery only if searchQuery have some value
    if (searchQuery) {
      setSearchQuery(value);
    }
    if (!value) {
      setIsopen(false);
    }
  }, [value]);

  React.useEffect(() => {
    onSearchTextChange(searchQuery);
  }, [searchQuery]);

  const searchHandler = (
    inputValue: string | null,
    lastEvaluatedKey: string,
    tableData: any,
  ) => {
    if (inputValue && inputValue?.length > SEARCH_MINIMUM_CHAR_COUNT) {
      setIsopen(true);
      handleSearchChange(inputValue, lastEvaluatedKey, tableData);
    } else if (!inputValue) {
      setIsopen(false);
      handleSearchChange(
        lastEvaluatedKey ? null : inputValue,
        lastEvaluatedKey,
        tableData,
      );
    }
  };

  const optimizedFn = React.useCallback(searchDelay(searchHandler), []);

  function handleChange(e: any) {
    const inputValue = e.target.value;

    setSearchQuery(inputValue);
    optimizedFn(inputValue, lastEvaluatedKey, tableData);
  }

  const crossHandler = () => {
    setSearchQuery('');
    searchHandler(lastEvaluatedKey ? null : '', '', []);
  };

  if (isNewDesign) {
    return (
      <>
        <Box style={{width: width, maxWidth: 452}}>
          <Box
            data-testid='SearchBar'
            component='form'
            onSubmit={(e: any) => {
              e.preventDefault();
            }}>
            <InputBase
              sx={{border: isError ? '1px solid #cc0000' : 0}}
              inputRef={inputRef}
              className={classes.root}
              autoComplete='off'
              value={searchQuery}
              onChange={handleChange}
              disabled={disabled}
              placeholder={placeholder ? placeholder : 'Search by name'}
              inputProps={{maxLength: maxLength}}
              endAdornment={
                searchQuery ? (
                  !isSelected && (
                    <InputAdornment
                      onClick={crossHandler}
                      position='start'
                      style={{margin: '5px', cursor: 'pointer'}}>
                      <CloseIcon />
                    </InputAdornment>
                  )
                ) : (
                  <InputAdornment
                    position='start'
                    style={{margin: '5px', color: '#00a9cf'}}>
                    <SearchIcon />
                  </InputAdornment>
                )
              }
            />
            {isError && (
              <Typography color='#cc0000' textAlign='right' fontSize={14}>
                {errorText}
              </Typography>
            )}
          </Box>
          <Box>
            {/* show dropdown list only if we have searchList */}
            {searchList && isOpen && (
              <ClickAwayListener onClickAway={() => setIsopen(false)}>
                <Box
                  className={classes.searchList}
                  width={searchListWidth}
                  minHeight={minHeight}>
                  {searchLoading && (
                    <Box
                      display='flex'
                      justifyContent='center'
                      alignItems='center'
                      padding='10px 0'>
                      <CircularProgress />
                    </Box>
                  )}
                  {!searchLoading &&
                    searchList?.length === 0 &&
                    !errorMessage && (
                      <Typography
                        className={classes.searchListItems}
                        sx={{cursor: 'auto'}}>
                        No Match Found
                      </Typography>
                    )}
                  {!searchLoading && errorMessage && (
                    <Typography
                      className={classes.searchListItems}
                      sx={{cursor: 'auto', color: '#cc0000', fontSize: 15}}>
                      {errorMessage}
                    </Typography>
                  )}

                  {!searchLoading &&
                    searchList?.length > 0 &&
                    !errorMessage &&
                    searchList?.map((item: string) => (
                      <Typography
                        key={item}
                        className={classes.searchListItems}
                        sx={{cursor: 'pointer'}}
                        onClick={() => {
                          setSearchQuery(item);
                          setIsopen(false);
                        }}>
                        <BoldString text={item} shouldBeBold={searchQuery} />
                      </Typography>
                    ))}
                </Box>
              </ClickAwayListener>
            )}
          </Box>
        </Box>
      </>
    );
  }

  return (
    <Box
      data-testid='SearchBar'
      component='form'
      onSubmit={(e: any) => {
        e.preventDefault();
      }}
      style={{
        margin: '0px 24px',
        marginBottom: 10,
        marginRight: noRightMargin ? '0px' : '24px',
      }}>
      <SearchBarField
        autoComplete='off'
        value={searchQuery}
        onChange={handleChange}
        placeholder='Search by name'
        endAdornment={
          searchQuery ? (
            <InputAdornment
              onClick={crossHandler}
              position='start'
              style={{margin: '5px', cursor: 'pointer'}}>
              <CloseIcon />
            </InputAdornment>
          ) : (
            <InputAdornment
              position='start'
              style={{margin: '5px', color: '#00a9cf'}}>
              <SearchIcon />
            </InputAdornment>
          )
        }
      />
    </Box>
  );
};

export default SearchBar;
