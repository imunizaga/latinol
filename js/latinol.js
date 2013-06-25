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

    this.capitalizeAt=function(str, i) {
        return str.substr(0, i) + str[i].toUpperCase() + str.substr(i + 1);
    };

    this.rules = {
        'c([aourláóú])': 'k$1',
        'c([eiéí])': 's$1',
        'g([eiéí])': 'j$1',
        'gu([eiéí])': 'g$1',
        '([^cs]|^)h': '$1',
        'll': 'y',
        'qu([eiéí])': 'k$1',
        'ü': 'u',
        'q([aouáóú])': 'k$1',
        'w': 'gu',
        'y([^aeiouáóúéí]|$)': 'i$1'
    };

    this.transcribe = function (text) {
        var searchValue, replace, self, regExp, replaceRule;
        self = this;

        replace = function (oldValue) {
            var newValue = oldValue.replace(regExp, replaceRule), c;

            if (self.isCapital(oldValue[0])) {
                if (newValue[0]) {
                    newValue = self.capitalizeAt(newValue, 0);
                }
            }

            if (self.isCapital(oldValue[oldValue.length - 1])) {
                if (newValue[1]) {
                    newValue = self.capitalizeAt(newValue, 1);
                }
            }
            return newValue;
        };
 
        for (searchValue in this.rules ) {
            if (this.rules.hasOwnProperty(searchValue)) {
                regExp = new RegExp(searchValue, 'gi');
                replaceRule = this.rules[searchValue];
                text = text.replace(regExp, replace);
            }
        }

        return text;
    };
};
