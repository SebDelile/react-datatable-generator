import createEmotion from '@emotion/css/create-instance';
/**
 * Create an instance of emotion in order to avoid conflict if emotion is used within the host app.
 * @name emotion
 * @memberof utils
 */
export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache,
} = createEmotion({
  key: 'react-datatable-generator',
});
