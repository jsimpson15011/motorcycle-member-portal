import * as actions from './actions';
import * as constants from './constants';
import reducer from './reducer';
import * as selectors from './selectors';

const system = { actions, constants, reducer, selectors };

export default system;