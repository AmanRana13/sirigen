import { IResource } from "common/Dialogs/dialogComponents/Resources/ResourcesDialog.types";

export interface UploadFileUIProps {
    isMultiple: boolean;
    isDisabled: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemove: (i: number) => void;
    selectedFiles: File[];
    fileSize: number;
    errors: string[];
    existingFiles: IResource[];
    isUploadError: boolean;
}

export interface UploadFilesControllerProps {
    fileSize?: number;
    maxAllowedCount?: number;
    maxTotalCount?: number;
    resources: IResource[];
    isMultiple?: boolean;
    form: any;
    setForm: (state: any) => void;
    sizeErrorText?: string;
    sameNameErrorText?: string;
    existingNameErrorText?: string;
    fileTypes?: string[];
    fileTypeErrorText?: string;
    component: (props: UploadFileUIProps) => any;
    isDisabled: boolean;
}