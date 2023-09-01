/* eslint-disable max-len */
import React from 'react';
import {useAppSelector} from 'hooks/reduxHooks';

import {DIALOG_TYPES} from 'globals/global.constants';

import LimitDialog from './dialogComponents/LimitDialog';
import MessageActionDialog from './dialogComponents/MessageActionDialog';
import DailyRecapDialog from './dialogComponents/DailyRecapDialog';
import AdminDialog from './dialogComponents/AdminDialog';
import AdminActionDialog from './dialogComponents/AdminActionDialog';
import ResourcesDialog from './dialogComponents/Resources/ResourcesDialog';
import MedicationDialog from './dialogComponents/MedicationDialog/MedicationDialog';
import AssignWellnessCoachDialog from './dialogComponents/AssignWellnessCoach/AssignWellnessCoachDialog';
import UnassignSeniorsDialog from './dialogComponents/UnassignSeniors/UnassignSeniorsDialog';
import CorporateDialog from './dialogComponents/CorporateAndFacilitiesDialogs/CorporateDialog/CorporateDialog.component';
import FacilityDialog from './dialogComponents/CorporateAndFacilitiesDialogs/FacilityDialog/FacilityDialog.component';

const Dialogs = React.memo(() => {
  const dialogType = useAppSelector((state: any) => state.common.dialog.type);

  switch (dialogType) {
    case DIALOG_TYPES.LIMIT:
      return <LimitDialog />;
    case DIALOG_TYPES.MESSAGE_ACTION_DIALOG:
      return <MessageActionDialog />;
    case DIALOG_TYPES.DAILY_RECAP:
      return <DailyRecapDialog />;
    case DIALOG_TYPES.ADD_AGENT:
      return <AdminDialog />;
    case DIALOG_TYPES.ADMIN_ACTION_DIALOG:
      return <AdminActionDialog />;
    case DIALOG_TYPES.RESOURCES:
      return <ResourcesDialog />;
    case DIALOG_TYPES.MEDICATION:
      return <MedicationDialog />;
    case DIALOG_TYPES.ASSIGN_WELLNESS_COACH:
      return <AssignWellnessCoachDialog />;
    case DIALOG_TYPES.UNASSIGN_SENIORS:
      return <UnassignSeniorsDialog />;
    case DIALOG_TYPES.CORPORATE:
      return <CorporateDialog />;
    case DIALOG_TYPES.FACILITY:
      return <FacilityDialog />;
    default:
      return null;
  }
});

export default Dialogs;
