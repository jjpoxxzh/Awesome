package com.lj.rn.adapterui;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;


import com.lj.rn.R;


public class AdapterActivity extends AppCompatActivity {

    /* 切换视图 */
    private TabLayout mTabLayout;
    private ViewPager mViewPager;
    

    private final int TAB_COUNT = 2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_adapter);

        mTabLayout = (TabLayout) findViewById(R.id.tablayout);
        mViewPager = (ViewPager) findViewById(R.id.viewpager);

        mViewPager.setAdapter(new FragmentPagerAdapter(getSupportFragmentManager()) {
            @Override
            public Fragment getItem(int i) {
                if (i == 1) return new MutliItemTypeFragment();
                return new SingleItemTypeFragment();
            }

            @Override
            public CharSequence getPageTitle(int position) {
                switch (position) {
                    case 0:
                        return "Single Item Type";
                    case 1:
                        return "Mutli Item Type";
                }
                return "Helloworld";
            }

            @Override
            public int getCount() {
                return TAB_COUNT;
            }
        });

        mTabLayout.setupWithViewPager(mViewPager);
    }
}
