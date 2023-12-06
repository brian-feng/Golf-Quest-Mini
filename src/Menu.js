class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.image('menuBG', './assets/MainMenu.png')
    }

    create() {
        this.add.image(0, 0, 'menuBG').setScale(0.5).setOrigin(0, 0)

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '18px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let text = this.add.text(200, 220, 'Press ENTER', menuConfig).setOrigin(0.5)
        let box = this.add.rectangle(200, 219, 135, 23, 0X44FF44)
        box.setFillStyle(0xFFFFFF, 0)
        box.setStrokeStyle(2, 0X44FF44, 1)

        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEnter)){
          this.scene.start('fightScene');    
        }
      }
}