import {render, screen} from '../../utilities/test-utils';
import {SleepDurationGraph} from './SleepDurationGraph';
const sleepMonthGraph={avgSleepTime: 24662,
    avgTimeInBed: 27883,
    totalSleepTime: [{
    0: {x: '05/01', y: null, z: '05/01/22'},
    1: {x: '05/02', y: null, z: '05/02/22'},
    }],
    totalTimeInBed: [{
    0: {x: '05/01', y: null, z: '05/01/22'},
    1: {x: '05/02', y: null, z: '05/02/22'}
    }]
   }
describe('SleepDurationGraph Component', () => {
  test('should render SleepDurationGraph component', () => {
    render(<SleepDurationGraph sleepMonthGraph={sleepMonthGraph}/>)
    const element=screen.getByText('Hrs')
expect(element).toBeTruthy()  });
});