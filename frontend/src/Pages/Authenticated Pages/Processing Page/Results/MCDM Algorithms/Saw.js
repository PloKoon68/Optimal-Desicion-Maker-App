class McdmMethods {
    constructor() {
    }

    normalize(decisionMatrix, isBeneficial) {
        // This method should be overridden in subclasses
        throw new Error('Method "normalize" should be overridden in subclasses');
    }

    calculate(decisionMatrix, criteriaValues, isBeneficial, weightsCalculationMethod) {
        // This method should be overridden in subclasses
        throw new Error('Method "calculate" should be overridden in subclasses');
    }
}

export default class SAW extends McdmMethods {
    

    normalize(decisionMatrix, isBeneficial) {
        let normalizedMatrix = new Array(decisionMatrix.length).fill().map(() => new Array(decisionMatrix[0].length));
        for (let j = 0; j < decisionMatrix[0].length; j++) {
            let min = Infinity;
            let max = -Infinity;

            for (let i = 0; i < decisionMatrix.length; i++) {
                if (decisionMatrix[i][j] > max) {
                    max = decisionMatrix[i][j];
                }
                if (decisionMatrix[i][j] < min) {
                    min = decisionMatrix[i][j];
                }
            }
            for (let i = 0; i < decisionMatrix.length; i++) {
                if (isBeneficial[j]) {
                    normalizedMatrix[i][j] = decisionMatrix[i][j] / max;
                } else {
                    normalizedMatrix[i][j] = min / decisionMatrix[i][j];
                }
            }
        }
        return normalizedMatrix;
    }

    multiplyWithWeights(normalizedMatrix, weights) {
        let weightedMultiplicationMatrix = new Array(normalizedMatrix.length).fill().map(() => new Array(normalizedMatrix[0].length));
        for (let i = 0; i < normalizedMatrix.length; i++) {
            for (let j = 0; j < normalizedMatrix[0].length; j++) {
                weightedMultiplicationMatrix[i][j] = normalizedMatrix[i][j] * weights[j];
            }
        }
        return weightedMultiplicationMatrix;
    }

    summationOfCriterias(weightedMultiplicationMatrix) {
        let alternativesScores = new Array(weightedMultiplicationMatrix.length);
        for (let i = 0; i < weightedMultiplicationMatrix.length; i++) {
            let sum = 0;
            for (let j = 0; j < weightedMultiplicationMatrix[0].length; j++) {
                sum += weightedMultiplicationMatrix[i][j];
            }
            alternativesScores[i] = sum;
        }
        return alternativesScores;
    }

    sortingAlternatives(alternativesScores) {
        let sortedAlternatives = alternativesScores.slice().sort((a, b) => b - a);
        return sortedAlternatives;
    }

    calculate(decisionMatrix, criteriaValues, isBeneficial, weightsCalculationMethod) {
        // Assuming AHP.weightCalculation is a static method in AHP class
        let weights = AHP.weightCalculation(criteriaValues, weightsCalculationMethod);

        let normalizedMatrix = this.normalize(decisionMatrix, isBeneficial);
        console.log("norm:Ç ", normalizedMatrix)
        let weightedMultiplicationMatrix = this.multiplyWithWeights(normalizedMatrix, weights);
        let alternativesScores = this.summationOfCriterias(weightedMultiplicationMatrix);
        //let sortedAlternatives = this.sortingAlternatives(alternativesScores);

        return alternativesScores;
    }
}

// Assuming AHP is defined elsewhere with a static weightCalculation method
class AHP {
    static weightCalculation(criteriaValues, weightsCalculationMethod) {
        // Implement weight calculation based on criteriaValues and weightsCalculationMethod
        // This is a placeholder function
        return criteriaValues;  // Example placeholder logic
    }
}


/*
// Example usage
let decisionMatrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
let isBeneficial = [true, false, true];
let saw = new SAW(decisionMatrix, isBeneficial);
let criteriaValues = [0.3, 0.5, 0.2];
let weightsCalculationMethod = 'someMethod';
let result = saw.calculate(criteriaValues, isBeneficial, weightsCalculationMethod);
console.log(result);
*/