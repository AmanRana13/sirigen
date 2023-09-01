import {render} from '../utilities/test-utils';
import useAutoComplete from './useAutoComplete';

function setup(args: any) {
  const returnVal = {}

  function TestComponent() {
    Object.assign(returnVal, useAutoComplete({autocompleteConfig: args}))
    return null
  }
  render(<TestComponent />)
  return returnVal
}

describe('useAutoComplete', () => {
  it('should render with default initial values', () => {
    const fn = jest.fn();

    const useAutoCompleteMockProps = {
      autocompleteConfig: {
        autocompleteOptions: {},
        initialInputValue: 'ab',
        inputRef: {
          current: {
            value: 'ab',
            addEventListener: fn,
            removeEventListener: fn,
          },
        },
        onChange: fn,
      },
    };

    const data = setup(useAutoCompleteMockProps.autocompleteConfig)

    expect(data).toBeTruthy();
  });
});
