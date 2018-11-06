package com.simpleapp.view;

import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.LinearLayout;

import com.simpleapp.R;

/**
 * 弹性头部，与XListViewFooter一样，从而实现头部展示视图并能下拉刷新的效果。
 */
public class FHeader1 extends LinearLayout {


    private static final String TAG = "FHeader1";
    /**
     * 容器视图
     */
    private LinearLayout mContainer;

//    private RelativeLayout mContentView;
    /**
     * 上次状态
     */
    private int mState = STATE_NORMAL;

    /**
     * 正常状态（下拉至自身高度前的状态或者从超过自身高度的位置恢复至自身高度的状态）
     */
    public final static int STATE_NORMAL = 0;
    /**
     * 准备状态（下拉至自身高度，播放“箭头向上旋转”动画；下拉超过自身高度，此时松开则刷新；从超过自身高度的位置恢复至自身高度，播放箭头向下的动画）
     */
    public final static int STATE_READY = 1;
    /**
     * 刷新中的状态
     */
    public final static int STATE_REFRESHING = 2;

    public FHeader1(Context context) {
        super(context);
        initView(context);
    }

    public FHeader1(Context context, AttributeSet attrs) {
        super(context, attrs);
        initView(context);
    }

    private void initView(Context context) {
        LayoutParams lp = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
        mContainer = (LinearLayout) LayoutInflater.from(context).inflate(R.layout.fheader1, null);
        addView(mContainer, lp);
    }

    /**
     * 设置状态（当视图状态发生改变时调用）. <br>
     */
    public void setState(int state) {
        // 当前状态与上次状态相同，不做任何改变，直接返回
        if (state == mState)
            return;
        switch (state) {
            case STATE_NORMAL: // 当前为正常状态
                if (mState == STATE_READY) { // 准备->正常：显示向箭头向下的动画
                }
                if (mState == STATE_REFRESHING) { // 刷新->正常：清除动画

                }
                break;
            case STATE_READY: // 当前为准备状态
                if (mState != STATE_READY) { // 正常->准备：显示箭头向上的动画
                }
                break;
            case STATE_REFRESHING: // 当前为刷新状态
                break;
            default:
        }
        mState = state;
    }

    public void setVisibleHeight(int height) {
        if (height < 0)
            height = 0;
        LayoutParams lp = (LayoutParams) mContainer.getLayoutParams();
        lp.height = height;
        mContainer.setLayoutParams(lp);
    }


    public int getVisibleHeight() {
        return mContainer.getLayoutParams().height;
    }

    public void hide() {
        LayoutParams lp = (LayoutParams) mContainer.getLayoutParams();
        lp.height = 0;
        mContainer.setLayoutParams(lp);
    }


    public void show() {
        LayoutParams lp = (LayoutParams) mContainer.getLayoutParams();
        lp.height = (int)getResources().getDimension(R.dimen.image_height);
        mContainer.setLayoutParams(lp);
    }
}
