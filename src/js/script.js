"use strict";
// @@include('_alert.js')
const output = document.getElementById('output');

const del = document.getElementById('del');
const clear = document.getElementById('clear');

const ops = document.querySelectorAll('.ops');
const nums = document.querySelectorAll('.num');
const equals = document.getElementById('equals');

let result = null;
let theNumb = ''; // активное число
let oldNumb = ''; // число в памяти
let operator; // текущий оператор

function setNumb() {
    if(theNumb.length >= 18){
        theNumb.substr(0, 18);
    } else {
        theNumb += this.getAttribute('data-num');
        output.value = theNumb;
    }
}

function moveNumb() {
    const currentOperator = this.getAttribute('data-ops');

    if (operator === currentOperator) {
        calc();
    } else {
        if (oldNumb === '') {
            oldNumb = theNumb;
        }
        theNumb = '';
    }

    operator = currentOperator;
}

function strInNumb() {
    oldNumb = Number(oldNumb);
    theNumb = Number(theNumb);
}

function clearAll() {
    theNumb = '';
    oldNumb = '';
    output.value = '';
}

function deleteSymbol() {
    theNumb = theNumb.slice(0, -1);
    output.value = theNumb;
}

function operations() {
    strInNumb();

    if (operator === 'plus') {
        result = oldNumb + theNumb
    } else if (operator === 'minus') {
        result = oldNumb - theNumb
    } else if (operator === 'times') {
        result = oldNumb * theNumb
    } else if (operator === 'divide') {
        result = oldNumb / theNumb
    }  else if (operator === 'percent') {
        result = oldNumb * (theNumb / 100)
    }

    return result;
}

function calc() {
    const result = operations();

    oldNumb = result;
    output.value = parseFloat(result);
}

nums.forEach(num =>{
    num.addEventListener('click', setNumb)
});
del.addEventListener('click', deleteSymbol);
clear.addEventListener('click', clearAll);
ops.forEach(op => {
    op.addEventListener('click', moveNumb)
});
equals.addEventListener('click', calc);

