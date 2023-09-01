import { API_LOAD_STATE } from 'globals/global.constants';
import {fireEvent, render} from '../../utilities/test-utils';
import Table from './Table.component';
import { TableSelectionType } from 'globals/enums';
import { Box } from '@mui/material';

const mockHeaderData = [
    { columnId: 'name', label: 'Name'},
    { columnId: 'age', label: 'Age'},
    { columnId: 'post', label: 'Post'},
]

const mockData =  [
    { id: '1', name: 'Amar', age: 25, post: 'SDE 2' },
    { id: '2', name: 'Mohit', age: 26, post: 'TL' },
    { id: '3', name: 'Sridhar', age: 24, post: 'SDE 1' }
]

const mockRowData = {
    values: [
        { dataId: 'name' },
        { dataId: 'age' },
        { dataId: 'post' }
    ]
}

const mockRowDataRender = {
    values: [
        { dataId: 'name' },
        { dataId: 'age', render: (value: number) => <Box data-testid='render-test'>{value}</Box>},
        { dataId: 'post' }
    ]
}

describe('test Table Component', () => {
    test('should render Table', () => {
        const {getByTestId} = render(
            <Table headerData={[]} rowId='id' data={[]} rowData={{ values: []}}/>
        )
        const element = getByTestId('table-component');
        expect(element).toBeInTheDocument();
    })
    test('should render Loader if isDataLoading status is set to Progress', () => {
        const {getByTestId} = render(
            <Table
                headerData={[]} rowId='id' data={[]}
                rowData={{ values: []}} isDataLoading={API_LOAD_STATE.PROGRESS}
            />
        )
        const element = getByTestId('loader');
        expect(element).toBeInTheDocument();
    })
    test('should render Loader if isFilterLoading is set to True', () => {
        const {getByTestId} = render(
            <Table
                headerData={[]} rowId='id' data={[]}
                rowData={{ values: []}} isFilterLoading={true}
            />
        )
        const element = getByTestId('loader');
        expect(element).toBeInTheDocument();
    })
    test('should show default No Record Message when data is empty', () => {
        const {getByText} = render(
            <Table
                headerData={[]} rowId='id' data={[]}
                rowData={{ values: []}}
            />
        )
        const element = getByText(/No Record/i);
        expect(element).toBeInTheDocument()
    })
    test('should show custom No Record Message when data is empty & message is provided', () => {
        const {getByText} = render(
            <Table
                headerData={[]} rowId='id' data={[]}
                rowData={{ values: []}} noDataMessage='No Record Found'
            />
        )
        const element = getByText(/No Record Found/i);
        expect(element).toBeInTheDocument()
    })
    test('should Render Rows with data', () => {
        const {getAllByTestId} = render(
            <Table
                headerData={mockHeaderData} rowId='id' data={mockData}
                rowData={mockRowData} isDataLoading={API_LOAD_STATE.SUCCESSFUL}
            />
        )
        const rows = getAllByTestId('table-row');
        expect(rows).toHaveLength(3);
    })
    test('should Render SelectAll Button for SelectionType Multiple', () => {
        const mockFn = jest.fn();
        const {getByTestId} = render(
            <Table
                headerData={mockHeaderData} rowId='id' data={mockData}
                rowData={mockRowData} isDataLoading={API_LOAD_STATE.SUCCESSFUL}
                selectionType={TableSelectionType.MULTIPLE}
                onChangeSelected={mockFn}
            />
        )
        const selectAll = getByTestId('select-all');
        expect(selectAll).toBeInTheDocument();
        fireEvent.click(selectAll);
        expect(mockFn).toHaveBeenCalled();
    })
    test('should Run Select on row click for SelectionType Single', () => {
        const mockFn = jest.fn();
        const {getAllByTestId} = render(
            <Table
                headerData={mockHeaderData} rowId='id' data={mockData}
                rowData={mockRowData} isDataLoading={API_LOAD_STATE.SUCCESSFUL}
                selectionType={TableSelectionType.SINGLE}
                onChangeSelected={mockFn}
            />
        )
        const rows = getAllByTestId('table-row');
        rows.forEach((row) => {
            fireEvent.click(row);
        })
        expect(mockFn).toHaveBeenCalledTimes(3);
    })
    test('should Run Select on row click for SelectionType Multiple', () => {
        const mockFn = jest.fn();
        const {getAllByTestId} = render(
            <Table
                headerData={mockHeaderData} rowId='id' data={mockData}
                rowData={mockRowData} isDataLoading={API_LOAD_STATE.SUCCESSFUL}
                selectionType={TableSelectionType.MULTIPLE}
                onChangeSelected={mockFn}
            />
        )
        const rows = getAllByTestId('table-row');
        rows.forEach((row) => {
            fireEvent.click(row);
        })
        expect(mockFn).toHaveBeenCalledTimes(3);
    })
    test('should Render using render function when Provided', () => {
        const mockFn = jest.fn();
        const {getAllByTestId} = render(
            <Table
                headerData={mockHeaderData} rowId='id' data={mockData}
                rowData={mockRowDataRender} isDataLoading={API_LOAD_STATE.SUCCESSFUL}
                selectionType={TableSelectionType.SINGLE}
                onChangeSelected={mockFn}
            />
        )
        const rows = getAllByTestId('render-test');
        expect(rows).toHaveLength(3);
    })
});