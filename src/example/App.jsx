import Datatable from '../lib/index.jsx';
import { extendedHeadingsSample } from '../lib/mocks/extendedHeadingsSample.js';
import { extendedDataSample } from '../lib/mocks/extendedDataSample.js';

const App = () => (
  <>
    <h1>Datatable in action !</h1>
    <Datatable
      headings={extendedHeadingsSample}
      data={extendedDataSample}
      itemsPerPageOption={[5, 10, 25, 100]}
      isScrollable={false}
    />
  </>
);

export default App;
