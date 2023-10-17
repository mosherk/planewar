// 主程序代码
// 初始化画布
const canvas = document.querySelector('#canvas')
const context = canvas.getContext("2d")

// 初始化一个天空实例
const sky = new Sky(SKY);
// 初始化一个飞机界面加载实例
const loading = new Loading(LOADING)
// 初始化一个英雄实例 英雄是会变的，否则死亡时渲染太快
let hero = new Hero(HERO)

// state表示游戏状态，取值必须是以上五种状态
let state = START;
// score 分数变量 life 变量
let score = 0;
let life = 3;
// 为canvas对象绑定一个点击事件且如果是START状态时修改为STARTING状态
canvas.addEventListener('click',() => {
  if(state === START){
    state = STARTING
  }
})
// 为canvas绑定一个鼠标移动事件 鼠标正好在飞机图片的正中心
canvas.addEventListener("mousemove", (e) => {
  // console.log(e.offsetX,e.offsetY);
  // 将鼠标位置赋值给hero，并使鼠标在hero正中间
  hero.x = e.offsetX - hero.width/2
  hero.y = e.offsetY - hero.height/2
})
// 为canvas绑定一个鼠标离开事件，鼠标离开时，RUNNING -> PAUSE
canvas.addEventListener("mouseleave", ()=>{
  if(state === RUNNING){
    state = PAUSE;
  }
})
// 为canvas绑定一个鼠标进入事件，鼠标进入时 PAUSE -> RUNNING
canvas.addEventListener("mouseenter", ()=>{
  if(state === PAUSE){
    state = RUNNING;
  }
})

// 碰撞检测函数
function checkHit(){
  // 遍历所有的敌机
  for(let i = 0; i < enemies.length; i++){
    if(enemies[i].hit(hero)){
      //敌机和英雄发生了碰撞
      enemies[i].collide();
      hero.collide()
    }
    // 遍历所有的子弹
    for(let j = 0; j < hero.bulletList.length; j++){
      // 用第i个敌机和第j个子弹进行碰撞检测 返回布尔类型
      enemies[i].hit(hero.bulletList[j]);
      // 如果碰到了才做某些事情
      if(enemies[i].hit(hero.bulletList[j])){
        // 清除这架敌机和子弹
        enemies[i].collide();
        hero.bulletList[j].collide()
      }
    }
  }
}
// 该变量装着所有敌机实例
const enemies = [];
// 飞机产生的速率
let ENEMY_CREATE_INTERVAL = 800;
let ENEMY_LASTTIME = new Date().getTime();
// 全局函数 隔一段时间就初始化一架敌机
function createComponent(){
  const currentTime = new Date().getTime()
  if(currentTime - ENEMY_LASTTIME >= ENEMY_CREATE_INTERVAL){
    // 当时间满足 实例化一架敌机放入敌机数组中
    // 小飞机 60% 中飞机 30% 大飞机 10% [0,99]
    let ran = Math.floor(Math.random() * 100)
    if(ran < 60){
      enemies.push(new Enemy(E1))
    }else if(ran < 90 && ran >= 60){
      enemies.push(new Enemy(E2))
    }else{
      enemies.push(new Enemy(E3))
    }
    // 更新时间
    ENEMY_LASTTIME = currentTime
  }
}
// 全局函数 判断所有子弹/敌人组件
function judgeComponent(){
  for(let i = 0; i < hero.bulletList.length; i++){
    hero.bulletList[i].move()
  }
  for(let i = 0; i < enemies.length; i++){
    enemies[i].move()
  }
}
// 全局函数 绘制所有子弹/敌人组件 life和score
function paintComponent(){
  for(let i = 0; i < hero.bulletList.length; i++){
    hero.bulletList[i].paint(context)
  }
  for(let i = 0; i < enemies.length; i++){
    enemies[i].paint(context)
  }
  context.font = "20px 微软雅黑"
  context.fillStyle='red';
  context.textAlign = 'left';
  context.fillText("score:" + score, 10, 20);
  context.textAlign = 'right';
  context.fillText("life:" + life, 480-10, 20);
  
  // 重置代码 画笔重置为 黑色 左对齐
  context.textAlign = 'left';
  context.fillStyle='red';
}
// 全局函数 销毁所有子弹/敌人组件
function deleteComponent(){
  if(hero.destory){
    life--;
    // 又活过来了
    hero.destory = false
    // 当生命值降低为0的时候 进入游戏结束状态
    // 否则就产生一个新的英雄飞机
    if(life === 0){
      state = END;
    }else{
      hero = new Hero(HERO)
    }
  }
  for(let i = 0; i < hero.bulletList.length; i++){
    // 判断是否飞出边界 || 击中敌机(destroy为true)
    if(hero.bulletList[i].outOfBounds() || hero.bulletList[i].destory){
      // splice index(操作位) count(操作数)
      hero.bulletList.splice(i,1)
    }
  }
  for(let i = 0; i < enemies.length; i++){
    // 如果敌机处于待销毁状态 destroy = true
    if(enemies[i].outOfBounds() || enemies[i].destory){
      enemies.splice(i, 1)
    }
  }
}

// 图片加载完后的动作
bg.addEventListener('load',() => {
  // 会实时渲染整个canvas对象，游戏进入不同状态渲染不同内容
  setInterval(() => {
    switch(state){
      case START:
        console.log('开始了');
        // 渲染移动天空
        sky.judge()
        sky.paint(context)
        // 渲染飞机大战logo
        // 图片原始宽高属性的获取 naturalWidth&natrualHeight
        let logo_x = (480-copyright.naturalWidth)
        let logo_y = (650-copyright.naturalHeight)
        context.drawImage(copyright, logo_x/2, logo_y/2)
        break;
      case STARTING:
        console.log('开始时');
        // 渲染移动天空
        sky.judge();
        sky.paint(context);
        // 飞机加载类 loading
        loading.judge();
        loading.paint(context);
        break;
      case RUNNING:
        console.log('运行时');
        // 渲染移动天空
        sky.judge()
        sky.paint(context)
        // 渲染我方飞机
        hero.judge();
        hero.paint(context);
        hero.shoot();
        judgeComponent()
        // 调用绘制再销毁会导致英雄完全销毁后，
        // 生命值变为0了，但右上角的life还显示1
        deleteComponent()
        paintComponent()
        createComponent()
        checkHit()
        break;
      case PAUSE:
        console.log('暂停了');
        // 渲染暂停图标
        // 因为找的素材像素太大，缩小一下
        const pause_reduce = 100;
        let pause_x = (480-pause_reduce)
        let pause_y = (650-pause_reduce)
        context.drawImage(pause, pause_x/2, pause_y/2,pause_reduce,pause_reduce)
        break;
      case END:
        console.log('结束了');
        // 渲染game over
        // 为context画笔对象设置一个bold 24px 微软雅黑
        context.font = "bold 24px 微软雅黑"
        // fillText()
        // text String 填充的文本内容
        // x: 填充的文本渲染的位置
        // y: 填充文本渲染的位置
        // 文本水平方式
        context.textAlign='center';
        // 文本垂直对齐  
        // context.textBaseline='middle';
        context.textBaseline='middle';
        
        context.fillText("GAME_OVER", 480/2, 650/2);
        
        break;
    }
  }, 10);
})







