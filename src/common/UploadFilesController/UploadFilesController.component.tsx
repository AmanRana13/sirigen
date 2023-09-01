import {IResource} from 'common/Dialogs/dialogComponents/Resources/ResourcesDialog.types';
import {ResourceFormats} from 'globals/enums';
import {getMBValueInBytes} from 'globals/global.functions';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {UploadFilesControllerProps} from './UploadFilesController.types';

const UploadFiles = (props: UploadFilesControllerProps) => {
  const {
    fileSize = getMBValueInBytes(15), // max allowed file size
    maxAllowedCount = 3, // maximum files allowed to upload in one go
    maxTotalCount = 10, // maximum total files allowed
    resources = [],
    isMultiple = false, // select single or multiple files
    form, // useState => state
    setForm, // useState => setState
    sizeErrorText = 'Max File Size Allowed is 15 MB',
    sameNameErrorText = 'Multiple Files with Same Name can not be selected',
    existingNameErrorText = 'Some filenames are similar to existing files.',
    fileTypeErrorText = 'Only PDF Files can be added',
    fileTypes = ['application/pdf'],
    component: RenderComponent, // ui component
    isDisabled,
  } = props;
  const existingFiles = useMemo(
    () => resources.filter((f: IResource) => f.format !== ResourceFormats.URL),
    [resources],
  );
  const totalCount = useMemo(() => existingFiles.length, [existingFiles]);
  const selectedFiles = useMemo(() => form.selectedFiles, [form.selectedFiles]);
  const setSelectedFiles = useCallback(
    (selectedFiles: any[]) => {
      setForm({
        ...form,
        selectedFiles,
      });
    },
    [setForm, form],
  );
  // total files that are remaining to upload
  const maxCount = useMemo(() => {
    const tempMax = maxTotalCount - totalCount;
    return tempMax > maxAllowedCount ? maxAllowedCount : tempMax;
  }, [maxTotalCount, totalCount, maxAllowedCount]);
  // remaining files out of total files that can be uploaded in this go
  const remainingCount = useMemo(() => maxCount - selectedFiles.length, [
    maxCount,
    selectedFiles,
  ]);
  // upload button is disabled?
  const disabled = useMemo(
    () => Boolean(remainingCount < 1 || form.isUploadDisabled),
    [remainingCount, form],
  );
  // warning that is shown when max allowed files are already in the list
  const totalCountError = useMemo(
    () =>
      totalCount >= maxTotalCount
        ? `Max ${maxTotalCount} PDF Already Uploaded.`
        : '',
    [maxTotalCount, totalCount],
  );
  // error that is shown when you try to select more than the allowed files
  const [countError, setCountError] = useState<string>('');
  // error that is shown when one of the files is larger than allowed size
  const [sizeError, setSizeError] = useState<string>('');
  // error that is shown when selected file name is same as one of existing files
  const [existingNameError, setExistingNameError] = useState<string>('');
  // error that is shown when multiple files with same name are selected
  const [sameNameError, setSameNameError] = useState<string>('');
  // updating errors in form
  const [fileTypeError, setFileTypeError] = useState<string>('');
  useEffect(() => {
    const newForm = {
      errors: totalCountError
        ? [totalCountError]
        : [
            ...(sizeError ? [sizeError] : []),
            ...(countError ? [countError] : []),
            ...(sameNameError ? [sameNameError] : []),
            ...(existingNameError ? [existingNameError] : []),
            ...(fileTypeError ? [fileTypeError] : []),
          ],
    };
    setForm((form: any) => ({
      ...form,
      ...newForm,
      isUploadError: sizeError || existingNameError,
      isUploadDisabled: totalCountError,
    }));
  }, [
    setForm,
    totalCountError,
    countError,
    sizeError,
    sameNameError,
    existingNameError,
    fileTypeError,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempCountError = false;
    let tempSameNameError = false;
    let tempFileTypeError = false;
    const tempSelected = e.target.files
      ? Array.from(e.target.files).filter((file: File) => {
          if (fileTypes.includes(file.type)) return true;
          else {
            tempFileTypeError = true;
            return false;
          }
        })
      : [];
    if (tempSelected.length > remainingCount) tempCountError = true;
    if (
      tempSelected.some((f: File) =>
        selectedFiles.some((ef: File) => ef.name === f.name),
      )
    )
      tempSameNameError = true;

    setFileTypeError(tempFileTypeError ? fileTypeErrorText : '');
    setSameNameError(tempSameNameError ? sameNameErrorText : '');
    setCountError(
      tempCountError ? `Max ${maxCount} pdf allowed at a time.` : '',
    );
    setSelectedFiles([
      ...selectedFiles,
      ...tempSelected
        .filter(
          (f: File) => !selectedFiles.some((ef: File) => ef.name === f.name),
        )
        .slice(0, remainingCount),
    ]);
  };

  const handleRemove = (i: number) => {
    const tempSelected = [
      ...selectedFiles.slice(0, i),
      ...selectedFiles.slice(i + 1),
    ];
    setSameNameError('');
    setCountError('');
    setFileTypeError('');
    setSelectedFiles(tempSelected);
  };

  // setting size error
  useEffect(() => {
    const isError = selectedFiles.some((f: File) => f.size > fileSize);
    setSizeError(isError ? sizeErrorText : '');
  }, [selectedFiles, fileSize, sizeErrorText]);

  // setting existing file name error
  useEffect(() => {
    const isError = selectedFiles.some((f: File) =>
      existingFiles.some((ef: IResource) => f.name === ef.name),
    );
    setExistingNameError(isError ? existingNameErrorText : '');
  }, [selectedFiles, existingFiles, existingNameErrorText]);

  return (
    <RenderComponent
      {...{
        isMultiple,
        isDisabled: disabled || isDisabled,
        handleChange,
        handleRemove,
        selectedFiles,
        fileSize,
        errors: form.errors,
        isUploadError: form.isUploadError,
        existingFiles,
      }}
    />
  );
};

export default UploadFiles;
