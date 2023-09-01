import {ResourceFormats} from 'globals/enums';
import {Nullable} from 'globals/global.types';
import _ from 'lodash';
import moment from 'moment';
import GoalActionMapModel from '../model/goalActionMapModel';
import GoalDataModel from '../model/goalDataModel';

export interface IGoalResource {
  resource_id: string;
  name: string;
  description: string;
  date: string;
  format: ResourceFormats;
  resource_version: string;
  created_by: string;
  last_updated_by: string;
  last_viewed: string;
}

interface IGoalDataResponse {
  goal: string;
  action: string;
  status: string;
  percentage: string;
  start_date: string;
  target_date: string;
  notes: string;
  goal_action_id: string;
  created_date: string[];
  resource: Nullable<IGoalResource[]>;
}
interface IGoalActionMapDataResponse {
  actions: string[];
  goal_name: string;
}

interface IGoalsActionParser {
  [goalName: string]: GoalActionMapModel;
}

class GoalsDataParser {
  protected goalsData: GoalDataModel[] = [];
  protected goalsActionMapData: IGoalsActionParser = {};

  parseGoalData(goalsResponseData: IGoalDataResponse[]): GoalDataModel[] {
    this.goalsData = goalsResponseData.map((responseItem) => {
      return new GoalDataModel(
        responseItem.resource,
        responseItem.goal_action_id,
        responseItem.goal,
        responseItem.action,
        responseItem.status,
        parseInt(responseItem.percentage || '0'),
        responseItem.start_date,
        responseItem.target_date,
        responseItem.notes,
        responseItem.created_date[0],
      );
    });

    this.goalsData = _.orderBy(
      this.goalsData,
      (o) => {
        return moment(o.createdDate).format('YYYYMMDD');
      },
      ['asc'],
    );

    return this.goalsData;
  }

  parseGoalActionMapData(
    goalActionMapResponse: IGoalActionMapDataResponse[],
  ): IGoalsActionParser {
    goalActionMapResponse.forEach((goalItem) => {
      goalItem.actions.forEach((actionItem) => {
        this.goalsActionMapData = {
          ...this.goalsActionMapData,
          [goalItem.goal_name]: {
            ...this.goalsActionMapData[goalItem.goal_name],
            goalName: goalItem.goal_name,
            occupied: false,
            rowIds: [],
            actions: {
              ...this.goalsActionMapData[goalItem.goal_name]?.actions,
              [actionItem]: {
                actionName: actionItem,
                selected: false,
                rowId: [],
              },
            },
          },
        };
      });
    });

    return this.goalsActionMapData;
  }
}

export default GoalsDataParser;
