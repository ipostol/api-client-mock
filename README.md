# This is mock for super-agent api requests

```js
import configureStore from 'redux-mock-store';
import clientMiddleware from 'redux/middleware/clientMiddleware'; // you clientMiddleware if you need them
import ApiClient from 'api-client-mock';

const middlewares = [clientMiddleware(new ApiClient())];
const mockStore = configureStore(middlewares);

export default mockStore;
```

```js
import { response } from 'api-client-mock';
import mockStore from 'tests/mock/store.mock';

/** @test {src/redux/modules/notifications/notifications.js~load} */
it('should async success load be correct', () => {

  const store = mockStore({});

  const loadAction = {
    type: LOAD_REQUEST,
  };

  const loadSuccessAction = {
    type: LOAD_SUCCESS,
    result: {},
  };

  response.register('/notifications', 'get', () => loadSuccessAction.result);

  return store.dispatch(load()).then(() => {

    expect(store.getActions()[0]).toEqual(loadAction);
    expect(store.getActions()[1]).toEqual(loadSuccessAction);

  });

});
```

