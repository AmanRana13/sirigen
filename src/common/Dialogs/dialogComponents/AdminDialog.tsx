import {useAppSelector} from 'hooks/reduxHooks';

import {AddAgentFields} from 'pages/WCPages/Admin/AddAgentFields.component';

import DialogWrapper from './DialogWrapper';

export const AdminDialog = () => {
  const dialogData = useAppSelector((state: any) => state.common.dialog.data);
  const dialogTitle = useAppSelector(
    (state: any) => state.common.dialog.dialogTitle,
  );
  return (
    <DialogWrapper title={dialogTitle} data-testid='adminDialog'>
      <AddAgentFields data={dialogData} />
    </DialogWrapper>
  );
};

export default AdminDialog;
