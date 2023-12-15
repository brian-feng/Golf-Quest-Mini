class Overworld extends Phaser.Scene {
    constructor() {
        super('overworldScene')
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('player', 'PlayerOW.png', {
            frameWidth: 100,
            frameHeight: 100
        })

        this.load.image('tilesetImage', 'Tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'overworld.json')
        this.load.image('windmill', 'Windmill.png')
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

        // add player
        const playerSpawn = map.findObject('Spawns', obj => obj.name == 'PlayerSpawn')
        if (currentX == 0 && currentY == 0){
            currentX = playerSpawn.x
            currentY = playerSpawn.y
        }
        this.player = this.physics.add.sprite(currentX, currentY, 'player', 0).setScale(0.4)
        this.player.body.setCollideWorldBounds(true)

        // const treeLayer = map.createLayer('Trees', tileset, 0, 0)

        // movement animation
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

        // windmills
        if(wins < 1){
            this.windmill1 = this.physics.add.sprite(450, 280, 'windmill', 0)
            this.windmill1.setBodySize(100, 250)
            this.physics.add.collider(this.windmill1, this.player, () => {
                currentX = this.player.x
                currentY = this.player.y
                wins += 1
                this.bgm.stop()
                this.scene.start('fightScene')
            })
        }
        if(wins < 2){
            this.windmill2 = this.physics.add.sprite(198, 720, 'windmill', 0)
            this.windmill2.setBodySize(100, 200)
            this.physics.add.collider(this.windmill2, this.player, () => {
                currentX = this.player.x
                currentY = this.player.y
                wins += 1
                this.bgm.stop()
                this.scene.start('fightScene2')
            })
        }
        if(wins < 3){
            this.windmill3 = this.physics.add.sprite(1270, 874, 'windmill', 0)
            this.windmill3.setBodySize(100, 200)
            this.physics.add.collider(this.windmill3, this.player, () => {
                currentX = this.player.x
                currentY = this.player.y
                wins += 1
                this.bgm.stop()
                this.scene.start('fightScene3')
            })
        }
        if(wins < 4){
            this.boss = this.physics.add.sprite(1523, 1100, 'windmill', 0)
            this.boss.setBodySize(100, 200)
            this.physics.add.collider(this.boss, this.player, () => {
                currentX = this.player.x
                currentY = this.player.y
                wins += 1
                this.bgm.stop()
                this.scene.start('fightScene4')
            })
        }
    }

    update() {
        // movement
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
    }
}