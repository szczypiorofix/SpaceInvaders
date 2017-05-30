function Animation(spriteSheet, speed, steps, imageOrigin, imageScale) {
    
    this.spriteSheet = spriteSheet;
    this.steps = steps - 1;
    this.animStep = 0;
    this.animSpeed = speed;
    this.animFrame = 0;
    this.imageOrigin = imageOrigin;
    this.imageScale = imageScale;
    
    
    this.nextStep = function() {  
        this.animStep++;
        if (this.animStep > this.animSpeed) {
            this.animStep = 0;
            this.animFrame++;
            
            if (this.animFrame > this.steps) {
                this.animFrame = 0;
            }
        }
    };
    
    this.drawAnimation = function(canvasContext, x, y) {
        canvasContext.drawImage(this.spriteSheet.image, this.animFrame * this.imageOrigin, 0, this.imageOrigin, this.imageOrigin, x, y, this.imageScale, this.imageScale);
    };
}