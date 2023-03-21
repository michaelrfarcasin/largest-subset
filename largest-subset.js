'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


/*
 * Complete the 'maxSubsetSum' function below.
 *
 * The function is expected to return a LONG_INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY k as parameter.
 */

function maxSubsetSum(k) {
    let sums = [];
    k.forEach((element) => {
        let factors = getFactors(element);
        sums.push(sumArray(factors));
    });

    return sums;
}

function getFactors(n) {
    if (n <= 1) {
        return [1];
    }
    if (n <= 3) {
        return [1, n];
    }
    let factors = [];
    let squareRoot = Math.sqrt(n);
    for (let i = 1; i < squareRoot; i++) {
        if (n % i == 0) {
            factors.push(i);
        }
    }
    factors.forEach((factor) => {
        factors.push(n / factor);
    });
    if (n % squareRoot == 0) {
        factors.push(squareRoot);
    }
    
    return factors;
}

function sumArray(values) {
    return values.reduce((a, b) => a + b, 0);
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const kCount = parseInt(readLine().trim(), 10);

    let k = [];

    for (let i = 0; i < kCount; i++) {
        const kItem = parseInt(readLine().trim(), 10);
        k.push(kItem);
    }

    const result = maxSubsetSum(k);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
