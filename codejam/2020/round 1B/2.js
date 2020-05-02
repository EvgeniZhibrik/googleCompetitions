var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let T = -1, B = 0, A = 0;
var state = 0;
rl.on('line', function (line) {
    if (state === 0) {
        [T, A, B] = line.split(' ').map((v) => +v);
        state = 1;
    }

    if (state === 1) {
        initModel();
        makeMove();
        state = 2;
        return;
    }

    if (line === 'WRONG') {
        rl.close();
        return;
    }

    if (line === 'CENTER') {
        T--;
        state = 1;
    } else {
        changeModel(line);
        makeMove();
    }

    if (T === 0) {
        rl.close();
    }

    if (state === 1) {
        initModel();
        makeMove();
        state = 2;
    }
}).on('close', function () {
    process.exit(0);
});

var Model = {};
function initModel() {
    Model.move = 0;
    Model.state = 0;
    Model.point = null;
    Model.lastMove = null;
}

function makeMove() {
    if (Model.state === 0) {
        switch (Model.move) {
            case 0:
                console.log('0 0');
                Model.lastMove = [0, 0];
                Model.move++;
                break;
            case 1:
                console.log('-500000000 500000000');
                Model.lastMove = [-500000000, 500000000];
                Model.move++;
                break;
            case 2:
                console.log('500000000 500000000');
                Model.lastMove = [500000000, 500000000];
                Model.move++;
                break;
            case 3:
                console.log('500000000 -500000000');
                Model.lastMove = [500000000, -500000000];
                Model.move++;
                break;
            case 4:
                console.log('-500000000 -500000000');
                Model.lastMove = [-500000000, -500000000];
                Model.move++;
                break;
        }
        return;
    }

    if (Model.state === 1) {
        let min = Model.edges.right.min;
        let max = Model.edges.right.max;
        let val = Math.floor((min + max) / 2);
        console.log(`${val} ${Model.point[1]}`);
        Model.lastMove = [val, Model.point[1]];
        return;
    }

    if (Model.state === 2) {
        let min = Model.edges.left.min;
        let max = Model.edges.left.max;
        let val = Math.floor((min + max) / 2);
        console.log(`${val} ${Model.point[1]}`);
        Model.lastMove = [val, Model.point[1]];
        return;
    }

    if (Model.state === 3) {
        let min = Model.edges.top.min;
        let max = Model.edges.top.max;
        let val = Math.floor((min + max) / 2);
        console.log(`${Model.point[0]} ${val}`);
        Model.lastMove = [Model.point[0], val];
        return;
    }

    if (Model.state === 4) {
        let min = Model.edges.bottom.min;
        let max = Model.edges.bottom.max;
        let val = Math.floor((min + max) / 2);
        console.log(`${Model.point[0]} ${val}`);
        Model.lastMove = [Model.point[0], val];
        return;
    }

    if (Model.state === 5) {
        switch (Model.submit) {
            case 0:
                console.log(`${Math.floor(Model.x)} ${Math.floor(Model.y)}`);
                Model.submit++;
                break;
            case 1:
                console.log(`${Math.floor(Model.x)} ${Math.ceil(Model.y)}`);
                Model.submit++;
                break;
            case 2:
                console.log(`${Math.ceil(Model.x)} ${Math.floor(Model.y)}`);
                Model.submit++;
                break;
            case 3:
                console.log(`${Math.ceil(Model.x)} ${Math.ceil(Model.y)}`);
                Model.submit++;
                break;
        }
    }
}

function changeModel(line) {
    if (Model.state === 0) {
        if (line === 'HIT') {
            Model.state++;
            Model.point = Model.lastMove;
            Model.edges = {
                right: {
                    min: Model.lastMove[0],
                    max: 1000000000
                },
                left: {
                    min: -1000000000,
                    max: Model.lastMove[0]
                },
                top: {
                    min: Model.lastMove[1],
                    max: 1000000000
                },
                bottom: {
                    min: -1000000000,
                    max: Model.lastMove[1]
                }
            };
            return;
        }
    }

    if (Model.state === 1) {
        if (line === 'HIT') {
            Model.edges.right.min = Model.lastMove[0];
        } else {
            Model.edges.right.max = Model.lastMove[0];
        }

        if (Model.edges.right.min === Model.edges.right.max - 1) {
            Model.edges.right = Model.edges.right.min;
            Model.state++;
        }
        return;
    }

    if (Model.state === 2) {
        if (line === 'HIT') {
            Model.edges.left.max = Model.lastMove[0];
        } else {
            Model.edges.left.min = Model.lastMove[0];
        }

        if (Model.edges.left.min === Model.edges.left.max - 1) {
            Model.edges.left = Model.edges.left.max;
            Model.state++;
        }
        return;
    }

    if (Model.state === 3) {
        if (line === 'HIT') {
            Model.edges.top.min = Model.lastMove[1];
        } else {
            Model.edges.top.max = Model.lastMove[1];
        }

        if (Model.edges.top.min === Model.edges.top.max - 1) {
            Model.edges.top = Model.edges.top.min;
            Model.state++;
        }
        return;
    }

    if (Model.state === 4) {
        if (line === 'HIT') {
            Model.edges.bottom.max = Model.lastMove[1];
        } else {
            Model.edges.bottom.min = Model.lastMove[1];
        }

        if (Model.edges.bottom.min === Model.edges.bottom.max - 1) {
            Model.edges.bottom = Model.edges.bottom.max;
            Model.x = (Model.edges.right + Model.edges.left) / 2;
            Model.y = (Model.edges.top + Model.edges.bottom) / 2;
            Model.submit = 0;
            Model.state++;
        }
        return;
    }
}
