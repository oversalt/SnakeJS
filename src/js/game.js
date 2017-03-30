//This file will be the entry point of all JavaScript files
// found in this game 
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
     game.load.image('snake_block', 'src/assets/box.png');
	 game.load.image('bullet', 'src/assets/bullet.png');
}

var player;
var cursors;
var horizontal;
var food; 

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(32, game.world.height - 150, 'snake_block');
    food = game.add.sprite(50, 50, 'snake_block');
	weapon = game.add.weapon(30, 'bullet');
	
	weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 600;
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon.fireRate = 100;
	
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(food);

	weapon.trackSprite(player, 0, -1, true);
	
    player.body.collideWorldBounds = true;
    food.body.collideWorldBounds = true; 
    food.body.immovable = true; 
    
    cursors = game.input.keyboard.createCursorKeys();
	fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    horizontal = false;
}

function update() { 
    //The velocity values will be changed later on for dynamic
    //  increase of difficulty
    var hit_food = game.physics.arcade.collide(player, food);
	var shoot_food = game.physics.arcade.collide(weapon.bullets, food);
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -50
        horizontal = true; 
        player.x -= 2;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 50
        player.body.velocity.y= 0;
        horizontal = true; 
        player.x += 2;
    }
    else if (cursors.up.isDown)
    {
        player.body.velocity.y = -50
        horizontal = false; 
        player.y -= 2;
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 50
        horizontal = false; 
        player.y += 2;
    }

    if( horizontal ){
        player.body.velocity.y= 0;
    }else
    {
        player.body.velocity.x= 0;
    }
	
	 if (fireButton.isDown)
    {
        weapon.fire();
    }

	
    if(hit_food){
        var new_x = Math.floor((Math.random() * game.world.width-50) + 1);
        var new_y = Math.floor((Math.random() * game.world.height-50) + 1);
        food.x = new_x; 
        food.y = new_y;
    }
	if(shoot_food){
        var new_x = Math.floor((Math.random() * game.world.width-50) + 1);
        var new_y = Math.floor((Math.random() * game.world.height-50) + 1);
        food.x = new_x; 
        food.y = new_y;
    }
}

function hitEnemy () {
        var new_x = Math.floor((Math.random() * game.world.width-50) + 1);
        var new_y = Math.floor((Math.random() * game.world.height-50) + 1);
        food.x = new_x; 
        food.y = new_y;
    }
