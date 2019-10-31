export default class Tenant {
    name: string;
    currentHappiness: number;

    negativeHappinessFactors: string[];
    positiveHappinessFactors: string[];

    constructor(name: string) {
        this.name = name;
    }
    greet() {
        return `${this.name} says hello.`
    }
}