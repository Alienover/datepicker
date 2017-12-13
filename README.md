# Datepicker

> 一款基于原生JS的简易日期选择器

项目演示: [DEMO](https://alienover.github.io/datepicker/)

### LOG

*2017-12-13*
  * 添加了前端代码自动化构建工具`gulp`
  * 使用`gulp-uglify`和`gulp-clean-css`分别对前端的`JS`代码以及`CSS`代码进行压缩
  * 未压缩的源代码在`./assets/`下,压缩后的代码在`./public`下

### Usage
只需执行`datepicker()`函数即可以默认的形式初始化改日历,若需要指定特定的时间,则可以传入一个对象,其中包含主键为`date`,其值的格式为`YY-MM-DD`,`datepicker`渲染完成之后,返回该组件的`DOM`对象以及[相应的方法](#method)
``` javascript
  var date = datepicker({
    //选填,指定要生成的datepicker的容器,默认自动为ClassName = datepicker的容器
    ele: ".datepicker",
    //选填,指定日期,可指定年月,也可年月日,默认为系统当前时间
    date: "2017-11-11",
  });
```

### Stylesheet

#### Width
`datepicker`的宽度,是随其父容器的宽度变化而变化的

#### Height
`datepicker`的高度,分几部分,其中:

*Header part*
``` css
  .ui-datepicker-wrapper .ui-datepicker-header {
    line-height: 50px;
  }
```

*Week part*
``` css
  .ui-datepicker-wrapper .ui-datepicker-body table th{
    line-height: 50px;
  }
```

*Date part*
``` css
  .ui-datepicker-wrapper .ui-datepicker-body table td {
    line-height: 30px;
  }
```

#### Color
*Header part*
``` css
  .ui-datepicker-wrapper .ui-datepicker-header {
    background-color: #f0f0f0;
  }
```

*Date part*
``` css
  /* 日期格子 */
  .ui-datepicker-wrapper .ui-datepicker-body table td {
    border: 1px solid #f0f0f0;
  }
  /* Hover */
  .ui-datepicker-wrapper .ui-datepicker-body table td:hover {
    background-color: #f0f0f0;
  }
  /* Selected Active */
  .ui-datepicker-wrapper .ui-datepicker-body table tbody .active {
    background-color: #1abc9c!important;
    color: #fff;
  }
  /* Saturday and Sunday */
  .ui-datepicker-wrapper .ui-datepicker-body table tr td:nth-child(1),
  .ui-datepicker-wrapper .ui-datepicker-body table tr td:nth-last-child(1) {
    background-color: #f5f5f5;
  }
  /* Last month or Next month */
  .ui-datepicker-wrapper .ui-datepicker-body table tbody .notCurrMonth {
    color: #ccc;
  }
```


### Method

``` html
  <link rel="stylesheet" href="/css/datepicker.css">
```

#### date.gePickedDate(symbol)
``` javascript
  /**
    * @desc 用于获取当前被选中的日期
    * @param {String} symbol 指定日期的连接符,默认为'-'
    * @return {Object}
    */
```

使用指定的`symbol`,如果`symbol`为空,则使用`'-'`,作为连接符号,将当前选择的日期拼接起来,返回`{String}`类型,若未选择,则返回默认时间

``` javascript
  var date = datepicker({
    ele: '.date',
    date: '2017-12-12',
  });

  console.log(date.getPickedDate());
  //"2017-12-12"

  console.log(date.getPickedDate('/'));
  //"2017/12/12"
```
