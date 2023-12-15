class Overworld extends Phaser.Scene {
    constructor() {
        super('overworldScene')
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('player', 'playerOW.png', {
            frameWidth: 100,
            frameHeight: 100
        })

        this.load.image('tilesetImage', 'Tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'overworld.json')

        this.load.audio('bgm', '2 PM.mp3')
    }

    create() {
        this.bgm = this.sound.add('bgm')
        this.bgm.setLoop(true)
        this.bgm.setVolume(0.1)
        this.bgm.play()

        // velocity constant
        this.VEL = 200

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)


        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('Tileset', 'tilesetImage')

        const bgLayer = map.createLayer('Background', tileset, 0, 0)
        const terrainLayer = map.createLayer('Terrain', tileset, 0, 0)

        // add slime
        // const slimeSpawn = map.findObject('Spawns', obj => obj.name == 'slimeSpawn')
        this.player = this.physics.add.sprite(0, 0, 'player', 0).setScale(0.4)
        this.player.body.setCollideWorldBounds(true)

        // const treeLayer = map.createLayer('Trees', tileset, 0, 0)

        // slime animation
        this.anims.create({
            key: 'jiggle', 
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 1
            })
        })
        this.player.play('jiggle')

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        terrainLayer.setCollisionByProperty({
            collides: true
        })
        this.physics.add.collider(this.player, terrainLayer)
        // this.physics.add.collider(this.slime, treeLayer)
        
        // input
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // slime movement
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
        }

        if(this.cursors.up.isDown) {
            this.direction.y = -1
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
        }

        this.direction.normalize()
        this.player.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
        
        if (Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.start('fightScene');    
        }
    }
}