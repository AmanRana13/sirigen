import {Box, Typography} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import {editAdDisableStyle} from './EditAndDisable.style';

interface IEditAndDisableProps {
  handleEdit: (value?: any) => void;
  handleDisable: (value?: any) => void;
  style?: any;
}
/**
 * @description common component for edit and disable buttons
 * @param handleEdit method to handle edit button
 * @param handleDisable method to handle disable button
 * @param style the outer box styling
 * @returns {JSX}
 */
const EditAndDisable = ({
  handleEdit,
  handleDisable,
  style,
}: IEditAndDisableProps) => {
  const {classes} = editAdDisableStyle();

  return (
    <Box display='flex' style={style}>
      <Box
        className={classes.editBtn}
        onClick={() => handleEdit()}
        data-testid='editButton'>
        <CreateIcon className={classes.createIcon} />
        <Typography variant='body1'>Edit</Typography>
      </Box>
      <Box
        className={classes.disableBtn}
        onClick={() => handleDisable()}
        data-testid='disableButton'>
        <Typography variant='body1'>Disable</Typography>
      </Box>
    </Box>
  );
};

export default EditAndDisable;
