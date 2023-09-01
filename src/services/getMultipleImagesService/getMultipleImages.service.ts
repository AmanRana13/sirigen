import { API } from "globals/api";
import { IImagePayload } from "./getMultipleImages.types";
import { SENIOR_SERVICE_END_POINTS } from "globals/apiEndPoints";

/**
 * @function getMultipleImagesService
 * @description method to get multiple images 
 * @param {IImagePayload[]} data
 * @returns object of imageUrls: { [senior_id]: imageUrl }
 */
export async function getMultipleImagesService(data: IImagePayload[]): Promise<any> {
    try {
      const response = await API({
        url: SENIOR_SERVICE_END_POINTS.GET_MULTIPLE_IMAGES,
        method: 'post',
        data
      });
      return response.data
    } catch (error) {
      console.log(error);
      let errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    }
}