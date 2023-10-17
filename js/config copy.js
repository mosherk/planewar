// 配置项文件 各种配置和资源
// 定义游戏的五种状态
// 开始
const START = 0;
// 开始时
const STARTING = 1;
// 运行时
const RUNNING = 2;
// 暂停时
const PAUSE = 3;
// 结束时
const END = 4;

//创洁一个记置文件 收所有的出片路经
const IMAGES = {
  b: "img/bullet1.png",
  bg: "img/background.jpg",
  copyright: "img/shoot_copyright.png",
  pause: "img/game_pause.png",
  loading_frame: ["img/loading1.png", "img/loading2.png", "img/loading3.png", "img/loading4.png"],
  hero_frame_live: ["img/hero1.png","img/hero2.png"],
  hero_frame_death: ["img/hero_blowup_n1.png", "img/hero_blowup_n2.png", "img/hero_blowup_n3.png", "img/hero_blowup_n4.png"],
  e1_live: ["img/enemy1png"],
  e1_death: ["img/enemy1_down1.png", "img/enemy1_down2.png", "img/enemy1_down3.png", "img/enemy1_down4.png"],
  e2_live: ["img/enemy2.png"],
  e2_death: ["img/enemy2_down.png", "img/enemy2_down2.png", "img/enemy2_down3.png", "img/enemy2_down4.png"],
  e3_live: ["img/enemy3_n1.png","ing/enemy3_n2.png"],
  e3_death: ["img/enemy3_down1.png", "img/enemy3_don2.png", "img/enemy3_down3.png", "ing/enemy3_down4.png", "img/enemy3_down5.png","img/enemy3_down6.png"],
};
/**
 * 该方法用于加载初始化一张图片
 * @param {String || Array} src 图片路径
 * @returns {Image} 根据这个路径地址生成一张图片
 */
function createImage(src){
  // typeof
  // instanceof
  // constructor
  // Object.prototype.toString.call()
  let img = void(0);
  if(typeof src === "String"){
    img = new Image();
    img.src = src;
  }else{
    img = [];
    for(let i = 0; i < src.length; i++){
      img[i] = new Image()
      img[i] = src[i]
    }
  }
  return img;
}

// 初始化子弹图片
const b = createImage(IMAGES.b)


// 2.初始化背景图 图片加载/初始化过程是 异步的
const bg = new Image();
bg.src = "/img/background.jpg"

// 初始化暂停图片
const pause = new Image();
pause.src = "/img/pause.png";
pause.width = 5
pause.height = 5

// 初始化加载logo图片
const copyright = new Image()
copyright.src = '/img/shoot_copyright.png'

// 初始化四张飞机大战
const loading_frame = [];
loading_frame[0] = new Image()
loading_frame[0].src = '/img/loading1.png'
loading_frame[1] = new Image()
loading_frame[1].src = '/img/loading2.png'
loading_frame[2] = new Image()
loading_frame[2].src = '/img/loading3.png'
loading_frame[3] = new Image()
loading_frame[3].src = '/img/loading4.png'

const hero_frame = {live: [],death: []}
hero_frame.live[0] = new Image();
hero_frame.live[0].src = '/img/hero1.png'
hero_frame.live[1] = new Image();
hero_frame.live[1].src = '/img/hero2.png'
hero_frame.death[0] = new Image()
hero_frame.death[0].src = '/img/hero_blowup_n1.png'
hero_frame.death[1] = new Image()
hero_frame.death[1].src = '/img/hero_blowup_n2.png'
hero_frame.death[2] = new Image()
hero_frame.death[2].src = '/img/hero_blowup_n3.png'
hero_frame.death[3] = new Image()
hero_frame.death[3].src = '/img/hero_blowup_n4.png'

// 创建敌机图片数组 e1,e2,e3分别为小中大飞机
const e1 = {live: [],death: []}
e1.live[0] = new Image();
e1.live[0].src = "/img/enemy1.png"
e1.death[0] = new Image();
e1.death[0].src = "/img/enemy1_down1.png"
e1.death[1] = new Image();
e1.death[1].src = "/img/enemy1_down2.png"
e1.death[2] = new Image();
e1.death[2].src = "/img/enemy1_down3.png"
e1.death[3] = new Image();
e1.death[3].src = "/img/enemy1_down4.png"

const e2 = {live: [],death: []}
e2.live[0] = new Image();
e2.live[0].src = "/img/enemy2.png"
e2.death[0] = new Image();
e2.death[0].src = "/img/enemy2_down1.png"
e2.death[1] = new Image();
e2.death[1].src = "/img/enemy2_down2.png"
e2.death[2] = new Image();
e2.death[2].src = "/img/enemy2_down3.png"
e2.death[3] = new Image();
e2.death[3].src = "/img/enemy2_down4.png"

const e3 = {live: [],death: []}
e3.live[0] = new Image();
e3.live[0].src = "/img/enemy3_n1.png"
e3.live[1] = new Image();
e3.live[1].src = "/img/enemy3_n2.png"
e3.death[0] = new Image();
e3.death[0].src = "/img/enemy3_down1.png"
e3.death[1] = new Image();
e3.death[1].src = "/img/enemy3_down2.png"
e3.death[2] = new Image();
e3.death[2].src = "/img/enemy3_down3.png"
e3.death[3] = new Image();
e3.death[3].src = "/img/enemy3_down4.png"
e3.death[4] = new Image();
e3.death[4].src = "/img/enemy3_down5.png"
e3.death[5] = new Image();
e3.death[5].src = "/img/enemy3_down6.png"


// 天空类的配置项
const SKY = {
  bg:bg, //右边的bg是上边的图片对象
  width: 480,
  height: 650,
  // 10毫秒变化一次,数字越小速度越快。
  speed:10,
}
// 飞机加载页面的配置项
const LOADING = {
  frame: loading_frame,
  width: 186,
  height: 38,
  x: 0,
  y: 650 - 38,
  speed: 400,
}

// 初始化一个英雄配置项
const HERO = {
  frame: hero_frame,
  width: 98,
  height: 122,
  speed: 100,
}

// 子弹配置项
const BULLET = {
  img: b,
  width: 7,
  height: 18,
}

// 小飞机配置项
const E1 = {
  type: 1, width:57, height:51, life:1, score: 1, frame: e1, minspeed:20, maxSpeed:10,
}
const E2 = {
  type: 2, width:69, height:95, life:5, score: 5, frame: e2, minspeed:50, maxSpeed:20,
}
const E3 = {
  type: 3, width:169, height:258, life:20, score: 20, frame: e3, minspeed:100, maxSpeed:100,
}




