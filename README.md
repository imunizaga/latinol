#Latiñol

## A javascript translator from spanish to latiñol

http://imunizaga.github.io/latinol/

## Usage

* Include latinol.js or latinol.min.js on your page.
* Create a new instance of the translator 

```
var latinol = new Latinol();
```

* Transcribe a paragraph of plain text

```
latinol.transcribe('some plain text');
```

That's it!

## Transcribe a hole page

Transcribe a hole page using the transcribePage method

```
latinol.transcribePage();
```

You can also transcribe an element by calling transcribeElement

```
latinol.transcribePage(document.findElementById('my-div'));
```
