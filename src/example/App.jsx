import Datatable from '../lib/index.jsx';
import { labelSample } from './labelSample';
import { userSample } from './userSample';

const App = () => (
  <>
    <h1>Datatable in action !</h1>
    <Datatable headings={labelSample} data={userSample} />
  </>
);

export default App;
