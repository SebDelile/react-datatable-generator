import { css } from '../../utils/style/emotion';

const styleSheet = () => ({
  table: css({
    gridArea: 'table',
    borderCollapse: 'collapse',
    width: '100%',
    display: 'table',
    overflow: 'hidden',
    borderSpacing: 0,
  }),
  tableBlock: css({
    overflowX: 'auto',
    display: 'block',
  }),
});

export default styleSheet;
