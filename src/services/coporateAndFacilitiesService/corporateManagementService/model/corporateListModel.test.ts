import CorporateListModel from './corporateListModel';
describe('test corporate list model', () => {
  test('types of corporate list model', () => {
    const corporateListModel = new CorporateListModel(
      '',
      '',
      '',
      10,
      10,
      10,
      10,
      10,
    );
    expect(typeof corporateListModel.totalAdmins).toBe('number');
  });
});
