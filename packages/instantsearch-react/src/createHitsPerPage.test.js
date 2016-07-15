/* eslint-env jest, jasmine */

jest.mock('algoliasearch-helper-provider/src/connect', () =>
  require.requireActual(
    '../__mocks__/algoliasearch-helper-provider/src/connect'
  )
);

import {AlgoliaSearchHelper} from 'algoliasearch-helper';
jest.unmock('algoliasearch-helper');

import createHitsPerPage from './createHitsPerPage';
jest.unmock('./createHitsPerPage');

describe('createHitsPerPage', () => {
  it('provides the correct props to the component', () => {
    createHitsPerPage(props => {
      expect(Object.keys(props).length).toBe(3);
      expect(props.hitsPerPage).toBe(666);
      expect(typeof props.refine).toBe('function');
      expect(props.helper).toEqual(jasmine.any(AlgoliaSearchHelper));
      return null;
    })({searchParameters: {hitsPerPage: 666}});
  });

  it('refines the hitsPerPage parameter', () => {
    const Dummy = () => null;
    const wrapper = createHitsPerPage(Dummy)({
      searchParameters: {hitsPerPage: 10},
    });
    const {helper, refine} = wrapper.find(Dummy).props();
    refine(100);
    expect(helper.getState().hitsPerPage).toBe(100);
    expect(helper.search.mock.calls.length).toBe(1);
  });
});
