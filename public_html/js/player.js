var Player = function(x, y, bullet) {

    this.x = x;
    this.y = y;
    this.isShooting = false;
    this.alive = true;
    this.sprite = new Sprite('images/spaceship.png');
    this.bullet = bullet;
    this.speedX = 5;
    this.speedY = 5;
    this.width = 32;
    this.height = 32;
    this.imageScale = 32;
    this.imageOrigin = 32;

    //this.input = new Input();
    
    this.playerAnim = new Animation(this.sprite, 4, 3, this.imageOrigin, this.imageScale);
    
    this.shotAudio = new Audio('music/shot.wav');
    
    this.update = function() {

        this.playerAnim.nextStep();

        if (this.isShooting && !this.bullet.shot) {
            this.bullet.shot = true;
            this.bullet.x = this.x + (this.imageOrigin/2) -3;
            this.bullet.y = this.y + 5;
            this.shotAudio.play();
        }
                
//        if (this.input.keyUp.isDown && this.y > 200) {
//            this.y -= this.speedY;
//        }
//        if (this.input.keyDown.isDown && this.y < GameCanvas.screenHeight - this.imageScale) {
//            this.y += this.speedY;
//        }
//        if (this.input.keyLeft.isDown && this.x > 0) {
//            this.x -= this.speedX;
//        }
//        if (this.input.keyRight.isDown && this.x < (GameCanvas.screenWidth - this.imageScale)) {
//            this.x += this.speedX;
//        }
//        if (this.input.keyCTRL.isDown && !this.bullet.shot) {
//           this.isShooting = true;
//        }
    };
    
    this.draw = function(context) {
        this.playerAnim.drawAnimation(context, this.x, this.y);
    };
};
