var Button = function(x, y, width, height, text, textcolor, bgcolor) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.bgcolor = bgcolor;
    this.textcolor = textcolor;
    this.fill = null;
    
    this.update = function() {
        
    };
    
    this.draw = function(context) {
        this.fill = context.fillStyle;
        context.fillStyle = this.bgcolor;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.textcolor;
        context.fillText(this.text, this.x + 10, this.y + 25);
        context.fillStyle = this.fill;
    };
};


