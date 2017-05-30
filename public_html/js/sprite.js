var Sprite = function(filename, context) {

    // CONSTRUCTOR
    this.image = null;
    this.width = 0;
    this.height = 0;
    this.context = context;
    this.TO_RADIANS = Math.PI / 180;

    if (filename !== undefined && filename !== '' && filename !== null) {
        this.image = new Image();
        this.image.src = filename;
        this.width = this.image.src.width;
        this.height = this.image.src.height;
    }

    this.draw = function(x, y, w, h) {
        if (w === undefined || h === undefined) {
            this.context.drawImage(this.image, x, y, this.image.width, this.image.height);
        }
        else {
            this.context.drawImage(this.image, x, y, w, h);
        }
    };

    this.rotate = function(x, y, angle) {
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(angle * this.TO_RADIANS);
        this.context.drawImage(this.image, -(this.image.width/2), -(this.image.height/2));
        this.context.restore();
    };
};