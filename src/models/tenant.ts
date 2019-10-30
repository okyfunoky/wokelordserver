export default class Tenant {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    greet() {
        return `${this.name} says hello.`
    }
}