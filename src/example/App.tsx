import Datatable from '../lib/index';
import { extendedHeadingsSample } from '../lib/mocks/extendedHeadingsSample';
import { extendedDataSample } from '../lib/mocks/extendedDataSample';

const App = ():JSX.Element => (
  <>
    <h1>Datatable in action !</h1>
    <Datatable
      headings={extendedHeadingsSample}
      data={extendedDataSample}
      itemsPerPageOption={[5, 10, 25, 100]}
      isScrollable={false}
      customStyle={customStyle}
    />
  </>
);

export default App;

const customStyle = {};
