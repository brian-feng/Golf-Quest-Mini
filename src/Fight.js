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
        this.load.image('menu1', 'Menu1.png')
        this.load.image('menu2', 'Menu2.png')
    }

    create() {
        this.introDone = false

        this.add.image(0, 0, 'fightBG').setScale(0.5).setOrigin(0, 0)

        this.menu1 = this.add.sprite(0, 200, 'menu1').setScale(0.2).setOrigin(0, 0).setAlpha(0)

        let player = this.add.sprite(-50, 200, 'playerFight').setScale(0.3).setOrigin(0, 0)
        let introTween = this.tweens.add({
            targets: player,
            ease: 'Linear.easeOut',
            loop: 0,
            paused: true,
            x: 300,
            duration: 1500,
            onComplete: () => {
                this.introComplete()
            }
        })

        let enemy = this.add.sprite(400, 50, 'windmillFight').setScale(0.3).setOrigin(0, 0)
        let enemyTween = this.tweens.add({
            targets: enemy,
            ease: 'Linear.easeOut',
            loop: 0,
            paused: true,
            x: 50,
            duration: 1500,
            onComplete: () => {
                this.introComplete()
            }
        })

        introTween.paused = false
        enemyTween.paused = false
    }

    introComplete() {
        this.introDone = true
        this.menu1.setAlpha(1)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.start('fightScene');    
        }
    }
}