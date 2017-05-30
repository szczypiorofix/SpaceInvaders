var Alien = function(x, y) {
    
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    
    this.sprite = new Sprite('images/alien.png');
    
    this.speedX = 5;
    this.speedY = 5;
    this.animStep = 0;
    this.animSpeed = 10;
    this.animFrame = 0;
    this.imageScale = 32;
    this.imageOrigin = 32;
    
    this.alienAnim = new Animation(this.sprite, 10, 3, this.imageOrigin, this.imageScale);
      
    this.update = function() {
        this.alienAnim.nextStep();
    };
    
    this.draw = function(context) {
        this.alienAnim.drawAnimation(context, this.x, this.y);
    };
};
