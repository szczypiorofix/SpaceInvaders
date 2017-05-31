var Alien = function(x, y, level) {
    
    this.x = x;
    this.y = y;
    this.level = level;
    this.width = 32;
    this.height = 32;
    this.alive = true;
    this.sprite = new Sprite('images/alien.png');
    
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
    
    this.alienAnim = new Animation(this.sprite, 10, 3, this.imageOrigin, this.imageScale);
    
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
var AlienBullet = function(x, y, level) {
    this.x = x;
    this.y = y;
    this.speed = level * 2;
    this.shot = false;
    this.hitAudio = new Audio('music/hit.wav');
    this.sprite = new Sprite('images/bulletAlien.png');
    
    this.update = function() {
        
        if (this.shot) {
            this.y += this.speed;
            
            this.checkCollisions();
            
            if (this.y > GameCanvas.screenHeight + 20) {
                this.shot = false;
                this.y = 0;
                this.x = 0;
            }
        }
    };
    
    this.checkCollisions = function() {
            if (this.x > (gameManager.player.x)
                && (this.x < gameManager.player.x + gameManager.player.width)
                && (this.y > gameManager.player.y)
                && (this.y < gameManager.player.y + gameManager.player.height)
                && gameManager.player.alive) {
                lives--;
                this.shot = false;
                this.hitAudio.play();
            }
    };
    
    this.draw = function(context) {
        if (this.shot) context.drawImage(this.sprite.image, this.x, this.y);
    };
};
