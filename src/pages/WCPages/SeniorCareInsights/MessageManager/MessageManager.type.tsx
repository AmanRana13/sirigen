export interface IInsightHistory {
  id: string;
  dateGenerated: string;
  dateUpdated: string;
  status: string;
  agent: string;
  vitalSign: string;
  type: string;
  message: string;
}

export interface IInsightSubHistory {
  id: string;
  dateGenerated: string;
  dateUpdated: string;
  status: string;
  agent: string;
  vitalsign: string;
  type: string;
  message: string;
}
