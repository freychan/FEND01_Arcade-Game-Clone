var canvasWidth = 505;
var randomParameter = Math.random() + 1.0;
console.log(randomParameter);
var gameState = {
    begin: 2,
    win : 3,
    fail : 4
    },
    state = gameState.begin;
var playerCoordinateInitiate = {
    x : 200,
    y : 380
};
var horizStep = 101,
    verticStep = 83;
var enemyCoordinateInitiate = {
    x : -100,
    y : 55,
    v : 50
};
var leftEdge = playerCoordinateInitiate.x - 2 * horizStep,
    rightEdge = playerCoordinateInitiate.x + 2 * horizStep,
    upEdge = playerCoordinateInitiate.y - 5 * verticStep,
    downEdge = playerCoordinateInitiate.y + 0 * verticStep;
var basicTime = 2500,
    randTime = 2000;
var enemyNum = 6;
var successThresholdY = 0;
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
    allEnemies.forEach(function(enemy){
        if(enemy.x > (canvasWidth * randomParameter)){
            enemy.x = enemyCoordinateInitiate.x;
            enemy.y = enemyCoordinateInitiate.y + (Math.floor(Math.random() * 3)) * verticStep;
            enemy.speed = Math.random() * 100 + enemyCoordinateInitiate.v;
            enemyCoordinateInitiate.v =+ 20;
        }
    });
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
Player.prototype.update = function(){
    checkState();
};
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
            if(state == gameState.begin){
                this.moveLeft();
            }
            break;
        case 'right':
            if(state == gameState.begin){
                this.moveRight();
            }
            break;
        case 'up':
            if(state == gameState.begin){
                this.moveUp();
            }
            break;
        case 'down':
            if(state == gameState.begin){
                this.moveDown();
            }
            break;
    }
};
function checkState(){
    if(player.y >= successThresholdY){
        state = gameState.begin;
    }
    if(player.y < successThresholdY){
        state = gameState.win;
    }
}
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [
    new Enemy(enemyCoordinateInitiate.x,
        enemyCoordinateInitiate.y,
        Math.random() * 100 + enemyCoordinateInitiate.v),
    new Enemy(enemyCoordinateInitiate.x,
        enemyCoordinateInitiate.y + verticStep,
        Math.random() * 100 + enemyCoordinateInitiate.v),
    new Enemy(enemyCoordinateInitiate.x,
        enemyCoordinateInitiate.y + verticStep * 2,
        Math.random() *100 + enemyCoordinateInitiate.v)];
for(var i = allEnemies.length + 1; i <= enemyNum; i++){
    var timeInterval = basicTime + randTime * Math.random() * 10;
    console.log(timeInterval);
    setTimeout(function(){
        allEnemies.push(
            new Enemy(enemyCoordinateInitiate.x,
                enemyCoordinateInitiate.y + (Math.floor(Math.random() * 3)) * verticStep,
                Math.random() * 100 + enemyCoordinateInitiate.v))
    },timeInterval)
}
var player = new Player(playerCoordinateInitiate.x,playerCoordinateInitiate.y);
// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        12: 'enter',
        32: 'space'
    };
    switch (state){
        case gameState.begin:
            break;
        case gameState.win:
            if(e.keyCode === 13){
                state = gameState.begin;
                player.x = playerCoordinateInitiate.x;
                player.y = playerCoordinateInitiate.y;
            }
    }
    player.handleInput(allowedKeys[e.keyCode]);
});
