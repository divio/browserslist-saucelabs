// jshint esnext: true
import browserslist from 'browserslist';
export default (browsers = browserslist()) => {
    console.log(browsers);
    return browsers;
};
