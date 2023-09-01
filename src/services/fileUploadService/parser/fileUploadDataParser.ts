import { IFields } from "store/uploadFilesReducer/uploadFiles.types";
import SignedUrlDataModel from "../model/signedUrlDataModel";

export interface ISignedUrlDataResponse {
    [resourceId: string]: {
        url: string;
        fields: IFields;
    }
}

class FileUploadDataParser {
    protected signedUrlData: SignedUrlDataModel[] = [];
    parseSignedUrlData(signedUrlDataResponse: ISignedUrlDataResponse): SignedUrlDataModel[] {
        const parsedData: SignedUrlDataModel[] = Object.keys(signedUrlDataResponse).map(
            (resourceId: string) => {
                return {
                    ...signedUrlDataResponse[resourceId],
                    resourceId
                }
            })
        this.signedUrlData = parsedData;
        return this.signedUrlData;
    }
}

export default FileUploadDataParser;