import { fireEvent, render, waitFor } from "utilities/test-utils";
import { WellnessWrapper } from "./WellnessWrapper.component";

describe('Wellness Wrapper Component', () => {
    test('should render WellnessWrapper Component', () => {
        const {getByTestId} = render(<WellnessWrapper />);
        const element = getByTestId(/wellness-wrapper/i);
        expect(element).toBeInTheDocument();
    });
    test('should render DatePicker Component when currentState is day', () => {
        const {getByTestId} = render(<WellnessWrapper />, {
            initialState: {
                wellnessDashboard: {
                    currentState: 'day'
                }
            }
        });
        const element = getByTestId(/day-picker/i);
        expect(element).toBeInTheDocument();
    });
    test('should render WeekPicker Component when currentState is week', () => {
        const {getByTestId} = render(<WellnessWrapper />, {
            initialState: {
                wellnessDashboard: {
                    currentState: 'week'
                }
            }
        });
        const element = getByTestId(/week-picker/i);
        expect(element).toBeInTheDocument();
    });
    test('should render MonthPicker Component when currentState is month', () => {
        const {getByTestId} = render(<WellnessWrapper />, {
            initialState: {
                wellnessDashboard: {
                    currentState: 'month'
                }
            }
        });
        const element = getByTestId(/month-picker/i);
        expect(element).toBeInTheDocument();
    });
    test('should render MonthPicker Component after click on Month Button', async () => {
        const {getByTestId} = render(<WellnessWrapper />, {
            initialState: {
                wellnessDashboard: {
                    currentState: 'day'
                }
            }
        });
        const monthButton = getByTestId('month-button');
        fireEvent.click(monthButton);
        const element = await waitFor(() => getByTestId(/month-picker/i));
        expect(element).toBeInTheDocument();
    });
    test('should render WeekPicker Component after click on Week Button', async () => {
        const {getByTestId} = render(<WellnessWrapper />, {
            initialState: {
                wellnessDashboard: {
                    currentState: 'day'
                }
            }
        });
        const weekButton = getByTestId('week-button');
        fireEvent.click(weekButton);
        const element = await waitFor(() => getByTestId(/week-picker/i));
        expect(element).toBeInTheDocument();
    });
    test('should render DayPicker Component after click on Day Button', async () => {
        const {getByTestId} = render(<WellnessWrapper />, {
            initialState: {
                wellnessDashboard: {
                    currentState: 'month'
                }
            }
        });
        const weekButton = getByTestId('day-button');
        fireEvent.click(weekButton);
        const element = await waitFor(() => getByTestId(/day-picker/i));
        expect(element).toBeInTheDocument();
    });
});