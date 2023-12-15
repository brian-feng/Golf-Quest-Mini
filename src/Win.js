class Win extends Phaser.Scene {
    constructor() {
        super("winScene")
    }

    preload() {
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '16px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let text = this.add.text(200, 80, 'YOU DEFEATED THE CHAMPION', menuConfig).setOrigin(0.5)
        let text2 = this.add.text(200, 110, 'Thank you for playing!', menuConfig).setOrigin(0.5)
        let text3 = this.add.text(200, 140, 'Press ENTER to play again', menuConfig).setOrigin(0.5)


        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEnter)){
          this.scene.start('menuScene');    
        }
      }
}