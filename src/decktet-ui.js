var _ = require('lodash'),
    Decktet = require('decktet-utils')

window.onload = function() {

	var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '',
		{ preload: preload, create: create });

	// grupo que contem todas as cartas em jogo
	var allCards;

	// todos os botoes da interface
	var buttons = [];

	// modo atual (movendo ou virando)
	var mode = "move";

	function preload () {
		game.load.image('background', 'img/bg-green.jpg');
		game.load.atlasXML('buttons', 'img/buttons/sprites.png', 'img/buttons/sprites.xml');
		game.load.atlasXML('cards', 'img/cards/sheet.png', 'img/cards/sheet.xml');
	}

	function create() {
		addBackground();
		addUiButtons();

		// copia a lista de todas as cartas e embaralha.
		var deck = _.cloneDeep(Decktet.Cards);
		Decktet.shuffle(deck);

		// PhaserGroup que ira conter todas as cartas
		allCards = game.add.group();

		deck.forEach(function(card) {
			// Cria uma sprite para cada carta.
			var frameName = Decktet.cardName(card).toLowerCase() + '.png';
			var cardSprite = allCards.create(64, 88, 'cards', frameName);
			cardSprite.anchor.setTo(0.5, 0.5);
			cardSprite.height = 176;
			cardSprite.width = 128;

			// inicialmente em modo "moving"
			cardSprite.inputEnabled = true;
			cardSprite.input.enableDrag(false, true);
			cardSprite.input.enableSnap(16, 16, true, true);

			// registra esta funcao para ser executada sempre que a carta for clicada
			cardSprite.events.onInputDown.add(onCardClick);
		});
	}

	function addBackground() {
		// centraliza o background
		var bg = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
		bg.anchor.setTo(0.5, 0.5);

		// ajusta a escala para que cubra a tela inteira, mantendo o aspect ratio
		var scaleX = game.width / bg.width;
		var scaleY = game.height / bg.height;
		var max = Math.max( scaleX, scaleY );
		bg.scale.setTo( max, max );
	}

	function addUiButtons() {
		addButton( 'tap', onBtnTapClick );
		addButton( 'move', onBtnMoveClick );
		updateAllButtonsState(); // inicialmente 'move'

		// ajusta o layout e tamanho dos botoes, colocando-os no lado direito
		// da pagina e um embaixo do outro.
		var padding = 10;
		var size = 60;
		var top = padding;
		buttons.forEach(function(btn) {
			btn.height = size;
			btn.width = size;
			btn.x = game.width - padding - size;
			btn.y = top;
			top += size;
		});
	}

	function updateAllButtonsState() {
		// ajusta a imagem de cada botao de acordo com o modo atual
		buttons.forEach(function(btn) {
			// over, out, down
			var base = _.camelCase('btn-' + btn.mode);
			if ( mode == btn.mode )
				btn.setFrames( base + 'Over.png', base + 'On.png', base + 'Off.png' );
			else
				btn.setFrames( base + 'Over.png', base + 'Off.png', base + 'On.png' );
		});
	}

	// adiciona um botao na lista. cada botao guarda o "modo" que ele ativa
	// e a funcao de callback quando eh clicado.
	function addButton( name, callback ) {
		var btn = game.add.button(0,0, 'buttons', callback, this );
		btn.mode = name;
		buttons.push(btn);
	}

	// quando o botao 'tap' for clicado, ajusta o modo e desabilita o drag.
	// Observe que o comportamento de virar esta na funcao 'onCardClick' que
	// executa sempre, mas so faz efeito se mode=tap.
	function onBtnTapClick() {
		mode = "tap";
		updateAllButtonsState();
		allCards.forEach(function(card) {
			card.input.disableDrag();
		});
	}

	// quando o botao 'move' for clicado, ajusta o modo e habilita o drag.
	function onBtnMoveClick() {
		mode = "move";
		updateAllButtonsState();
		allCards.forEach(function(card) {
			card.input.enableDrag(false, true);
		});
	}

	// executa sempre que o user clica em uma carta. Mas so modifica o angulo
	// se o modo atual for 'tap'.
	function onCardClick(sprite) {
		if ( mode == "tap" ) {
			sprite.angle += 90;
		}
	}

};
