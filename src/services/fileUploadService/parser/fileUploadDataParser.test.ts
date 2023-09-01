import FileUploadDataParser from './fileUploadDataParser';

describe('fileUploadData  parser', () => {
  test('test fileUploadData parser', () => {
    const data = {
      '123': {
        url: '',
        fields: {},
      },
    };

    const mockResult = [
      {
        url: '',
        fields: {},
        resourceId: '123',
      },
    ];

    const fileUploadDataParser = new FileUploadDataParser();
    const fileUploadData = fileUploadDataParser.parseSignedUrlData(data);
    expect(fileUploadData).toEqual(mockResult);
  });
});
