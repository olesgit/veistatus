import configureStore from './configureStore';
import InitialState from '../reducers/initialState';

const store=configureStore(InitialState);

export default store;