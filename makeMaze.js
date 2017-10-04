
function　digPath(num){
    crab.dig()
    crab.digUp()
    crab.forward()
    crab.digUp()
    sentakushi=[0,1,2]
    //場所を保存
    crab.setHome(""+num)
}

function digRestore(){
    crab.back()
    //スロット１にあるブロックで埋戻し
    crab.place(crab.itemAt(0))
}

//選択肢
var sentakushi = [0,1,2]
var houkou

var num =0

while(true){
    //ランダムに進む方向を選ぶ
    var rand　= Math.random()*3 //0.0~1.0が、0.0~3.0になる
    //小数点を切り下げる　ex:2.68→２になる
    //()の中の数字が配列の中にあるか、あるならその中身、ないなら-1
    houkou = sentakushi.indexOf(Math.floor(rand))
    if(houkou == -1){
        //もし進めるとこがないなら(全部３に入れ替わったら)
        if(sentakushi[0]==3&&sentakushi[1]==3&&sentakushi[2]==3){
        var rand1 = Math.random()*num
        crab.home(""+Math.floor(rand1))
        //いままでとおったランダムの場所に移動
        sentakushi=[0,1,2]
        }
    }else{
        //選んだ方向の数字を消して3を入れる
        sentakushi.splice(houkou,1,3)
        //進むプログラム
        if(houkou==0){
            if(crab.isBlocked()){
                crab.dig()
                crab.forward()
                if(crab.isBlocked()){//OK(掘ってもなにもなかった
                    digPath(num++)
                }else{
                    //掘ってみたら道に出た場合
                    digRestore()
                }
            }
        }else if(houkou==1){//右を向く
            crab.turnRight()
            if(crab.isBlocked()){
                //右を向いたら壁だった
                crab.dig()
                crab.forward()
                if(crab.isBlocked()){
                    digPath(num++)
                }else{
                    //掘り進めたら、道だった
                    digRestore()
                    crab.turnLeft()
                }
            }else{
                //右を向いたら通路だった
                crab.turnLeft()
            }
        }else if(houkou==2){
            crab.turnLeft()
            if(crab.isBlocked()){//左向いたら壁だった
                crab.dig()
                crab.forward()
                if(crab.isBlocked()){
                    digPath(num++)
                }else{
                    //掘り進めたら、道だった
                    digRestore()
                    crab.turnRight()
                }
            }else{//左向いたら道だった
                crab.turnRight()
            }
        }
    }
}
