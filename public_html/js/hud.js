var HUD_Text = function(text, x, y, font, color) {
    
    this.text = text;
    this.x = x;
    this.y = y;
    this.font = font;
    this.color = color;
      
    
    GameCanvas.ctx.fillStyle = this.color;
    
    
    this.draw = function() {
        var s = GameCanvas.ctx.fillStyle;
        var f = GameCanvas.ctx.font;
        GameCanvas.ctx.fillStyle = this.color;
        GameCanvas.ctx.font = this.font;
        GameCanvas.ctx.fillText(this.text, this.x, this.y);
        GameCanvas.ctx.fillStyle = s;
        GameCanvas.ctx.font = f;
    };
    
    this.update = function(text) {
        this.text = text;
    };
};
