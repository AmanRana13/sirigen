import { IResource } from 'common/Dialogs/dialogComponents/Resources/ResourcesDialog.types';
import { IGoal } from 'store/goals/goals.types';

export interface IWellnessPlanDetail {
  situation: IWellnessPlanDetailObject;
  background: IWellnessPlanDetailObject;
  assessment: IWellnessPlanDetailObject;
  recommendation: IWellnessPlanDetailObject;
}

interface IWellnessPlanDetailObject {
  error: boolean;
  errorText: string;
  value: string;
}

export interface IMemberPriority {
  seq: number;
  value: string;
  error: boolean;
  errorText: string;
}

export interface IChallenge {
  seq: number;
  value: string;
  error: boolean;
  errorText: string;
}

export interface ISelectedSeniorCareGiver {
  value: string;
  label: string;
}

export interface IGetCareGiverPayload {
  senior_id: string;
  account_id: string;
}
export interface IGetWellnessPlanPayload {
  customer_id: string;
  version?: string;
}

export interface IGoalData extends IGoal {
  newGoalId?: number;
  isEdited?: boolean;
  isNewGoal?: boolean;
  actionError?: boolean;
  actionErrorText?: string;
  goalError?: boolean;
  goalErrorText?: string;
}
export interface IResourcesDialogData {
  careagentId: string;
  currentVersion: string;
  seniorId: string;
  role: string;
  name: string;
  existingResourcesData: IResource[];
  goalData: IGoalData;
  dispatchGoalsContext: any;
  isDisabled: boolean;
  fullName: string;
}