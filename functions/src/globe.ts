/* declaration is necessary for glob to be recognized in index.js */
declare module '*.glob' {
    import * as glob from 'glob'
    export default glob
}
declare module 'lodash' {
    import * as lodash from 'lodash'
    export default lodash
}
