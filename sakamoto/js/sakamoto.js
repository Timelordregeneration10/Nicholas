
var currentDanmuNum=0;

function adddanmu(){
    let ran=Math.random();
    let ran1=Math.random();
    let ran2=Math.random();
    let ran3=Math.random();
    let colorran="#FE9913";
    if(ran<0.33333){colorran="#2EA2F8";}
    if(ran>0.66666){colorran="#FF1693";}
    // let sty=document.createElement("style");
    // sty.innerHTML=`
    //     <style>
    //         .danmu${currentDanmuNum}{
    //             width:300vw;
    //             font-size: ${5+ran1*18}vw;
    //             color:${colorran};
    //             position: absolute;
    //             top:${ran2*90}vh;
    //             animation: notbiggest ${1+ran3*4}s linear 1 forwards;
    //         }
    //     </style>
    // `;
    // document.getElementsByTagName("head")[0].append(sty);
    let newdanmu=document.createElement("div");
    // newdanmu.className=`danmu${currentDanmuNum}`;
    newdanmu.innerHTML=`
        <div>
            I'm Sakamoto, you know
        </div>
    `;
    newdanmu.style=`
        width:300vw;
        font-size: ${5+ran1*18}vw;
        color:${colorran};
        position: absolute;
        top:${ran2*90}vh;
        animation: notbiggest ${1+ran3*4}s linear 1 forwards;
    `;          //试了很多次，发现不可以class名字用${}
    currentDanmuNum++;
    document.getElementsByClassName("box-sakamoto")[0].prepend(newdanmu);
}

setInterval(adddanmu,100);
