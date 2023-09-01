import {Grid} from '@mui/material';
import {useFieldArray} from 'react-hook-form';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {Fields} from 'common/Fields';

import {addUserStyle} from '../../AddUser.style';
import get from 'lodash.get';

export default ({
  nestIndex,
  control,
  formData,
  section,
  register,
  errors,
}: any) => {
  const {fields, remove, append} = useFieldArray({
    control,
    name: `history[${nestIndex}].[${section}]`,
  });
  const {classes} = addUserStyle();
  const otherElement = (data: any) => {
    switch (data.otherElement) {
      case 'addButton':
        return <AddCircleIcon data-testid = 'buttonAdd' className={classes.addDeletIcon} />;
      case 'cancelButton':
        return <HighlightOffIcon data-testid = 'buttonCancel' className={classes.addDeletIcon} />;
      default:
        return null;
    }
  };
  const renderFields = (data: any, index: any, key: any) => {
    const value = key[data.name];
    if (data.mode && index == 0) {
      return (
        <Grid key={data.id} item xs={4} className={classes.alignCenter}>
          <AddCircleIcon
            className={classes.addDeletIcon}
            data-testId = 'buttonAppend'
            onClick={() => {
              append({data: '', value: ''});
            }}
          />
        </Grid>
      );
    } else if (data.mode && index != 0) {
      return (
        <Grid item xs={4} className={classes.alignCenter}>
          <HighlightOffIcon
            className={classes.addDeletIcon}
            data-testId = 'buttonRemove'
            onClick={() => {
              remove(index);
            }}
          />
        </Grid>
      );
    }
    return (
      <Grid key={data.id} item xs={4}>
        {data.menu || data.date ? (
          <Fields
            {...data}
            defaultValue={value}
            label={data.label}
            errorText={get(
              errors,
              `history[${nestIndex}].[${section}][${index}].[${data.name}].message`,
            )}
            name={`history[${nestIndex}].[${section}][${index}].[${data.name}]`}
            control={control}
          />
        ) : (
          <>
            <Fields
              {...data}
              key={data.id}
              defaultValue={value}
              name={`history[${nestIndex}].[${section}][${index}].[${data.name}]`}
              {...register(
                `history[${nestIndex}].[${section}][${index}].[${data.name}`,
              )}
              center={data.otherElement}
              extraComponent={otherElement(data)}
            />
          </>
        )}
      </Grid>
    );
  };

  return (
    <>
      {fields.map((key, index) =>
        formData.map((option: any) => renderFields(option, index, key)),
      )}
    </>
  );
};
