package com.simpleapp.view;

import android.content.Context;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.animation.DecelerateInterpolator;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.ScrollView;
import android.widget.Scroller;


import com.simpleapp.R;

/**
 * 修改ScrollView，使其头、尾可弹性拖动
 */
public class FScrollView1 extends ScrollView {

    private static final String TAG = "FScrollView1";

    private float mLastY = -1;
    /**
     * 封装滚动操作的类，此处用于滚动返回
     */
    private Scroller mScroller;

    private LinearLayout mLayout;

    private LinearLayout mContentLayout;

    /**
     * 页眉视图
     */
    private FHeader1 mHeaderView;

    /**
     * 页眉内层的状态视图
     */
    private RelativeLayout mHeaderViewContent;
    /**
     * Header视图的标准高度
     */
    private int mHeaderViewHeight = 100;

//    private int pullHeight = 100;
    /**
     * 是否允许下拉刷新(默认为true)
     */
    private boolean mEnablePullRefresh = true;
    /**
     * 是否正在刷新
     */
    private boolean mPullRefreshing = false;

    // for mScroller, scroll back from header or footer.
    private int mScrollBack;

    private final static int SCROLLBACK_HEADER = 0;

    /**
     * 滚动返回原样的持续时间
     */
    private final static int SCROLL_DURATION = 400;

    /**
     * support iOS like pull feature.
     */
    private final static float OFFSET_RADIO = 1.8f;

//    private int deltaY = 0;

    public FScrollView1(Context context) {
        super(context);
        initWithContext(context);
    }

    public FScrollView1(Context context, AttributeSet attrs) {
        super(context, attrs);
        initWithContext(context);
    }

    public FScrollView1(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        initWithContext(context);
    }

    private void initWithContext(Context context) {
        mScroller = new Scroller(context, new DecelerateInterpolator());
        mHeaderViewHeight = (int) getResources().getDimension(R.dimen.image_height);

        mLayout = (LinearLayout) View.inflate(context, R.layout.fscrollview, null);
        mHeaderView = mLayout.findViewById(R.id.flex_header_content);

        mContentLayout = mLayout.findViewById(R.id.content_layout);

        addView(mLayout);
    }

    public void appendView(View view){
        mContentLayout.addView(view);
    }

    /**
     * enable or disable pull down refresh feature.
     *
     * @param enable
     */
    public void setPullRefreshEnable(boolean enable) {
        mEnablePullRefresh = enable;
        if (!mEnablePullRefresh) { // 禁用则隐藏
            mHeaderView.hide();
            mHeaderView.setOnClickListener(null);
        } else {
            mPullRefreshing = false;
            mHeaderView.show();
            mHeaderView.setState(FHeader1.STATE_NORMAL);
        }
    }


    /**
     * stop refresh, reset header view.
     */
    public void stopRefresh() {
        if (mPullRefreshing == true) {
            mPullRefreshing = false;
            mHeaderView.setState(FHeader1.STATE_NORMAL);
        }
    }


    /**
     * 更新头视图高度
     *
     * @param delta
     */
    private void updateHeaderHeight(float delta) {
        Log.i(TAG, "updateHeaderHeight " + delta);
        int height = mHeaderView.getVisibleHeight() + (int) delta;
        if (mEnablePullRefresh && !mPullRefreshing) {
            if (height > mHeaderViewHeight) {
                mHeaderView.setState(FHeader1.STATE_READY);
            } else {
                mHeaderView.setState(FHeader1.STATE_NORMAL);
            }
        }
        mHeaderView.setVisibleHeight(height);
    }

    /**
     * 重置头视图的高度
     */
    private void resetHeaderHeight() {
//        int bottomMargin = mHeaderView.getVisibleHeight();
//        if (bottomMargin > 0) {
//            mScrollBack = SCROLLBACK_HEADER;
//            mScroller.startScroll(0, bottomMargin, 0, -bottomMargin, SCROLL_DURATION);
//            invalidate();
//        }

        Log.i(TAG, "resetHeaderHeight ");
        int height = mHeaderView.getVisibleHeight();
        if (height == 0) // not visible.
            return;
        // 正常状态(未完全显示出来)，什么都不做
        if (mPullRefreshing && height <= mHeaderViewHeight) {
            return;
        }
        int finalHeight = 0; // default: scroll back to dismiss header.
        // 刷新中且已超过标准高度
        if (mPullRefreshing && height > mHeaderViewHeight) {
            finalHeight = mHeaderViewHeight;        // 设置要滚回的位置为标准高度
        }
        // 设置为页眉滚回去
        mScrollBack = SCROLLBACK_HEADER;
        /**
         * 计算控件的移动轨迹，通过提供起点、移动距离和滚动持续时间开始滚动。
         * startX,startY 是开始的坐标位置。此处指松手的位置
         * dx,dy 为移动距离。此处指从松手的位置到标准高度
         */
        mScroller.startScroll(0, height, 0, finalHeight - height, SCROLL_DURATION);
        invalidate();

    }


    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        if (mLastY == -1) {
            mLastY = ev.getRawY();
        }
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                mLastY = ev.getRawY();
                break;
            case MotionEvent.ACTION_MOVE:
                final float deltaY = ev.getRawY() - mLastY;
                mLastY = ev.getRawY();
                Log.i(TAG, "deltaY " + deltaY + ",getVisibleHeight " + mHeaderView.getVisibleHeight() + " , " + mHeaderViewHeight);
                if (mEnablePullRefresh && (mHeaderView.getVisibleHeight() > 0 || deltaY > 0)) {
                    updateHeaderHeight(deltaY / OFFSET_RADIO);
                }
                break;
            default:    // 其他
                mLastY = -1; // reset
                Log.i(TAG, "getScrollY " + getScrollY());
                if (getScrollY() >= 0) {
                    if (mEnablePullRefresh && mHeaderView.getVisibleHeight() > mHeaderViewHeight) {
                        mPullRefreshing = true;
                        mHeaderView.setState(FHeader1.STATE_REFRESHING);
                    }
                    resetHeaderHeight();
                }
                break;
        }
        return super.onTouchEvent(ev);
    }

    @Override
    public void computeScroll() {
        if (mScroller.computeScrollOffset()) {
            if (mScrollBack == SCROLLBACK_HEADER) {
                mHeaderView.setVisibleHeight(mScroller.getCurrY());
            }
            postInvalidate();
        }
        super.computeScroll();
    }

}
