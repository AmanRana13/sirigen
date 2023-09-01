import APIMocks from './index';
import doctorMock from './doctor.mock.json';
describe('test api mock data', () => {
  test('doctor api data', () => {
    const doctorMockData = APIMocks.doctor;
    expect(doctorMockData).toBe(doctorMock);
  });
});
