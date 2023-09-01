import SignedUrlDataModel from './signedUrlDataModel';

describe('test signedUrl data model', () => {
  test('types of signedUrl data model', () => {
    const signedUrlDataModel = new SignedUrlDataModel('', {}, '');
    expect(typeof signedUrlDataModel.resourceId).toBe('string');
  });
});
