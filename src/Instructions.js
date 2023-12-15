class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionScene")
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
        let controls = this.add.text(200, 50, 'Controls:', menuConfig).setOrigin(0.5)
        let text = this.add.text(200, 80, 'Press ENTER to select and continue', menuConfig).setOrigin(0.5)
        let text2 = this.add.text(200, 110, 'Press WASD to move', menuConfig).setOrigin(0.5)
        let text3 = this.add.text(200, 140, 'Press UP and DOWN to select in menus', menuConfig).setOrigin(0.5)
        let credits = this.add.text(200, 190, 'Credits:', menuConfig).setOrigin(0.5)
        let text4 = this.add.text(200, 220, 'Sprites: Steven Univrse S1E19', menuConfig).setOrigin(0.5)
        let text5 = this.add.text(200, 250, 'Music: Ludwig and Schlatts Musical', menuConfig).setOrigin(0.5)
        let text6 = this.add.text(200, 280, 'Emporium, 2 PM // Financial Obligations', menuConfig).setOrigin(0.5)


        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEnter)){
          this.scene.start('overworldScene');    
        }
      }
}