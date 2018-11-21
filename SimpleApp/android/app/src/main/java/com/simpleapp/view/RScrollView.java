package com.simpleapp.view;


import android.util.Log;
import android.view.MotionEvent;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.views.scroll.FpsListener;
import com.facebook.react.views.scroll.ReactScrollView;

import javax.annotation.Nullable;

public class RScrollView extends ReactScrollView {

    private static final String TAG = "RScrollView";

    private float distanceX, distanceY;
    private float LastX, LastY;


    public RScrollView(ReactContext context) {
        super(context);
    }

    public RScrollView(ReactContext context, @Nullable FpsListener fpsListener) {
        super(context, fpsListener);
    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
//        Log.i(TAG, ev.getRawY() + " ：" + getScrollY());
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                Log.i(TAG, "---> 调用dispatchTouchEvent()--->ACTION_DOWN");
                break;
            case MotionEvent.ACTION_MOVE:
                System.out.println("---> 调用dispatchTouchEvent()--->ACTION_MOVE");
                break;
            case MotionEvent.ACTION_UP:
                System.out.println("---> dispatchTouchEvent()--->ACTION_UP");
            default:
                break;
        }
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                distanceX = 0f;
                distanceY = 0f;
                LastX = ev.getX();
                LastY = ev.getY();
                break;
            case MotionEvent.ACTION_MOVE:

                final float currentX = ev.getX();
                final float currentY = ev.getY();

                distanceX += currentX - LastX;
                distanceY += currentY - LastY;

                LastX = currentX;
                LastY = currentY;

//                Log.i(TAG, distanceY + " ");

                if (getScrollY()<=0 && distanceY > 0) {
                    return true;
                }
                break;
            case MotionEvent.ACTION_UP:
                break;
        }
        return super.dispatchTouchEvent(ev);
    }

    @Override
    public boolean onInterceptHoverEvent(MotionEvent event) {
        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                Log.i(TAG, "调用onInterceptHoverEvent()--->ACTION_DOWN");
                break;
            case MotionEvent.ACTION_MOVE:
                Log.i(TAG, "调用onInterceptHoverEvent()--->ACTION_MOVE");
                break;
            case MotionEvent.ACTION_UP:
                Log.i(TAG, "调用onInterceptHoverEvent()--->ACTION_UP");
            default:
                break;
        }
        return super.onInterceptHoverEvent(event);
    }

    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                Log.i(TAG, "调用onTouchEvent()--->ACTION_DOWN");
                break;
            case MotionEvent.ACTION_MOVE:
                Log.i(TAG, "调用onTouchEvent()--->ACTION_MOVE");
                break;
            case MotionEvent.ACTION_UP:
                Log.i(TAG, "调用onTouchEvent()--->ACTION_UP");
            default:
                break;
        }
        return super.onTouchEvent(ev);
    }
}
