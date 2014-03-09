# decktet-ui-simple.js

### Simple HTML5 Decktet Board

This project provides a "playing board" of Decktet cards. The board starts
out with one copy of the Basic Decktet on the top left. The user may move
cards around and rotate them 90 degrees.

A demo should be accessible here:

http://www.joseventura.com.br/games/decktet/decktet-ui-simple

This project is intended as a simple starting point for other browser-based
Decktet games.

### Dependencies

Note: I have not yet decided on a dependency manager such as Bower. For now,
this project includes only the Javascript source files and assets (images).

The HTML file in particular expects my other project, <code>decktet-utils</code>,
to be checked out in a sibling folder:

	/work
		/decktet-utils
		/decktet-ui-simple

To test, just start a web server with a root folder at <code>/work</code> or
above, and browse to <code>http://localhost/path/to/work/decktet-ui-simple/index.html</code>.

### Phaser.js

This project uses Phaser.js (http://phaser.io/) to draw sprites and handle
input events.