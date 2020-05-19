/*global $: false */
/*global console: false */
/*global document: false */
/*global alert: false */
/*global window: false */
/*global navigator: false */

var Latinol = function() {
    'use strict';

    this.isCapital = function(letter) {
        return letter === letter.toUpperCase();
    };

    this.capitalizeAt = function(str, i) {
        return str.substr(0, i) + str[i].toUpperCase() + str.substr(i + 1);
    };

    this.rules = {
        'c([aouráóú])': 'k$1',
        'cl([aouráóú])': 'kl$1',
        'c([eiéí])': 's$1',
        'g([eiéí])': 'j$1',
        'gu([eiéí])': 'g$1',
        '\\b([^cs]|^)?h(\\S|$)': '$1$2',
        'll': 'y',
        'qu([eiéí])': 'k$1',
        'ü': 'u',
        'q([aouáóú])': 'k$1',
        'w': 'gu',
        'y([^aeiouáóúéí]|$)': 'i$1',
        'x': 'ks'
    };

    this.transcribe = function(text) {
        var searchValue, replace, self, regExp, replaceRule;
        self = this;

        replace = function(oldValue) {
            var newValue = oldValue.replace(regExp, replaceRule);

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

        for (searchValue in this.rules) {
            if (this.rules.hasOwnProperty(searchValue)) {
                regExp = new RegExp(searchValue, 'gi');
                replaceRule = this.rules[searchValue];
                text = text.replace(regExp, replace);
            }
        }

        return text;
    };

    this.ignoreTags = {
      'IFRAME': true,
      'IMAGE': true,
      'INPUT': true,
      'LINK': true,
      'META': true,
      'SCRIPT': true,
      'STYLE': true,
      'NOSCRIPT': true
    };

    this.transcribePage = function() {
      var i;

      for (i = 0; i < document.children.length; i += 1) {
        this.transcribeElement(document.children[i]);
      }
    };

    this.transcribeElement = function(el) {
      var i;

      if (!el.innerHTML) {
        return;
      }

      if (this.ignoreTags[el.tagName]) {
        return;
      }

      if (!el.children.length && el.innerHTML) {
        el.innerHTML = this.transcribe(el.innerHTML);
        return;
      }

      for (i = 0; i < el.children.length; i += 1) {
        this.transcribeElement(el.children[i]);
      }
    };
};
