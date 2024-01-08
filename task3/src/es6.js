"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    let [lastName, firstName] = fio.split(' ');
    return `${firstName} ${lastName}`;
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    return Array.from(new Set(array));
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
// присмотритесь к методу .reduce
function calculateSalaryDifference(array = []) {
    if (!array.length) return false;
    let max = array.reduce((max, num) => (max > num ? max : num));
    let min = array.reduce((min, num) => (min < num ? min : num));
    return max/min;
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
    constructor(){   
        this.dict = new Map();
    }

    set(key, value){
        if (typeof(key) !== 'string' || typeof(value) !== 'string') return false;
        this.dict.set(key, value);
        return true;
    }

    get(key){
        if (typeof(key) !== 'string' || !this.dict.has(key)) return false;
        return this.dict.get(key);
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};