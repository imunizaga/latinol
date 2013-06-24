/*global $: false */
/*global console: false */
/*global document: false */
/*global alert: false */
/*global window: false */
/*global navigator: false */

/*global Latinol: false */
var App = function () {
    "use strict";
    this.latinol = new Latinol();

    this.initialize = function () {
        var self = this;
        $('#transcribe-btn').click(function () {
            self.transcribe();
            $('.trans').each(function () {
                var $this = $(this);
                $this.html(self.latinol.transcribe($this.html()));
            });
            this.transcribeIO('#description-input', '#description-output');
        });
        $('#input-text').keyup(function () {
            self.transcribeIO('#input-text', '#output-text', true);
        });

        this.transcribeIO('#input-text', '#output-text');
        this.transcribeIO('#description-input', '#description-output');
        this.transcribeIO('#examples-input', '#examples-output');
    };

    this.transcribeIO = function (inputId, outputId, isInput) {
        if (isInput) {
            $(outputId).val(this.latinol.transcribe($(inputId).val()));
        }
        $(outputId).html(this.latinol.transcribe($(inputId).html()));
    };
};

window.app = new App();
window.app.initialize();
