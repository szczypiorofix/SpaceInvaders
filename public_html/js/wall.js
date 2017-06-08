var Wall = function(sprite, x, y) {
    
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.alive = true;
    this.imageScale = 64;
    this.imageOrigin = 32;
    this.width = this.imageScale;
    this.height = this.imageScale;
    this.maxHealth = 5;
    this.health = 5;
    
    this.update = function() {
    };
    
    this.draw = function(context) {
        
        if (this.alive) context.drawImage(this.sprite.image, (this.maxHealth - this.health) * 32 , 0, this.imageOrigin, this.imageOrigin, this.x, this.y, this.imageScale, this.imageScale);
        
    };
};
