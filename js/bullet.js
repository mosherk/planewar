// 初始化一个子弹类
class Bullet {
  constructor(config, x, y){
    this.img = config.img;
    this.width = config.width;
    this.height = config.height;
    this.x = x;
    this.y = y;
    this.destory = false;
  }
  // 子弹绘制方法
  paint(){
    context.drawImage(this.img, this.x, this.y)
  }
  // 子弹移动
  move(){
    this.y-=2;
  }
  outOfBounds(){
    // 若返回为真则销毁子弹
    return this.y < -this.height;
  }
  collide(){
    // 让这颗子弹变成可销毁状态
    this.destory = true;
  }
}
