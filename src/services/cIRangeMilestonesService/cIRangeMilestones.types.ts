export interface ICIRangeMilestonesService {
  milestone_data: IMilestoneData[];
  last_evaluated_key: string | null;
}

export interface IAPISeniorName {
  first_name: string;
  middle_name: string;
  last_name: string;
}
export interface IMilestoneData {
  senior_id: string;
  account_id: string;
  name: IAPISeniorName;
  measurement_type: string;
  modification_date: string;
  milestone: number;
  milestone_ordinal: number;
  last_submitted: string;
  timezone: string;
  status: string;
}
