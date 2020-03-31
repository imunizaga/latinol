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

  var inputTextSelector = '#input-text';

  this.initialize = function() {
    var _this = this;
    var i;

    $('#transcribe-btn').click(function() {
      var dimOnTimeout;
      var el;
      var text;
      var textContainer;

      dimOnTimeout = function(el) {
        setTimeout(function() {el.toggleClass('dim highlight');}, 10);

        setTimeout(function() {el.removeClass('dim');}, 1010);
      };

      if (_this.textWarehouse.length === 0) {
        $('.trans').each(function() {
          var $this = $(this);
          _this.textWarehouse.push({
            el: $this,
            text: $this.html()
          });
        });
      }

      if (_this.currentLanguage === 'es') {
        _this.currentLanguage = 'la';
      } else {
        _this.currentLanguage = 'es';
      }

      for (i = 0; i < _this.textWarehouse.length; i += 1) {
        textContainer = _this.textWarehouse[i];
        el = textContainer.el;
        text = textContainer.text;

        if (_this.currentLanguage === 'es') {
          el.html(_this.latinol.transcribe(text));
        } else {
          el.html(text);
        }

        el.addClass('highlight');
        dimOnTimeout(el);
      }
    });

    var text = (new URLSearchParams(window.location.search)).get('text');
    if (text) {
      $(inputTextSelector).val(text);
    }

    $(inputTextSelector).keyup(function() {
      _this.transcribeIO(inputTextSelector, '#output-text', true);
    });

    $(inputTextSelector).keyup(function() {
      _this.transcribeIO(inputTextSelector, '#output-text', true);
    });

    $(inputTextSelector).click(function() {
      this.focus();
      this.select();
    });

    this.transcribeIO(inputTextSelector, '#output-text', true);
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
