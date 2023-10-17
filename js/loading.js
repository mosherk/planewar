//初始化一个飞机界面加载类
class Loading {
  constructor(config){
    // 图片组
    this.frame = config.frame
    // 加载哪张图片下标，默认从0开始
    this.frameIndex = 0
    // 图片宽高
    this.width = config.width
    this.height = config.height
    this.x = config.x
    this.y = config.y
    this.speed = config.speed
    this.lastTime = new Date().getTime();
  }
  judge(){
    // 获取之前那个时间lastTime
    // 获取speed speed
    // 获取当前时间new Date().getTime
    const currentTime = new Date().getTime();
    if(currentTime - this.lastTime > this.speed){
      this.frameIndex++;
      if(this.frameIndex === 4){
        // 更新状态
        state = RUNNING;
      }
      // 更新最后时间
      this.lastTime = currentTime;
    }
  }
  paint(context){
    context.drawImage(this.frame[this.frameIndex],this.x,this.y,this.width,this.height)
  }
}
