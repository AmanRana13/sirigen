import { ResourceFormats } from 'globals/enums';
import moment from 'moment';
import { IInitialState, INewFilesData,
    IResource, IUploadFilesForm } from './ResourcesDialog.types';
import { IResourcesDialogData } from 'pages/WCPages/SeniorWellnessPlan/SeniorWellnessPlan.types';
import { generateUniqueId } from 'globals/global.functions';
import { DATE_FORMAT_YEAR, REGEX } from 'globals/global.constants';


/**
   * @description utility function to add selected file or url to list
   * @param {IResourcesDialogData} data the data for resourcesDialog Component
   * @param {IInitialState} state the state for resourceDialog Component
   * @param {IUploadFilesForm} form the form state for UploadFiles Controller Component
   * @returns an object containing resourcesRowsData and NewFilesData
*/
export const addToListHandler = (
    data: IResourcesDialogData, state: IInitialState, form: IUploadFilesForm
) => {
    const {selectedFiles, url} = form;
    const date = moment(new Date()).format(DATE_FORMAT_YEAR);
    let resourcesRowsData: IResource[] = [];
    let newFilesData: INewFilesData[] = [];
    selectedFiles.forEach((resource: File) => {
        const uid = generateUniqueId();
        const resourceId = `${uid}/${resource.name}`
        resourcesRowsData.push({
          resourceId,
          name: resource.name,
          format: ResourceFormats.PDF,
          description: '',
          date,
          resourceVersion: data.currentVersion,
          createdBy: data.fullName,
          lastUpdatedBy: data.fullName,
          lastViewed: null,
        })
        newFilesData.push({
          resourceId,
          file: resource
        });
      }
    )
    const uid = generateUniqueId();
    if (url.length) {
      resourcesRowsData = [
        ...resourcesRowsData,
        {
          resourceId: uid,
          name: !REGEX.URL.test(url) ? 'https://' + url : url,
          format: ResourceFormats.URL,
          description: '',
          date,
          resourceVersion: data.currentVersion,
          createdBy: data.fullName,
          lastUpdatedBy: data.fullName,
          lastViewed: null,
        }
      ]
    }
    return {
        resourcesRowsData: [...resourcesRowsData, ...state.resourcesRowsData],
        newFilesData: [...state.newFilesData, ...newFilesData]
    }
  };

/**
   * @description utility function to remove resources from list
   * @param {string} resourceId the unique resourceId of the resource to be deleted
   * @param {IInitialState} state the state for resourceDialog Component
   * @returns an object contatining resourcesRowsData, newFilesData and deleteRowsData
*/
export const removeHandler = (resourceId: string, state: IInitialState) => {
    let {resourcesRowsData, newFilesData, deleteRowsData} = state;
    let isOldFile = true;
    // if file is old, then it is added to deleteRowsData
    // so that it can be deleted using delete api lateron
    resourcesRowsData = resourcesRowsData.filter(
      // removing deleted resource from resourcesRowsData
      (resource: IResource) => {
        if (resource.resourceId === resourceId) {
          newFilesData = newFilesData.filter(
            // removing deleted resource from newFilesData
            (newResource: INewFilesData) => { 
              if (newResource.resourceId === resourceId) {
                // setting isOldFile false, if the deletedFile exists in newFileData
                isOldFile = false;
                return false;
              } else {
                return true
              }
            }
          );
          return false;
        }
        else return true;
      });
    // adding deleted file that is old to deleteRowsData
    if (isOldFile) {
      deleteRowsData = [...deleteRowsData, resourceId];
    }
    return {
        resourcesRowsData,
        newFilesData,
        deleteRowsData
    }
}

/**
   * @description utility function to remove resources from list
   * @param {string} resourceId the unique resourceId of the resource to be deleted
   * @param {string} description the new value of description field
   * @param {IInitialState} state the state for resourceDialog Component
   * @param {string} fullName the Full Name of current user who is updating the data
   * @returns an object contatining updated resourcesRowsData
*/
export const updateHandler = (resourceId: string, description: string,
  state: IInitialState, fullName: string) => {
    const resourcesRowsData = state.resourcesRowsData.map(
        (resource: IResource) => {
            if (resource.resourceId === resourceId) {
                return {
                    ...resource,
                    lastUpdatedBy: fullName,
                    description
                }
            }
            return resource
        }
    )
    return { resourcesRowsData };
}