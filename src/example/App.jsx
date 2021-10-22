import Datatable from '../lib';
import { labelSample } from './labelSample';
import { userSample } from './userSample';

const App = () => (
  <>
    <h1>Datatable in action !</h1>
    <Datatable headings={labelSample} data={userSample} />
  </>
);

export default App;
