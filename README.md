# Datepicker

> 一款基于原生JS的简易日期选择器

项目演示: [DEMO](https://alienover.github.io/datepicker/)

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
