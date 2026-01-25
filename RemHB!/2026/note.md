+ 主要参考https://www.bilibili.com/video/BV1FcmkBzE1v
    + 星环
        + css3d探索
        + 环上的字母需要做成视频里那样颜色会动的
        + 可以试一下多个环
            + 多了会乱，看不清字
        + 可以试试鼠标移动环会转
    + 背景
        + 整体移动
            + css3d rotate 循环的方式，适合形式统一，否则重叠部分会有尖角，而且整体比较卡
                + => 不需要全靠rotate！尝尝translate3d+rotateY！
            + 动态添加图片，动态remove的形式，每个图片向左移动 => 这是24年的操作，该迈向新世界了！
        + 背景其实也是在preserve3d的空间里，看下调preserse达到视频中的效果
        + mix-blend-mode实现图片色调统一
            + 3d的话就用不了这个属性，除非不用background的形式，而是里面放img

- 看了 https://wodniack.dev/ 的启发先放在这里
    - 要实现滚筒效果完全可以不全靠ring，可以自己translate3d！css3d自己本来就提供了所有的3d能力，你不用被困在ring里面！
    - 滚动效果做好了试试无限滚动作为背景，以鼠标滚动作为触发

- 或许loading可以用滚筒+timelord的全屏loading+swayleaf效果？

- 对了晚上回去的时候手机看到的pattern1的部分全屏想不到还挺适合的