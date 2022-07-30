function People() {
    this.type = "people"
}

People.prototype.getPeopleType = function () {
    return this.type;
}

function ChinesePeople() {
    this.chineseType = "chinesePeople";
}

ChinesePeople.prototype = new People();

ChinesePeople.prototype.getChinesePeopleType = function () {
    return this.chineseType
}
let instance = new ChinesePeople();

console.log(Object.prototype.isPrototypeOf(instance)) // true
console.log(People.prototype.isPrototypeOf(instance)) // true
console.log(ChinesePeople.prototype.isPrototypeOf(instance)) // true


