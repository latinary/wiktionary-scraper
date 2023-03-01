import { describe, expect, it } from '@jest/globals';
import * as regex from '../src/util/regex';

describe('regex', () => {
    it('removes parentheses', () => {
        expect(regex.removeParentheses('Hello (world!)!')).toBe('Hello!');
    });

    it('extracts conjugation/declension', () => {
        expect(JSON.stringify(regex.extractConjugationOrDeclension("first/second declension verb")))
            .toEqual(JSON.stringify({
                number: [ 'first', 'second' ],
                type: 'declension'
            }));
        
        expect(JSON.stringify(regex.extractConjugationOrDeclension("first/second-declension verb")))
            .toEqual(JSON.stringify({
                number: [ 'first', 'second' ],
                type: 'declension'
            }));
        
        expect(JSON.stringify(regex.extractConjugationOrDeclension(
                "pedō m (genitive pedōnis); third declension (Late Latin)"
            )))
            .toEqual(JSON.stringify({
                number: ['third'],
                type: 'declension'
            }));
        
        expect(JSON.stringify(regex.extractConjugationOrDeclension(
                "abstrūdō (present infinitive abstrūdere, perfect active abstrūsī, supine abstrūsum); third conjugation"
            )))
            .toEqual(JSON.stringify({
                number: ['third'],
                type: 'conjugation'
            }));

        expect(regex.extractConjugationOrDeclension("no conjugation/declension")).toBe(null);
    });

    it('removes the conjugation/declension', () => {
        expect(regex.removeConjugationOrDeclension(
                "pedō m (genitive pedōnis); first/second-declension (Late Latin)"
            ))
            .toEqual("pedō m (genitive pedōnis) (Late Latin)");
    });

    it('extracts the gender', () => {
        expect(regex.extractGender('pedō m (genitive pedōnis); first/second-declension (Late Latin)'))
            .toEqual('masculinum');

        expect(regex.extractGender("abstrūdō (present infinitive abstrūdere, perfect active abstrūsī, supine abstrūsum); third conjugation"))
            .toEqual('-');

        expect(regex.extractGender("acatus f (genitive acatī); second declension"))
            .toEqual('femininum');

        expect(regex.extractGender("bellum n (genitive bellī); second declension"))
            .toEqual('neutrum');
    });

    it('removes the gender', () => {
        expect(regex.removeGender("pedō m (genitive pedōnis); first/second-declension (Late Latin)"))
            .toEqual("pedō (genitive pedōnis); first/second-declension (Late Latin)");
    });

    it('removes all useless information', () => {
        expect(regex.removeAll("abstrūdō (present infinitive abstrūdere, perfect active abstrūsī, supine abstrūsum); third conjugation"))
            .toEqual("abstrūdō");
        
        expect(regex.removeAll("pedō m (genitive pedōnis); first/second-declension (Late Latin)"))
            .toEqual("pedō");
    });
});