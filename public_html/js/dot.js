var Dot = function(x, y) {

    this.x = x;
    this.y = y;
    this.maxSize = 3;
    this.size = Math.floor(Math.random() * this.maxSize) +1;
    this.vel = this.size;
    
    this.update = function() {
        this.y += this.vel;
        if (this.y > GameCanvas.screenHeight) {
            this.y = Math.floor(Math.random() * 30) - 50;
            this.size = Math.floor(Math.random() * this.maxSize) +1;
            this.vel = this.size;
            this.x += (Math.floor(Math.random() * 10) - 5);
        }
    };

    this.draw = function(context) {
        var style = context.fillStyle;
        context.fillStyle = "#888";
        context.fillRect(this.x, this.y, this.size, this.size);
        context.fillStyle = style;
    };
};
