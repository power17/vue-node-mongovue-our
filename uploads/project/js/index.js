var stage = new createjs.Stage("mainCanvas");
createjs.Ticker.framerate = 40;
createjs.Ticker.addEventListener("tick",handleTick);

function handleTick() {
    stage.update();
}

createjs.Ticker.addEventListener("tick",peanFlow);

function peanFlow() {
    //杯子
    var stage_cup = new createjs.Container();
    var cup = new createjs.Bitmap('./images/cup.png');
    stage.addChild(stage_cup);
    stage_cup.addChild(cup);
    cup.x = 375 -111;
    cup.y = 600;
    var milk = new createjs.Bitmap('./images/milk.png');
    stage.addChild(stage_cup);
    stage_cup.addChild(milk);
    milk.x = cup.x +5;
    milk.y = cup.y+38;
    if(Math.random()>0.98){
        var stage_pean=new createjs.Container();
        // var peanArr = ['./images/pean.png','./images/pean2.png']
        // var pean = new createjs.Bitmap(peanArr[Math.floor(Math.random()*2)]);
        var pean = new createjs.Bitmap('./images/pean2.png')
        stage.addChild(stage_pean);
        stage_pean.addChild(pean);
        pean.x = Math.random()*750;
        pean.y = -100;
        pean.rotation = Math.random()*360;
        stage_pean.alpha = 0;
        pean.scaleX=pean.scaleY =1;
       pean.addEventListener("click", function (event) {
           console.log(event);
           var blast = new createjs.Bitmap('./images/blast.png');
           // var stage_blast = new createjs.Container();
           // stage.addChild(stage_blast);
           stage_pean.addChild(blast);
           // blast.x = event.target.x;
           // blast.y = event.target.y;
           blast.x = pean.x;
           blast.y = pean.y;
           blast.regX = 106;
           blast.regY = 100;
       });
        TweenLite.to(stage_pean,10,{alpha:3});
        TweenLite.to(pean,5,{x:cup.x+80+Math.random()*100 ,y:cup.y+30,ease:Linear.easeNone,delay: Math.random()+1,alpha:1,onComplete:function () {
                stage.removeChild(stage_pean);
            }});
    }
}


// flyflower()
// //=====花瓣飘
// var ffA=["//image.giccoo.com/projects/your_own_way/img/ff1.png","//image.giccoo.com/projects/your_own_way/img/ff2.png","//image.giccoo.com/projects/your_own_way/img/ff3.png"]//====
//
// function flyflower(){
//
//     createjs.Ticker.addEventListener("tick",flyingflower);
// }
// function flyingflower(){
//
//     if(Math.random()>.93){
//         console.log(1);
//         var fc=new createjs.Container()
//         stage.addChild(fc)
//         fc.x=640
//         fc.y=Math.random()*1000
//
//         var ff=new createjs.Bitmap(ffA[parseInt(Math.random()*3)])
//         fc.addChild(ff)
//         ff.scaleX=ff.scaleY=Math.random()*Math.random()*Math.random()*Math.random()*8+.3
//         ff.x=Math.random()*640*ff.scaleX
//
//         TweenLite.to(fc,2+Math.random()*3,{x:-640*ff.scaleX,rotation:Math.random()*720-360,y:Math.random()*800+200,onCompleteParams:[stage,fc]})
//
//         // var if3=1
//         // if(Math.random()>.7){if3=-1}
//
//         TweenLite.to(ff,2+Math.random()*3,{rotation:Math.random()*720-360})
//
//     }
// }