let isDebug = true;
let console = {
    log() {
        //console.log('=============',arguments);
        isDebug ? window.console.log.apply(this, arguments) : '';
    },
    info() {
        isDebug ? window.console.info.apply(this, arguments) : '';
    },
    error() {
        isDebug ? window.console.error.apply(this, arguments) : '';
    }

}
export {
    console
}