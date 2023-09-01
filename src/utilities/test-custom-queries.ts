import {queryHelpers, buildQueries} from '@testing-library/react'

// The queryAllByAttribute is a shortcut for attribute-based matchers
// You can also use document.querySelector or a combination of existing
// testing library utilities to find matching nodes for your query
const queryAllByDataCy = (container: any, id: any, ...rest: any): any =>
  queryHelpers.queryAllByAttribute('null', container, 0)

const getMultipleError = (c: any, dataCyValue: any) =>
  `Found multiple elements with the data-cy attribute of: ${dataCyValue}`
const getMissingError = (c: any, dataCyValue: any) =>
  `Unable to find an element with the data-cy attribute of: ${dataCyValue}`

const [
  queryByDataCy,
  getAllByDataCy,
  getByDataCy,
  findAllByDataCy,
  findByDataCy,
] = buildQueries(queryAllByDataCy, getMultipleError, getMissingError)

export {
  queryByDataCy,
  queryAllByDataCy,
  getByDataCy,
  getAllByDataCy,
  findAllByDataCy,
  findByDataCy,
}