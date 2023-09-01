import {getCareInsightHistoryService} from 'services/careInsightService/insightSummary.service';
import {IGetInsightsPayload} from './SeniorCareInsight.state';

export const getCareInsightHistory = (params: IGetInsightsPayload) => async () => {
  return await getCareInsightHistoryService(params);
};
