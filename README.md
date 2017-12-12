# datepicker

### 使用
HTML中需要添加一个类名为datepicker的容器,并引入相应的CSS样式表和JS文件
```html
  <link rel="stylesheet" href="/css/datepicker.css">
  <div class="datepicker"></div>
  <script type="text/javascript" src="datepicker.js"></script>
```

只需执行datepicker.init()函数即可以默认的形式初始化改日历,若需要指定特定的时间,则可以传入一个对象,其中包含主键为date,其值的格式为"YY-MM-DD"
``` javascript
  datepicker.init({
    date: "2017-11-11",
  })
```
