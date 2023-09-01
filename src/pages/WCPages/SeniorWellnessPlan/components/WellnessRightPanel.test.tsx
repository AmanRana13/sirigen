import {render, fireEvent, screen} from '../../../utilities/test-utils';
import WellnessRightPanel from './WellnessRightPanel.component'

describe('WellnessRightPanel', () => {
    test('should render member Priority card in WellnessRightPanel', async () => {
      render(<WellnessRightPanel name='memberPriority' item={[]} updateItem={jest.fn()} cardTitle='Member Priorities' buttonLabel='Add Priorities' inputPlaceholder='Please Enter Priorities here' />);
      const element = screen.queryByTestId(/wellnessRightPanel/i);
      expect(element).toBeTruthy();
    });
    test('should render add priority button in member Priority card on WellnessRightPanel', async () => {
        const updateItem=jest.fn()
        render(<WellnessRightPanel name='memberPriority' item={[]} updateItem={updateItem} cardTitle='Member Priorities' buttonLabel='Add Priorities' inputPlaceholder='Please Enter Priorities here' />);
        const element = screen.getByRole('button', {name: /Add Priorities/i});
       await fireEvent.click(element)
        expect(updateItem).toHaveBeenCalledTimes(1);
      });
      test('should render  member Priority input field on WellnessRightPanel', async () => {
        const updateItem=jest.fn()
        render(<WellnessRightPanel name='memberPriority' item={["priority"]} updateItem={updateItem} cardTitle='Member Priorities' buttonLabel='Add Priorities' inputPlaceholder='Please Enter Priorities here' />);
        const element = screen.getByPlaceholderText('Please Enter Priorities here');
       fireEvent.change(element, {target: {value: 'priority'}});
        
        expect(updateItem).toHaveBeenCalledTimes(1);
      });
      test('should render delete priority button in member Priority card on WellnessRightPanel', async () => {
        const updateItem=jest.fn()
        render(<WellnessRightPanel name='memberPriority' item={["priority"]} updateItem={updateItem} cardTitle='Member Priorities' buttonLabel='Add Priorities' inputPlaceholder='Please Enter Priorities here' />);
        const element = screen.getByTestId(/handleRemove/i);
       await fireEvent.click(element)
        expect(updateItem).toHaveBeenCalledTimes(1);
      });
  });