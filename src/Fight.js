class Fight extends Phaser.Scene {
    constructor() {
        super('fightScene')
    }

    preload() {
        this.load.path = './assets/'
        this.load.image('playerFight', 'PlayerFight.png')
        this.load.image('fightBG', 'FightBG.png')
    }

    create() {
        this.add.image(0, 0, 'fightBG').setScale(0.5).setOrigin(0, 0)
    }

}