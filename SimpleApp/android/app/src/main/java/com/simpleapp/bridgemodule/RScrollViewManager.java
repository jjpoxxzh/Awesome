package com.simpleapp.bridgemodule;


import android.annotation.TargetApi;
import android.graphics.Color;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ReactClippingViewGroupHelper;
import com.facebook.react.uimanager.Spacing;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewProps;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.annotations.ReactPropGroup;
import com.facebook.react.views.scroll.FpsListener;
import com.facebook.react.views.scroll.ReactHorizontalScrollView;
import com.facebook.react.views.scroll.ReactScrollViewCommandHelper;
import com.facebook.react.views.scroll.ReactScrollViewHelper;
import com.facebook.react.views.scroll.ScrollEventType;
import com.facebook.yoga.YogaConstants;
import com.simpleapp.view.RScrollView;

import java.util.Map;

import javax.annotation.Nullable;


@TargetApi(11)
@ReactModule(name = com.simpleapp.bridgemodule.RScrollViewManager.REACT_CLASS)
public class RScrollViewManager
        extends ViewGroupManager<RScrollView>
        implements ReactScrollViewCommandHelper.ScrollCommandHandler<RScrollView> {

    protected static final String REACT_CLASS = "RScrollView";

    private static final int[] SPACING_TYPES = {
            Spacing.ALL, Spacing.LEFT, Spacing.RIGHT, Spacing.TOP, Spacing.BOTTOM,
    };

    private @Nullable
    FpsListener mFpsListener = null;

    public RScrollViewManager() {
        this(null);
    }

    public RScrollViewManager(@Nullable FpsListener fpsListener) {
        mFpsListener = fpsListener;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public RScrollView createViewInstance(ThemedReactContext context) {
        return new RScrollView(context, mFpsListener);
    }

    @ReactProp(name = "scrollEnabled", defaultBoolean = true)
    public void setScrollEnabled(RScrollView view, boolean value) {
        view.setScrollEnabled(value);
    }

    @ReactProp(name = "showsVerticalScrollIndicator")
    public void setShowsVerticalScrollIndicator(RScrollView view, boolean value) {
        view.setVerticalScrollBarEnabled(value);
    }

    @ReactProp(name = ReactClippingViewGroupHelper.PROP_REMOVE_CLIPPED_SUBVIEWS)
    public void setRemoveClippedSubviews(RScrollView view, boolean removeClippedSubviews) {
        view.setRemoveClippedSubviews(removeClippedSubviews);
    }

    /**
     * Computing momentum events is potentially expensive since we post a runnable on the UI thread
     * to see when it is done.  We only do that if {@param sendMomentumEvents} is set to true.  This
     * is handled automatically in js by checking if there is a listener on the momentum events.
     *
     * @param view
     * @param sendMomentumEvents
     */
    @ReactProp(name = "sendMomentumEvents")
    public void setSendMomentumEvents(RScrollView view, boolean sendMomentumEvents) {
        view.setSendMomentumEvents(sendMomentumEvents);
    }

    /**
     * Tag used for logging scroll performance on this scroll view. Will force momentum events to be
     * turned on (see setSendMomentumEvents).
     *
     * @param view
     * @param scrollPerfTag
     */
    @ReactProp(name = "scrollPerfTag")
    public void setScrollPerfTag(RScrollView view, @Nullable String scrollPerfTag) {
        view.setScrollPerfTag(scrollPerfTag);
    }

    /**
     * When set, fills the rest of the scrollview with a color to avoid setting a background and
     * creating unnecessary overdraw.
     *
     * @param view
     * @param color
     */
    @ReactProp(name = "endFillColor", defaultInt = Color.TRANSPARENT, customType = "Color")
    public void setBottomFillColor(RScrollView view, int color) {
        view.setEndFillColor(color);
    }

    /**
     * Controls overScroll behaviour
     */
    @ReactProp(name = "overScrollMode")
    public void setOverScrollMode(RScrollView view, String value) {
        view.setOverScrollMode(ReactScrollViewHelper.parseOverScrollMode(value));
    }

    @Override
    public @Nullable
    Map<String, Integer> getCommandsMap() {
        return ReactScrollViewCommandHelper.getCommandsMap();
    }

    @Override
    public void receiveCommand(
            RScrollView scrollView,
            int commandId,
            @Nullable ReadableArray args) {
        ReactScrollViewCommandHelper.receiveCommand(this, scrollView, commandId, args);
    }

    @Override
    public void flashScrollIndicators(RScrollView scrollView) {
        scrollView.flashScrollIndicators();
    }

    @Override
    public void scrollTo(
            RScrollView scrollView, ReactScrollViewCommandHelper.ScrollToCommandData data) {
        if (data.mAnimated) {
            scrollView.smoothScrollTo(data.mDestX, data.mDestY);
        } else {
            scrollView.scrollTo(data.mDestX, data.mDestY);
        }
    }

    @ReactPropGroup(names = {
            ViewProps.BORDER_RADIUS,
            ViewProps.BORDER_TOP_LEFT_RADIUS,
            ViewProps.BORDER_TOP_RIGHT_RADIUS,
            ViewProps.BORDER_BOTTOM_RIGHT_RADIUS,
            ViewProps.BORDER_BOTTOM_LEFT_RADIUS
    }, defaultFloat = YogaConstants.UNDEFINED)
    public void setBorderRadius(RScrollView view, int index, float borderRadius) {
        if (!YogaConstants.isUndefined(borderRadius)) {
            borderRadius = PixelUtil.toPixelFromDIP(borderRadius);
        }

        if (index == 0) {
            view.setBorderRadius(borderRadius);
        } else {
            view.setBorderRadius(borderRadius, index - 1);
        }
    }

    @ReactProp(name = "borderStyle")
    public void setBorderStyle(RScrollView view, @Nullable String borderStyle) {
        view.setBorderStyle(borderStyle);
    }

    @ReactPropGroup(names = {
            ViewProps.BORDER_WIDTH,
            ViewProps.BORDER_LEFT_WIDTH,
            ViewProps.BORDER_RIGHT_WIDTH,
            ViewProps.BORDER_TOP_WIDTH,
            ViewProps.BORDER_BOTTOM_WIDTH,
    }, defaultFloat = YogaConstants.UNDEFINED)
    public void setBorderWidth(RScrollView view, int index, float width) {
        if (!YogaConstants.isUndefined(width)) {
            width = PixelUtil.toPixelFromDIP(width);
        }
        view.setBorderWidth(SPACING_TYPES[index], width);
    }

    @ReactPropGroup(names = {
            "borderColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderBottomColor"
    }, customType = "Color")
    public void setBorderColor(RScrollView view, int index, Integer color) {
        float rgbComponent =
                color == null ? YogaConstants.UNDEFINED : (float) (color & 0x00FFFFFF);
        float alphaComponent = color == null ? YogaConstants.UNDEFINED : (float) (color >>> 24);
        view.setBorderColor(SPACING_TYPES[index], rgbComponent, alphaComponent);
    }

    @Override
    public void scrollToEnd(
            RScrollView scrollView,
            ReactScrollViewCommandHelper.ScrollToEndCommandData data) {
        // ScrollView always has one child - the scrollable area
        int bottom =
                scrollView.getChildAt(0).getHeight() + scrollView.getPaddingBottom();
        if (data.mAnimated) {
            scrollView.smoothScrollTo(scrollView.getScrollX(), bottom);
        } else {
            scrollView.scrollTo(scrollView.getScrollX(), bottom);
        }
    }

    @Override
    public @Nullable
    Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return createExportedCustomDirectEventTypeConstants();
    }

    public static Map<String, Object> createExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put(ScrollEventType.SCROLL.getJSEventName(), MapBuilder.of("registrationName", "onScroll"))
                .put(ScrollEventType.BEGIN_DRAG.getJSEventName(), MapBuilder.of("registrationName", "onScrollBeginDrag"))
                .put(ScrollEventType.END_DRAG.getJSEventName(), MapBuilder.of("registrationName", "onScrollEndDrag"))
                .put(ScrollEventType.MOMENTUM_BEGIN.getJSEventName(), MapBuilder.of("registrationName", "onMomentumScrollBegin"))
                .put(ScrollEventType.MOMENTUM_END.getJSEventName(), MapBuilder.of("registrationName", "onMomentumScrollEnd"))
                .build();
    }
}