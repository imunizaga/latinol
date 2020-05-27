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
    'xc?': 'ks',
    'cc([eiéí])': 'ks$1',
    'c([aouráóú])': 'k$1',
    'cl([aouráóú])': 'kl$1',
    '([aeiouáóúéí])c([^h])': '$1k$2',
    'c([eiéí])': 's$1',
    'g([eiéí])': 'j$1',
    'gu([eiéí])': 'g$1',
    '\\b([^cs]|^)?h(\\S|$)': '$1$2',
    'll': 'y',
    'qu([eiéí])': 'k$1',
    'ü': 'u',
    'q([aouáóú])': 'k$1',
    'w([aeiouáóúéí])': 'gu$1',
    'y([^aeiouáóúéí]|$)': 'i$1'
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

  this.walk = function(node) {
    // Source: http://is.gd/mwZp7E

    var child;
    var next;

    if (this.ignoreTags[node.tagName]) {
      return;
    }

    switch (node.nodeType) {
      case 1:  // Element
        if (node.titl) {
          node.title = this.transcribe(node.title);
        }

        if (node.placeholder) {
          node.placeholder = this.transcribe(node.placeholder);
        }

      case 9:  // Document
      case 11: // Document fragment
        child = node.firstChild;
        while (child) {
          next = child.nextSibling;
          this.walk(child);
          child = next;
        }

        break;

      case 3: // Text node
        node.nodeValue = this.transcribe(node.nodeValue);
        break;
    }
  };

  this.transcribePage = function() {
    var _this = this;
    setTimeout(function() {
      _this.walk(document.body);
    }, 1000);
  };
};
