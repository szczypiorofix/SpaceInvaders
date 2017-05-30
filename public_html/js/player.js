var GameObjectType = { PLAYER: 0, ENEMY: 1, SPECIAL: 2};

var GameObject = function(type, x, y, name) {
    
    this.x = x;
    this.y = y;
    this.name = name;
    this.type = type;
    
    GameObject.prototype.update = function() {
        console.log("type: " +this.type +", name: " +this.name + ' UPDATE');
    };
    
    GameObject.prototype.draw = function() {
        console.log("type: " +this.type +", name: " +this.name + ' DRAW');
    };
};

var Player = function(x, y, name) {
    
    this.x = x;
    this.y = y;
    this.name = name;
    
    Player.prototype = new GameObject();
    
    Player.prototype.fight = function() {
        console.log("Player is fighting!");
    };
};
