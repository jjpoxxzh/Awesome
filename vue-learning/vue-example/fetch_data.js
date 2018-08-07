"use strict"

var apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha='

/**
 * Actual demo
 */

var demo = new Vue({
  el: '#demo',
  data: {
    branches: ['master', 'dev'],
    currentBranch: 'master',
    commits: null,
  },
  beforeCreate: function () {
    console.group('beforeCreate 创建前状态===============》');
    console.log("%c%s", "color:red", "el ：" + this.$el);   // undefined
    console.log("%c%s", "color:green", "data ：" + this.$data);   // undefined
  },
  created: function () {
    console.group('created 创建完毕状态===============》');
    console.log("%c%s", "color:red", "el ：" + this.$el);   // undefined
    console.log("%c%s", "color:green", "data ：" + JSON.stringify(this.$data));   // 已被初始化
    console.log("%c%s", "color:green", "commits ：" + this.commits);
    console.groupEnd();
    console.groupEnd();
    this.fetchData()
  },
  beforeMount: function () {
    console.group('beforeMount 挂载前状态===============》');
    console.log("%c%s", "color:red", "el ：" + (this.$el));   // 已被初始化，但模板未替换
    console.log(this.$el);
    console.log("%c%s", "color:green", "data ：" + JSON.stringify(this.$data));   // 已被初始化

  },
  mounted: function () {
    console.group('mounted 挂载结束状态===============》');
    console.log("%c%s", "color:red", "el ：" + this.$el);   //已被初始化，但模板已替换
    console.log(this.$el);
    console.log("%c%s", "color:green", "data ：" + JSON.stringify(this.$data));   // 已被初始化
    console.groupEnd();
    console.groupEnd();
  },
  beforeUpdate: function () {
    console.group('beforeUpdate 更新前状态===============》');
    console.log("%c%s", "color:red", "el ：" + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:green", "data ：" + this.$data);
    console.log("%c%s", "color:green", "commits ：" + this.commits);
  },
  updated: function () {
    console.group('updated 更新完成状态===============》');
    console.log("%c%s", "color:red", "el ：" + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:green", "data ：" + this.$data);
    console.log("%c%s", "color:green", "commits ：" + this.commits);
    console.groupEnd();
    console.groupEnd();
  },
  beforeDestroy: function () {
    console.group('beforeDestroy 销毁前状态===============》');
    console.log("%c%s", "color:red", "el ：" + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:green", "data ：" + this.$data);
    console.log("%c%s", "color:green", "commits ：" + this.commits);
  },
  destroyed: function () {
    console.group('destroyed 销毁完成状态===============》');
    console.log("%c%s", "color:red", "el ：" + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:green", "data ：" + this.$data);
    console.log("%c%s", "color:green", "commits ：" + this.commits);
    console.groupEnd();
    console.groupEnd();
  },
  watch: {
    currentBranch: 'fetchData'
  },
  filters: {  // 过滤器
    truncate: function (v) {
      // 如果含换行符，则取换行符前面的内容
      var newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate: function (v) {
      // 将T或Z替换为空格
      return v.replace(/T|Z/g, ' ')
    }
  },

  methods: {
    fetchData: function () {
      var xhr = new XMLHttpRequest()
      var self = this
      xhr.open('GET', apiURL + self.currentBranch)
      xhr.onload = function () {
        self.commits = JSON.parse(xhr.responseText)
        console.log(self.commits[0].html_url)
      }
      xhr.send()
    }
  }
})

