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
            $('#output-text').val(this.latinol.transcribe($('#input-text').val()));
        });
        $('#input-text').keyup(function () {
            self.transcribe();
        });

        this.transcribe();

        $('#description-output').html(
            this.latinol.transcribe($('#description-input').html())
        );
    };

    this.transcribe = function () {
        $('#output-text').val(this.latinol.transcribe($('#input-text').val()));
    };
};

window.app = new App();
window.app.initialize();
