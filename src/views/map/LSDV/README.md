    legend: {
        show: true, //是否显示
        type: "plain", // 图例的类型 'plain':普通图例  'scroll':可滚动翻页的图例
        zlevel: 1, // 所有图形的 zlevel 值。
        icon: "circle",
        top: "5%", // bottom:"20%" // 组件离容器的距离
        right: "5%", //left:"10%"  // // 组件离容器的距离
        width: "auto", // 图例组件的宽度
        height: "auto", // 图例组件的高度
        orient: "horizontal", // 图例列表的布局朝向。 'horizontal'  'vertical'
        align: "auto", // 图例标记和文本的对齐
        padding: 5, // 图例内边距
        itemWidth: 6, // 图例标记的图形宽度。
        itemGap: 20, // 图例每项之间的间隔。
        itemHeight: 14, //  图例标记的图形高度。
        symbolKeepAspect: true, // 如果图标（可能来自系列的 symbol 或用户自定义的 legend.data.icon）是 path:// 的形式，是否在缩放时保持该图形的长宽比。
        formatter: function (name) {
        return '{a|text}{a|   }{b|' +  name + '}'
        },
        selectedMode: true, // 图例选择的模式，
        inactiveColor: "#ccc", // 图例关闭时的颜色。
        textStyle: {
        color: "#556677", // 文字的颜色。
        fontStyle: "normal", // 文字字体的风格。
        fontWeight: "normal", // 文字字体的粗细。 'normal' 'bold'  'bolder' 'lighter'  100 | 200 | 300 | 400...
        fontFamily: "sans-serif", // 文字的字体系列。
        fontSize: 12, // 文字的字体大小。
        lineHeight: 20, // 行高。
        backgroundColor: "transparent", // 文字块背景色。
        borderColor: "transparent", // 文字块边框颜色。
        borderWidth: 0, // 文字块边框宽度。
        borderRadius: 0, // 文字块的圆角。
        padding: 0, // 文字块的内边距
        shadowColor: "transparent", // 文字块的背景阴影颜色
        shadowBlur: 0, // 文字块的背景阴影长度。
        shadowOffsetX: 0, // 文字块的背景阴影 X 偏移。
        shadowOffsetY: 0, // 文字块的背景阴影 Y 偏移。
        // width: 50, // 文字块的宽度。 默认
        // height: 40, // 文字块的高度 默认
        textBorderColor: "transparent", // 文字本身的描边颜色。
        textBorderWidth: 0, // 文字本身的描边宽度。
        textShadowColor: "transparent", // 文字本身的阴影颜色。
        textShadowBlur: 0, // 文字本身的阴影长度。
        textShadowOffsetX: 0, // 文字本身的阴影 X 偏移。
        textShadowOffsetY: 0, // 文字本身的阴影 Y 偏移。
        rich: {
        a: {
            color: "red",
            lineHeight: 10,
        },
            b: {
            color: "#fff",
            lineHeight: 10,
        },
        }, // 自定富文本样式
        },
    },
