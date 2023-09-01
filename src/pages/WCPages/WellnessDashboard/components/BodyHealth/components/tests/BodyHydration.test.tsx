import {render} from '../../../../../../../utilities/test-utils';
import {BodyHydration} from '../BodyHydration.component';
import {
  bodyHealthComponentsProps,
  bodyHealthComponentsWithData,
} from '_mocks_/BodyHealth.mock';

describe('BodyHydration Component', () => {
  // eslint-disable-next-line max-len
  it('should render BodyHydration component with last recoded date when we have no data in current day', () => {
    const {getByText} = render(
      <BodyHydration {...bodyHealthComponentsProps} />,
    );
    const element = getByText('Last recorded 07/20/22');
    expect(element).toBeInTheDocument();
  });

  it('when the current state is day and we have empty all_data inside summary', () => {
    const {getByText} = render(
      <BodyHydration
        {...{...bodyHealthComponentsProps, summary: {all_data: {}}}}
      />,
    );
    const element = getByText('Last recorded 07/20/22');
    expect(element).toBeInTheDocument();
  });

  // eslint-disable-next-line max-len
  it('should render BodyHydration component when week tab is selected and data is present in that week', () => {
    const {getByTestId} = render(
      <BodyHydration {...bodyHealthComponentsWithData} />,
    );
    const element = getByTestId('body-hydration-graph');
    expect(element).toBeInTheDocument();
  });
});
