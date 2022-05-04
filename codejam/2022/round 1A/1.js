function logInstantly() {
    setTimeout(function log() {
        console.log('a');
    }, 0);
}
logInstantly();
console.log('b');
// В консоль будет выведено:
// b
// a




function _main() {

}

