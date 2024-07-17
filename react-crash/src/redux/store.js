import { legacy_createStore as createStore} from "redux";
import { rootReducer } from '/src/redux/reducer.js';

const store = createStore(rootReducer);

export default store;
