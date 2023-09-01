import { commonStateData } from '_mocks_/commonMocks';
import {render, screen} from '../../../../../utilities/test-utils';
import {SeniorsPersona} from '../SeniorsPersona.component'
const mockedData={basicInfo:commonStateData.seniorDetail.basicInfo,persona:[]}
describe('senior persona component',()=>{
    test('should render senior persona component',()=>{
        render(<SeniorsPersona seniorInfoData={mockedData}
            setValue={jest.fn()}
            register={jest.fn()}
            isProfileCreated={false}/>)

const element=screen.getByText(`Senior's Persona`)
expect(element).toBeInTheDocument()
    })
})