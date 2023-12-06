class Fight extends Phaser.Scene {
    constructor() {
        // reminder to add enemy parameter
        super('fightScene')
    }

    preload() {
        this.load.path = './assets/'
        this.load.image('playerFight', 'PlayerFight.png')
        this.load.image('fightBG', 'FightBG.png')
        this.load.image('windmillFight', 'WindmillFight.png')
        this.load.image('menu1', 'FightMenu1.png')
    }

    introComplete() {
        this.introDone = true
        this.menu1.setAlpha(1)
    }

    create() {
        this.introDone = false

        this.add.image(0, 0, 'fightBG').setScale(0.5).setOrigin(0, 0)

        this.menu1 = this.add.sprite(0, 200, 'menu1').setScale(0.2).setOrigin(0, 0).setAlpha(0)

        let player = this.add.sprite(-50, 200, 'playerFight').setScale(0.3).setOrigin(0, 0)
        let introTween = this.tweens.chain({
            targets: player,
            ease: 'Bounce.easeOut',
            loop: 1,
            paused: false,
            tweens: [
                {
                    x: 300,
                    duration: 2000,
                },
                {
                    onComplete: this.introComplete()
                }
            ],
        })

        let enemy = this.add.sprite(400, 50, 'windmillFight').setScale(0.3).setOrigin(0, 0)
        let enemyTween = this.tweens.chain({
            targets: enemy,
            ease: 'Bounce.easeOut',
            loop: 1,
            paused: false,
            tweens: [
                {
                    x: 50,
                    duration: 2000
                }
            ]
        })

    }
}