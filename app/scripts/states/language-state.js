import AbstractState from './abstract-state';

class LanguageState extends AbstractState {
    plCard = null;
    enCard = null;
    onEnter = null;

    preload() {
        super.preload();

        this.load.json('locale-en', './locale/en_EN.json');
        this.load.json('locale-pl', './locale/pl_PL.json');

        this.load.image('bg-language', './assets/graphics/backgrounds/bg-language.png');
        this.load.image('btn-pl', './assets/graphics/buttons/pl-flag.png');
        this.load.image('btn-en', './assets/graphics/buttons/usa-flag.png');
    }

    create() {
        this.add.image(0, 0, 'bg-language');

        this.plCard = this.add.button(150, 135, 'btn-pl', this._choosePolish, this);
        this.plCard.onInputOver.add(this._selectPolish, this);

        this.enCard = this.add.button(450, 135, 'btn-en', this._chooseEnglish, this);
        this.enCard.onInputOver.add(this._selectEnglish, this);

        // Default: select english language.
        this._selectEnglish();

        this._setupKeyboard();

        this.loadSoundPreferences();
    }

    _choosePolish() {
        ga('send', 'event', 'game', 'locale-pl');

        this.game.locale = this.cache.getJSON('locale-pl');
        this._next();
    }

    _chooseEnglish() {
        ga('send', 'event', 'game', 'locale-en');

        this.game.locale = this.cache.getJSON('locale-en');
        this._next();
    }

    _next() {
        this.state.start('Message', true, false, {
            body: this.game.locale.MESSAGE_STATE_WELCOME,
            lifetime: Phaser.Timer.SECOND * 5,
            cb: () => {
                this.game.state.start('Menu');
            }
        });
    }

    _setupKeyboard() {
        let left = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        let right = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        let enter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        // Stop the following keys from propagating up to the browser.
        this.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.ENTER
        ]);

        left.onDown.add(() => this._selectPolish());
        right.onDown.add(() => this._selectEnglish());
        enter.onDown.add(() => this.onEnter());
    }

    _selectPolish() {
        this.plCard.alpha = 1;
        this.enCard.alpha = 0.5;
        this.onEnter = this._choosePolish;
    }

    _selectEnglish() {
        this.plCard.alpha = 0.5;
        this.enCard.alpha = 1;
        this.onEnter = this._chooseEnglish;
    }
}

export default LanguageState;
