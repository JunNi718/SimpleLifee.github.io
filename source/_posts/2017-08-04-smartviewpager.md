---
title: 可以知道滑动方向的 ViewPager
date: 2017-08-04 20:24:37
tags: Android 
---



做项目的时候使用到 ViewPager，那么顺便总结一下它的 OnPageChangeListener 监听器。随便撸了个可以判断滑动方向的 ViewPager。欢迎来提Issue。

OnPageChangeListener的有三个回调接口，按照执行顺序分别是：



```
/**
* 响应触摸事件，页面的滑动状态
* @param state SCROLL_STATE_IDLE -> SCROLL_STATE_DRAGGING -> 
* SCROLL_STATE_SETTLING -> SCROLL_STATE_IDLE
*/
@Override
public void onPageScrollStateChanged(int state) {
	...
}
```

state 有三个状态值，0、1、2 分别代表初始空闲状态、正在滑动、滑动完成。



```
/**
* 当正在滑动的时候，会连续调用。
* @param position  当前你滑动的页面，第一个页面的值为 0
* @param positionOffset 当前页面偏移的百分比
* @param positionOffsetPixels 当前页面的偏移像素
*/
@Override
public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
    ...     
}

```

这个回调会在滑动的时候多次调用。



```
 /**
 * 页面移动完毕后调用
 * @param position 当前移动完毕后的页面，第一个页面的值为 0
 */
    @Override
 public void onPageSelected(int position) {
        System.out.println("onPageSelected 当前 position:"+position);
 }
```

---



所以，当发生滑动操作的时候，执行顺序如下：

① 你把手接触屏幕刚进行滑动

② onPageScrollStateChanged#state = 1

③ onPageScrolled (int position, float positionOffset, int positionOffsetPixels)

这个方法会执行多次，以当前页面为基准。下面具体解释一下：

▼向右滑动 ( 向前一个页面 ) 

​		▶ position ： position = curPosition - 1;  //当前位置减 1

​		▶ positionOffset ：从 1 到 0；//偏移的百分比

​		▶ positionOffsetPixels：从屏幕像素最大值到 0；//偏移的像素值

▼向左滑动 ( 向后一个页面 ) position = curPosition + 1;

​		▶position ： position = curPosition + 1;

​		▶positionOffset ：从 0 到 1；

​		▶positionOffsetPixels：从屏幕像素最小值到 1；

④ 你松手了

⑤ onPageScrollStateChanged#state = 2

⑥ onPageSelected

⑦ onPageScrolled 参照第 3 点，不过这时候方向已经确定了，只是不断向这个方向的最值改变。

⑧ onPageScrollStateChanged#state = 0



### position 的总结：

onPageScrolled中的position的变化规律是，假设有3个page，当前正在第二个页面，如果这时你往右（向第一个页面）滑动，那么position的值就是 0 ，position + 1就是1。position + 1 指的是下一个即将滑动到的页面索引。所以这时手不松开向左滑动超过原来第二个页面的位置，这时 position 的值就会变成 1 ，而 position + 1 就变成了 2。



一般情况下，我们在 onPageScrolled 中可以根据手势对 UI 的进行相应变化。



我写了个ViewPager类，可以获取到当前是向左滑动还是向右滑动，只要在回调函数中进行相应的判断和操作即可。



```java
/**
 * @创建者 倪军
 * @创建时间 2017/8/4
 * @描述 可以判断 ViewPager 滑动的方向。
 */

public class SmartViewPager extends ViewPager {

    private boolean directionLeft = false;
    private boolean directionRight = false;
    private boolean isCompleted = true;
    private int currentPosition = -1;

    onPageChangeListener onPageChangeListener ;

    public SmartViewPager(Context context) {
        super(context);
        init();
    }

    public SmartViewPager(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public void init() {
        addOnPageChangeListener(listener);
    }

    OnPageChangeListener listener = new OnPageChangeListener() {
        @Override
        public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
            //说明是第一次
            if (!isCompleted) {
                if (currentPosition == -1) {
                    if (position == 0 || positionOffset == 0.0f || positionOffsetPixels == 0) {
                        directionLeft = true;
                    } else {
                        directionRight = true;
                    }
                    currentPosition = position;
                } else {
                    clearState();
                    if (positionOffset > 0 && currentPosition == position) {
                        directionRight = true;
                        if (position < currentPosition) {
                            directionLeft = true;
                        }
                    } else if (positionOffset > 0) {
                        directionLeft = true;
                        if (position == currentPosition) {
                            directionRight = true;
                        }
                    }
                }
            }

            if (isCompleted) {
                //滑动完成了
                if (getAdapter() != null) {
                    //adapter不为null
                    if (currentPosition == 0) {
                        //说明是第一页
                        if (currentPosition == position) {
                        }
                        if(position >currentPosition){
                            directionRight = true;
                        }
                    } else if (currentPosition < getAdapter().getCount()-1) {
                        //中间部分
                        if(position == currentPosition){
                        }
                        if(position < currentPosition){
                            directionLeft =true;
                        }
                        if(position >currentPosition){
                            directionRight = true;
                        }
                    }else{
                        //最后一页
                        if(position==currentPosition){
                        }
                        if(position<currentPosition){
                            directionLeft =true;
                        }
                    }
                }
                currentPosition = position;
            }
        }

        @Override
        public void onPageSelected(int position) {

        }

        @Override
        public void onPageScrollStateChanged(int state) {
            System.out.println("onPageScrollStateChanged current state:" + state);
            if (state == 1) {
                isCompleted = false;
            } else if (state == 2) {
                isCompleted = true;

            } else {
                onPageChangeListener.onPagechanged(directionLeft,directionRight);
                Log.d("SmartViewPager", "custom onPageChangeListener is called.");
            }
        }
    };

    public boolean isDirectionLeft() {
        return directionLeft;
    }

    public boolean isDirectionRight() {
        return directionRight;
    }

    public void clearState() {
        directionLeft = false;
        directionRight = false;
    }


    public interface onPageChangeListener{
         void onPagechanged(boolean directionLeft,boolean directionRight);
    }

    public void setOnPageChangeListener(onPageChangeListener onPageChangeListener){
        this.onPageChangeListener = onPageChangeListener;
    }
}
```






附上 GitHub 地址：
https://gist.github.com/SmartNJ/00234d5f7ca3bb203788b4644887763f



---


    欢迎关注我的公众号 ： SmartNi
    个人博客：http://nijun.github.io
    GitHub：https://github.com/SmartNJ
