var HUD_Text = function(text, x, y, font, color) {
    
    this.text = text;
    this.x = x;
    this.y = y;
    this.font = font;
    this.color = color;
      
    GameCanvas.ctx.font = this.font;
    GameCanvas.ctx.fillStyle = this.color;
    
    
    this.draw = function() {
        var style = GameCanvas.ctx.fillStyle;
        GameCanvas.ctx.fillStyle = this.color;
        GameCanvas.ctx.fillText(this.text, this.x, this.y);
        GameCanvas.ctx.fillStyle = style;
    };
    
    this.update = function(text) {
        this.text = text;
    };
};
