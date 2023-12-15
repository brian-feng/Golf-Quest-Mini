class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionScene")
    }

    preload() {
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '14px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let first = this.add.text(200, 25, 'Defeat holes under par and become champion!', menuConfig).setOrigin(0.5)
        let controls = this.add.text(200, 75, 'Controls:', menuConfig).setOrigin(0.5)
        let text = this.add.text(200, 105, 'Press ENTER to select and continue', menuConfig).setOrigin(0.5)
        let text2 = this.add.text(200, 135, 'Press WASD to move', menuConfig).setOrigin(0.5)
        let text3 = this.add.text(200, 165, 'Press UP and DOWN to select in menus', menuConfig).setOrigin(0.5)
        let credits = this.add.text(200, 215, 'Credits:', menuConfig).setOrigin(0.5)
        let text4 = this.add.text(200, 245, 'Sprites: Steven Univrse S1E19', menuConfig).setOrigin(0.5)
        let text5 = this.add.text(200, 275, 'Music: Ludwig and Schlatts Musical', menuConfig).setOrigin(0.5)
        let text6 = this.add.text(200, 305, 'Emporium, 2 PM // Financial Obligations', menuConfig).setOrigin(0.5)


        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEnter)){
          this.scene.start('overworldScene');    
        }
      }
}