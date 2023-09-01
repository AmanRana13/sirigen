import { IFields } from "store/uploadFilesReducer/uploadFiles.types";

class SignedUrlDataModel {
    url: string = '';
    fields: IFields = {};
    resourceId: string = '';
    constructor(
        url: string,
        fields: IFields,
        resourceId: string
    ) {
        this.url = url;
        this.fields = fields;
        this.resourceId = resourceId;
    }
}

export default SignedUrlDataModel;