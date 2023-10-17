// 初始化一个敌机类
class Enemy {
  constructor(config){
    // 敌机类型
    this.type = config.type;
    // 敌机宽度
    this.width = config.width;
    // 敌机高度
    this.height = config.height;
    // 敌机初始化位置
    this.x = Math.floor(Math.random() * (480 - config.width))
    this.y = -config.height;
    // 敌机生命
    this.life = config.life;
    // 敌机分数
    this.score = config.score;
    // 敌机图片库
    this.frame = config.frame;
    // 此时此刻展示的图片
    this.img = this.frame.live[0];
    // 活着的标识
    this.live = true;
    // 敌机速度
    // this.minSpeed = config.minSpeed;
    // this.maxSpeed = config.maxSpeed;
    // this.speed = Math.floor(Math.random()*(max - min +1) + min)
    this.speed = Math.floor(Math.random()*(config.minspeed - config.maxSpeed +1) + config.maxSpeed)
    // 最后时间标识，表示在此时间段他是不变的，过了则变化
    this.lastTime = new Date().getTime()
    // 死亡下标
    this.deathIndex = 0;
    // 确认销毁
    this.destory = false;
  }
  // 判定需要是否需要渲染/怎么移动/是否移动
  move(){
    const currentTime = new Date().getTime();
    if(currentTime - this.lastTime >= this.speed){
      // 如果敌机活着的，那么直接播放活着的图片
      if(this.live){
        this.img = this.frame.live[0]
        this.y++;
      }else {
        // 死的时候播放死亡动画
        this.img = this.frame.death[this.deathIndex++];
        // 如果死亡动画播放完毕后就要销毁这架敌机
        if(this.deathIndex === this.frame.death.length){
          this.destory = true
        }
      }
      // 修正上一次时间
      this.lastTime = currentTime
    }
  }
  paint(context){
    context.drawImage(this.img, this.x, this.y)
  }
  outOfBounds(){
    if(this.y > 650){
      return true
    }
  }
  // 检测敌机是否撞到其他物体
  // 敌机 e; 子弹 o
  hit(o){
    // 其他物体的左边
    let ol = o.x;
    // 其他物体的右边
    let or = o.x + o.width;
    // 其他物体的顶边
    let ot = o.y;
    // 其他物体的底边
    let ob = o.y + o.height;
    // 敌机的左边
    let el = this.x;
    // 敌机的右边
    let er = this.x + this.width;
    // 敌机的顶边
    let et = this.y;
    // 敌机的底边
    let eb = this.y + this.height;
    // 判断是否有碰到 => 其实是判断没碰到的情况，剩下的就是碰到
    if(ol > er || or < el || ot >eb || ob < et){
      // 没碰到
      return false;
    }else {
      // alert('碰到了')
      return true;
    }
  }
  collide(){
    // 中弹了，生命减少1
    this.life--;
    // 当实例生命降低为0时，就需要其他方法
    if(this.life === 0){
      // 1.将live标识标记为 死亡状态
      // 2. 播放死亡动画
      // 3. 播放死亡动画后才真正销毁
      this.live = false;
      // 收获到敌机实例的分数
      score += this.score;
    }
  }
}
