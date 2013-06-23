/*global $: false */
/*global console: false */
/*global document: false */
/*global alert: false */
/*global window: false */
/*global navigator: false */

/*global XRegExp: false */

var Latinol = function () {
    "use strict";

    this.isCapital = function (letter) {
        return letter === letter.toUpperCase();
    };

    this.rules = {
        'ca': 'ka',
        'ce': 'se',
        'ci': 'si',
        'co': 'ko',
        'cu': 'ku',
        'cr': 'kr',
        'cl': 'kl',
        'gue': 'ge',
        'gui': 'gi',
        'ge': 'je',
        'gi': 'ji',
        '([^cs])h': '$1',
        'y([^aeiou])': 'i$1',
        '^h': '',
        'll': 'y',
        'qa': 'ka',
        'que': 'ke',
        'qui': 'ki',
        'qo': 'ko',
        'qu': 'ku',
        'w': 'gu'
    };

    this.transcribe = function (text) {
        var searchValue, replace, self, regExp, replaceRule;
        self = this;

        replace = function (oldValue) {
            var newValue = oldValue.replace(regExp, replaceRule);

            if (self.isCapital(oldValue[0])) {
                newValue[0] = newValue[0].toUpperCase();
            }

            if (self.isCapital(oldValue[oldValue.length - 1])) {
                newValue[1] = newValue[1].toUpperCase();
            }
            return newValue;
        };
 
        for (searchValue in this.rules ) {
            if (this.rules.hasOwnProperty(searchValue)) {
                regExp = new XRegExp(searchValue, 'gi');
                replaceRule = this.rules[searchValue];
                text = text.replace(regExp, replace);
            }
        }

        return text;
    };
};
