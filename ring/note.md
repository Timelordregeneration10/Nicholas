+ 上传图片功能
+ 考虑封装成一个函数，批量得到不同ring
    + init里调frame的rotateXY角度，记得改stable的against
    + 好看的模式记录下来，到时候下拉框或者下一个按钮可以切
- preserve-3d融入内容页，中间stable部分放文字？
+ 探索新的dom结构，使得一部分stable，但是仍然处在3d空间中有zindex关系，或许可以让每个fragment动，而不是整个动
    * 使用transition控制每个fragment的运动，而不是用外层的整个动
        + 需要注意的是不能overflow hidden，否则看不到3d效果
        - interval的问题
            + 现象：“现代浏览器为了节省资源，通常会对不活动的标签页进行限制。例如，Chrome 浏览器会在标签页不活动时降低 JavaScript 的执行频率。这意味着，虽然 setInterval 仍然在执行，但它的执行频率可能会降低，导致定时器的回调函数不会在预期的时间间隔内被调用。”
            - 解决：？requestAnimationFrame
    + 循环的还是用animation，keyframes可以通过js操作
        + 添加的话createElement style，然后appendChild到head
        + 修改的话操作document.styleSheets，具体见↓
            ```
            function getKeyframes(keyframesName){//通过定义的动画函数名来查询函数
                const styleSheet = document.styleSheets;//获取所有样式表
                const animation={};//定义一个animation来装获得的值
                for (let i = 0; i < styleSheet.length; i++) {//遍历循环获取styleSheet
                    for (let j = 0; j < styleSheet[i].cssRules.length; j++) {//遍历循环获取styleSheet[i].cssRules
                        //判断样式名字是否为CSSKeyframesRule
                        if (styleSheet[i].cssRules[j].constructor.name === 'CSSKeyframesRule'){
                            //再判断此时这个动画函数名是否为传入的值
                            if (keyframesName === styleSheet[i].cssRules[j].name){
                                //获取此时的cssRules，index，和styleSheet
                                animation.cssRules = styleSheet[i].cssRules[j];
                                animation.index = j;
                                animation.styleSheet = styleSheet[i]
                                return animation//返回获取的animation
                            }
                        }
                    }
                }
            }


            let s = getKeyframes('slide');//通过封装的函数来获取名字为slide的keyframes函数
            s.styleSheet.deleteRule(s.index);//通过index删除之前的keyframes函数
            let insertKeyframes = ` @keyframes slide{
                0%{
                    left: 20px;
                    top: 30px;
                }
                100%{
                    left: 400px;
                    top: 500px;
                }
            }`;
            s.styleSheet.insertRule(insertKeyframes,s.index);//将修改后的函数和index添加进样式表

            ```