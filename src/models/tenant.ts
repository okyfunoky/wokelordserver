export default class Tenant {
    name: string;
    currentHappiness: number;

    negativeHappinessFactors: string[];
    positiveHappinessFactors: string[];

    constructor() {
        this.currentHappiness = 50;
    }
}