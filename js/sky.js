// 初始化一个天空类
class Sky{
  constructor(config) {
    // 静态图像
    this.bg = config.bg;
    this.width = config.width;
    this.height = config.height;
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = -this.height;
    this.speed = config.speed;
    // 最后更新时间
    this.lasttime = new Date().getTime()
  }
  // 判断方法，判断这个时间天空是否需要移动y1 y2++
  judge(){
    let currentTime = new Date().getTime()
    // currentTime10015 time10010 = 
    if(currentTime - this.lasttime > this.speed){
      this.y1++;
      this.y2++;
      // 时间更新
      this.lasttime = currentTime
    }
    if(this.y2 === 0){
      this.y1 = 0
      this.y2 = -this.height;
    }
  }
  // 绘图方法
  paint(context){
    context.drawImage(this.bg, this.x1, this.y1, this.width, this.height);
    context.drawImage(this.bg, this.x2, this.y2, this.width, this.height);
  }
}
