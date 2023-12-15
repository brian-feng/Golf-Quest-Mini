class Fight3 extends Phaser.Scene {
    constructor() {
        super('fightScene3')
    }

    preload() {
        this.load.path = './assets/'
        this.load.image('playerFight', 'PlayerSwing.png')
        this.load.image('playerSwing1', 'PlayerSwing.png')
        this.load.image('playerSwing2', 'PlayerSwing2.png')
        this.load.image('fightBG', 'FightBG.png')
        this.load.image('windmillFight', 'WindmillFight.png')
        this.load.image('menu1', 'Menu1.png')
        this.load.image('menu2', 'Menu2.png')
        this.load.audio('fightbgm', 'Financial Obligations.mp3')
    }

    create() {
        // music
        this.bgm = this.sound.add('fightbgm')
        this.bgm.setLoop(true)
        this.bgm.setVolume(0.1)
        this.bgm.play()

        // controls
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        this.introDone = false

        // background and menus
        this.add.image(0, 0, 'fightBG').setScale(0.5).setOrigin(0, 0)
        this.menu1 = this.add.sprite(0, 200, 'menu1').setScale(0.35).setOrigin(0, 0).setAlpha(0)
        this.menu2 = this.add.sprite(0, 200, 'menu2').setScale(0.35).setOrigin(0, 0).setAlpha(0)

        // intro animations
        this.player = this.add.sprite(-50, 200, 'playerFight').setScale(0.3).setOrigin(0, 0)
        let introTween = this.tweens.add({
            targets: this.player,
            ease: 'Linear.easeOut',
            loop: 0,
            paused: true,
            x: 300,
            duration: 1500,
            onComplete: () => {
                this.introComplete()
            }
        })

        this.player2 = this.add.sprite(-100, 200, 'playerSwing').setScale(0.3).setOrigin(0, 0).setAlpha(0)
        this.player3 = this.add.sprite(-100, 200, 'playerSwing2').setScale(0.3).setOrigin(0, 0).setAlpha(0)

        this.enemy = this.add.sprite(400, 50, 'windmillFight').setScale(0.3).setOrigin(0, 0)
        let enemyTween = this.tweens.add({
            targets: this.enemy,
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
        // the rest of the UI
        this.introDone = true
        this.menu1.setAlpha(1)

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '16px',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.stroke = this.add.text(84, 232, 'Stroke', menuConfig).setOrigin(0.5)
        this.run = this.add.text(70, 253, 'Run', menuConfig).setOrigin(0.5)
        this.bgrectangle = this.add.rectangle(215, 10, 150, 60, 0x999999).setOrigin(0, 0)
        this.healthtext = this.add.text(290, 30, 'WINDMILL  Par 9', menuConfig).setOrigin(0.5)
        this.healthbg = this.add.rectangle(290, 52, 100, 20, 0x000000)
        this.healthbar = this.add.rectangle(290, 52, 100, 20, 0x00FF00)
        this.swingbarbg = this.add.rectangle(50, 220, 62, 100, 0xAAAAAA).setOrigin(0, 0).setAlpha(0)
        this.swingbar = this.add.rectangle(50, 320, 62, 100, 0xFF0000).setOrigin(0, 0).setAlpha(0)
        this.select = 1

        // bar tween
        this.barTween = this.add.tween({
            targets: this.swingbar,
            ease: 'Linear.easeOut',
            loop: -1,
            paused: true,
            y: 220,
            duration: 1000,
        })
        this.timer = 0
        this.swings = 0
        this.swinging = false
    }

    update() {
        if(this.introDone){
            if (Phaser.Input.Keyboard.JustDown(keyUp)){
                this.menu1.setAlpha(1)    
                this.menu2.setAlpha(0)
                this.select = 1
            }
            if (Phaser.Input.Keyboard.JustDown(keyDown)){
                this.menu2.setAlpha(1)   
                this.menu1.setAlpha(0)
                this.select = 2
            }
            if (Phaser.Input.Keyboard.JustDown(keyEnter)){
                if(this.select == 4){
                    this.bgm.stop()
                    this.menu1.destroy()
                    this.menu2.destroy()
                    this.scene.start('overworldScene')   
                }
                else if(this.swinging){
                    let damage = Math.round((100 - (this.swingbar.y - 220))/6)
                    if(this.healthbar.width - damage < 0){
                        this.healthbar.width = 0
                        this.barTween.reset()
                        this.barTween.pause()
                        this.swingbar.setAlpha(0)
                        this.barTween.paused = true
                        let menuConfig = {
                            fontFamily: 'Courier',
                            fontSize: '24px',
                            color: '#000000',
                            align: 'left',
                            padding: {
                                top: 5,
                                bottom: 5,
                            },
                            fixedWidth: 0
                        }
                        if(this.swings <= 9){
                            this.add.tween({
                                targets: this.enemy,
                                ease: 'Linear.easeOut',
                                loop: 0,
                                paused: false,
                                alpha: 0,
                                duration: 500,
                                onComplete: () => {
                                    this.add.text(292, 95, 'YOU WIN', menuConfig).setOrigin(0.5, 0.5)
                                    menuConfig.fontSize = '16px'
                                    this.add.text(280, 120, 'Press [Enter] to continue', menuConfig).setOrigin(0.5, 0.5)
                                }
                            })
            
                        }
                        else{
                            this.add.text(292, 95, 'YOU LOSE', menuConfig).setOrigin(0.5, 0.5)
                            menuConfig.fontSize = '16px'
                            wins -= 1
                            this.add.text(280, 120, 'Press [Enter] to continue', menuConfig).setOrigin(0.5, 0.5)
                        }
                        this.select = 4
                    }
                    else {
                        this.healthbar.width -= damage
                        this.select = 1
                        this.swinging = false
                        this.barTween.reset()
                        this.barTween.pause()
                        this.barTween.paused = true
                        this.menu1.setAlpha(1)
                        this.swingbar.setAlpha(0)
                        this.swingbarbg.setAlpha(0)
                        this.swings += 1
                    }

                }
                else if(this.select == 1){
                    this.swinging = true
                    this.menu2.setAlpha(0)
                    this.menu1.setAlpha(0)
                    this.swingbar.setAlpha(1)
                    this.swingbarbg.setAlpha(1)
                    this.swingbar.y = 320
                    this.barTween.play()
                    this.barTween.paused = false
                    this.timer = this.time.now
                }
                else if(this.select == 2){
                    this.bgm.stop()
                    this.menu1.destroy()
                    this.menu2.destroy()
                    wins -= 1
                    this.scene.start('overworldScene')
                }
            }
        }
    }
}