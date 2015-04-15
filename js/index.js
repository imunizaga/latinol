/*global $: false */
/*global console: false */
/*global document: false */
/*global alert: false */
/*global window: false */
/*global navigator: false */

/*global Latinol: false */
var App = function() {
  'use strict';
  this.latinol = new Latinol();
  this.textWarehouse = [];
  this.currentLanguage = 'es';

  this.initialize = function() {
    var self = this, i;
    $('#transcribe-btn').click(function() {
      var dimOnTimeout, el, text, textContainer;

      dimOnTimeout = function(el) {
        setTimeout(function() {el.toggleClass('dim highlight');}, 10);
        setTimeout(function() {el.removeClass('dim');}, 1010);
      };

      if (self.textWarehouse.length === 0) {
        $('.trans').each(function() {
          var $this = $(this);
          self.textWarehouse.push({
            el: $this,
            text: $this.html()
          });
        });
      }

      if (self.currentLanguage === 'es') {
        self.currentLanguage = 'la';
      } else {
        self.currentLanguage = 'es';
      }

      for (i = 0; i < self.textWarehouse.length; i += 1) {
        textContainer = self.textWarehouse[i];
        el = textContainer.el;
        text = textContainer.text;

        if (self.currentLanguage === 'es') {
          el.html(self.latinol.transcribe(text));
        } else {
          el.html(text);
        }
        el.addClass('highlight');
        dimOnTimeout(el);
      }
    });

    $('#input-text').keyup(function() {
      self.transcribeIO('#input-text', '#output-text', true);
    });

    $('#input-text').keyup(function() {
      self.transcribeIO('#input-text', '#output-text', true);
    });
    $('#input-text').click(function() {
      this.focus();
      this.select();
    });

    this.transcribeIO('#input-text', '#output-text');
    this.transcribeIO('#description-input', '#description-output');
    this.transcribeIO('#examples-input', '#examples-output');
    this.transcribeIO('#arguments-input', '#arguments-output');
    this.transcribeIO('#rules-input', '#rules-output');
  };

  this.transcribeIO = function(inputId, outputId, isInput) {
    if (isInput) {
      $(outputId).val(this.latinol.transcribe($(inputId).val()));
    }
    $(outputId).html(this.latinol.transcribe($(inputId).html()));
  };
};


(function() {
  'use strict';

  window.app = new App();
  window.app.initialize();
}());
