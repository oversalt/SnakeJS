//This file will be the entry point of all JavaScript files
// found in this game 
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
     game.load.image('snake_block', 'src/assets/box.png');

}

var player;
var cursors;
var horizontal;
var food; 
var tail; 
var score; 
var refresh_rate = 0; 
var interval; 

function create() {
    interval = setInterval(display_tail, 200); 
    tail = []; // stores an array of key value pair of x & y coordinates 
    score = 0; //initialize the base score 
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(32, game.world.height - 150, 'snake_block');
    food = game.add.sprite(50, 50, 'snake_block');
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(food);

    player.body.collideWorldBounds = true;
    food.body.collideWorldBounds = true; 
    food.body.immovable = true; 
    
    cursors = game.input.keyboard.createCursorKeys();
    horizontal = false;
}

function update() { 
    //The velocity values will be changed later on for dynamic
    //  increase of difficulty

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



    var hit_food = game.physics.arcade.overlap(player, food, move_food, null, this); 
    
}

function move_food(){
    var new_x = Math.floor((Math.random() * game.world.width-50) + 1);
    var new_y = Math.floor((Math.random() * game.world.height-50) + 1);
    food.x = new_x; 
    food.y = new_y;
    score++; 
}



function display_tail(){
    // Do something about the tail 
    if( tail.length > score){ // if the size of the tail is greater score, pop the end of the array
        tail.pop(); 
    }
    tail.splice(0, 0, {x: player.x, y: player.y});  // keep on updating the points traveled by the sanake

    
}

