package com.simpleapp.view;


import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.widget.TextView;

import com.simpleapp.R;


/**
 * 字母索引列表，一般用于通讯录
 * （注意：自定义视图必须是public的，默认为包可见，运行没有问题但生成apk会出问题）
 */
public class LetterView extends TextView {

    /**
     * 字母数组
     */
    private String[] letters;
    /**
     * 选择的字母索引
     */
    private int selectedIndex = -1;
    /**
     * 背景画笔
     */
    private Paint paintBG;
    /**
     * 正常情况下的画笔（抗据齿、黑色）
     */
    private Paint paintNormal;
    /**
     * 碰触时的画笔（抗据齿、粗体、蓝色）
     */
    private Paint paintPress;
    /**
     * #3399ff为蓝颜色
     */
    private static final int A_BLUE_COLOR = 0xff3399ff;
    /**
     * 碰触监听器
     */
    public OnTouchLettersListener onTouchLettersListener;

    private float letterSize;

    public void setOnTouchLettersListener(OnTouchLettersListener onTouchLettersListener) {
        this.onTouchLettersListener = onTouchLettersListener;
    }

    public LetterView(Context context) {
        super(context);
        init();
    }

    public LetterView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public LetterView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init();
    }

    private void init() {

        paintBG = new Paint(Paint.ANTI_ALIAS_FLAG);
        paintBG.setColor(Color.YELLOW);
        letterSize = getTextSize();
        // 初始化画笔
        paintNormal = new Paint(Paint.ANTI_ALIAS_FLAG);
//		paintNormal.setTypeface(Typeface.DEFAULT_BOLD);
        paintNormal.setColor(Color.BLACK);
        paintNormal.setTextSize(letterSize);

        paintPress = new Paint(Paint.ANTI_ALIAS_FLAG);
        paintPress.setTypeface(Typeface.DEFAULT_BOLD);
        paintPress.setColor(A_BLUE_COLOR);
        paintPress.setTextSize(letterSize);

        letters = new String[]{"↑", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
                "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "#"};
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        // 计算视图宽高
        int height = getHeight();
        int width = getWidth();
        int interval = height / letters.length;
        for (int i = 0; i < letters.length; i++) {
            // 计算字母的中心坐标
            float xPos = width / 2 - paintNormal.measureText(letters[i]) / 2;
            float yPos = interval * (i + 1);
            if (i == selectedIndex) { // 被选择的字母颜色变蓝
                canvas.drawText(letters[i], xPos, yPos, paintPress);
            } else {
                canvas.drawText(letters[i], xPos, yPos, paintNormal);
            }
        }
    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent event) {
        float y = event.getY();
        // 计算手指相对于字母的位置（通过等比式计算：手指y坐标/视图高 = 字母索引/字母长度）
        int index = (int) (y / getHeight() * letters.length);
        if (index >= 0 && index < letters.length) {
            switch (event.getAction()) { // 触碰到字母列表
                case MotionEvent.ACTION_MOVE:
                    if (selectedIndex != index) {
                        setCurrentLetter(index);
                    }
                    break;
                case MotionEvent.ACTION_DOWN:
                    setCurrentLetter(index);
                    break;
                case MotionEvent.ACTION_UP:
                    resetLetter();
                    break;
            }
        } else { // 对于有padding的情况，点击的位置可能在字母列表的上边或者下边
            resetLetter();
        }
        invalidate();
        return true;
    }

    private void resetLetter() {
        setBackgroundResource(0);
        selectedIndex = -1;
        if (onTouchLettersListener != null) {
            onTouchLettersListener.onTouchLettersUp(this);
        }
    }

    private void setCurrentLetter(int index) {
        setBackgroundResource(R.drawable.letter_background);
        selectedIndex = index;
        if (onTouchLettersListener != null) {
            onTouchLettersListener.onTouchLettersDown(this,letters[selectedIndex]);
        }
    }

    /**
     * 碰触监听
     */
    public interface OnTouchLettersListener {

        /**
         * 手指碰触
         */
        void onTouchLettersDown(LetterView lv,String letter);

        /**
         * 手指移开
         */
        void onTouchLettersUp(LetterView lv);
    }


}
