package com.simpleapp.view;


import android.content.Context;
import android.content.res.Resources;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.simpleapp.R;

import java.util.Map;

/**
 * 自定义的TextView <br>
 * 修改左、下边框，改变背景色，改变文本颜色，修改文本起始位置 <br>
 */
public class ItemTextView extends TextView implements View.OnLongClickListener {

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

    private OnCustomBehavior customBehavior;

    public void setCustomBehavior(OnCustomBehavior customBehavior) {
        this.customBehavior = customBehavior;
    }


    public ItemTextView(Context context) {
        super(context);
        setLongClickable(true);
        init();
    }

    public ItemTextView(Context context, AttributeSet attrs) {
        super(context, attrs);
        setLongClickable(true);
        init();
    }

    public ItemTextView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        setLongClickable(true);
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
        if (customBehavior != null) {
            customBehavior.onTouch(this);
        }
        return super.onTouchEvent(event);
    }


    @Override
    public boolean onLongClick(View v) {
        if (customBehavior != null) {
            customBehavior.onLongClick(this);
        }
        return true;
    }


    /**
     * 自定义的方法事件
     */
    public interface OnCustomBehavior {

        void onTouch(View view);

        void onLongClick(View view);
    }

}
