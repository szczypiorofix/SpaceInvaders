var Restore1Health = function(sprite, gameManager) {
    
    this.sprite = sprite;
    this.gameManager = gameManager;
    this.x = 0;
    this.y = 0;
    this.width = 32;
    this.height = 32;
    this.speed = 2;
    this.counter = 0;
    this.frequency = 10;
    this.flying = false;
    this.hitAudio = new Audio('music/upgrade1.wav');
    this.hitAudio.volume = 0.3;
    
    this.update = function() {
        if (this.flying) {
            this.y += this.speed;
            
            if (this.y > GameCanvas.screenHeight + 50) {
                this.flying = false;
                this.y = 50;
            }
            
            if (this.x > (this.gameManager.player.x - 25)
                && (this.x < this.gameManager.player.x + 30)
                && (this.y > this.gameManager.player.y - 20)
                && (this.y < this.gameManager.player.y + 30)
                && this.gameManager.player.alive) {
                this.flying = false;
                this.y = 50;
                shields++;
                this.hitAudio.play();
                score += 10;
                if (shields > initialShields) shields = initialShields;
            }
        }
    };
    
    this.draw = function(context) {
        
        if (this.flying) { 
            context.drawImage(this.sprite.image, this.x, this.y);
        }
        
    };
    
};