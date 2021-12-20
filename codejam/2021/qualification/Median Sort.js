const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let T = -1, N = 0, Q = 0;
let state = 0;
rl.on('line', function (line) {
    if (state === 0) {
        [T, N, Q] = line.split(' ').map((v) => +v);
        state = 1;
    }

    if (state === 1) {
        state = 2;
        initModel();
        makeMove();
        return;
    }

    if (line === '-1') {
        rl.close();
        return;
    }

    if (line === '1' && state === 3) {
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

const Model = {};
function initModel() {
    Model.nums = [];
    for (let i = 1 ; i <= N; i++) {
        Model.nums.push(i);
    }
    Model.first = 1;
    Model.second = 2;
    Model.left = {
        nums: [],
        parent: Model,
        name: 'left',
        isDone: false
    };
    Model.middle = {
        nums: [],
        parent: Model,
        name: 'middle',
        isDone: false
    };
    Model.right = {
        nums: [],
        parent: Model,
        name: 'right',
        isDone: false
    };
    Model.part = Model;
    Model.parts = 3;
    Model.done = 0;
}

function makeMove() {
    let part = Model.part;
    while (part.nums.length < 2) {
        if (!part.isDone) {
            part.isDone = true;
            Model.done++;
        }
        if (Model.parts === Model.done) {
            const answer = getAnswer(Model);
            state = 3;
            console.log(answer);
            return;
        }
        let parent = part.parent;
        switch (part.name) {
            case 'left':
                part = parent.middle;
                break;
            case 'middle':
                part = parent.right;
                break;
            default:
                part = parent;
                break;
        }
    }

    if (!part.first) {
        switch (part.name) {
            case 'left':
                Model.part = part;
                console.log(`${part.nums[0]} ${part.nums[1]} ${part.parent.first}`);
                return;
            case 'middle':
                Model.part = part;
                console.log(`${part.nums[0]} ${part.nums[1]} ${part.parent.first}`);
                return;
            default:
                Model.part = part;
                console.log(`${part.nums[0]} ${part.nums[1]} ${part.parent.second}`);
                return;
        }
    }
    const childrenLength = part.left.nums.length + part.middle.nums.length + part.right.nums.length;
    if (part.nums.length - 2 > childrenLength) {
        Model.part = part;
        const val = part.nums[childrenLength + 2];
        console.log(`${val} ${part.first} ${part.second}`);
        return;
    }

    while (!part.isDone && part.right && part.right.isDone) {
        part.isDone = true;
        Model.done++;
        if (part.parent) {
            part = part.parent;
        }
        if (Model.parts === Model.done) {
            const answer = getAnswer(Model);
            state = 3;
            console.log(answer);
            return;
        }
    }

    if (!part.left.isDone) {
        part = part.left;
    } else if (!part.middle.isDone) {
        part = part.middle;
    } else {
        part = part.right;
    }

    Model.part = part;
    makeMove();
}

function changeModel(line) {
    let part = Model.part;

    if (!part.first) {
        switch (part.name) {
            case 'left':
                if (+line === part.nums[0]) {
                    part.first = part.nums[1];
                    part.second = part.nums[0];
                } else {
                    part.first = part.nums[0];
                    part.second = part.nums[1];
                }
                break;
            case 'middle':
                if (+line === part.nums[0]) {
                    part.first = part.nums[0];
                    part.second = part.nums[1];
                } else {
                    part.first = part.nums[1];
                    part.second = part.nums[0];
                }
                break;
            default:
                if (+line === part.nums[0]) {
                    part.first = part.nums[0];
                    part.second = part.nums[1];
                } else {
                    part.first = part.nums[1];
                    part.second = part.nums[0];
                }
                break;
        }
        part.left = {
            nums: [],
            parent: part,
            name: 'left',
            isDone: false
        }
        part.middle = {
            nums: [],
            parent: part,
            name: 'middle',
            isDone: false
        };
        part.right = {
            nums: [],
            parent: part,
            name: 'right',
            isDone: false
        }
        Model.parts += 3;
        return;
    }

    const childrenLength = part.left.nums.length + part.middle.nums.length + part.right.nums.length;
    if (part.nums.length - 2 > childrenLength) {
        const val = part.nums[childrenLength + 2];
        if (+line === val) {
            part.middle.nums.push(val);
        } else if (part.first === +line) {
            part.left.nums.push(val);
        } else {
            part.right.nums.push(val);
        }
        return;
    }
}

function getAnswer(node) {
    if (node.nums.length < 2) {
        return node.nums.join(' ');
    }

    return `${node.left.nums.length ? getAnswer(node.left) + ' ' : ''}${node.first}${node.middle.nums.length ? ' ' + getAnswer(node.middle) + ' ': ' '}${node.second}${node.right.nums.length ? ' ' + getAnswer(node.right) : ''}`;
}
