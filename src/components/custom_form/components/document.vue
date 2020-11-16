<template>
  <md-card>
    <md-card-content class="md-scrollbar" style="max-height: 800px;overflow: auto">
      <div class="markdown-body">
        <h1 id="toc_0">组件文档</h1>

        <h2 id="toc_1">控制型UI --- 发出指令使设备执行某个操作</h2>

        <h3 id="toc_2">Single Switch</h3>

        <p>开关型UI,适合设备的“开/关”等两个指令间的切换。</p>

        <h3 id="toc_3">Shift Control</h3>

        <p>多模式切换按钮，每个按钮代表一个设备状态或者工作模式，适合于设备的“模式1/模式2/模式3/...模式k”之间的切换，如电扇的风速1，2，3，4.</p>

        <h3 id="toc_4">Slider</h3>

        <p>滑动条，适合连续状态间的调节，如空调，冰箱的温度设定。</p>

        <h3 id="toc_5">Directiona Control</h3>

        <p>方向控制，控制设备（机器人，小车）的移动方向或者视频画面（来自于摄像头）的转向。</p>

        <h3 id="toc_6">Color Control</h3>

        <p>色彩控制，对于LED灯光的颜色进行调节。</p>

        <h2 id="toc_7">显示型UI --- 读取数据并展示在UI中</h2>

        <h3 id="toc_8">Single State Display</h3>

        <p>读取设备的状态信息并显示，如显示设备的“本次运行时间”，“当前工作电压”等。</p>

        <h3 id="toc_9">State Record Table</h3>

        <p>显示设备的历史状态信息，如显示设备的“历史开关记录”，“历史任务记录”。</p>

        <h3 id="toc_10">Video Stream</h3>

        <p>视频流，播放所连接摄像头的画面。</p>

        <h2 id="toc_11">记录型UI --- 为设备添加某条记录</h2>

        <h3 id="toc_12">Single Record Upload</h3>

        <p>添加单次记录，用户输入的字符串可以被解析为数字，文本，超链接等形式。</p>

        <h3 id="toc_13">Upload File</h3>

        <p>添加文件记录，例如为设备添加说明书的电子版。</p>

        <h3 id="toc_14">Calendar</h3>

        <p>日历，用户为当前设备在某个日期设置备忘提醒。</p>

        <h2 id="toc_15">页面逻辑组织UI --- 页面跳转</h2>

        <h3 id="toc_16">Jump</h3>

        <p>跳转到另一个页面。适用于当前设备所需的组件太多，设置层次逻辑，或者为将其它设备的UI链接到当前设备里。
          页面的前进后退等跳转操作都可以用此组件实现。</p>

      </div>


    </md-card-content>
  </md-card>
</template>

<script>
export default {
  name: "document"
}
</script>

<style scoped>
@import "markdown.css";
</style>
