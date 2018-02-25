import sinon from 'sinon';
import { runSaga } from 'redux-saga';

import { ComicApi } from '../../../src/api/ComicApi';
import { loadLatestComicAndGetItsId, loadNextComicsIfUnderLimitSaga } from '../../../src/redux/sagas/comic_loading/ComicLoadingSagas';

const mockComic = '{"month": "2", "num": 1959, "link": "", "year": "2018", "news": "", "safe_title": "The Simpsons", "transcript": "", "alt": "In-universe, Bart Simpson and Harry Potter were the same age in 1990. Bart is perpetually 10 years old because of a spell put on his town by someone trying to keep him from getting his Hogwarts letter.", "img": "https://imgs.xkcd.com/comics/the_simpsons.png", "title": "The Simpsons", "day": "23"}';

describe('Comic loading saga tests', () => {
  beforeAll(() => {
    sinon.stub(ComicApi, 'fetchComic').returns(JSON.parse(mockComic));
  });

  describe('load latest comic', () => {
    it('shouldLoadLatestComicAndGetItsId', async () => {
      // GIVEN
      const dispatched = [];

      // WHEN
      const result = await runSaga({
        dispatch: action => dispatched.push(action),
        getState: () => ({}),
      }, loadLatestComicAndGetItsId, []).done;

      // THEN
      expect(result).toEqual(1959);
    });
  });

  describe('load next comics list', () => {
    const createComicList = function (comicCount) {
      const expectedNewComicList = [];
      for (let i = 0; i < comicCount; i++) {
        expectedNewComicList.push(JSON.parse(mockComic));
      }
      return expectedNewComicList;
    };

    const assembleExpectedDispatchList = function () {
      const expectedDispatch = [{
        payload: null,
        type: 'START_REFRESHING',
      }];

      const expectedNewComicList = createComicList(10);

      expectedDispatch.push({
        payload: expectedNewComicList,
        type: 'ADD_TO_COMIC_LIST',
      });

      expectedDispatch.push({
        payload: 1959,
        type: 'SET_LAST_LOADED_COMIC_ID',
      });

      expectedDispatch.push({
        payload: null,
        type: 'STOP_REFRESHING',
      });
      return expectedDispatch;
    };

    it('shouldloadNextComicsIfUnderLimitSaga', async () => {
      // GIVEN
      const dispatched = [];
      const givenComicList = createComicList(49);

      // WHEN
      const result = await runSaga({
        dispatch: action => dispatched.push(action),
        getState: () => ({ comics: { comicList: givenComicList } }),
      }, loadNextComicsIfUnderLimitSaga).done;

      // THEN
      const expectedDispatch = assembleExpectedDispatchList();

      expect(dispatched).toEqual(expectedDispatch);
    });

    it('shouldNotloadNextComicsIfUnderLimitSaga', async () => {
      // GIVEN
      const dispatched = [];
      const givenComicList = createComicList(50);

      // WHEN
      const result = await runSaga({
        dispatch: action => dispatched.push(action),
        getState: () => ({ comics: { comicList: givenComicList } }),
      }, loadNextComicsIfUnderLimitSaga).done;

      // THEN
      expect(dispatched).toEqual([]);
    });
  });
});
