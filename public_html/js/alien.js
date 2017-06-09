var Alien = function(sprite, x, y, level) {
    
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.level = level;

    this.width = 32;
    this.height = 32;
    this.alive = true;
    this.isAlien = true;
    
    this.speedX = 5;
    this.speedY = 5;
    this.animStep = 0;
    this.animSpeed = 10;
    this.animFrame = 0;
    this.imageScale = 32;
    this.imageOrigin = 32;
    
    // MOVING
    this.move = 1;
    this.moveOffset = 60;
    this.moveStart = this.x;
    this.moveStep = 1;
    this.moveSpeed = 5 - level;
    if (this.moveSpeed < 0) this.moveSpeed = 0;
    this.speedCounter = this.moveSpeed;
    
    // FIRING
    this.isShooting = false;
    
    this.alienAnim = new Animation(this.sprite, 15, 3, this.imageOrigin, this.imageScale);
    
    this.update = function() {
        if (this.alive) this.alienAnim.nextStep();
        
        if (this.speedCounter === 0) {
            
            this.speedCounter = this.moveSpeed;
            if (this.move === 1) {
                this.x += this.moveStep;
                if (this.x > this.moveStart + this.moveOffset) {
                    this.move = -1;
                }
            }
            else {
                this.x -= this.moveStep;
                if (this.x < this.moveStart - this.moveOffset) {
                    this.move = 1;
                }
            }
   
        }
        else {
            this.speedCounter--;    
        }
    };
    
    this.draw = function(context) {
        if (this.alive) this.alienAnim.drawAnimation(context, this.x, this.y);
    };
};


// ALIEN BULLET
var AlienBullet = function(x, y, level, gameManager) {
    this.x = x;
    this.y = y;
    this.speed = level * 2;
    this.shot = false;
    this.hitAudio = new Audio('music/hit.wav');
    this.hitAudio.volume = 0.3;
    this.gameManager = gameManager;
    this.sprite = new Sprite('images/bulletAlien.png');
    
    this.update = function() {
        
        if (this.shot) {
            this.y += this.speed;
            
            this.checkCollisions();
            
            if (this.y > 550) {
                this.shot = false;
                this.y = 0;
                this.x = 0;
            }
        }
    };
    
    this.checkCollisions = function() {
        
        for (i = 0; i < this.gameManager.walls.length; i++) {
            if (this.x + 4> (this.gameManager.walls[i].x)
                && (this.x +2 < this.gameManager.walls[i].x + this.gameManager.walls[i].width)
                && (this.y > this.gameManager.walls[i].y)
                && (this.y < this.gameManager.walls[i].y + this.gameManager.walls[i].height)
                && this.gameManager.walls[i].alive) {
                this.shot = false;
                this.gameManager.walls[i].health --;
                if (this.gameManager.walls[i].health <= 0) this.gameManager.walls[i].alive = false;
            }
        }
        
        if (this.x +4 > (this.gameManager.player.x)
            && (this.x + 2 < this.gameManager.player.x + this.gameManager.player.width)
            && (this.y > this.gameManager.player.y)
            && (this.y < this.gameManager.player.y + this.gameManager.player.height)
            && this.gameManager.player.alive) {
            shields--;
            this.shot = false;
            this.hitAudio.play();
        }
    };
    
    this.draw = function(context) {
        if (this.shot) context.drawImage(this.sprite.image, this.x, this.y);
    };
};
