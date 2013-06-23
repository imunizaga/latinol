/*global $: false */
/*global console: false */
/*global document: false */
/*global alert: false */
/*global window: false */
/*global navigator: false */

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
        'gue': 'ge',
        'gui': 'gi',
        'ge': 'je',
        'gi': 'ji',
        'll': 'y',
        'qa': 'ka',
        'que': 'ke',
        'qui': 'ki',
        'qo': 'ko',
        'qu': 'ku',
        'w': 'gu'
    };

    this.transcribe = function (text) {
        var searchValue, newValue, replace, self;
        self = this;

        replace = function (oldValue) {
            var newValue;

            newValue = self.rules[oldValue];
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
                text = text.replace(searchValue, replace);
            }
        }

        return text;
    };
};
