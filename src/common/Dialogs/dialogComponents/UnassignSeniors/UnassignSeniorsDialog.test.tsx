import { DIALOG_TYPES } from 'globals/global.constants';
import { render } from 'utilities/test-utils';
import UnassignSeniorsDialog from './UnassignSeniorsDialog';

const mockData = {
  "userId": "admin-f7827e1b57dc41bf8c6e02c4e0322e40",
  "employeeId": "emp01",
  "name": {
      "firstName": "Berkhaa",
      "lastName": "Choudhary",
      "middleName": null
  },
  "email": "barkhachoudhary94@gmail.commm",
  "phone": "9636986599",
  "extension": "0000",
  "accessRole": "admin",
  "isFirstLogin": false,
  "location": {
      "zipcode": "33035",
      "state": "Florida",
      "city": "Homestead",
      "street": null,
      "timezone": "America/New_York"
  },
  "shift": "overnight",
  "timezone": "America/New_York",
  "assigned": [
      {
          "account_id": "eca704eab09b4494b2994df86fcb61d4",
          "user_id": "senior-058e51b98e2a426e81f1826cb0b21bfb"
      },
      {
          "account_id": "9db8899d0447488cb8c7b14aea396fbf",
          "user_id": "senior-8189fb851e4f4b07bbd9683303fd676e"
      },
      {
          "account_id": "c110256b65aa4dfe9b44b5b56f9f1b88",
          "user_id": "senior-b3dc9160da534fa997a4b2cc8cf8d5ce"
      },
      {
          "account_id": "57961a40e3554804b72654268c922d6c",
          "user_id": "senior-d2a05d2366894ed79216eb69b7fbc5a2"
      },
      {
          "account_id": "fa84eee6802e4f5dbea882354ea93ce4",
          "user_id": "senior-29effeb91ed94450ab90520cba72d5dc"
      },
      {
          "account_id": "5be8070c6bde46958bf3817959418a46",
          "user_id": "senior-7e39f8c1d9394f76ac037be7bafc8b82"
      },
      {
          "account_id": "dbb9662058c9437d9a5314ee9ca8ef88",
          "user_id": "senior-b2630ac27a3544ecba64dec243435f34"
      },
      {
          "account_id": "461e7d7e91f546b3b4c387f7327b2a9b",
          "user_id": "senior-f699f4be4e7d4ab8a7e7462a782ab708"
      },
      {
          "account_id": "041f8ac1588c4feba7ae4d819db49caf",
          "user_id": "senior-673769518bfa4a5698fa934a9727a259"
      },
      {
          "account_id": "c6a795e1ea364854921b6cf489b9eb6d",
          "user_id": "senior-d6552d164b2643338699825db2dedcff"
      },
      {
          "account_id": "55b84763e65d4af28f54a73e751ef02a",
          "user_id": "senior-06b991943d744c019793a6cab858941b"
      },
      {
          "account_id": "80694ba9dccc4300b6d8ac55e205c65f",
          "user_id": "senior-18ade4934e3048d4ac60c2fc9b2c261e"
      },
      {
          "account_id": "b8ae8f7098d54c2a8b72e9e77d2fd16e",
          "user_id": "senior-39f816cb6c1e4d36a10af3c86fca6440"
      },
      {
          "account_id": "9ff6ca141bf8420384fb78093d242d2e",
          "user_id": "senior-7ac753d5fcb74716a98d96d6cd521b55"
      },
      {
          "account_id": "a1144da28aae4df3a3537e55d00b5f69",
          "user_id": "senior-159add1e48d343d29e5cd5b31f3a9a4c"
      },
      {
          "account_id": "5f4dfef9263b433081042ade3eec0f35",
          "user_id": "senior-d6574b2dc0cb4e358994baec55cf07be"
      },
      {
          "account_id": "ee5d6b81c0d84aa9b4eca38bf9bc189d",
          "user_id": "senior-d79c9cd57b6a4c00ac7cdd753650d1df"
      },
      {
          "account_id": "2859a5cf439e4a30be6d9ce511234d2e",
          "user_id": "senior-d92b22d563b64dc4afda31d6db177ce7"
      },
      {
          "account_id": "eb532e68682e4cf7a33ad9c511b89f8e",
          "user_id": "senior-0be214a8cb074a3a8a68c078f00fab94"
      },
      {
          "account_id": "402caa5bc15541679a30ce4f7b92c455",
          "user_id": "senior-f0481a13810941a2b6db978baabeb8f9"
      }
  ]
}

describe('UnassignSeniorsDialog', () => {
  test('should render UnassignSeniorsDialog', () => {
    const { getByTestId } = render(<UnassignSeniorsDialog />, {
      initialState: {
        common: {
          dialog: {
            isOpen: true,
            type: DIALOG_TYPES.ASSIGN_WELLNESS_COACH,
            data: mockData
          },
          seniorList: {
            data: [],
            lastEvaluatedKey: '',
            searchLastEvaluatedKey: '',
            loading: false,
            totalRows: 0,
            currentPage: 1,
          },
        },
      },
    });
    const element = getByTestId(/UnassignSeniorsDialog/i);
    expect(element).toBeInTheDocument();
  });

  test('should render UnassignSeniorsDialog Cancel Button', () => {
    const { getByTestId, queryByTestId } = render(<UnassignSeniorsDialog />, {
      initialState: {
        common: {
          dialog: {
            isOpen: true,
            type: DIALOG_TYPES.ASSIGN_WELLNESS_COACH,
            data: mockData
          },
          seniorList: {
            data: [],
            lastEvaluatedKey: '',
            searchLastEvaluatedKey: '',
            loading: false,
            totalRows: 0,
            currentPage: 1,
          },
        },
      },
    });
    const cancel = getByTestId(/UnassignSeniorsCancel/i);
    expect(cancel).toBeInTheDocument();
  })

  test('should render UnassignSeniorsDialog Unassign Button', () => {
    const { getByTestId } = render(<UnassignSeniorsDialog />, {
      initialState: {
        common: {
          dialog: {
            isOpen: true,
            type: DIALOG_TYPES.ASSIGN_WELLNESS_COACH,
            data: mockData
          },
          seniorList: {
            data: [],
            lastEvaluatedKey: '',
            searchLastEvaluatedKey: '',
            loading: false,
            totalRows: 0,
            currentPage: 1,
          },
        },
      },
    });
    const assign = getByTestId(/UnassignSeniorsUnassign/i);
    expect(assign).toBeInTheDocument();
  })
});