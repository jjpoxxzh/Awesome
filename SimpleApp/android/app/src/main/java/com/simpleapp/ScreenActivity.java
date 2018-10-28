package com.simpleapp;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.Arrays;
import java.util.List;

/**
 * 主界面视图
 */
public class ScreenActivity extends AppCompatActivity {

    private Context context;
    private ListView mListView;
    private ArrayAdapter<String> mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_screen);
        context = this;
        mListView = findViewById(R.id.listvie);
        List<String> activity_list = Arrays.asList(getResources().getStringArray(R.array.activity_name));
        mAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, activity_list);
        mListView.setAdapter(mAdapter);
        mListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent();
                if (position == 0) {
                    intent.setClass(context, MainActivity.class);
                    startActivity(intent);
                } else if (position == 1) {

                } else if (position == 2) {

                }
            }
        });
    }
}
