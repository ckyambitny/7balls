import Utilities from '../../common/utilities';
import FightState from './fight-state';

class TrainingState extends FightState {
    lifetime = null;
    cb = null;
    sound = {
        jump: null,

        weakkick: null,
        weakpunch: null,

        mediumkick: null,
        mediumpunch: null,

        strongkick: null,
        strongpunch: null
    };
    options = {
        player: {
            hp: null,
            exp: null,
            lvl: null
        }
    };

    init({ lifetime, cb }) {
        this.lifetime = lifetime;
        this.cb = cb;
    }

    preload() {
        super.preload();

        this.load.image('bg-training-capsule', './assets/graphics/backgrounds/training/bg-training-capsule.png');
    }

    create() {
        this.add.image(0, 0, 'bg-training-capsule');

        Utilities.timeout(this, this.lifetime, this.cb);

        this._setupWorld();
        this._setupKeyboard();
        this._setupSound();

        this._setupSprite(150, 360, this.game.player);
        this._setupPlayerOptions();

        this.displayLogo();
        this.displayCentralMessage({ text: `${this.game.locale.TRAINING_STATE_WELCOME}` });

        this.loadSoundPreferences();
    }

    update() {
        super.update();
    }

    render() {
        // let player = this.game.player;
        // this.game.debug.bodyInfo(player.phaser, 25, 25);
        // this.game.debug.body(player.phaser);
    }
}

export default TrainingState;
