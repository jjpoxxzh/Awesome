package com.simpleapp.view;


import android.content.Context;
import android.content.res.Resources;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.simpleapp.R;

/**
 * 自定义的TextView <br>
 * 修改左、下边框，改变背景色，改变文本颜色，修改文本起始位置 <br>
 */
public class ToDoListItemView extends TextView {

    /**
     * 绘制间隔线条的画笔
     */
    private Paint marginPaint;
    /**
     * 绘制边缘线条的画笔
     */
    private Paint linePaint;
    /**
     * 页面颜色
     */
    private int paperColor;
    /**
     * 页边距
     */
    private float margin;

    public ToDoListItemView(Context context) {
        super(context);
        init();
    }

    public ToDoListItemView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public ToDoListItemView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init();
    }

    private void init() {
        // 获得对资源表的引用
        Resources rs = getResources();
        // 创建将在onDraw方法中使用的画刷
        marginPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        marginPaint.setColor(rs.getColor(R.color.notepad_margin));
        linePaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        linePaint.setColor(rs.getColor(R.color.notepad_lines));
        // 获得页面背景色和边缘宽度
        paperColor = rs.getColor(R.color.notepad_paper);
        margin = rs.getDimension(R.dimen.notepad_margin);

    }

    @Override
    protected void onDraw(Canvas canvas) {
        // 绘制页面的颜色
        canvas.drawColor(paperColor);
        // 绘制左边距线
        canvas.drawLine(0, 0, 0, getMeasuredHeight(), linePaint);
        // 绘制下边距线
        canvas.drawLine(0, getMeasuredHeight(), getMeasuredWidth(), getMeasuredHeight(), linePaint);

        // 绘制左边线条
        canvas.drawLine(margin, 0, margin, getMeasuredHeight(), marginPaint);

        canvas.save();
        // 移动画布，让文本跨过边缘，此处只x方向移动margin，则表未水平移动
        canvas.translate(margin, 0);

        // 使用TextView基类渲染文本
        super.onDraw(canvas);
        canvas.restore();
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        /**
         * 触碰方法，由于是给JS响应，而不是给用于原生重写内容，故直接触发通知来引起JS事件
         */
        WritableMap params = Arguments.createMap();
        params.putString("message", "MyMessage");
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "topChange", params);
        System.out.println("----onTouchEvent----");
        return super.onTouchEvent(event);
    }

}
