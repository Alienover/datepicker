;(function () {
  //为了避免污染全局对象,使用匿名函数执行

  var datepicker = {};
  var ele = {};

  /**
    * @desc 生成指定日期的当月数据
    * @param {Number} year 指定年份,选填
    * @param {Number} month 指定月份,选填
    * @param {Number} thisDate 指定日期,选填
    * @return {Array}
    */

  datepicker.getMonthData = function(year, month, thisDate) {

    var ret = {};
    ret.data = [];

    var today = ((!month || !year) && (typeof month == 'undefined')) ? new Date() :
                (!thisDate) ? new Date(year, (month - 1)) :
                new Date(year, (month - 1), thisDate);
    year = today.getFullYear();
    month = today.getMonth() + 1;

    ret.thisYear = year;
    ret.thisMonth = month;
    ret.thisDate = (!thisDate) ? 'undefined' : today.getDate();

    var firstDate = new Date(year, month - 1, 1),
        firstDateOfDay = firstDate.getDay(),

        lastDate = new Date(year, month, 0),
        lastDateOfDay = lastDate.getDay(),

        daysCount = lastDate.getDate(),

        head = - firstDateOfDay + 1,
        end = daysCount + (6 - lastDateOfDay);

    for (var i = head; i <= end; i++) {
      var thisMonth = month - 1;
      var date = new Date(year, month - 1, i);
      var order = (i <= 0) ? 0 : ((i > daysCount) ? 0 : 1);
      ret.data.push({
        showDate: date.getDate(),
        date: i,
        order: order
      });
    }
    return ret;
  };

  datepicker.ui =  {
    /**
      * @desc 初始化UI
      * @param {Number} year 指定年份,选填
      * @param {Number} month 指定月份,选填
      * @param {Number} date 指定日期,选填
      */

    init: function (year, month, date) {
      this.build();
      this.getDate(year, month, date);
    },

    /**
      * @desc 生成datepicker的基本UI,即年月显示,日期的表头
      */

    build: function() {
      var $ = ele;
      var initial = '';
      initial +=   '<div class="ui-datepicker-wrapper">';
      initial +=     '<div class="ui-datepicker-header">';
      initial +=       '<a href="javascript:void(0);" data-rel="prev" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>';
      initial +=       '<span class="ui-datepicker-display"><a class="ui-datepicker-display-year"></a> - <a class="ui-datepicker-display-month"></a></span>';
      initial +=       '<a href="javascript:void(0);" data-rel="next" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>';
      initial +=     '</div>';
      initial +=     '<div class="ui-datepicker-body">';
      initial +=        '<table>';
      initial +=          '<thead>';
      initial +=            '<tr>';
      initial +=              '<th>日</th>';
      initial +=              '<th>一</th>';
      initial +=              '<th>二</th>';
      initial +=              '<th>三</th>';
      initial +=              '<th>四</th>';
      initial +=              '<th>五</th>';
      initial +=              '<th>六</th>';
      initial +=            '</tr>';
      initial +=          '</thead>';
      initial +=          '<tbody>';
      initial +=          '</tbody>';
      initial +=         '<table>';
      initial +=     '</div>';
      initial +=   '</div>';

      $.innerHTML = initial;
    },

    /**
      * @desc 根据指定日期,获取当月数据
      * @param {Number} year 指定年份,选填
      * @param {Number} month 指定月份,选填
      * @param {Number} date 指定日期,选填
      */

    getDate: function (year, month, date) {
      var $ = ele,
          monthData = datepicker.getMonthData(year, month, date),
          thisDate = monthData.thisDate,

          tbody = '';
      for (var i = 0; i < monthData.data.length; i++) {
        var data = monthData.data[i];
        if ((i % 7) === 0) {
          tbody += '<tr>';
        }
        //通过两个判断
        //Boolean(data.order) 判断当前渲染的日期,是否为当月日期,ture为当月日期,false为上个月的或下个月的日期
        //(data.showDate == thisDate) 判断当前渲染的日期,是否为指定的日期,若无指定日期,则thisDate为undefined
        tbody += '<td class="' + ((Boolean(data.order)) ? ((data.showDate == thisDate) ? 'active' : '') : 'notCurrMonth ') + '" data-rel=\'' + data.date + '\'>' + data.showDate + '</td>';
        if ((i % 7) === 6) {
          tbody += '</tr>';
        }
      }

      $.querySelector('.ui-datepicker-display-year').text = monthData.thisYear;
      $.querySelector('.ui-datepicker-display-month').text = (monthData.thisMonth < 10) ? ("0" + monthData.thisMonth) : monthData.thisMonth;
      $.querySelector('tbody').innerHTML = tbody;
    },
  };

  /**
    * @desc 为datepicker区域内的绑定点击事件
    * 通过switch case 来判断当前点击的是哪一块
    * /prev/.test(rel) 判断是否点击上一个月按钮
    * /next/.test(rel) 判断是否点击下一个月按钮
    * (/[0-9]/i.test(rel)) 判断是否点击日期
    */
  datepicker.bindEvents = function () {
    var wrapper = ele.querySelector('.ui-datepicker-wrapper');
    wrapper.addEventListener('click', function (e) {
      var currYear = Number(wrapper.querySelector('.ui-datepicker-display-year').text),
          currMonth = Number(wrapper.querySelector('.ui-datepicker-display-month').text),
          rel = e.target.dataset.rel;
      ele = this.parentNode;
      switch (true) {
        case /prev/.test(rel):
          datepicker.ui.getDate(currYear, (currMonth - 1));
          break;
        case /next/.test(rel):
          datepicker.ui.getDate(currYear, (currMonth + 1));
          break;
        case (/[0-9]/i.test(rel)):
          datepicker.ui.getDate(currYear, currMonth, rel);
          break;
        default:
          break;
      }
    });
  };

  /**
    * @desc 用于获取当前被选中的日期
    * @param {String} symbol 指定日期的连接符,默认为'-'
    * @return {Object}
    */
  datepicker.getPickedDate = function (symbol) {
    var _this = this.ele;
    symbol = symbol || '-';
    var currYear = Number(_this.querySelector('.ui-datepicker-display-year').text),
        currMonth = Number(_this.querySelector('.ui-datepicker-display-month').text),
        currDate = Number(_this.querySelector('.ui-datepicker-body .active').innerHTML);
    return {
      "currYear:":currYear,
      "currMonth:":currMonth,
      "currDate:":currDate,
    };
  };

  /**
    * @desc datepicker 的初始化函数
    * @param {Object} configure 初始化时的配置对象,其中包括dom对象"ele",指定日期"date"
    * @return {Object} 返回操作当前对象以及相应的方法
    */
  datepicker.init = function (configure) {
    configure = configure || {};
    ele = (typeof configure.ele !== 'undefined') ? (configure.ele) : '.datepicker';
    ele = document.querySelector(ele);
    var date = (configure.date) ? configure.date.split('-') : new Date().toLocaleDateString().split('/');
    try {
      datepicker.ui.init(date[0], date[1], date[2]);
      datepicker.bindEvents();

      return {
        "ele": ele,
        "getPickedDate": datepicker.getPickedDate,
      };
    } catch (e) {
      console.log(e);
    }
  };

  /**
    * @desc 将datepicker的init函数,getPickedDate函数暴露给全局对象,以便使用者使用
    */
  window.datepicker = datepicker.init;
})();
