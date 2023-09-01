import {IResource} from 'common/Dialogs/dialogComponents/Resources/ResourcesDialog.types';
import {Nullable} from 'globals/global.types';
import {IGoalResource} from '../parser/goalsDataParser';

class GoalDataModel {
  resource: IResource[];
  id: string = '';
  goal: string = '';
  action: string = '';
  status: string = '';
  progress: number = 0;
  startDate: string = '';
  targetDate: string = '';
  notes: string = '';
  createdDate: string = '';
  constructor(
    resource: Nullable<IGoalResource[]>,
    id: string = '',
    goal: string = '',
    action: string = '',
    status: string = '',
    progress: number = 0,
    startDate: string = '',
    targetDate: string = '',
    notes: string = '',
    createdDate: string = '',
  ) {
    if (resource) {
      this.resource = resource.map((r: IGoalResource) => ({
        resourceId: r.resource_id,
        name: r.name,
        description: r.description,
        date: r.date,
        format: r.format,
        resourceVersion: r.resource_version,
        createdBy: r.created_by,
        lastUpdatedBy: r.last_updated_by,
        lastViewed: r.last_viewed
      }));
    } else {
      this.resource = [];
    }
    this.id = id;
    this.goal = goal;
    this.action = action;
    this.status = status;
    this.progress = progress;
    this.startDate = startDate;
    this.targetDate = targetDate;
    this.notes = notes;
    this.createdDate = createdDate;
  }
}

export default GoalDataModel;
