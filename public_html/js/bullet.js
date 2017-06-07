var Bullet = function(x, y) {
    
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.shot = false;
    this.hitAudio = new Audio('music/hit.wav');
    this.hitAudio.volume = 0.2;
    this.sprite = new Sprite('images/bullet.png');

    this.update = function() {
        if (this.shot) {
            this.y -= this.speed;
            
            this.checkCollisions();
            
            if (this.y < -10) {
                this.shot = false;
                this.y = 0;
                this.x = 0;
            }
        }
    };
    
    this.checkCollisions = function() {
        for (i = 0; i < gameManager.alien.length; i++) {
            if (this.x > (gameManager.alien[i].x)
                && (this.x < gameManager.alien[i].x + gameManager.alien[i].width)
                && (this.y > gameManager.alien[i].y)
                && (this.y < gameManager.alien[i].y + gameManager.alien[i].height)
                && gameManager.alien[i].alive) {
                gameManager.alien[i].alive = false;
                score += level;
                this.shot = false;
                this.hitAudio.play();
            }
        }
    };
    
    this.draw = function(context) {
        if (this.shot) context.drawImage(this.sprite.image, this.x, this.y);
    };
};
