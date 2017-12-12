(function () {
  var datepicker = {};

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

    var firstDate = new Date(year, month - 1, 1);
    var firstDateOfDay = firstDate.getDay();

    var lastDate = new Date(year, month, 0);
    var lastDateOfDay = lastDate.getDay();

    var daysCount = lastDate.getDate();

    var head = - firstDateOfDay + 1;
    var end = daysCount + (6 - lastDateOfDay);

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
    $: document.querySelector('.datepicker'),
    init: function (year, month, date) {
      this.build();
      this.getDate(year, month, date);
    },
    build: function() {
      var $ = this.$;
      var initial = '';
      initial +=   '<div class="ui-datepicker-wrapper">';
      initial +=     '<div class="ui-datepicker-header">';
      initial +=       '<a data-rel="prev" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>';
      initial +=       '<span class="ui-datepicker-display"><a class="ui-datepicker-display-year"></a> - <a class="ui-datepicker-display-month"></a></span>';
      initial +=       '<a data-rel="next" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>';
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
    getDate: function (year, month, date) {
      var $ = this.$;
      var monthData = datepicker.getMonthData(year, month, date);
      var thisDate = monthData.thisDate;

      var tbody = '';
      for (var i = 0; i < monthData.data.length; i++) {
        var data = monthData.data[i];
        if ((i % 7) === 0) {
          tbody += '<tr>';
        }
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

  datepicker.bindEvents = function () {
    var $ = document.querySelector('.ui-datepicker-wrapper');
    $.addEventListener('click', function (e) {
      var currYear = Number($.querySelector('.ui-datepicker-display-year').text);
      var currMonth = Number($.querySelector('.ui-datepicker-display-month').text);
      var rel = e.target.dataset.rel;
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
          console.log(/[0-9]+/.test(rel));
          break;
      }
    });
  };

  datepicker.init = function (object) {
    var date = (object.date) ? object.date.split('-') : "";
    this.ui.init(date[0], date[1], date[2]);
    this.bindEvents();
  };

  window.datepicker = datepicker;
})();
