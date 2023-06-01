// import { Injectable } from '@angular/core';
// import { MortgageData } from '../models/debts.model';

// @Injectable({
//     providedIn: 'root'
// })
// export class MortgageService {
//     constructor() { }

//     calculateMortgage(principal: number, annualInterestRate: number, years: number): MortgageData[] {
//         const monthlyInterestRate = annualInterestRate / 100 / 12;
//         const numberOfPayments = years * 12;

//         const denominator = Math.pow((1 + monthlyInterestRate), numberOfPayments) - 1;
//         const monthlyPayment = principal * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numberOfPayments) / denominator;

//         const results = [];
//         let balance = principal;
//         let annualInterestPayment = 0;
//         let annualPrincipalPayment = 0;
//         let totalPrincipalPayment = 0; // This will hold the accumulated amount

//         for (let i = 0; i < numberOfPayments; i++) {
//             const interestPayment = balance * monthlyInterestRate;
//             const principalPayment = monthlyPayment - interestPayment;
//             balance = balance - principalPayment;

//             annualInterestPayment += interestPayment;
//             annualPrincipalPayment += principalPayment;
//             totalPrincipalPayment += principalPayment; // Increment the accumulated amount

//             if (i % 12 === 11) { // al final de cada año
//                 results.push(new MortgageData(
//                     balance,
//                     annualInterestPayment,
//                     annualPrincipalPayment,
//                     (annualInterestPayment + annualPrincipalPayment),
//                     annualInterestRate,
//                     totalPrincipalPayment  // Increment the accumulated amount
//                 ));

//                 // reset annual accumulators
//                 annualInterestPayment = 0;
//                 annualPrincipalPayment = 0;
//             }
//         }

//         return results;
//     }







//     // generateMortgageData(mortgageAmount: number, interestRate: number, termInYears: number) {
//     //     const mortgageData = [];
//     //     let outstandingCapital = mortgageAmount;

//     //     interestRate = interestRate / 100; // Convertir a formato decimal

//     //     for (let i = 0; i < termInYears; i++) {
//     //         if (i === 0) {
//     //             outstandingCapital = mortgageAmount;
//     //         }

//     //         const installment = outstandingCapital * (Math.pow(1 + interestRate, termInYears - i + 1) * interestRate) / (Math.pow(1 + interestRate, termInYears - i + 1) - 1);
//     //         const interestsForTheYear = outstandingCapital * interestRate;
//     //         const amountAmortized = installment - interestsForTheYear;

//     //         if (i !== 0) {
//     //             outstandingCapital -= amountAmortized;
//     //         }

//     //         mortgageData.push({
//     //             year: i + 1,
//     //             outstandingCapital: outstandingCapital.toFixed(2),
//     //             interests: interestsForTheYear.toFixed(2),
//     //             amountAmortized: amountAmortized.toFixed(2),
//     //             installment: installment.toFixed(2),
//     //             interestRate: (interestRate * 100).toFixed(2)  // Convertir de vuelta a porcentaje para la salida
//     //         });
//     //     }
//     //     return mortgageData;

//     // }
// }