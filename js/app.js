var leftEdge = 0;
var rightEdge = 400;
var upEdge = -30;
var downEdge = 380;
var canvasWidth = 505;
var playerCoordinateInitiate = {
    x : 200,
    y : 380
};
var horizStep = 100;
var verticStep = 82;
// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.speed = speed;
    // 敌人的图片或者图形元件，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(dt){};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/*Player.prototype.canMoveLeft = function(){
    return ((this.x >= leftEdge) ? true : false);
};
Player.prototype.canMoveRight = function(){
    return ((this.x <= rightEdge) ? true : false);
};*/
Player.prototype.moveLeft = function(){
    (this.x != leftEdge) ? (this.x -=horizStep) : (this.x = leftEdge);
};
Player.prototype.moveRight = function(){
    (this.x != rightEdge) ? (this.x +=horizStep) : (this.x = rightEdge);
};
Player.prototype.moveUp = function(){
    (this.y != upEdge) ? (this.y -= verticStep) : (this.y = upEdge);
};
Player.prototype.moveDown = function(){
    (this.y != downEdge) ? (this.y += verticStep) : (this.y = downEdge);
};
Player.prototype.handleInput = function(movement){
    switch (movement){
        case 'left':
            this.moveLeft();
            break;
        case 'right':
            this.moveRight();
            break;
        case 'up':
            this.moveUp();
            break;
        case 'down':
            this.moveDown();
            break;
    }
};
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [new Enemy(0,52,100)];
var player = new Player(playerCoordinateInitiate.x,playerCoordinateInitiate.y);
// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
