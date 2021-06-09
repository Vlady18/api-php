!function (t, e, i) {
  !function () {
    var s,
        a,
        n,
        h = "2.2.3",
        o = "datepicker",
        r = ".datepicker-here",
        c = !1,
        d = '<div class="datepicker"><i class="datepicker--pointer"></i><nav class="datepicker--nav"></nav><div class="datepicker--content"></div></div>',
        l = { classes: "", inline: !1, language: "ru", startDate: new Date(), firstDay: "", weekends: [6, 0], dateFormat: "", altField: "", altFieldDateFormat: "@", toggleSelected: !0, keyboardNav: !0, position: "bottom left", offset: 12, view: "days", minView: "days", showOtherMonths: !0, selectOtherMonths: !0, moveToOtherMonthsOnSelect: !0, showOtherYears: !0, selectOtherYears: !0, moveToOtherYearsOnSelect: !0, minDate: "", maxDate: "", disableNavWhenOutOfRange: !0, multipleDates: !1, multipleDatesSeparator: ",", range: !1, todayButton: !1, clearButton: !1, showEvent: "focus", autoClose: !1, monthsField: "monthsShort", prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>', nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>', navTitles: { days: "MM, <i>yyyy</i>", months: "yyyy", years: "yyyy1 - yyyy2" }, timepicker: !1, onlyTimepicker: !1, dateTimeSeparator: " ", timeFormat: "", minHours: 0, maxHours: 24, minMinutes: 0, maxMinutes: 59, hoursStep: 1, minutesStep: 1, onSelect: "", onShow: "", onHide: "", onChangeMonth: "", onChangeYear: "", onChangeDecade: "", onChangeView: "", onRenderCell: "" },
        u = { ctrlRight: [17, 39], ctrlUp: [17, 38], ctrlLeft: [17, 37], ctrlDown: [17, 40], shiftRight: [16, 39], shiftUp: [16, 38], shiftLeft: [16, 37], shiftDown: [16, 40], altUp: [18, 38], altRight: [18, 39], altLeft: [18, 37], altDown: [18, 40], ctrlShiftUp: [16, 17, 38] },
        m = function (t, a) {
      this.el = t, this.$el = e(t), this.opts = e.extend(!0, {}, l, a, this.$el.data()), s == i && (s = e("body")), this.opts.startDate || (this.opts.startDate = new Date()), "INPUT" == this.el.nodeName && (this.elIsInput = !0), this.opts.altField && (this.$altField = "string" == typeof this.opts.altField ? e(this.opts.altField) : this.opts.altField), this.inited = !1, this.visible = !1, this.silent = !1, this.currentDate = this.opts.startDate, this.currentView = this.opts.view, this._createShortCuts(), this.selectedDates = [], this.views = {}, this.keys = [], this.minRange = "", this.maxRange = "", this._prevOnSelectValue = "", this.init();
    };n = m, n.prototype = { VERSION: h, viewIndexes: ["days", "months", "years"], init: function () {
        c || this.opts.inline || !this.elIsInput || this._buildDatepickersContainer(), this._buildBaseHtml(), this._defineLocale(this.opts.language), this._syncWithMinMaxDates(), this.elIsInput && (this.opts.inline || (this._setPositionClasses(this.opts.position), this._bindEvents()), this.opts.keyboardNav && !this.opts.onlyTimepicker && this._bindKeyboardEvents(), this.$datepicker.on("mousedown", this._onMouseDownDatepicker.bind(this)), this.$datepicker.on("mouseup", this._onMouseUpDatepicker.bind(this))), this.opts.classes && this.$datepicker.addClass(this.opts.classes), this.opts.timepicker && (this.timepicker = new e.fn.datepicker.Timepicker(this, this.opts), this._bindTimepickerEvents()), this.opts.onlyTimepicker && this.$datepicker.addClass("-only-timepicker-"), this.views[this.currentView] = new e.fn.datepicker.Body(this, this.currentView, this.opts), this.views[this.currentView].show(), this.nav = new e.fn.datepicker.Navigation(this, this.opts), this.view = this.currentView, this.$el.on("clickCell.adp", this._onClickCell.bind(this)), this.$datepicker.on("mouseenter", ".datepicker--cell", this._onMouseEnterCell.bind(this)), this.$datepicker.on("mouseleave", ".datepicker--cell", this._onMouseLeaveCell.bind(this)), this.inited = !0;
      }, _createShortCuts: function () {
        this.minDate = this.opts.minDate ? this.opts.minDate : new Date(-86399999136e5), this.maxDate = this.opts.maxDate ? this.opts.maxDate : new Date(86399999136e5);
      }, _bindEvents: function () {
        this.$el.on(this.opts.showEvent + ".adp", this._onShowEvent.bind(this)), this.$el.on("mouseup.adp", this._onMouseUpEl.bind(this)), this.$el.on("blur.adp", this._onBlur.bind(this)), this.$el.on("keyup.adp", this._onKeyUpGeneral.bind(this)), e(t).on("resize.adp", this._onResize.bind(this)), e("body").on("mouseup.adp", this._onMouseUpBody.bind(this));
      }, _bindKeyboardEvents: function () {
        this.$el.on("keydown.adp", this._onKeyDown.bind(this)), this.$el.on("keyup.adp", this._onKeyUp.bind(this)), this.$el.on("hotKey.adp", this._onHotKey.bind(this));
      }, _bindTimepickerEvents: function () {
        this.$el.on("timeChange.adp", this._onTimeChange.bind(this));
      }, isWeekend: function (t) {
        return -1 !== this.opts.weekends.indexOf(t);
      }, _defineLocale: function (t) {
        "string" == typeof t ? (this.loc = e.fn.datepicker.language[t], this.loc || (console.warn("Can't find language \"" + t + '" in Datepicker.language, will use "ru" instead'), this.loc = e.extend(!0, {}, e.fn.datepicker.language.ru)), this.loc = e.extend(!0, {}, e.fn.datepicker.language.ru, e.fn.datepicker.language[t])) : this.loc = e.extend(!0, {}, e.fn.datepicker.language.ru, t), this.opts.dateFormat && (this.loc.dateFormat = this.opts.dateFormat), this.opts.timeFormat && (this.loc.timeFormat = this.opts.timeFormat), "" !== this.opts.firstDay && (this.loc.firstDay = this.opts.firstDay), this.opts.timepicker && (this.loc.dateFormat = [this.loc.dateFormat, this.loc.timeFormat].join(this.opts.dateTimeSeparator)), this.opts.onlyTimepicker && (this.loc.dateFormat = this.loc.timeFormat);var i = this._getWordBoundaryRegExp;(this.loc.timeFormat.match(i("aa")) || this.loc.timeFormat.match(i("AA"))) && (this.ampm = !0);
      }, _buildDatepickersContainer: function () {
        c = !0, s.append('<div class="datepickers-container" id="datepickers-container"></div>'), a = e("#datepickers-container");
      }, _buildBaseHtml: function () {
        var t,
            i = e('<div class="datepicker-inline">');t = "INPUT" == this.el.nodeName ? this.opts.inline ? i.insertAfter(this.$el) : a : i.appendTo(this.$el), this.$datepicker = e(d).appendTo(t), this.$content = e(".datepicker--content", this.$datepicker), this.$nav = e(".datepicker--nav", this.$datepicker);
      }, _triggerOnChange: function () {
        if (!this.selectedDates.length) {
          if ("" === this._prevOnSelectValue) return;return this._prevOnSelectValue = "", this.opts.onSelect("", "", this);
        }var t,
            e = this.selectedDates,
            i = n.getParsedDate(e[0]),
            s = this,
            a = new Date(i.year, i.month, i.date, i.hours, i.minutes);t = e.map(function (t) {
          return s.formatDate(s.loc.dateFormat, t);
        }).join(this.opts.multipleDatesSeparator), (this.opts.multipleDates || this.opts.range) && (a = e.map(function (t) {
          var e = n.getParsedDate(t);return new Date(e.year, e.month, e.date, e.hours, e.minutes);
        })), this._prevOnSelectValue = t, this.opts.onSelect(t, a, this);
      }, next: function () {
        var t = this.parsedDate,
            e = this.opts;switch (this.view) {case "days":
            this.date = new Date(t.year, t.month + 1, 1), e.onChangeMonth && e.onChangeMonth(this.parsedDate.month, this.parsedDate.year);break;case "months":
            this.date = new Date(t.year + 1, t.month, 1), e.onChangeYear && e.onChangeYear(this.parsedDate.year);break;case "years":
            this.date = new Date(t.year + 10, 0, 1), e.onChangeDecade && e.onChangeDecade(this.curDecade);}
      }, prev: function () {
        var t = this.parsedDate,
            e = this.opts;switch (this.view) {case "days":
            this.date = new Date(t.year, t.month - 1, 1), e.onChangeMonth && e.onChangeMonth(this.parsedDate.month, this.parsedDate.year);break;case "months":
            this.date = new Date(t.year - 1, t.month, 1), e.onChangeYear && e.onChangeYear(this.parsedDate.year);break;case "years":
            this.date = new Date(t.year - 10, 0, 1), e.onChangeDecade && e.onChangeDecade(this.curDecade);}
      }, formatDate: function (t, e) {
        e = e || this.date;var i,
            s = t,
            a = this._getWordBoundaryRegExp,
            h = this.loc,
            o = n.getLeadingZeroNum,
            r = n.getDecade(e),
            c = n.getParsedDate(e),
            d = c.fullHours,
            l = c.hours,
            u = t.match(a("aa")) || t.match(a("AA")),
            m = "am",
            p = this._replacer;switch (this.opts.timepicker && this.timepicker && u && (i = this.timepicker._getValidHoursFromDate(e, u), d = o(i.hours), l = i.hours, m = i.dayPeriod), !0) {case /@/.test(s):
            s = s.replace(/@/, e.getTime());case /aa/.test(s):
            s = p(s, a("aa"), m);case /AA/.test(s):
            s = p(s, a("AA"), m.toUpperCase());case /dd/.test(s):
            s = p(s, a("dd"), c.fullDate);case /d/.test(s):
            s = p(s, a("d"), c.date);case /DD/.test(s):
            s = p(s, a("DD"), h.days[c.day]);case /D/.test(s):
            s = p(s, a("D"), h.daysShort[c.day]);case /mm/.test(s):
            s = p(s, a("mm"), c.fullMonth);case /m/.test(s):
            s = p(s, a("m"), c.month + 1);case /MM/.test(s):
            s = p(s, a("MM"), this.loc.months[c.month]);case /M/.test(s):
            s = p(s, a("M"), h.monthsShort[c.month]);case /ii/.test(s):
            s = p(s, a("ii"), c.fullMinutes);case /i/.test(s):
            s = p(s, a("i"), c.minutes);case /hh/.test(s):
            s = p(s, a("hh"), d);case /h/.test(s):
            s = p(s, a("h"), l);case /yyyy/.test(s):
            s = p(s, a("yyyy"), c.year);case /yyyy1/.test(s):
            s = p(s, a("yyyy1"), r[0]);case /yyyy2/.test(s):
            s = p(s, a("yyyy2"), r[1]);case /yy/.test(s):
            s = p(s, a("yy"), c.year.toString().slice(-2));}return s;
      }, _replacer: function (t, e, i) {
        return t.replace(e, function (t, e, s, a) {
          return e + i + a;
        });
      }, _getWordBoundaryRegExp: function (t) {
        var e = "\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;";return new RegExp("(^|>|" + e + ")(" + t + ")($|<|" + e + ")", "g");
      }, selectDate: function (t) {
        var e = this,
            i = e.opts,
            s = e.parsedDate,
            a = e.selectedDates,
            h = a.length,
            o = "";if (Array.isArray(t)) return void t.forEach(function (t) {
          e.selectDate(t);
        });if (t instanceof Date) {
          if (this.lastSelectedDate = t, this.timepicker && this.timepicker._setTime(t), e._trigger("selectDate", t), this.timepicker && (t.setHours(this.timepicker.hours), t.setMinutes(this.timepicker.minutes)), "days" == e.view && t.getMonth() != s.month && i.moveToOtherMonthsOnSelect && (o = new Date(t.getFullYear(), t.getMonth(), 1)), "years" == e.view && t.getFullYear() != s.year && i.moveToOtherYearsOnSelect && (o = new Date(t.getFullYear(), 0, 1)), o && (e.silent = !0, e.date = o, e.silent = !1, e.nav._render()), i.multipleDates && !i.range) {
            if (h === i.multipleDates) return;e._isSelected(t) || e.selectedDates.push(t);
          } else i.range ? 2 == h ? (e.selectedDates = [t], e.minRange = t, e.maxRange = "") : 1 == h ? (e.selectedDates.push(t), e.maxRange ? e.minRange = t : e.maxRange = t, n.bigger(e.maxRange, e.minRange) && (e.maxRange = e.minRange, e.minRange = t), e.selectedDates = [e.minRange, e.maxRange]) : (e.selectedDates = [t], e.minRange = t) : e.selectedDates = [t];e._setInputValue(), i.onSelect && e._triggerOnChange(), i.autoClose && !this.timepickerIsActive && (i.multipleDates || i.range ? i.range && 2 == e.selectedDates.length && e.hide() : e.hide()), e.views[this.currentView]._render();
        }
      }, removeDate: function (t) {
        var e = this.selectedDates,
            i = this;if (t instanceof Date) return e.some(function (s, a) {
          return n.isSame(s, t) ? (e.splice(a, 1), i.selectedDates.length ? i.lastSelectedDate = i.selectedDates[i.selectedDates.length - 1] : (i.minRange = "", i.maxRange = "", i.lastSelectedDate = ""), i.views[i.currentView]._render(), i._setInputValue(), i.opts.onSelect && i._triggerOnChange(), !0) : void 0;
        });
      }, today: function () {
        this.silent = !0, this.view = this.opts.minView, this.silent = !1, this.date = new Date(), this.opts.todayButton instanceof Date && this.selectDate(this.opts.todayButton);
      }, clear: function () {
        this.selectedDates = [], this.minRange = "", this.maxRange = "", this.views[this.currentView]._render(), this._setInputValue(), this.opts.onSelect && this._triggerOnChange();
      }, update: function (t, i) {
        var s = arguments.length,
            a = this.lastSelectedDate;return 2 == s ? this.opts[t] = i : 1 == s && "object" == typeof t && (this.opts = e.extend(!0, this.opts, t)), this._createShortCuts(), this._syncWithMinMaxDates(), this._defineLocale(this.opts.language), this.nav._addButtonsIfNeed(), this.opts.onlyTimepicker || this.nav._render(), this.views[this.currentView]._render(), this.elIsInput && !this.opts.inline && (this._setPositionClasses(this.opts.position), this.visible && this.setPosition(this.opts.position)), this.opts.classes && this.$datepicker.addClass(this.opts.classes), this.opts.onlyTimepicker && this.$datepicker.addClass("-only-timepicker-"), this.opts.timepicker && (a && this.timepicker._handleDate(a), this.timepicker._updateRanges(), this.timepicker._updateCurrentTime(), a && (a.setHours(this.timepicker.hours), a.setMinutes(this.timepicker.minutes))), this._setInputValue(), this;
      }, _syncWithMinMaxDates: function () {
        var t = this.date.getTime();this.silent = !0, this.minTime > t && (this.date = this.minDate), this.maxTime < t && (this.date = this.maxDate), this.silent = !1;
      }, _isSelected: function (t, e) {
        var i = !1;return this.selectedDates.some(function (s) {
          return n.isSame(s, t, e) ? (i = s, !0) : void 0;
        }), i;
      }, _setInputValue: function () {
        var t,
            e = this,
            i = e.opts,
            s = e.loc.dateFormat,
            a = i.altFieldDateFormat,
            n = e.selectedDates.map(function (t) {
          return e.formatDate(s, t);
        });i.altField && e.$altField.length && (t = this.selectedDates.map(function (t) {
          return e.formatDate(a, t);
        }), t = t.join(this.opts.multipleDatesSeparator), this.$altField.val(t)), n = n.join(this.opts.multipleDatesSeparator), this.$el.val(n);
      }, _isInRange: function (t, e) {
        var i = t.getTime(),
            s = n.getParsedDate(t),
            a = n.getParsedDate(this.minDate),
            h = n.getParsedDate(this.maxDate),
            o = new Date(s.year, s.month, a.date).getTime(),
            r = new Date(s.year, s.month, h.date).getTime(),
            c = { day: i >= this.minTime && i <= this.maxTime, month: o >= this.minTime && r <= this.maxTime, year: s.year >= a.year && s.year <= h.year };return e ? c[e] : c.day;
      }, _getDimensions: function (t) {
        var e = t.offset();return { width: t.outerWidth(), height: t.outerHeight(), left: e.left, top: e.top };
      }, _getDateFromCell: function (t) {
        var e = this.parsedDate,
            s = t.data("year") || e.year,
            a = t.data("month") == i ? e.month : t.data("month"),
            n = t.data("date") || 1;return new Date(s, a, n);
      }, _setPositionClasses: function (t) {
        t = t.split(" ");var e = t[0],
            i = t[1],
            s = "datepicker -" + e + "-" + i + "- -from-" + e + "-";this.visible && (s += " active"), this.$datepicker.removeAttr("class").addClass(s);
      }, setPosition: function (t) {
        t = t || this.opts.position;var e,
            i,
            s = this._getDimensions(this.$el),
            a = this._getDimensions(this.$datepicker),
            n = t.split(" "),
            h = this.opts.offset,
            o = n[0],
            r = n[1];switch (o) {case "top":
            e = s.top - a.height - h;break;case "right":
            i = s.left + s.width + h;break;case "bottom":
            e = s.top + s.height + h;break;case "left":
            i = s.left - a.width - h;}switch (r) {case "top":
            e = s.top;break;case "right":
            i = s.left + s.width - a.width;break;case "bottom":
            e = s.top + s.height - a.height;break;case "left":
            i = s.left;break;case "center":
            /left|right/.test(o) ? e = s.top + s.height / 2 - a.height / 2 : i = s.left + s.width / 2 - a.width / 2;}this.$datepicker.css({ left: i, top: e });
      }, show: function () {
        var t = this.opts.onShow;this.setPosition(this.opts.position), this.$datepicker.addClass("active"), this.visible = !0, t && this._bindVisionEvents(t);
      }, hide: function () {
        var t = this.opts.onHide;this.$datepicker.removeClass("active").css({ left: "-100000px" }), this.focused = "", this.keys = [], this.inFocus = !1, this.visible = !1, this.$el.blur(), t && this._bindVisionEvents(t);
      }, down: function (t) {
        this._changeView(t, "down");
      }, up: function (t) {
        this._changeView(t, "up");
      }, _bindVisionEvents: function (t) {
        this.$datepicker.off("transitionend.dp"), t(this, !1), this.$datepicker.one("transitionend.dp", t.bind(this, this, !0));
      }, _changeView: function (t, e) {
        t = t || this.focused || this.date;var i = "up" == e ? this.viewIndex + 1 : this.viewIndex - 1;i > 2 && (i = 2), 0 > i && (i = 0), this.silent = !0, this.date = new Date(t.getFullYear(), t.getMonth(), 1), this.silent = !1, this.view = this.viewIndexes[i];
      }, _handleHotKey: function (t) {
        var e,
            i,
            s,
            a = n.getParsedDate(this._getFocusedDate()),
            h = this.opts,
            o = !1,
            r = !1,
            c = !1,
            d = a.year,
            l = a.month,
            u = a.date;switch (t) {case "ctrlRight":case "ctrlUp":
            l += 1, o = !0;break;case "ctrlLeft":case "ctrlDown":
            l -= 1, o = !0;break;case "shiftRight":case "shiftUp":
            r = !0, d += 1;break;case "shiftLeft":case "shiftDown":
            r = !0, d -= 1;break;case "altRight":case "altUp":
            c = !0, d += 10;break;case "altLeft":case "altDown":
            c = !0, d -= 10;break;case "ctrlShiftUp":
            this.up();}s = n.getDaysCount(new Date(d, l)), i = new Date(d, l, u), u > s && (u = s), i.getTime() < this.minTime ? i = this.minDate : i.getTime() > this.maxTime && (i = this.maxDate), this.focused = i, e = n.getParsedDate(i), o && h.onChangeMonth && h.onChangeMonth(e.month, e.year), r && h.onChangeYear && h.onChangeYear(e.year), c && h.onChangeDecade && h.onChangeDecade(this.curDecade);
      }, _registerKey: function (t) {
        var e = this.keys.some(function (e) {
          return e == t;
        });e || this.keys.push(t);
      }, _unRegisterKey: function (t) {
        var e = this.keys.indexOf(t);this.keys.splice(e, 1);
      }, _isHotKeyPressed: function () {
        var t,
            e = !1,
            i = this,
            s = this.keys.sort();for (var a in u) t = u[a], s.length == t.length && t.every(function (t, e) {
          return t == s[e];
        }) && (i._trigger("hotKey", a), e = !0);return e;
      }, _trigger: function (t, e) {
        this.$el.trigger(t, e);
      }, _focusNextCell: function (t, e) {
        e = e || this.cellType;var i = n.getParsedDate(this._getFocusedDate()),
            s = i.year,
            a = i.month,
            h = i.date;if (!this._isHotKeyPressed()) {
          switch (t) {case 37:
              "day" == e ? h -= 1 : "", "month" == e ? a -= 1 : "", "year" == e ? s -= 1 : "";break;case 38:
              "day" == e ? h -= 7 : "", "month" == e ? a -= 3 : "", "year" == e ? s -= 4 : "";break;case 39:
              "day" == e ? h += 1 : "", "month" == e ? a += 1 : "", "year" == e ? s += 1 : "";break;case 40:
              "day" == e ? h += 7 : "", "month" == e ? a += 3 : "", "year" == e ? s += 4 : "";}var o = new Date(s, a, h);o.getTime() < this.minTime ? o = this.minDate : o.getTime() > this.maxTime && (o = this.maxDate), this.focused = o;
        }
      }, _getFocusedDate: function () {
        var t = this.focused || this.selectedDates[this.selectedDates.length - 1],
            e = this.parsedDate;if (!t) switch (this.view) {case "days":
            t = new Date(e.year, e.month, new Date().getDate());break;case "months":
            t = new Date(e.year, e.month, 1);break;case "years":
            t = new Date(e.year, 0, 1);}return t;
      }, _getCell: function (t, i) {
        i = i || this.cellType;var s,
            a = n.getParsedDate(t),
            h = '.datepicker--cell[data-year="' + a.year + '"]';switch (i) {case "month":
            h = '[data-month="' + a.month + '"]';break;case "day":
            h += '[data-month="' + a.month + '"][data-date="' + a.date + '"]';}return s = this.views[this.currentView].$el.find(h), s.length ? s : e("");
      }, destroy: function () {
        var t = this;t.$el.off(".adp").data("datepicker", ""), t.selectedDates = [], t.focused = "", t.views = {}, t.keys = [], t.minRange = "", t.maxRange = "", t.opts.inline || !t.elIsInput ? t.$datepicker.closest(".datepicker-inline").remove() : t.$datepicker.remove();
      }, _handleAlreadySelectedDates: function (t, e) {
        this.opts.range ? this.opts.toggleSelected ? this.removeDate(e) : 2 != this.selectedDates.length && this._trigger("clickCell", e) : this.opts.toggleSelected && this.removeDate(e), this.opts.toggleSelected || (this.lastSelectedDate = t, this.opts.timepicker && (this.timepicker._setTime(t), this.timepicker.update()));
      }, _onShowEvent: function (t) {
        this.visible || this.show();
      }, _onBlur: function () {
        !this.inFocus && this.visible && this.hide();
      }, _onMouseDownDatepicker: function (t) {
        this.inFocus = !0;
      }, _onMouseUpDatepicker: function (t) {
        this.inFocus = !1, t.originalEvent.inFocus = !0, t.originalEvent.timepickerFocus || this.$el.focus();
      }, _onKeyUpGeneral: function (t) {
        var e = this.$el.val();e || this.clear();
      }, _onResize: function () {
        this.visible && this.setPosition();
      }, _onMouseUpBody: function (t) {
        t.originalEvent.inFocus || this.visible && !this.inFocus && this.hide();
      }, _onMouseUpEl: function (t) {
        t.originalEvent.inFocus = !0, setTimeout(this._onKeyUpGeneral.bind(this), 4);
      }, _onKeyDown: function (t) {
        var e = t.which;if (this._registerKey(e), e >= 37 && 40 >= e && (t.preventDefault(), this._focusNextCell(e)), 13 == e && this.focused) {
          if (this._getCell(this.focused).hasClass("-disabled-")) return;if (this.view != this.opts.minView) this.down();else {
            var i = this._isSelected(this.focused, this.cellType);if (!i) return this.timepicker && (this.focused.setHours(this.timepicker.hours), this.focused.setMinutes(this.timepicker.minutes)), void this.selectDate(this.focused);this._handleAlreadySelectedDates(i, this.focused);
          }
        }27 == e && this.hide();
      }, _onKeyUp: function (t) {
        var e = t.which;this._unRegisterKey(e);
      }, _onHotKey: function (t, e) {
        this._handleHotKey(e);
      }, _onMouseEnterCell: function (t) {
        var i = e(t.target).closest(".datepicker--cell"),
            s = this._getDateFromCell(i);this.silent = !0, this.focused && (this.focused = ""), i.addClass("-focus-"), this.focused = s, this.silent = !1, this.opts.range && 1 == this.selectedDates.length && (this.minRange = this.selectedDates[0], this.maxRange = "", n.less(this.minRange, this.focused) && (this.maxRange = this.minRange, this.minRange = ""), this.views[this.currentView]._update());
      }, _onMouseLeaveCell: function (t) {
        var i = e(t.target).closest(".datepicker--cell");i.removeClass("-focus-"), this.silent = !0, this.focused = "", this.silent = !1;
      }, _onTimeChange: function (t, e, i) {
        var s = new Date(),
            a = this.selectedDates,
            n = !1;a.length && (n = !0, s = this.lastSelectedDate), s.setHours(e), s.setMinutes(i), n || this._getCell(s).hasClass("-disabled-") ? (this._setInputValue(), this.opts.onSelect && this._triggerOnChange()) : this.selectDate(s);
      }, _onClickCell: function (t, e) {
        this.timepicker && (e.setHours(this.timepicker.hours), e.setMinutes(this.timepicker.minutes)), this.selectDate(e);
      }, set focused(t) {
        if (!t && this.focused) {
          var e = this._getCell(this.focused);e.length && e.removeClass("-focus-");
        }this._focused = t, this.opts.range && 1 == this.selectedDates.length && (this.minRange = this.selectedDates[0], this.maxRange = "", n.less(this.minRange, this._focused) && (this.maxRange = this.minRange, this.minRange = "")), this.silent || (this.date = t);
      }, get focused() {
        return this._focused;
      }, get parsedDate() {
        return n.getParsedDate(this.date);
      }, set date(t) {
        return t instanceof Date ? (this.currentDate = t, this.inited && !this.silent && (this.views[this.view]._render(), this.nav._render(), this.visible && this.elIsInput && this.setPosition()), t) : void 0;
      }, get date() {
        return this.currentDate;
      }, set view(t) {
        return this.viewIndex = this.viewIndexes.indexOf(t), this.viewIndex < 0 ? void 0 : (this.prevView = this.currentView, this.currentView = t, this.inited && (this.views[t] ? this.views[t]._render() : this.views[t] = new e.fn.datepicker.Body(this, t, this.opts), this.views[this.prevView].hide(), this.views[t].show(), this.nav._render(), this.opts.onChangeView && this.opts.onChangeView(t), this.elIsInput && this.visible && this.setPosition()), t);
      }, get view() {
        return this.currentView;
      }, get cellType() {
        return this.view.substring(0, this.view.length - 1);
      }, get minTime() {
        var t = n.getParsedDate(this.minDate);return new Date(t.year, t.month, t.date).getTime();
      }, get maxTime() {
        var t = n.getParsedDate(this.maxDate);return new Date(t.year, t.month, t.date).getTime();
      }, get curDecade() {
        return n.getDecade(this.date);
      } }, n.getDaysCount = function (t) {
      return new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
    }, n.getParsedDate = function (t) {
      return { year: t.getFullYear(), month: t.getMonth(), fullMonth: t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1, date: t.getDate(), fullDate: t.getDate() < 10 ? "0" + t.getDate() : t.getDate(), day: t.getDay(), hours: t.getHours(), fullHours: t.getHours() < 10 ? "0" + t.getHours() : t.getHours(), minutes: t.getMinutes(), fullMinutes: t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes() };
    }, n.getDecade = function (t) {
      var e = 10 * Math.floor(t.getFullYear() / 10);return [e, e + 9];
    }, n.template = function (t, e) {
      return t.replace(/#\{([\w]+)\}/g, function (t, i) {
        return e[i] || 0 === e[i] ? e[i] : void 0;
      });
    }, n.isSame = function (t, e, i) {
      if (!t || !e) return !1;var s = n.getParsedDate(t),
          a = n.getParsedDate(e),
          h = i ? i : "day",
          o = { day: s.date == a.date && s.month == a.month && s.year == a.year, month: s.month == a.month && s.year == a.year, year: s.year == a.year };return o[h];
    }, n.less = function (t, e, i) {
      return t && e ? e.getTime() < t.getTime() : !1;
    }, n.bigger = function (t, e, i) {
      return t && e ? e.getTime() > t.getTime() : !1;
    }, n.getLeadingZeroNum = function (t) {
      return parseInt(t) < 10 ? "0" + t : t;
    }, n.resetTime = function (t) {
      return "object" == typeof t ? (t = n.getParsedDate(t), new Date(t.year, t.month, t.date)) : void 0;
    }, e.fn.datepicker = function (t) {
      return this.each(function () {
        if (e.data(this, o)) {
          var i = e.data(this, o);i.opts = e.extend(!0, i.opts, t), i.update();
        } else e.data(this, o, new m(this, t));
      });
    }, e.fn.datepicker.Constructor = m, e.fn.datepicker.language = { ru: { days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"], daysShort: ["Вос", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"], daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"], months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"], monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"], today: "Сегодня", clear: "Очистить", dateFormat: "dd.mm.yyyy", timeFormat: "hh:ii", firstDay: 1 } }, e(function () {
      e(r).datepicker();
    });
  }(), function () {
    var t = { days: '<div class="datepicker--days datepicker--body"><div class="datepicker--days-names"></div><div class="datepicker--cells datepicker--cells-days"></div></div>', months: '<div class="datepicker--months datepicker--body"><div class="datepicker--cells datepicker--cells-months"></div></div>', years: '<div class="datepicker--years datepicker--body"><div class="datepicker--cells datepicker--cells-years"></div></div>' },
        s = e.fn.datepicker,
        a = s.Constructor;s.Body = function (t, i, s) {
      this.d = t, this.type = i, this.opts = s, this.$el = e(""), this.opts.onlyTimepicker || this.init();
    }, s.Body.prototype = { init: function () {
        this._buildBaseHtml(), this._render(), this._bindEvents();
      }, _bindEvents: function () {
        this.$el.on("click", ".datepicker--cell", e.proxy(this._onClickCell, this));
      }, _buildBaseHtml: function () {
        this.$el = e(t[this.type]).appendTo(this.d.$content), this.$names = e(".datepicker--days-names", this.$el), this.$cells = e(".datepicker--cells", this.$el);
      }, _getDayNamesHtml: function (t, e, s, a) {
        return e = e != i ? e : t, s = s ? s : "", a = a != i ? a : 0, a > 7 ? s : 7 == e ? this._getDayNamesHtml(t, 0, s, ++a) : (s += '<div class="datepicker--day-name' + (this.d.isWeekend(e) ? " -weekend-" : "") + '">' + this.d.loc.daysMin[e] + "</div>", this._getDayNamesHtml(t, ++e, s, ++a));
      }, _getCellContents: function (t, e) {
        var i = "datepicker--cell datepicker--cell-" + e,
            s = new Date(),
            n = this.d,
            h = a.resetTime(n.minRange),
            o = a.resetTime(n.maxRange),
            r = n.opts,
            c = a.getParsedDate(t),
            d = {},
            l = c.date;switch (e) {case "day":
            n.isWeekend(c.day) && (i += " -weekend-"), c.month != this.d.parsedDate.month && (i += " -other-month-", r.selectOtherMonths || (i += " -disabled-"), r.showOtherMonths || (l = ""));break;case "month":
            l = n.loc[n.opts.monthsField][c.month];break;case "year":
            var u = n.curDecade;l = c.year, (c.year < u[0] || c.year > u[1]) && (i += " -other-decade-", r.selectOtherYears || (i += " -disabled-"), r.showOtherYears || (l = ""));}return r.onRenderCell && (d = r.onRenderCell(t, e) || {}, l = d.html ? d.html : l, i += d.classes ? " " + d.classes : ""), r.range && (a.isSame(h, t, e) && (i += " -range-from-"), a.isSame(o, t, e) && (i += " -range-to-"), 1 == n.selectedDates.length && n.focused ? ((a.bigger(h, t) && a.less(n.focused, t) || a.less(o, t) && a.bigger(n.focused, t)) && (i += " -in-range-"), a.less(o, t) && a.isSame(n.focused, t) && (i += " -range-from-"), a.bigger(h, t) && a.isSame(n.focused, t) && (i += " -range-to-")) : 2 == n.selectedDates.length && a.bigger(h, t) && a.less(o, t) && (i += " -in-range-")), a.isSame(s, t, e) && (i += " -current-"), n.focused && a.isSame(t, n.focused, e) && (i += " -focus-"), n._isSelected(t, e) && (i += " -selected-"), (!n._isInRange(t, e) || d.disabled) && (i += " -disabled-"), { html: l, classes: i };
      }, _getDaysHtml: function (t) {
        var e = a.getDaysCount(t),
            i = new Date(t.getFullYear(), t.getMonth(), 1).getDay(),
            s = new Date(t.getFullYear(), t.getMonth(), e).getDay(),
            n = i - this.d.loc.firstDay,
            h = 6 - s + this.d.loc.firstDay;n = 0 > n ? n + 7 : n, h = h > 6 ? h - 7 : h;for (var o, r, c = -n + 1, d = "", l = c, u = e + h; u >= l; l++) r = t.getFullYear(), o = t.getMonth(), d += this._getDayHtml(new Date(r, o, l));return d;
      }, _getDayHtml: function (t) {
        var e = this._getCellContents(t, "day");return '<div class="' + e.classes + '" data-date="' + t.getDate() + '" data-month="' + t.getMonth() + '" data-year="' + t.getFullYear() + '">' + e.html + "</div>";
      }, _getMonthsHtml: function (t) {
        for (var e = "", i = a.getParsedDate(t), s = 0; 12 > s;) e += this._getMonthHtml(new Date(i.year, s)), s++;return e;
      }, _getMonthHtml: function (t) {
        var e = this._getCellContents(t, "month");return '<div class="' + e.classes + '" data-month="' + t.getMonth() + '">' + e.html + "</div>";
      }, _getYearsHtml: function (t) {
        var e = (a.getParsedDate(t), a.getDecade(t)),
            i = e[0] - 1,
            s = "",
            n = i;for (n; n <= e[1] + 1; n++) s += this._getYearHtml(new Date(n, 0));return s;
      }, _getYearHtml: function (t) {
        var e = this._getCellContents(t, "year");return '<div class="' + e.classes + '" data-year="' + t.getFullYear() + '">' + e.html + "</div>";
      }, _renderTypes: { days: function () {
          var t = this._getDayNamesHtml(this.d.loc.firstDay),
              e = this._getDaysHtml(this.d.currentDate);this.$cells.html(e), this.$names.html(t);
        }, months: function () {
          var t = this._getMonthsHtml(this.d.currentDate);this.$cells.html(t);
        }, years: function () {
          var t = this._getYearsHtml(this.d.currentDate);this.$cells.html(t);
        } }, _render: function () {
        this.opts.onlyTimepicker || this._renderTypes[this.type].bind(this)();
      }, _update: function () {
        var t,
            i,
            s,
            a = e(".datepicker--cell", this.$cells),
            n = this;a.each(function (a, h) {
          i = e(this), s = n.d._getDateFromCell(e(this)), t = n._getCellContents(s, n.d.cellType), i.attr("class", t.classes);
        });
      }, show: function () {
        this.opts.onlyTimepicker || (this.$el.addClass("active"), this.acitve = !0);
      }, hide: function () {
        this.$el.removeClass("active"), this.active = !1;
      }, _handleClick: function (t) {
        var e = t.data("date") || 1,
            i = t.data("month") || 0,
            s = t.data("year") || this.d.parsedDate.year,
            a = this.d;if (a.view != this.opts.minView) return void a.down(new Date(s, i, e));var n = new Date(s, i, e),
            h = this.d._isSelected(n, this.d.cellType);return h ? void a._handleAlreadySelectedDates.bind(a, h, n)() : void a._trigger("clickCell", n);
      }, _onClickCell: function (t) {
        var i = e(t.target).closest(".datepicker--cell");i.hasClass("-disabled-") || this._handleClick.bind(this)(i);
      } };
  }(), function () {
    var t = '<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div><div class="datepicker--nav-title">#{title}</div><div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>',
        i = '<div class="datepicker--buttons"></div>',
        s = '<span class="datepicker--button" data-action="#{action}">#{label}</span>',
        a = e.fn.datepicker,
        n = a.Constructor;a.Navigation = function (t, e) {
      this.d = t, this.opts = e, this.$buttonsContainer = "", this.init();
    }, a.Navigation.prototype = { init: function () {
        this._buildBaseHtml(), this._bindEvents();
      }, _bindEvents: function () {
        this.d.$nav.on("click", ".datepicker--nav-action", e.proxy(this._onClickNavButton, this)), this.d.$nav.on("click", ".datepicker--nav-title", e.proxy(this._onClickNavTitle, this)), this.d.$datepicker.on("click", ".datepicker--button", e.proxy(this._onClickNavButton, this));
      }, _buildBaseHtml: function () {
        this.opts.onlyTimepicker || this._render(), this._addButtonsIfNeed();
      }, _addButtonsIfNeed: function () {
        this.opts.todayButton && this._addButton("today"), this.opts.clearButton && this._addButton("clear");
      }, _render: function () {
        var i = this._getTitle(this.d.currentDate),
            s = n.template(t, e.extend({ title: i }, this.opts));this.d.$nav.html(s), "years" == this.d.view && e(".datepicker--nav-title", this.d.$nav).addClass("-disabled-"), this.setNavStatus();
      }, _getTitle: function (t) {
        return this.d.formatDate(this.opts.navTitles[this.d.view], t);
      }, _addButton: function (t) {
        this.$buttonsContainer.length || this._addButtonsContainer();var i = { action: t, label: this.d.loc[t] },
            a = n.template(s, i);e("[data-action=" + t + "]", this.$buttonsContainer).length || this.$buttonsContainer.append(a);
      }, _addButtonsContainer: function () {
        this.d.$datepicker.append(i), this.$buttonsContainer = e(".datepicker--buttons", this.d.$datepicker);
      }, setNavStatus: function () {
        if ((this.opts.minDate || this.opts.maxDate) && this.opts.disableNavWhenOutOfRange) {
          var t = this.d.parsedDate,
              e = t.month,
              i = t.year,
              s = t.date;switch (this.d.view) {case "days":
              this.d._isInRange(new Date(i, e - 1, 1), "month") || this._disableNav("prev"), this.d._isInRange(new Date(i, e + 1, 1), "month") || this._disableNav("next");break;case "months":
              this.d._isInRange(new Date(i - 1, e, s), "year") || this._disableNav("prev"), this.d._isInRange(new Date(i + 1, e, s), "year") || this._disableNav("next");break;case "years":
              var a = n.getDecade(this.d.date);this.d._isInRange(new Date(a[0] - 1, 0, 1), "year") || this._disableNav("prev"), this.d._isInRange(new Date(a[1] + 1, 0, 1), "year") || this._disableNav("next");}
        }
      }, _disableNav: function (t) {
        e('[data-action="' + t + '"]', this.d.$nav).addClass("-disabled-");
      }, _activateNav: function (t) {
        e('[data-action="' + t + '"]', this.d.$nav).removeClass("-disabled-");
      }, _onClickNavButton: function (t) {
        var i = e(t.target).closest("[data-action]"),
            s = i.data("action");this.d[s]();
      }, _onClickNavTitle: function (t) {
        return e(t.target).hasClass("-disabled-") ? void 0 : "days" == this.d.view ? this.d.view = "months" : void (this.d.view = "years");
      } };
  }(), function () {
    var t = '<div class="datepicker--time"><div class="datepicker--time-current">   <span class="datepicker--time-current-hours">#{hourVisible}</span>   <span class="datepicker--time-current-colon">:</span>   <span class="datepicker--time-current-minutes">#{minValue}</span></div><div class="datepicker--time-sliders">   <div class="datepicker--time-row">      <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>   </div>   <div class="datepicker--time-row">      <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>   </div></div></div>',
        i = e.fn.datepicker,
        s = i.Constructor;i.Timepicker = function (t, e) {
      this.d = t, this.opts = e, this.init();
    }, i.Timepicker.prototype = { init: function () {
        var t = "input";this._setTime(this.d.date), this._buildHTML(), navigator.userAgent.match(/trident/gi) && (t = "change"), this.d.$el.on("selectDate", this._onSelectDate.bind(this)), this.$ranges.on(t, this._onChangeRange.bind(this)), this.$ranges.on("mouseup", this._onMouseUpRange.bind(this)), this.$ranges.on("mousemove focus ", this._onMouseEnterRange.bind(this)), this.$ranges.on("mouseout blur", this._onMouseOutRange.bind(this));
      }, _setTime: function (t) {
        var e = s.getParsedDate(t);this._handleDate(t), this.hours = e.hours < this.minHours ? this.minHours : e.hours, this.minutes = e.minutes < this.minMinutes ? this.minMinutes : e.minutes;
      }, _setMinTimeFromDate: function (t) {
        this.minHours = t.getHours(), this.minMinutes = t.getMinutes(), this.d.lastSelectedDate && this.d.lastSelectedDate.getHours() > t.getHours() && (this.minMinutes = this.opts.minMinutes);
      }, _setMaxTimeFromDate: function (t) {
        this.maxHours = t.getHours(), this.maxMinutes = t.getMinutes(), this.d.lastSelectedDate && this.d.lastSelectedDate.getHours() < t.getHours() && (this.maxMinutes = this.opts.maxMinutes);
      }, _setDefaultMinMaxTime: function () {
        var t = 23,
            e = 59,
            i = this.opts;this.minHours = i.minHours < 0 || i.minHours > t ? 0 : i.minHours, this.minMinutes = i.minMinutes < 0 || i.minMinutes > e ? 0 : i.minMinutes, this.maxHours = i.maxHours < 0 || i.maxHours > t ? t : i.maxHours, this.maxMinutes = i.maxMinutes < 0 || i.maxMinutes > e ? e : i.maxMinutes;
      }, _validateHoursMinutes: function (t) {
        this.hours < this.minHours ? this.hours = this.minHours : this.hours > this.maxHours && (this.hours = this.maxHours), this.minutes < this.minMinutes ? this.minutes = this.minMinutes : this.minutes > this.maxMinutes && (this.minutes = this.maxMinutes);
      }, _buildHTML: function () {
        var i = s.getLeadingZeroNum,
            a = { hourMin: this.minHours, hourMax: i(this.maxHours), hourStep: this.opts.hoursStep, hourValue: this.hours, hourVisible: i(this.displayHours), minMin: this.minMinutes, minMax: i(this.maxMinutes), minStep: this.opts.minutesStep, minValue: i(this.minutes) },
            n = s.template(t, a);this.$timepicker = e(n).appendTo(this.d.$datepicker), this.$ranges = e('[type="range"]', this.$timepicker), this.$hours = e('[name="hours"]', this.$timepicker), this.$minutes = e('[name="minutes"]', this.$timepicker), this.$hoursText = e(".datepicker--time-current-hours", this.$timepicker), this.$minutesText = e(".datepicker--time-current-minutes", this.$timepicker), this.d.ampm && (this.$ampm = e('<span class="datepicker--time-current-ampm">').appendTo(e(".datepicker--time-current", this.$timepicker)).html(this.dayPeriod), this.$timepicker.addClass("-am-pm-"));
      }, _updateCurrentTime: function () {
        var t = s.getLeadingZeroNum(this.displayHours),
            e = s.getLeadingZeroNum(this.minutes);this.$hoursText.html(t), this.$minutesText.html(e), this.d.ampm && this.$ampm.html(this.dayPeriod);
      }, _updateRanges: function () {
        this.$hours.attr({ min: this.minHours, max: this.maxHours }).val(this.hours), this.$minutes.attr({ min: this.minMinutes, max: this.maxMinutes }).val(this.minutes);
      }, _handleDate: function (t) {
        this._setDefaultMinMaxTime(), t && (s.isSame(t, this.d.opts.minDate) ? this._setMinTimeFromDate(this.d.opts.minDate) : s.isSame(t, this.d.opts.maxDate) && this._setMaxTimeFromDate(this.d.opts.maxDate)), this._validateHoursMinutes(t);
      }, update: function () {
        this._updateRanges(), this._updateCurrentTime();
      }, _getValidHoursFromDate: function (t, e) {
        var i = t,
            a = t;t instanceof Date && (i = s.getParsedDate(t), a = i.hours);var n = e || this.d.ampm,
            h = "am";if (n) switch (!0) {case 0 == a:
            a = 12;break;case 12 == a:
            h = "pm";break;case a > 11:
            a -= 12, h = "pm";}return { hours: a, dayPeriod: h };
      }, set hours(t) {
        this._hours = t;var e = this._getValidHoursFromDate(t);this.displayHours = e.hours, this.dayPeriod = e.dayPeriod;
      }, get hours() {
        return this._hours;
      }, _onChangeRange: function (t) {
        var i = e(t.target),
            s = i.attr("name");this.d.timepickerIsActive = !0, this[s] = i.val(), this._updateCurrentTime(), this.d._trigger("timeChange", [this.hours, this.minutes]), this._handleDate(this.d.lastSelectedDate), this.update();
      }, _onSelectDate: function (t, e) {
        this._handleDate(e), this.update();
      }, _onMouseEnterRange: function (t) {
        var i = e(t.target).attr("name");e(".datepicker--time-current-" + i, this.$timepicker).addClass("-focus-");
      }, _onMouseOutRange: function (t) {
        var i = e(t.target).attr("name");this.d.inFocus || e(".datepicker--time-current-" + i, this.$timepicker).removeClass("-focus-");
      }, _onMouseUpRange: function (t) {
        this.d.timepickerIsActive = !1;
      } };
  }();
}(window, jQuery);
/*!
 * enquire.js v2.1.6 - Awesome Media Queries in JavaScript
 * Copyright (c) 2017 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT */

!function (a) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();else if ("function" == typeof define && define.amd) define([], a);else {
    var b;b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.enquire = a();
  }
}(function () {
  return function a(b, c, d) {
    function e(g, h) {
      if (!c[g]) {
        if (!b[g]) {
          var i = "function" == typeof require && require;if (!h && i) return i(g, !0);if (f) return f(g, !0);var j = new Error("Cannot find module '" + g + "'");throw j.code = "MODULE_NOT_FOUND", j;
        }var k = c[g] = { exports: {} };b[g][0].call(k.exports, function (a) {
          var c = b[g][1][a];return e(c ? c : a);
        }, k, k.exports, a, b, c, d);
      }return c[g].exports;
    }for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);return e;
  }({ 1: [function (a, b, c) {
      function d(a, b) {
        this.query = a, this.isUnconditional = b, this.handlers = [], this.mql = window.matchMedia(a);var c = this;this.listener = function (a) {
          c.mql = a.currentTarget || a, c.assess();
        }, this.mql.addListener(this.listener);
      }var e = a(3),
          f = a(4).each;d.prototype = { constuctor: d, addHandler: function (a) {
          var b = new e(a);this.handlers.push(b), this.matches() && b.on();
        }, removeHandler: function (a) {
          var b = this.handlers;f(b, function (c, d) {
            if (c.equals(a)) return c.destroy(), !b.splice(d, 1);
          });
        }, matches: function () {
          return this.mql.matches || this.isUnconditional;
        }, clear: function () {
          f(this.handlers, function (a) {
            a.destroy();
          }), this.mql.removeListener(this.listener), this.handlers.length = 0;
        }, assess: function () {
          var a = this.matches() ? "on" : "off";f(this.handlers, function (b) {
            b[a]();
          });
        } }, b.exports = d;
    }, { 3: 3, 4: 4 }], 2: [function (a, b, c) {
      function d() {
        if (!window.matchMedia) throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries = {}, this.browserIsIncapable = !window.matchMedia("only all").matches;
      }var e = a(1),
          f = a(4),
          g = f.each,
          h = f.isFunction,
          i = f.isArray;d.prototype = { constructor: d, register: function (a, b, c) {
          var d = this.queries,
              f = c && this.browserIsIncapable;return d[a] || (d[a] = new e(a, f)), h(b) && (b = { match: b }), i(b) || (b = [b]), g(b, function (b) {
            h(b) && (b = { match: b }), d[a].addHandler(b);
          }), this;
        }, unregister: function (a, b) {
          var c = this.queries[a];return c && (b ? c.removeHandler(b) : (c.clear(), delete this.queries[a])), this;
        } }, b.exports = d;
    }, { 1: 1, 4: 4 }], 3: [function (a, b, c) {
      function d(a) {
        this.options = a, !a.deferSetup && this.setup();
      }d.prototype = { constructor: d, setup: function () {
          this.options.setup && this.options.setup(), this.initialised = !0;
        }, on: function () {
          !this.initialised && this.setup(), this.options.match && this.options.match();
        }, off: function () {
          this.options.unmatch && this.options.unmatch();
        }, destroy: function () {
          this.options.destroy ? this.options.destroy() : this.off();
        }, equals: function (a) {
          return this.options === a || this.options.match === a;
        } }, b.exports = d;
    }, {}], 4: [function (a, b, c) {
      function d(a, b) {
        var c = 0,
            d = a.length;for (c; c < d && b(a[c], c) !== !1; c++);
      }function e(a) {
        return "[object Array]" === Object.prototype.toString.apply(a);
      }function f(a) {
        return "function" == typeof a;
      }b.exports = { isFunction: f, isArray: e, each: d };
    }, {}], 5: [function (a, b, c) {
      var d = a(2);b.exports = new d();
    }, { 2: 2 }] }, {}, [5])(5);
});
/*! jQuery Validation Plugin - v1.15.0 - 2/24/2016
 * http://jqueryvalidation.org/
 * Copyright (c) 2016 Jörn Zaefferer; Licensed MIT */
!function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : a(jQuery);
}(function (a) {
  a.extend(a.fn, { validate: function (b) {
      if (!this.length) return void (b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));var c = a.data(this[0], "validator");return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function (b) {
        c.settings.submitHandler && (c.submitButton = b.target), a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0);
      }), this.on("submit.validate", function (b) {
        function d() {
          var d, e;return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), e = c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), void 0 !== e ? e : !1) : !0;
        }return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1);
      })), c);
    }, valid: function () {
      var b, c, d;return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function () {
        b = c.element(this) && b, b || (d = d.concat(c.errorList));
      }), c.errorList = d), b;
    }, rules: function (b, c) {
      if (this.length) {
        var d,
            e,
            f,
            g,
            h,
            i,
            j = this[0];if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {case "add":
            a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));break;case "remove":
            return c ? (i = {}, a.each(c.split(/\s/), function (b, c) {
              i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required");
            }), i) : (delete e[j.name], f);}return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({ required: h }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, { remote: h })), g;
      }
    } }), a.extend(a.expr[":"], { blank: function (b) {
      return !a.trim("" + a(b).val());
    }, filled: function (b) {
      var c = a(b).val();return null !== c && !!a.trim("" + c);
    }, unchecked: function (b) {
      return !a(b).prop("checked");
    } }), a.validator = function (b, c) {
    this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init();
  }, a.validator.format = function (b, c) {
    return 1 === arguments.length ? function () {
      var c = a.makeArray(arguments);return c.unshift(b), a.validator.format.apply(this, c);
    } : void 0 === c ? b : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function (a, c) {
      b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function () {
        return c;
      });
    }), b);
  }, a.extend(a.validator, { defaults: { messages: {}, groups: {}, rules: {}, errorClass: "error", pendingClass: "pending", validClass: "valid", errorElement: "label", focusCleanup: !1, focusInvalid: !0, errorContainer: a([]), errorLabelContainer: a([]), onsubmit: !0, ignore: ":hidden", ignoreTitle: !1, onfocusin: function (a) {
        this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)));
      }, onfocusout: function (a) {
        this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a);
      }, onkeyup: function (b, c) {
        var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];9 === c.which && "" === this.elementValue(b) || -1 !== a.inArray(c.keyCode, d) || (b.name in this.submitted || b.name in this.invalid) && this.element(b);
      }, onclick: function (a) {
        a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode);
      }, highlight: function (b, c, d) {
        "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d);
      }, unhighlight: function (b, c, d) {
        "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d);
      } }, setDefaults: function (b) {
      a.extend(a.validator.defaults, b);
    }, messages: { required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date ( ISO ).", number: "Please enter a valid number.", digits: "Please enter only digits.", equalTo: "Please enter the same value again.", maxlength: a.validator.format("Please enter no more than {0} characters."), minlength: a.validator.format("Please enter at least {0} characters."), rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."), range: a.validator.format("Please enter a value between {0} and {1}."), max: a.validator.format("Please enter a value less than or equal to {0}."), min: a.validator.format("Please enter a value greater than or equal to {0}."), step: a.validator.format("Please enter a multiple of {0}.") }, autoCreateRanges: !1, prototype: { init: function () {
        function b(b) {
          var c = a.data(this.form, "validator"),
              d = "on" + b.type.replace(/^validate/, ""),
              e = c.settings;e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b);
        }this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();var c,
            d = this.groups = {};a.each(this.settings.groups, function (b, c) {
          "string" == typeof c && (c = c.split(/\s/)), a.each(c, function (a, c) {
            d[c] = b;
          });
        }), c = this.settings.rules, a.each(c, function (b, d) {
          c[b] = a.validator.normalizeRule(d);
        }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
      }, form: function () {
        return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid();
      }, checkForm: function () {
        this.prepareForm();for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);return this.valid();
      }, element: function (b) {
        var c,
            d,
            e = this.clean(b),
            f = this.validationTargetFor(e),
            g = this,
            h = !0;return void 0 === f ? delete this.invalid[e.name] : (this.prepareElement(f), this.currentElements = a(f), d = this.groups[f.name], d && a.each(this.groups, function (a, b) {
          b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a))), e && e.name in g.invalid && (g.currentElements.push(e), h = h && g.check(e)));
        }), c = this.check(f) !== !1, h = h && c, c ? this.invalid[f.name] = !1 : this.invalid[f.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a(b).attr("aria-invalid", !c)), h;
      }, showErrors: function (b) {
        if (b) {
          var c = this;a.extend(this.errorMap, b), this.errorList = a.map(this.errorMap, function (a, b) {
            return { message: a, element: c.findByName(b)[0] };
          }), this.successList = a.grep(this.successList, function (a) {
            return !(a.name in b);
          });
        }this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
      }, resetForm: function () {
        a.fn.resetForm && a(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();var b = this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b);
      }, resetElements: function (a) {
        var b;if (this.settings.unhighlight) for (b = 0; a[b]; b++) this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass);else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass);
      }, numberOfInvalids: function () {
        return this.objectLength(this.invalid);
      }, objectLength: function (a) {
        var b,
            c = 0;for (b in a) a[b] && c++;return c;
      }, hideErrors: function () {
        this.hideThese(this.toHide);
      }, hideThese: function (a) {
        a.not(this.containers).text(""), this.addWrapper(a).hide();
      }, valid: function () {
        return 0 === this.size();
      }, size: function () {
        return this.errorList.length;
      }, focusInvalid: function () {
        if (this.settings.focusInvalid) try {
          a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin");
        } catch (b) {}
      }, findLastActive: function () {
        var b = this.lastActive;return b && 1 === a.grep(this.errorList, function (a) {
          return a.element.name === b.name;
        }).length && b;
      }, elements: function () {
        var b = this,
            c = {};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
          var d = this.name || a(this).attr("name");return !d && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0]), d in c || !b.objectLength(a(this).rules()) ? !1 : (c[d] = !0, !0);
        });
      }, clean: function (b) {
        return a(b)[0];
      }, errors: function () {
        var b = this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement + "." + b, this.errorContext);
      }, resetInternals: function () {
        this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]);
      }, reset: function () {
        this.resetInternals(), this.currentElements = a([]);
      }, prepareForm: function () {
        this.reset(), this.toHide = this.errors().add(this.containers);
      }, prepareElement: function (a) {
        this.reset(), this.toHide = this.errorsFor(a);
      }, elementValue: function (b) {
        var c,
            d,
            e = a(b),
            f = b.type;return "radio" === f || "checkbox" === f ? this.findByName(b.name).filter(":checked").val() : "number" === f && "undefined" != typeof b.validity ? b.validity.badInput ? "NaN" : e.val() : (c = b.hasAttribute("contenteditable") ? e.text() : e.val(), "file" === f ? "C:\\fakepath\\" === c.substr(0, 12) ? c.substr(12) : (d = c.lastIndexOf("/"), d >= 0 ? c.substr(d + 1) : (d = c.lastIndexOf("\\"), d >= 0 ? c.substr(d + 1) : c)) : "string" == typeof c ? c.replace(/\r/g, "") : c);
      }, check: function (b) {
        b = this.validationTargetFor(this.clean(b));var c,
            d,
            e,
            f = a(b).rules(),
            g = a.map(f, function (a, b) {
          return b;
        }).length,
            h = !1,
            i = this.elementValue(b);if ("function" == typeof f.normalizer) {
          if (i = f.normalizer.call(b, i), "string" != typeof i) throw new TypeError("The normalizer should return a string value.");delete f.normalizer;
        }for (d in f) {
          e = { method: d, parameters: f[d] };try {
            if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) {
              h = !0;continue;
            }if (h = !1, "pending" === c) return void (this.toHide = this.toHide.not(this.errorsFor(b)));if (!c) return this.formatAndAdd(b, e), !1;
          } catch (j) {
            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j instanceof TypeError && (j.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), j;
          }
        }if (!h) return this.objectLength(f) && this.successList.push(b), !0;
      }, customDataMessage: function (b, c) {
        return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg");
      }, customMessage: function (a, b) {
        var c = this.settings.messages[a];return c && (c.constructor === String ? c : c[b]);
      }, findDefined: function () {
        for (var a = 0; a < arguments.length; a++) if (void 0 !== arguments[a]) return arguments[a];
      }, defaultMessage: function (b, c) {
        var d = this.findDefined(this.customMessage(b.name, c.method), this.customDataMessage(b, c.method), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c.method], "<strong>Warning: No message defined for " + b.name + "</strong>"),
            e = /\$?\{(\d+)\}/g;return "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d;
      }, formatAndAdd: function (a, b) {
        var c = this.defaultMessage(a, b);this.errorList.push({ message: c, element: a, method: b.method }), this.errorMap[a.name] = c, this.submitted[a.name] = c;
      }, addWrapper: function (a) {
        return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a;
      }, defaultShowErrors: function () {
        var a, b, c;for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);if (this.settings.unhighlight) for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show();
      }, validElements: function () {
        return this.currentElements.not(this.invalidElements());
      }, invalidElements: function () {
        return a(this.errorList).map(function () {
          return this.element;
        });
      }, showLabel: function (b, c) {
        var d,
            e,
            f,
            g,
            h = this.errorsFor(b),
            i = this.idOrName(b),
            j = a(b).attr("aria-describedby");h.length ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c)) : (h = a("<" + this.settings.errorElement + ">").attr("id", i + "-error").addClass(this.settings.errorClass).html(c || ""), d = h, this.settings.wrapper && (d = h.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b), h.is("label") ? h.attr("for", i) : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length && (f = h.attr("id"), j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : j = f, a(b).attr("aria-describedby", j), e = this.groups[b.name], e && (g = this, a.each(g.groups, function (b, c) {
          c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id"));
        })))), !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)), this.toShow = this.toShow.add(h);
      }, errorsFor: function (b) {
        var c = this.escapeCssMeta(this.idOrName(b)),
            d = a(b).attr("aria-describedby"),
            e = "label[for='" + c + "'], label[for='" + c + "'] *";return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e);
      }, escapeCssMeta: function (a) {
        return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1");
      }, idOrName: function (a) {
        return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name);
      }, validationTargetFor: function (b) {
        return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0];
      }, checkable: function (a) {
        return (/radio|checkbox/i.test(a.type)
        );
      }, findByName: function (b) {
        return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']");
      }, getLength: function (b, c) {
        switch (c.nodeName.toLowerCase()) {case "select":
            return a("option:selected", c).length;case "input":
            if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length;}return b.length;
      }, depend: function (a, b) {
        return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0;
      }, dependTypes: { "boolean": function (a) {
          return a;
        }, string: function (b, c) {
          return !!a(b, c.form).length;
        }, "function": function (a, b) {
          return a(b);
        } }, optional: function (b) {
        var c = this.elementValue(b);return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch";
      }, startRequest: function (b) {
        this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), this.pending[b.name] = !0);
      }, stopRequest: function (b, c) {
        this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], a(b).removeClass(this.settings.pendingClass), c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1);
      }, previousValue: function (b, c) {
        return a.data(b, "previousValue") || a.data(b, "previousValue", { old: null, valid: !0, message: this.defaultMessage(b, { method: c }) });
      }, destroy: function () {
        this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur");
      } }, classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } }, addClassRules: function (b, c) {
      b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b);
    }, classRules: function (b) {
      var c = {},
          d = a(b).attr("class");return d && a.each(d.split(" "), function () {
        this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this]);
      }), c;
    }, normalizeAttributeRule: function (a, b, c, d) {
      /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0);
    }, attributeRules: function (b) {
      var c,
          d,
          e = {},
          f = a(b),
          g = b.getAttribute("type");for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d);return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e;
    }, dataRules: function (b) {
      var c,
          d,
          e = {},
          f = a(b),
          g = b.getAttribute("type");for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), this.normalizeAttributeRule(e, g, c, d);return e;
    }, staticRules: function (b) {
      var c = {},
          d = a.data(b.form, "validator");return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c;
    }, normalizeRules: function (b, c) {
      return a.each(b, function (d, e) {
        if (e === !1) return void delete b[d];if (e.param || e.depends) {
          var f = !0;switch (typeof e.depends) {case "string":
              f = !!a(e.depends, c.form).length;break;case "function":
              f = e.depends.call(c, c);}f ? b[d] = void 0 !== e.param ? e.param : !0 : (a.data(c.form, "validator").resetElements(a(c)), delete b[d]);
        }
      }), a.each(b, function (d, e) {
        b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e;
      }), a.each(["minlength", "maxlength"], function () {
        b[this] && (b[this] = Number(b[this]));
      }), a.each(["rangelength", "range"], function () {
        var c;b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]));
      }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b;
    }, normalizeRule: function (b) {
      if ("string" == typeof b) {
        var c = {};a.each(b.split(/\s/), function () {
          c[this] = !0;
        }), b = c;
      }return b;
    }, addMethod: function (b, c, d) {
      a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b));
    }, methods: { required: function (b, c, d) {
        if (!this.depend(d, c)) return "dependency-mismatch";if ("select" === c.nodeName.toLowerCase()) {
          var e = a(c).val();return e && e.length > 0;
        }return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0;
      }, email: function (a, b) {
        return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a);
      }, url: function (a, b) {
        return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a);
      }, date: function (a, b) {
        return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString());
      }, dateISO: function (a, b) {
        return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a);
      }, number: function (a, b) {
        return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a);
      }, digits: function (a, b) {
        return this.optional(b) || /^\d+$/.test(a);
      }, minlength: function (b, c, d) {
        var e = a.isArray(b) ? b.length : this.getLength(b, c);return this.optional(c) || e >= d;
      }, maxlength: function (b, c, d) {
        var e = a.isArray(b) ? b.length : this.getLength(b, c);return this.optional(c) || d >= e;
      }, rangelength: function (b, c, d) {
        var e = a.isArray(b) ? b.length : this.getLength(b, c);return this.optional(c) || e >= d[0] && e <= d[1];
      }, min: function (a, b, c) {
        return this.optional(b) || a >= c;
      }, max: function (a, b, c) {
        return this.optional(b) || c >= a;
      }, range: function (a, b, c) {
        return this.optional(b) || a >= c[0] && a <= c[1];
      }, step: function (b, c, d) {
        var e = a(c).attr("type"),
            f = "Step attribute on input type " + e + " is not supported.",
            g = ["text", "number", "range"],
            h = new RegExp("\\b" + e + "\\b"),
            i = e && !h.test(g.join());if (i) throw new Error(f);return this.optional(c) || b % d === 0;
      }, equalTo: function (b, c, d) {
        var e = a(d);return this.settings.onfocusout && e.not(".validate-equalTo-blur").length && e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () {
          a(c).valid();
        }), b === e.val();
      }, remote: function (b, c, d, e) {
        if (this.optional(c)) return "dependency-mismatch";e = "string" == typeof e && e || "remote";var f,
            g,
            h,
            i = this.previousValue(c, e);return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), i.originalMessage = i.originalMessage || this.settings.messages[c.name][e], this.settings.messages[c.name][e] = i.message, d = "string" == typeof d && { url: d } || d, h = a.param(a.extend({ data: b }, d.data)), i.old === h ? i.valid : (i.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = b, a.ajax(a.extend(!0, { mode: "abort", port: "validate" + c.name, dataType: "json", data: g, context: f.currentForm, success: function (a) {
            var d,
                g,
                h,
                j = a === !0 || "true" === a;f.settings.messages[c.name][e] = i.originalMessage, j ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(c), f.formSubmitted = h, f.successList.push(c), f.invalid[c.name] = !1, f.showErrors()) : (d = {}, g = a || f.defaultMessage(c, { method: e, parameters: b }), d[c.name] = i.message = g, f.invalid[c.name] = !0, f.showErrors(d)), i.valid = j, f.stopRequest(c, j);
          } }, d)), "pending");
      } } });var b,
      c = {};a.ajaxPrefilter ? a.ajaxPrefilter(function (a, b, d) {
    var e = a.port;"abort" === a.mode && (c[e] && c[e].abort(), c[e] = d);
  }) : (b = a.ajax, a.ajax = function (d) {
    var e = ("mode" in d ? d : a.ajaxSettings).mode,
        f = ("port" in d ? d : a.ajaxSettings).port;return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments);
  });
});
!function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.moment = t();
}(this, function () {
  "use strict";
  var e, i;function c() {
    return e.apply(null, arguments);
  }function o(e) {
    return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e);
  }function u(e) {
    return null != e && "[object Object]" === Object.prototype.toString.call(e);
  }function l(e) {
    return void 0 === e;
  }function d(e) {
    return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e);
  }function h(e) {
    return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e);
  }function f(e, t) {
    var n,
        s = [];for (n = 0; n < e.length; ++n) s.push(t(e[n], n));return s;
  }function m(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }function _(e, t) {
    for (var n in t) m(t, n) && (e[n] = t[n]);return m(t, "toString") && (e.toString = t.toString), m(t, "valueOf") && (e.valueOf = t.valueOf), e;
  }function y(e, t, n, s) {
    return Ot(e, t, n, s, !0).utc();
  }function g(e) {
    return null == e._pf && (e._pf = { empty: !1, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: !1, invalidMonth: null, invalidFormat: !1, userInvalidated: !1, iso: !1, parsedDateParts: [], meridiem: null, rfc2822: !1, weekdayMismatch: !1 }), e._pf;
  }function p(e) {
    if (null == e._isValid) {
      var t = g(e),
          n = i.call(t.parsedDateParts, function (e) {
        return null != e;
      }),
          s = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && n);if (e._strict && (s = s && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour), null != Object.isFrozen && Object.isFrozen(e)) return s;e._isValid = s;
    }return e._isValid;
  }function v(e) {
    var t = y(NaN);return null != e ? _(g(t), e) : g(t).userInvalidated = !0, t;
  }i = Array.prototype.some ? Array.prototype.some : function (e) {
    for (var t = Object(this), n = t.length >>> 0, s = 0; s < n; s++) if (s in t && e.call(this, t[s], s, t)) return !0;return !1;
  };var r = c.momentProperties = [];function w(e, t) {
    var n, s, i;if (l(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), l(t._i) || (e._i = t._i), l(t._f) || (e._f = t._f), l(t._l) || (e._l = t._l), l(t._strict) || (e._strict = t._strict), l(t._tzm) || (e._tzm = t._tzm), l(t._isUTC) || (e._isUTC = t._isUTC), l(t._offset) || (e._offset = t._offset), l(t._pf) || (e._pf = g(t)), l(t._locale) || (e._locale = t._locale), 0 < r.length) for (n = 0; n < r.length; n++) l(i = t[s = r[n]]) || (e[s] = i);return e;
  }var t = !1;function M(e) {
    w(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === t && (t = !0, c.updateOffset(this), t = !1);
  }function S(e) {
    return e instanceof M || null != e && null != e._isAMomentObject;
  }function D(e) {
    return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
  }function k(e) {
    var t = +e,
        n = 0;return 0 !== t && isFinite(t) && (n = D(t)), n;
  }function a(e, t, n) {
    var s,
        i = Math.min(e.length, t.length),
        r = Math.abs(e.length - t.length),
        a = 0;for (s = 0; s < i; s++) (n && e[s] !== t[s] || !n && k(e[s]) !== k(t[s])) && a++;return a + r;
  }function Y(e) {
    !1 === c.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e);
  }function n(i, r) {
    var a = !0;return _(function () {
      if (null != c.deprecationHandler && c.deprecationHandler(null, i), a) {
        for (var e, t = [], n = 0; n < arguments.length; n++) {
          if (e = "", "object" == typeof arguments[n]) {
            for (var s in e += "\n[" + n + "] ", arguments[0]) e += s + ": " + arguments[0][s] + ", ";e = e.slice(0, -2);
          } else e = arguments[n];t.push(e);
        }Y(i + "\nArguments: " + Array.prototype.slice.call(t).join("") + "\n" + new Error().stack), a = !1;
      }return r.apply(this, arguments);
    }, r);
  }var s,
      O = {};function T(e, t) {
    null != c.deprecationHandler && c.deprecationHandler(e, t), O[e] || (Y(t), O[e] = !0);
  }function x(e) {
    return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e);
  }function b(e, t) {
    var n,
        s = _({}, e);for (n in t) m(t, n) && (u(e[n]) && u(t[n]) ? (s[n] = {}, _(s[n], e[n]), _(s[n], t[n])) : null != t[n] ? s[n] = t[n] : delete s[n]);for (n in e) m(e, n) && !m(t, n) && u(e[n]) && (s[n] = _({}, s[n]));return s;
  }function P(e) {
    null != e && this.set(e);
  }c.suppressDeprecationWarnings = !1, c.deprecationHandler = null, s = Object.keys ? Object.keys : function (e) {
    var t,
        n = [];for (t in e) m(e, t) && n.push(t);return n;
  };var W = {};function H(e, t) {
    var n = e.toLowerCase();W[n] = W[n + "s"] = W[t] = e;
  }function R(e) {
    return "string" == typeof e ? W[e] || W[e.toLowerCase()] : void 0;
  }function C(e) {
    var t,
        n,
        s = {};for (n in e) m(e, n) && (t = R(n)) && (s[t] = e[n]);return s;
  }var F = {};function L(e, t) {
    F[e] = t;
  }function U(e, t, n) {
    var s = "" + Math.abs(e),
        i = t - s.length;return (0 <= e ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, i)).toString().substr(1) + s;
  }var N = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
      G = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
      V = {},
      E = {};function I(e, t, n, s) {
    var i = s;"string" == typeof s && (i = function () {
      return this[s]();
    }), e && (E[e] = i), t && (E[t[0]] = function () {
      return U(i.apply(this, arguments), t[1], t[2]);
    }), n && (E[n] = function () {
      return this.localeData().ordinal(i.apply(this, arguments), e);
    });
  }function A(e, t) {
    return e.isValid() ? (t = j(t, e.localeData()), V[t] = V[t] || function (s) {
      var e,
          i,
          t,
          r = s.match(N);for (e = 0, i = r.length; e < i; e++) E[r[e]] ? r[e] = E[r[e]] : r[e] = (t = r[e]).match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "");return function (e) {
        var t,
            n = "";for (t = 0; t < i; t++) n += x(r[t]) ? r[t].call(e, s) : r[t];return n;
      };
    }(t), V[t](e)) : e.localeData().invalidDate();
  }function j(e, t) {
    var n = 5;function s(e) {
      return t.longDateFormat(e) || e;
    }for (G.lastIndex = 0; 0 <= n && G.test(e);) e = e.replace(G, s), G.lastIndex = 0, n -= 1;return e;
  }var Z = /\d/,
      z = /\d\d/,
      $ = /\d{3}/,
      q = /\d{4}/,
      J = /[+-]?\d{6}/,
      B = /\d\d?/,
      Q = /\d\d\d\d?/,
      X = /\d\d\d\d\d\d?/,
      K = /\d{1,3}/,
      ee = /\d{1,4}/,
      te = /[+-]?\d{1,6}/,
      ne = /\d+/,
      se = /[+-]?\d+/,
      ie = /Z|[+-]\d\d:?\d\d/gi,
      re = /Z|[+-]\d\d(?::?\d\d)?/gi,
      ae = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
      oe = {};function ue(e, n, s) {
    oe[e] = x(n) ? n : function (e, t) {
      return e && s ? s : n;
    };
  }function le(e, t) {
    return m(oe, e) ? oe[e](t._strict, t._locale) : new RegExp(de(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (e, t, n, s, i) {
      return t || n || s || i;
    })));
  }function de(e) {
    return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }var he = {};function ce(e, n) {
    var t,
        s = n;for ("string" == typeof e && (e = [e]), d(n) && (s = function (e, t) {
      t[n] = k(e);
    }), t = 0; t < e.length; t++) he[e[t]] = s;
  }function fe(e, i) {
    ce(e, function (e, t, n, s) {
      n._w = n._w || {}, i(e, n._w, n, s);
    });
  }var me = 0,
      _e = 1,
      ye = 2,
      ge = 3,
      pe = 4,
      ve = 5,
      we = 6,
      Me = 7,
      Se = 8;function De(e) {
    return ke(e) ? 366 : 365;
  }function ke(e) {
    return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
  }I("Y", 0, 0, function () {
    var e = this.year();return e <= 9999 ? "" + e : "+" + e;
  }), I(0, ["YY", 2], 0, function () {
    return this.year() % 100;
  }), I(0, ["YYYY", 4], 0, "year"), I(0, ["YYYYY", 5], 0, "year"), I(0, ["YYYYYY", 6, !0], 0, "year"), H("year", "y"), L("year", 1), ue("Y", se), ue("YY", B, z), ue("YYYY", ee, q), ue("YYYYY", te, J), ue("YYYYYY", te, J), ce(["YYYYY", "YYYYYY"], me), ce("YYYY", function (e, t) {
    t[me] = 2 === e.length ? c.parseTwoDigitYear(e) : k(e);
  }), ce("YY", function (e, t) {
    t[me] = c.parseTwoDigitYear(e);
  }), ce("Y", function (e, t) {
    t[me] = parseInt(e, 10);
  }), c.parseTwoDigitYear = function (e) {
    return k(e) + (68 < k(e) ? 1900 : 2e3);
  };var Ye,
      Oe = Te("FullYear", !0);function Te(t, n) {
    return function (e) {
      return null != e ? (be(this, t, e), c.updateOffset(this, n), this) : xe(this, t);
    };
  }function xe(e, t) {
    return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
  }function be(e, t, n) {
    e.isValid() && !isNaN(n) && ("FullYear" === t && ke(e.year()) && 1 === e.month() && 29 === e.date() ? e._d["set" + (e._isUTC ? "UTC" : "") + t](n, e.month(), Pe(n, e.month())) : e._d["set" + (e._isUTC ? "UTC" : "") + t](n));
  }function Pe(e, t) {
    if (isNaN(e) || isNaN(t)) return NaN;var n,
        s = (t % (n = 12) + n) % n;return e += (t - s) / 12, 1 === s ? ke(e) ? 29 : 28 : 31 - s % 7 % 2;
  }Ye = Array.prototype.indexOf ? Array.prototype.indexOf : function (e) {
    var t;for (t = 0; t < this.length; ++t) if (this[t] === e) return t;return -1;
  }, I("M", ["MM", 2], "Mo", function () {
    return this.month() + 1;
  }), I("MMM", 0, 0, function (e) {
    return this.localeData().monthsShort(this, e);
  }), I("MMMM", 0, 0, function (e) {
    return this.localeData().months(this, e);
  }), H("month", "M"), L("month", 8), ue("M", B), ue("MM", B, z), ue("MMM", function (e, t) {
    return t.monthsShortRegex(e);
  }), ue("MMMM", function (e, t) {
    return t.monthsRegex(e);
  }), ce(["M", "MM"], function (e, t) {
    t[_e] = k(e) - 1;
  }), ce(["MMM", "MMMM"], function (e, t, n, s) {
    var i = n._locale.monthsParse(e, s, n._strict);null != i ? t[_e] = i : g(n).invalidMonth = e;
  });var We = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
      He = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");var Re = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");function Ce(e, t) {
    var n;if (!e.isValid()) return e;if ("string" == typeof t) if (/^\d+$/.test(t)) t = k(t);else if (!d(t = e.localeData().monthsParse(t))) return e;return n = Math.min(e.date(), Pe(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e;
  }function Fe(e) {
    return null != e ? (Ce(this, e), c.updateOffset(this, !0), this) : xe(this, "Month");
  }var Le = ae;var Ue = ae;function Ne() {
    function e(e, t) {
      return t.length - e.length;
    }var t,
        n,
        s = [],
        i = [],
        r = [];for (t = 0; t < 12; t++) n = y([2e3, t]), s.push(this.monthsShort(n, "")), i.push(this.months(n, "")), r.push(this.months(n, "")), r.push(this.monthsShort(n, ""));for (s.sort(e), i.sort(e), r.sort(e), t = 0; t < 12; t++) s[t] = de(s[t]), i[t] = de(i[t]);for (t = 0; t < 24; t++) r[t] = de(r[t]);this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + s.join("|") + ")", "i");
  }function Ge(e) {
    var t = new Date(Date.UTC.apply(null, arguments));return e < 100 && 0 <= e && isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e), t;
  }function Ve(e, t, n) {
    var s = 7 + t - n;return -((7 + Ge(e, 0, s).getUTCDay() - t) % 7) + s - 1;
  }function Ee(e, t, n, s, i) {
    var r,
        a,
        o = 1 + 7 * (t - 1) + (7 + n - s) % 7 + Ve(e, s, i);return o <= 0 ? a = De(r = e - 1) + o : o > De(e) ? (r = e + 1, a = o - De(e)) : (r = e, a = o), { year: r, dayOfYear: a };
  }function Ie(e, t, n) {
    var s,
        i,
        r = Ve(e.year(), t, n),
        a = Math.floor((e.dayOfYear() - r - 1) / 7) + 1;return a < 1 ? s = a + Ae(i = e.year() - 1, t, n) : a > Ae(e.year(), t, n) ? (s = a - Ae(e.year(), t, n), i = e.year() + 1) : (i = e.year(), s = a), { week: s, year: i };
  }function Ae(e, t, n) {
    var s = Ve(e, t, n),
        i = Ve(e + 1, t, n);return (De(e) - s + i) / 7;
  }I("w", ["ww", 2], "wo", "week"), I("W", ["WW", 2], "Wo", "isoWeek"), H("week", "w"), H("isoWeek", "W"), L("week", 5), L("isoWeek", 5), ue("w", B), ue("ww", B, z), ue("W", B), ue("WW", B, z), fe(["w", "ww", "W", "WW"], function (e, t, n, s) {
    t[s.substr(0, 1)] = k(e);
  });I("d", 0, "do", "day"), I("dd", 0, 0, function (e) {
    return this.localeData().weekdaysMin(this, e);
  }), I("ddd", 0, 0, function (e) {
    return this.localeData().weekdaysShort(this, e);
  }), I("dddd", 0, 0, function (e) {
    return this.localeData().weekdays(this, e);
  }), I("e", 0, 0, "weekday"), I("E", 0, 0, "isoWeekday"), H("day", "d"), H("weekday", "e"), H("isoWeekday", "E"), L("day", 11), L("weekday", 11), L("isoWeekday", 11), ue("d", B), ue("e", B), ue("E", B), ue("dd", function (e, t) {
    return t.weekdaysMinRegex(e);
  }), ue("ddd", function (e, t) {
    return t.weekdaysShortRegex(e);
  }), ue("dddd", function (e, t) {
    return t.weekdaysRegex(e);
  }), fe(["dd", "ddd", "dddd"], function (e, t, n, s) {
    var i = n._locale.weekdaysParse(e, s, n._strict);null != i ? t.d = i : g(n).invalidWeekday = e;
  }), fe(["d", "e", "E"], function (e, t, n, s) {
    t[s] = k(e);
  });var je = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");var Ze = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");var ze = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");var $e = ae;var qe = ae;var Je = ae;function Be() {
    function e(e, t) {
      return t.length - e.length;
    }var t,
        n,
        s,
        i,
        r,
        a = [],
        o = [],
        u = [],
        l = [];for (t = 0; t < 7; t++) n = y([2e3, 1]).day(t), s = this.weekdaysMin(n, ""), i = this.weekdaysShort(n, ""), r = this.weekdays(n, ""), a.push(s), o.push(i), u.push(r), l.push(s), l.push(i), l.push(r);for (a.sort(e), o.sort(e), u.sort(e), l.sort(e), t = 0; t < 7; t++) o[t] = de(o[t]), u[t] = de(u[t]), l[t] = de(l[t]);this._weekdaysRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + a.join("|") + ")", "i");
  }function Qe() {
    return this.hours() % 12 || 12;
  }function Xe(e, t) {
    I(e, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), t);
    });
  }function Ke(e, t) {
    return t._meridiemParse;
  }I("H", ["HH", 2], 0, "hour"), I("h", ["hh", 2], 0, Qe), I("k", ["kk", 2], 0, function () {
    return this.hours() || 24;
  }), I("hmm", 0, 0, function () {
    return "" + Qe.apply(this) + U(this.minutes(), 2);
  }), I("hmmss", 0, 0, function () {
    return "" + Qe.apply(this) + U(this.minutes(), 2) + U(this.seconds(), 2);
  }), I("Hmm", 0, 0, function () {
    return "" + this.hours() + U(this.minutes(), 2);
  }), I("Hmmss", 0, 0, function () {
    return "" + this.hours() + U(this.minutes(), 2) + U(this.seconds(), 2);
  }), Xe("a", !0), Xe("A", !1), H("hour", "h"), L("hour", 13), ue("a", Ke), ue("A", Ke), ue("H", B), ue("h", B), ue("k", B), ue("HH", B, z), ue("hh", B, z), ue("kk", B, z), ue("hmm", Q), ue("hmmss", X), ue("Hmm", Q), ue("Hmmss", X), ce(["H", "HH"], ge), ce(["k", "kk"], function (e, t, n) {
    var s = k(e);t[ge] = 24 === s ? 0 : s;
  }), ce(["a", "A"], function (e, t, n) {
    n._isPm = n._locale.isPM(e), n._meridiem = e;
  }), ce(["h", "hh"], function (e, t, n) {
    t[ge] = k(e), g(n).bigHour = !0;
  }), ce("hmm", function (e, t, n) {
    var s = e.length - 2;t[ge] = k(e.substr(0, s)), t[pe] = k(e.substr(s)), g(n).bigHour = !0;
  }), ce("hmmss", function (e, t, n) {
    var s = e.length - 4,
        i = e.length - 2;t[ge] = k(e.substr(0, s)), t[pe] = k(e.substr(s, 2)), t[ve] = k(e.substr(i)), g(n).bigHour = !0;
  }), ce("Hmm", function (e, t, n) {
    var s = e.length - 2;t[ge] = k(e.substr(0, s)), t[pe] = k(e.substr(s));
  }), ce("Hmmss", function (e, t, n) {
    var s = e.length - 4,
        i = e.length - 2;t[ge] = k(e.substr(0, s)), t[pe] = k(e.substr(s, 2)), t[ve] = k(e.substr(i));
  });var et,
      tt = Te("Hours", !0),
      nt = { calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, longDateFormat: { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, invalidDate: "Invalid date", ordinal: "%d", dayOfMonthOrdinalParse: /\d{1,2}/, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, months: He, monthsShort: Re, week: { dow: 0, doy: 6 }, weekdays: je, weekdaysMin: ze, weekdaysShort: Ze, meridiemParse: /[ap]\.?m?\.?/i },
      st = {},
      it = {};function rt(e) {
    return e ? e.toLowerCase().replace("_", "-") : e;
  }function at(e) {
    var t = null;if (!st[e] && "undefined" != typeof module && module && module.exports) try {
      t = et._abbr, require("./locale/" + e), ot(t);
    } catch (e) {}return st[e];
  }function ot(e, t) {
    var n;return e && ((n = l(t) ? lt(e) : ut(e, t)) ? et = n : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), et._abbr;
  }function ut(e, t) {
    if (null !== t) {
      var n,
          s = nt;if (t.abbr = e, null != st[e]) T("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), s = st[e]._config;else if (null != t.parentLocale) if (null != st[t.parentLocale]) s = st[t.parentLocale]._config;else {
        if (null == (n = at(t.parentLocale))) return it[t.parentLocale] || (it[t.parentLocale] = []), it[t.parentLocale].push({ name: e, config: t }), null;s = n._config;
      }return st[e] = new P(b(s, t)), it[e] && it[e].forEach(function (e) {
        ut(e.name, e.config);
      }), ot(e), st[e];
    }return delete st[e], null;
  }function lt(e) {
    var t;if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return et;if (!o(e)) {
      if (t = at(e)) return t;e = [e];
    }return function (e) {
      for (var t, n, s, i, r = 0; r < e.length;) {
        for (t = (i = rt(e[r]).split("-")).length, n = (n = rt(e[r + 1])) ? n.split("-") : null; 0 < t;) {
          if (s = at(i.slice(0, t).join("-"))) return s;if (n && n.length >= t && a(i, n, !0) >= t - 1) break;t--;
        }r++;
      }return et;
    }(e);
  }function dt(e) {
    var t,
        n = e._a;return n && -2 === g(e).overflow && (t = n[_e] < 0 || 11 < n[_e] ? _e : n[ye] < 1 || n[ye] > Pe(n[me], n[_e]) ? ye : n[ge] < 0 || 24 < n[ge] || 24 === n[ge] && (0 !== n[pe] || 0 !== n[ve] || 0 !== n[we]) ? ge : n[pe] < 0 || 59 < n[pe] ? pe : n[ve] < 0 || 59 < n[ve] ? ve : n[we] < 0 || 999 < n[we] ? we : -1, g(e)._overflowDayOfYear && (t < me || ye < t) && (t = ye), g(e)._overflowWeeks && -1 === t && (t = Me), g(e)._overflowWeekday && -1 === t && (t = Se), g(e).overflow = t), e;
  }function ht(e, t, n) {
    return null != e ? e : null != t ? t : n;
  }function ct(e) {
    var t,
        n,
        s,
        i,
        r,
        a = [];if (!e._d) {
      var o, u;for (o = e, u = new Date(c.now()), s = o._useUTC ? [u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate()] : [u.getFullYear(), u.getMonth(), u.getDate()], e._w && null == e._a[ye] && null == e._a[_e] && function (e) {
        var t, n, s, i, r, a, o, u;if (null != (t = e._w).GG || null != t.W || null != t.E) r = 1, a = 4, n = ht(t.GG, e._a[me], Ie(Tt(), 1, 4).year), s = ht(t.W, 1), ((i = ht(t.E, 1)) < 1 || 7 < i) && (u = !0);else {
          r = e._locale._week.dow, a = e._locale._week.doy;var l = Ie(Tt(), r, a);n = ht(t.gg, e._a[me], l.year), s = ht(t.w, l.week), null != t.d ? ((i = t.d) < 0 || 6 < i) && (u = !0) : null != t.e ? (i = t.e + r, (t.e < 0 || 6 < t.e) && (u = !0)) : i = r;
        }s < 1 || s > Ae(n, r, a) ? g(e)._overflowWeeks = !0 : null != u ? g(e)._overflowWeekday = !0 : (o = Ee(n, s, i, r, a), e._a[me] = o.year, e._dayOfYear = o.dayOfYear);
      }(e), null != e._dayOfYear && (r = ht(e._a[me], s[me]), (e._dayOfYear > De(r) || 0 === e._dayOfYear) && (g(e)._overflowDayOfYear = !0), n = Ge(r, 0, e._dayOfYear), e._a[_e] = n.getUTCMonth(), e._a[ye] = n.getUTCDate()), t = 0; t < 3 && null == e._a[t]; ++t) e._a[t] = a[t] = s[t];for (; t < 7; t++) e._a[t] = a[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];24 === e._a[ge] && 0 === e._a[pe] && 0 === e._a[ve] && 0 === e._a[we] && (e._nextDay = !0, e._a[ge] = 0), e._d = (e._useUTC ? Ge : function (e, t, n, s, i, r, a) {
        var o = new Date(e, t, n, s, i, r, a);return e < 100 && 0 <= e && isFinite(o.getFullYear()) && o.setFullYear(e), o;
      }).apply(null, a), i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[ge] = 24), e._w && void 0 !== e._w.d && e._w.d !== i && (g(e).weekdayMismatch = !0);
    }
  }var ft = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
      mt = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
      _t = /Z|[+-]\d\d(?::?\d\d)?/,
      yt = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]],
      gt = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]],
      pt = /^\/?Date\((\-?\d+)/i;function vt(e) {
    var t,
        n,
        s,
        i,
        r,
        a,
        o = e._i,
        u = ft.exec(o) || mt.exec(o);if (u) {
      for (g(e).iso = !0, t = 0, n = yt.length; t < n; t++) if (yt[t][1].exec(u[1])) {
        i = yt[t][0], s = !1 !== yt[t][2];break;
      }if (null == i) return void (e._isValid = !1);if (u[3]) {
        for (t = 0, n = gt.length; t < n; t++) if (gt[t][1].exec(u[3])) {
          r = (u[2] || " ") + gt[t][0];break;
        }if (null == r) return void (e._isValid = !1);
      }if (!s && null != r) return void (e._isValid = !1);if (u[4]) {
        if (!_t.exec(u[4])) return void (e._isValid = !1);a = "Z";
      }e._f = i + (r || "") + (a || ""), kt(e);
    } else e._isValid = !1;
  }var wt = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;function Mt(e, t, n, s, i, r) {
    var a = [function (e) {
      var t = parseInt(e, 10);{
        if (t <= 49) return 2e3 + t;if (t <= 999) return 1900 + t;
      }return t;
    }(e), Re.indexOf(t), parseInt(n, 10), parseInt(s, 10), parseInt(i, 10)];return r && a.push(parseInt(r, 10)), a;
  }var St = { UT: 0, GMT: 0, EDT: -240, EST: -300, CDT: -300, CST: -360, MDT: -360, MST: -420, PDT: -420, PST: -480 };function Dt(e) {
    var t,
        n,
        s,
        i = wt.exec(e._i.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""));if (i) {
      var r = Mt(i[4], i[3], i[2], i[5], i[6], i[7]);if (t = i[1], n = r, s = e, t && Ze.indexOf(t) !== new Date(n[0], n[1], n[2]).getDay() && (g(s).weekdayMismatch = !0, !(s._isValid = !1))) return;e._a = r, e._tzm = function (e, t, n) {
        if (e) return St[e];if (t) return 0;var s = parseInt(n, 10),
            i = s % 100;return (s - i) / 100 * 60 + i;
      }(i[8], i[9], i[10]), e._d = Ge.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), g(e).rfc2822 = !0;
    } else e._isValid = !1;
  }function kt(e) {
    if (e._f !== c.ISO_8601) {
      if (e._f !== c.RFC_2822) {
        e._a = [], g(e).empty = !0;var t,
            n,
            s,
            i,
            r,
            a,
            o,
            u,
            l = "" + e._i,
            d = l.length,
            h = 0;for (s = j(e._f, e._locale).match(N) || [], t = 0; t < s.length; t++) i = s[t], (n = (l.match(le(i, e)) || [])[0]) && (0 < (r = l.substr(0, l.indexOf(n))).length && g(e).unusedInput.push(r), l = l.slice(l.indexOf(n) + n.length), h += n.length), E[i] ? (n ? g(e).empty = !1 : g(e).unusedTokens.push(i), a = i, u = e, null != (o = n) && m(he, a) && he[a](o, u._a, u, a)) : e._strict && !n && g(e).unusedTokens.push(i);g(e).charsLeftOver = d - h, 0 < l.length && g(e).unusedInput.push(l), e._a[ge] <= 12 && !0 === g(e).bigHour && 0 < e._a[ge] && (g(e).bigHour = void 0), g(e).parsedDateParts = e._a.slice(0), g(e).meridiem = e._meridiem, e._a[ge] = function (e, t, n) {
          var s;if (null == n) return t;return null != e.meridiemHour ? e.meridiemHour(t, n) : (null != e.isPM && ((s = e.isPM(n)) && t < 12 && (t += 12), s || 12 !== t || (t = 0)), t);
        }(e._locale, e._a[ge], e._meridiem), ct(e), dt(e);
      } else Dt(e);
    } else vt(e);
  }function Yt(e) {
    var t,
        n,
        s,
        i,
        r = e._i,
        a = e._f;return e._locale = e._locale || lt(e._l), null === r || void 0 === a && "" === r ? v({ nullInput: !0 }) : ("string" == typeof r && (e._i = r = e._locale.preparse(r)), S(r) ? new M(dt(r)) : (h(r) ? e._d = r : o(a) ? function (e) {
      var t, n, s, i, r;if (0 === e._f.length) return g(e).invalidFormat = !0, e._d = new Date(NaN);for (i = 0; i < e._f.length; i++) r = 0, t = w({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._f = e._f[i], kt(t), p(t) && (r += g(t).charsLeftOver, r += 10 * g(t).unusedTokens.length, g(t).score = r, (null == s || r < s) && (s = r, n = t));_(e, n || t);
    }(e) : a ? kt(e) : l(n = (t = e)._i) ? t._d = new Date(c.now()) : h(n) ? t._d = new Date(n.valueOf()) : "string" == typeof n ? (s = t, null === (i = pt.exec(s._i)) ? (vt(s), !1 === s._isValid && (delete s._isValid, Dt(s), !1 === s._isValid && (delete s._isValid, c.createFromInputFallback(s)))) : s._d = new Date(+i[1])) : o(n) ? (t._a = f(n.slice(0), function (e) {
      return parseInt(e, 10);
    }), ct(t)) : u(n) ? function (e) {
      if (!e._d) {
        var t = C(e._i);e._a = f([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function (e) {
          return e && parseInt(e, 10);
        }), ct(e);
      }
    }(t) : d(n) ? t._d = new Date(n) : c.createFromInputFallback(t), p(e) || (e._d = null), e));
  }function Ot(e, t, n, s, i) {
    var r,
        a = {};return !0 !== n && !1 !== n || (s = n, n = void 0), (u(e) && function (e) {
      if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(e).length;var t;for (t in e) if (e.hasOwnProperty(t)) return !1;return !0;
    }(e) || o(e) && 0 === e.length) && (e = void 0), a._isAMomentObject = !0, a._useUTC = a._isUTC = i, a._l = n, a._i = e, a._f = t, a._strict = s, (r = new M(dt(Yt(a))))._nextDay && (r.add(1, "d"), r._nextDay = void 0), r;
  }function Tt(e, t, n, s) {
    return Ot(e, t, n, s, !1);
  }c.createFromInputFallback = n("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (e) {
    e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
  }), c.ISO_8601 = function () {}, c.RFC_2822 = function () {};var xt = n("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
    var e = Tt.apply(null, arguments);return this.isValid() && e.isValid() ? e < this ? this : e : v();
  }),
      bt = n("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
    var e = Tt.apply(null, arguments);return this.isValid() && e.isValid() ? this < e ? this : e : v();
  });function Pt(e, t) {
    var n, s;if (1 === t.length && o(t[0]) && (t = t[0]), !t.length) return Tt();for (n = t[0], s = 1; s < t.length; ++s) t[s].isValid() && !t[s][e](n) || (n = t[s]);return n;
  }var Wt = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];function Ht(e) {
    var t = C(e),
        n = t.year || 0,
        s = t.quarter || 0,
        i = t.month || 0,
        r = t.week || 0,
        a = t.day || 0,
        o = t.hour || 0,
        u = t.minute || 0,
        l = t.second || 0,
        d = t.millisecond || 0;this._isValid = function (e) {
      for (var t in e) if (-1 === Ye.call(Wt, t) || null != e[t] && isNaN(e[t])) return !1;for (var n = !1, s = 0; s < Wt.length; ++s) if (e[Wt[s]]) {
        if (n) return !1;parseFloat(e[Wt[s]]) !== k(e[Wt[s]]) && (n = !0);
      }return !0;
    }(t), this._milliseconds = +d + 1e3 * l + 6e4 * u + 1e3 * o * 60 * 60, this._days = +a + 7 * r, this._months = +i + 3 * s + 12 * n, this._data = {}, this._locale = lt(), this._bubble();
  }function Rt(e) {
    return e instanceof Ht;
  }function Ct(e) {
    return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e);
  }function Ft(e, n) {
    I(e, 0, 0, function () {
      var e = this.utcOffset(),
          t = "+";return e < 0 && (e = -e, t = "-"), t + U(~~(e / 60), 2) + n + U(~~e % 60, 2);
    });
  }Ft("Z", ":"), Ft("ZZ", ""), ue("Z", re), ue("ZZ", re), ce(["Z", "ZZ"], function (e, t, n) {
    n._useUTC = !0, n._tzm = Ut(re, e);
  });var Lt = /([\+\-]|\d\d)/gi;function Ut(e, t) {
    var n = (t || "").match(e);if (null === n) return null;var s = ((n[n.length - 1] || []) + "").match(Lt) || ["-", 0, 0],
        i = 60 * s[1] + k(s[2]);return 0 === i ? 0 : "+" === s[0] ? i : -i;
  }function Nt(e, t) {
    var n, s;return t._isUTC ? (n = t.clone(), s = (S(e) || h(e) ? e.valueOf() : Tt(e).valueOf()) - n.valueOf(), n._d.setTime(n._d.valueOf() + s), c.updateOffset(n, !1), n) : Tt(e).local();
  }function Gt(e) {
    return 15 * -Math.round(e._d.getTimezoneOffset() / 15);
  }function Vt() {
    return !!this.isValid() && this._isUTC && 0 === this._offset;
  }c.updateOffset = function () {};var Et = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
      It = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;function At(e, t) {
    var n,
        s,
        i,
        r = e,
        a = null;return Rt(e) ? r = { ms: e._milliseconds, d: e._days, M: e._months } : d(e) ? (r = {}, t ? r[t] = e : r.milliseconds = e) : (a = Et.exec(e)) ? (n = "-" === a[1] ? -1 : 1, r = { y: 0, d: k(a[ye]) * n, h: k(a[ge]) * n, m: k(a[pe]) * n, s: k(a[ve]) * n, ms: k(Ct(1e3 * a[we])) * n }) : (a = It.exec(e)) ? (n = "-" === a[1] ? -1 : (a[1], 1), r = { y: jt(a[2], n), M: jt(a[3], n), w: jt(a[4], n), d: jt(a[5], n), h: jt(a[6], n), m: jt(a[7], n), s: jt(a[8], n) }) : null == r ? r = {} : "object" == typeof r && ("from" in r || "to" in r) && (i = function (e, t) {
      var n;if (!e.isValid() || !t.isValid()) return { milliseconds: 0, months: 0 };t = Nt(t, e), e.isBefore(t) ? n = Zt(e, t) : ((n = Zt(t, e)).milliseconds = -n.milliseconds, n.months = -n.months);return n;
    }(Tt(r.from), Tt(r.to)), (r = {}).ms = i.milliseconds, r.M = i.months), s = new Ht(r), Rt(e) && m(e, "_locale") && (s._locale = e._locale), s;
  }function jt(e, t) {
    var n = e && parseFloat(e.replace(",", "."));return (isNaN(n) ? 0 : n) * t;
  }function Zt(e, t) {
    var n = { milliseconds: 0, months: 0 };return n.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = +t - +e.clone().add(n.months, "M"), n;
  }function zt(s, i) {
    return function (e, t) {
      var n;return null === t || isNaN(+t) || (T(i, "moment()." + i + "(period, number) is deprecated. Please use moment()." + i + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), n = e, e = t, t = n), $t(this, At(e = "string" == typeof e ? +e : e, t), s), this;
    };
  }function $t(e, t, n, s) {
    var i = t._milliseconds,
        r = Ct(t._days),
        a = Ct(t._months);e.isValid() && (s = null == s || s, a && Ce(e, xe(e, "Month") + a * n), r && be(e, "Date", xe(e, "Date") + r * n), i && e._d.setTime(e._d.valueOf() + i * n), s && c.updateOffset(e, r || a));
  }At.fn = Ht.prototype, At.invalid = function () {
    return At(NaN);
  };var qt = zt(1, "add"),
      Jt = zt(-1, "subtract");function Bt(e, t) {
    var n = 12 * (t.year() - e.year()) + (t.month() - e.month()),
        s = e.clone().add(n, "months");return -(n + (t - s < 0 ? (t - s) / (s - e.clone().add(n - 1, "months")) : (t - s) / (e.clone().add(n + 1, "months") - s))) || 0;
  }function Qt(e) {
    var t;return void 0 === e ? this._locale._abbr : (null != (t = lt(e)) && (this._locale = t), this);
  }c.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", c.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";var Xt = n("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (e) {
    return void 0 === e ? this.localeData() : this.locale(e);
  });function Kt() {
    return this._locale;
  }function en(e, t) {
    I(0, [e, e.length], 0, t);
  }function tn(e, t, n, s, i) {
    var r;return null == e ? Ie(this, s, i).year : ((r = Ae(e, s, i)) < t && (t = r), function (e, t, n, s, i) {
      var r = Ee(e, t, n, s, i),
          a = Ge(r.year, 0, r.dayOfYear);return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this;
    }.call(this, e, t, n, s, i));
  }I(0, ["gg", 2], 0, function () {
    return this.weekYear() % 100;
  }), I(0, ["GG", 2], 0, function () {
    return this.isoWeekYear() % 100;
  }), en("gggg", "weekYear"), en("ggggg", "weekYear"), en("GGGG", "isoWeekYear"), en("GGGGG", "isoWeekYear"), H("weekYear", "gg"), H("isoWeekYear", "GG"), L("weekYear", 1), L("isoWeekYear", 1), ue("G", se), ue("g", se), ue("GG", B, z), ue("gg", B, z), ue("GGGG", ee, q), ue("gggg", ee, q), ue("GGGGG", te, J), ue("ggggg", te, J), fe(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, n, s) {
    t[s.substr(0, 2)] = k(e);
  }), fe(["gg", "GG"], function (e, t, n, s) {
    t[s] = c.parseTwoDigitYear(e);
  }), I("Q", 0, "Qo", "quarter"), H("quarter", "Q"), L("quarter", 7), ue("Q", Z), ce("Q", function (e, t) {
    t[_e] = 3 * (k(e) - 1);
  }), I("D", ["DD", 2], "Do", "date"), H("date", "D"), L("date", 9), ue("D", B), ue("DD", B, z), ue("Do", function (e, t) {
    return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
  }), ce(["D", "DD"], ye), ce("Do", function (e, t) {
    t[ye] = k(e.match(B)[0]);
  });var nn = Te("Date", !0);I("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), H("dayOfYear", "DDD"), L("dayOfYear", 4), ue("DDD", K), ue("DDDD", $), ce(["DDD", "DDDD"], function (e, t, n) {
    n._dayOfYear = k(e);
  }), I("m", ["mm", 2], 0, "minute"), H("minute", "m"), L("minute", 14), ue("m", B), ue("mm", B, z), ce(["m", "mm"], pe);var sn = Te("Minutes", !1);I("s", ["ss", 2], 0, "second"), H("second", "s"), L("second", 15), ue("s", B), ue("ss", B, z), ce(["s", "ss"], ve);var rn,
      an = Te("Seconds", !1);for (I("S", 0, 0, function () {
    return ~~(this.millisecond() / 100);
  }), I(0, ["SS", 2], 0, function () {
    return ~~(this.millisecond() / 10);
  }), I(0, ["SSS", 3], 0, "millisecond"), I(0, ["SSSS", 4], 0, function () {
    return 10 * this.millisecond();
  }), I(0, ["SSSSS", 5], 0, function () {
    return 100 * this.millisecond();
  }), I(0, ["SSSSSS", 6], 0, function () {
    return 1e3 * this.millisecond();
  }), I(0, ["SSSSSSS", 7], 0, function () {
    return 1e4 * this.millisecond();
  }), I(0, ["SSSSSSSS", 8], 0, function () {
    return 1e5 * this.millisecond();
  }), I(0, ["SSSSSSSSS", 9], 0, function () {
    return 1e6 * this.millisecond();
  }), H("millisecond", "ms"), L("millisecond", 16), ue("S", K, Z), ue("SS", K, z), ue("SSS", K, $), rn = "SSSS"; rn.length <= 9; rn += "S") ue(rn, ne);function on(e, t) {
    t[we] = k(1e3 * ("0." + e));
  }for (rn = "S"; rn.length <= 9; rn += "S") ce(rn, on);var un = Te("Milliseconds", !1);I("z", 0, 0, "zoneAbbr"), I("zz", 0, 0, "zoneName");var ln = M.prototype;function dn(e) {
    return e;
  }ln.add = qt, ln.calendar = function (e, t) {
    var n = e || Tt(),
        s = Nt(n, this).startOf("day"),
        i = c.calendarFormat(this, s) || "sameElse",
        r = t && (x(t[i]) ? t[i].call(this, n) : t[i]);return this.format(r || this.localeData().calendar(i, this, Tt(n)));
  }, ln.clone = function () {
    return new M(this);
  }, ln.diff = function (e, t, n) {
    var s, i, r;if (!this.isValid()) return NaN;if (!(s = Nt(e, this)).isValid()) return NaN;switch (i = 6e4 * (s.utcOffset() - this.utcOffset()), t = R(t)) {case "year":
        r = Bt(this, s) / 12;break;case "month":
        r = Bt(this, s);break;case "quarter":
        r = Bt(this, s) / 3;break;case "second":
        r = (this - s) / 1e3;break;case "minute":
        r = (this - s) / 6e4;break;case "hour":
        r = (this - s) / 36e5;break;case "day":
        r = (this - s - i) / 864e5;break;case "week":
        r = (this - s - i) / 6048e5;break;default:
        r = this - s;}return n ? r : D(r);
  }, ln.endOf = function (e) {
    return void 0 === (e = R(e)) || "millisecond" === e ? this : ("date" === e && (e = "day"), this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms"));
  }, ln.format = function (e) {
    e || (e = this.isUtc() ? c.defaultFormatUtc : c.defaultFormat);var t = A(this, e);return this.localeData().postformat(t);
  }, ln.from = function (e, t) {
    return this.isValid() && (S(e) && e.isValid() || Tt(e).isValid()) ? At({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
  }, ln.fromNow = function (e) {
    return this.from(Tt(), e);
  }, ln.to = function (e, t) {
    return this.isValid() && (S(e) && e.isValid() || Tt(e).isValid()) ? At({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
  }, ln.toNow = function (e) {
    return this.to(Tt(), e);
  }, ln.get = function (e) {
    return x(this[e = R(e)]) ? this[e]() : this;
  }, ln.invalidAt = function () {
    return g(this).overflow;
  }, ln.isAfter = function (e, t) {
    var n = S(e) ? e : Tt(e);return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = R(l(t) ? "millisecond" : t)) ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(t).valueOf());
  }, ln.isBefore = function (e, t) {
    var n = S(e) ? e : Tt(e);return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = R(l(t) ? "millisecond" : t)) ? this.valueOf() < n.valueOf() : this.clone().endOf(t).valueOf() < n.valueOf());
  }, ln.isBetween = function (e, t, n, s) {
    return ("(" === (s = s || "()")[0] ? this.isAfter(e, n) : !this.isBefore(e, n)) && (")" === s[1] ? this.isBefore(t, n) : !this.isAfter(t, n));
  }, ln.isSame = function (e, t) {
    var n,
        s = S(e) ? e : Tt(e);return !(!this.isValid() || !s.isValid()) && ("millisecond" === (t = R(t || "millisecond")) ? this.valueOf() === s.valueOf() : (n = s.valueOf(), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf()));
  }, ln.isSameOrAfter = function (e, t) {
    return this.isSame(e, t) || this.isAfter(e, t);
  }, ln.isSameOrBefore = function (e, t) {
    return this.isSame(e, t) || this.isBefore(e, t);
  }, ln.isValid = function () {
    return p(this);
  }, ln.lang = Xt, ln.locale = Qt, ln.localeData = Kt, ln.max = bt, ln.min = xt, ln.parsingFlags = function () {
    return _({}, g(this));
  }, ln.set = function (e, t) {
    if ("object" == typeof e) for (var n = function (e) {
      var t = [];for (var n in e) t.push({ unit: n, priority: F[n] });return t.sort(function (e, t) {
        return e.priority - t.priority;
      }), t;
    }(e = C(e)), s = 0; s < n.length; s++) this[n[s].unit](e[n[s].unit]);else if (x(this[e = R(e)])) return this[e](t);return this;
  }, ln.startOf = function (e) {
    switch (e = R(e)) {case "year":
        this.month(0);case "quarter":case "month":
        this.date(1);case "week":case "isoWeek":case "day":case "date":
        this.hours(0);case "hour":
        this.minutes(0);case "minute":
        this.seconds(0);case "second":
        this.milliseconds(0);}return "week" === e && this.weekday(0), "isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), this;
  }, ln.subtract = Jt, ln.toArray = function () {
    var e = this;return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()];
  }, ln.toObject = function () {
    var e = this;return { years: e.year(), months: e.month(), date: e.date(), hours: e.hours(), minutes: e.minutes(), seconds: e.seconds(), milliseconds: e.milliseconds() };
  }, ln.toDate = function () {
    return new Date(this.valueOf());
  }, ln.toISOString = function (e) {
    if (!this.isValid()) return null;var t = !0 !== e,
        n = t ? this.clone().utc() : this;return n.year() < 0 || 9999 < n.year() ? A(n, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : x(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", A(n, "Z")) : A(n, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
  }, ln.inspect = function () {
    if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";var e = "moment",
        t = "";this.isLocal() || (e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", t = "Z");var n = "[" + e + '("]',
        s = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
        i = t + '[")]';return this.format(n + s + "-MM-DD[T]HH:mm:ss.SSS" + i);
  }, ln.toJSON = function () {
    return this.isValid() ? this.toISOString() : null;
  }, ln.toString = function () {
    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
  }, ln.unix = function () {
    return Math.floor(this.valueOf() / 1e3);
  }, ln.valueOf = function () {
    return this._d.valueOf() - 6e4 * (this._offset || 0);
  }, ln.creationData = function () {
    return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict };
  }, ln.year = Oe, ln.isLeapYear = function () {
    return ke(this.year());
  }, ln.weekYear = function (e) {
    return tn.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
  }, ln.isoWeekYear = function (e) {
    return tn.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
  }, ln.quarter = ln.quarters = function (e) {
    return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3);
  }, ln.month = Fe, ln.daysInMonth = function () {
    return Pe(this.year(), this.month());
  }, ln.week = ln.weeks = function (e) {
    var t = this.localeData().week(this);return null == e ? t : this.add(7 * (e - t), "d");
  }, ln.isoWeek = ln.isoWeeks = function (e) {
    var t = Ie(this, 1, 4).week;return null == e ? t : this.add(7 * (e - t), "d");
  }, ln.weeksInYear = function () {
    var e = this.localeData()._week;return Ae(this.year(), e.dow, e.doy);
  }, ln.isoWeeksInYear = function () {
    return Ae(this.year(), 1, 4);
  }, ln.date = nn, ln.day = ln.days = function (e) {
    if (!this.isValid()) return null != e ? this : NaN;var t,
        n,
        s = this._isUTC ? this._d.getUTCDay() : this._d.getDay();return null != e ? (t = e, n = this.localeData(), e = "string" != typeof t ? t : isNaN(t) ? "number" == typeof (t = n.weekdaysParse(t)) ? t : null : parseInt(t, 10), this.add(e - s, "d")) : s;
  }, ln.weekday = function (e) {
    if (!this.isValid()) return null != e ? this : NaN;var t = (this.day() + 7 - this.localeData()._week.dow) % 7;return null == e ? t : this.add(e - t, "d");
  }, ln.isoWeekday = function (e) {
    if (!this.isValid()) return null != e ? this : NaN;if (null != e) {
      var t = (n = e, s = this.localeData(), "string" == typeof n ? s.weekdaysParse(n) % 7 || 7 : isNaN(n) ? null : n);return this.day(this.day() % 7 ? t : t - 7);
    }return this.day() || 7;var n, s;
  }, ln.dayOfYear = function (e) {
    var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;return null == e ? t : this.add(e - t, "d");
  }, ln.hour = ln.hours = tt, ln.minute = ln.minutes = sn, ln.second = ln.seconds = an, ln.millisecond = ln.milliseconds = un, ln.utcOffset = function (e, t, n) {
    var s,
        i = this._offset || 0;if (!this.isValid()) return null != e ? this : NaN;if (null != e) {
      if ("string" == typeof e) {
        if (null === (e = Ut(re, e))) return this;
      } else Math.abs(e) < 16 && !n && (e *= 60);return !this._isUTC && t && (s = Gt(this)), this._offset = e, this._isUTC = !0, null != s && this.add(s, "m"), i !== e && (!t || this._changeInProgress ? $t(this, At(e - i, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, c.updateOffset(this, !0), this._changeInProgress = null)), this;
    }return this._isUTC ? i : Gt(this);
  }, ln.utc = function (e) {
    return this.utcOffset(0, e);
  }, ln.local = function (e) {
    return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Gt(this), "m")), this;
  }, ln.parseZone = function () {
    if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);else if ("string" == typeof this._i) {
      var e = Ut(ie, this._i);null != e ? this.utcOffset(e) : this.utcOffset(0, !0);
    }return this;
  }, ln.hasAlignedHourOffset = function (e) {
    return !!this.isValid() && (e = e ? Tt(e).utcOffset() : 0, (this.utcOffset() - e) % 60 == 0);
  }, ln.isDST = function () {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }, ln.isLocal = function () {
    return !!this.isValid() && !this._isUTC;
  }, ln.isUtcOffset = function () {
    return !!this.isValid() && this._isUTC;
  }, ln.isUtc = Vt, ln.isUTC = Vt, ln.zoneAbbr = function () {
    return this._isUTC ? "UTC" : "";
  }, ln.zoneName = function () {
    return this._isUTC ? "Coordinated Universal Time" : "";
  }, ln.dates = n("dates accessor is deprecated. Use date instead.", nn), ln.months = n("months accessor is deprecated. Use month instead", Fe), ln.years = n("years accessor is deprecated. Use year instead", Oe), ln.zone = n("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function (e, t) {
    return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
  }), ln.isDSTShifted = n("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function () {
    if (!l(this._isDSTShifted)) return this._isDSTShifted;var e = {};if (w(e, this), (e = Yt(e))._a) {
      var t = e._isUTC ? y(e._a) : Tt(e._a);this._isDSTShifted = this.isValid() && 0 < a(e._a, t.toArray());
    } else this._isDSTShifted = !1;return this._isDSTShifted;
  });var hn = P.prototype;function cn(e, t, n, s) {
    var i = lt(),
        r = y().set(s, t);return i[n](r, e);
  }function fn(e, t, n) {
    if (d(e) && (t = e, e = void 0), e = e || "", null != t) return cn(e, t, n, "month");var s,
        i = [];for (s = 0; s < 12; s++) i[s] = cn(e, s, n, "month");return i;
  }function mn(e, t, n, s) {
    "boolean" == typeof e ? d(t) && (n = t, t = void 0) : (t = e, e = !1, d(n = t) && (n = t, t = void 0)), t = t || "";var i,
        r = lt(),
        a = e ? r._week.dow : 0;if (null != n) return cn(t, (n + a) % 7, s, "day");var o = [];for (i = 0; i < 7; i++) o[i] = cn(t, (i + a) % 7, s, "day");return o;
  }hn.calendar = function (e, t, n) {
    var s = this._calendar[e] || this._calendar.sameElse;return x(s) ? s.call(t, n) : s;
  }, hn.longDateFormat = function (e) {
    var t = this._longDateFormat[e],
        n = this._longDateFormat[e.toUpperCase()];return t || !n ? t : (this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function (e) {
      return e.slice(1);
    }), this._longDateFormat[e]);
  }, hn.invalidDate = function () {
    return this._invalidDate;
  }, hn.ordinal = function (e) {
    return this._ordinal.replace("%d", e);
  }, hn.preparse = dn, hn.postformat = dn, hn.relativeTime = function (e, t, n, s) {
    var i = this._relativeTime[n];return x(i) ? i(e, t, n, s) : i.replace(/%d/i, e);
  }, hn.pastFuture = function (e, t) {
    var n = this._relativeTime[0 < e ? "future" : "past"];return x(n) ? n(t) : n.replace(/%s/i, t);
  }, hn.set = function (e) {
    var t, n;for (n in e) x(t = e[n]) ? this[n] = t : this["_" + n] = t;this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
  }, hn.months = function (e, t) {
    return e ? o(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || We).test(t) ? "format" : "standalone"][e.month()] : o(this._months) ? this._months : this._months.standalone;
  }, hn.monthsShort = function (e, t) {
    return e ? o(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[We.test(t) ? "format" : "standalone"][e.month()] : o(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
  }, hn.monthsParse = function (e, t, n) {
    var s, i, r;if (this._monthsParseExact) return function (e, t, n) {
      var s,
          i,
          r,
          a = e.toLocaleLowerCase();if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], s = 0; s < 12; ++s) r = y([2e3, s]), this._shortMonthsParse[s] = this.monthsShort(r, "").toLocaleLowerCase(), this._longMonthsParse[s] = this.months(r, "").toLocaleLowerCase();return n ? "MMM" === t ? -1 !== (i = Ye.call(this._shortMonthsParse, a)) ? i : null : -1 !== (i = Ye.call(this._longMonthsParse, a)) ? i : null : "MMM" === t ? -1 !== (i = Ye.call(this._shortMonthsParse, a)) ? i : -1 !== (i = Ye.call(this._longMonthsParse, a)) ? i : null : -1 !== (i = Ye.call(this._longMonthsParse, a)) ? i : -1 !== (i = Ye.call(this._shortMonthsParse, a)) ? i : null;
    }.call(this, e, t, n);for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), s = 0; s < 12; s++) {
      if (i = y([2e3, s]), n && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp("^" + this.months(i, "").replace(".", "") + "$", "i"), this._shortMonthsParse[s] = new RegExp("^" + this.monthsShort(i, "").replace(".", "") + "$", "i")), n || this._monthsParse[s] || (r = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), this._monthsParse[s] = new RegExp(r.replace(".", ""), "i")), n && "MMMM" === t && this._longMonthsParse[s].test(e)) return s;if (n && "MMM" === t && this._shortMonthsParse[s].test(e)) return s;if (!n && this._monthsParse[s].test(e)) return s;
    }
  }, hn.monthsRegex = function (e) {
    return this._monthsParseExact ? (m(this, "_monthsRegex") || Ne.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (m(this, "_monthsRegex") || (this._monthsRegex = Ue), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
  }, hn.monthsShortRegex = function (e) {
    return this._monthsParseExact ? (m(this, "_monthsRegex") || Ne.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (m(this, "_monthsShortRegex") || (this._monthsShortRegex = Le), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
  }, hn.week = function (e) {
    return Ie(e, this._week.dow, this._week.doy).week;
  }, hn.firstDayOfYear = function () {
    return this._week.doy;
  }, hn.firstDayOfWeek = function () {
    return this._week.dow;
  }, hn.weekdays = function (e, t) {
    return e ? o(this._weekdays) ? this._weekdays[e.day()] : this._weekdays[this._weekdays.isFormat.test(t) ? "format" : "standalone"][e.day()] : o(this._weekdays) ? this._weekdays : this._weekdays.standalone;
  }, hn.weekdaysMin = function (e) {
    return e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
  }, hn.weekdaysShort = function (e) {
    return e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
  }, hn.weekdaysParse = function (e, t, n) {
    var s, i, r;if (this._weekdaysParseExact) return function (e, t, n) {
      var s,
          i,
          r,
          a = e.toLocaleLowerCase();if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], s = 0; s < 7; ++s) r = y([2e3, 1]).day(s), this._minWeekdaysParse[s] = this.weekdaysMin(r, "").toLocaleLowerCase(), this._shortWeekdaysParse[s] = this.weekdaysShort(r, "").toLocaleLowerCase(), this._weekdaysParse[s] = this.weekdays(r, "").toLocaleLowerCase();return n ? "dddd" === t ? -1 !== (i = Ye.call(this._weekdaysParse, a)) ? i : null : "ddd" === t ? -1 !== (i = Ye.call(this._shortWeekdaysParse, a)) ? i : null : -1 !== (i = Ye.call(this._minWeekdaysParse, a)) ? i : null : "dddd" === t ? -1 !== (i = Ye.call(this._weekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._shortWeekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._minWeekdaysParse, a)) ? i : null : "ddd" === t ? -1 !== (i = Ye.call(this._shortWeekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._weekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._minWeekdaysParse, a)) ? i : null : -1 !== (i = Ye.call(this._minWeekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._weekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._shortWeekdaysParse, a)) ? i : null;
    }.call(this, e, t, n);for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), s = 0; s < 7; s++) {
      if (i = y([2e3, 1]).day(s), n && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp("^" + this.weekdays(i, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[s] = new RegExp("^" + this.weekdaysShort(i, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[s] = new RegExp("^" + this.weekdaysMin(i, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[s] || (r = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""), this._weekdaysParse[s] = new RegExp(r.replace(".", ""), "i")), n && "dddd" === t && this._fullWeekdaysParse[s].test(e)) return s;if (n && "ddd" === t && this._shortWeekdaysParse[s].test(e)) return s;if (n && "dd" === t && this._minWeekdaysParse[s].test(e)) return s;if (!n && this._weekdaysParse[s].test(e)) return s;
    }
  }, hn.weekdaysRegex = function (e) {
    return this._weekdaysParseExact ? (m(this, "_weekdaysRegex") || Be.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (m(this, "_weekdaysRegex") || (this._weekdaysRegex = $e), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
  }, hn.weekdaysShortRegex = function (e) {
    return this._weekdaysParseExact ? (m(this, "_weekdaysRegex") || Be.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (m(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = qe), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
  }, hn.weekdaysMinRegex = function (e) {
    return this._weekdaysParseExact ? (m(this, "_weekdaysRegex") || Be.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (m(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Je), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
  }, hn.isPM = function (e) {
    return "p" === (e + "").toLowerCase().charAt(0);
  }, hn.meridiem = function (e, t, n) {
    return 11 < e ? n ? "pm" : "PM" : n ? "am" : "AM";
  }, ot("en", { dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function (e) {
      var t = e % 10;return e + (1 === k(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th");
    } }), c.lang = n("moment.lang is deprecated. Use moment.locale instead.", ot), c.langData = n("moment.langData is deprecated. Use moment.localeData instead.", lt);var _n = Math.abs;function yn(e, t, n, s) {
    var i = At(t, n);return e._milliseconds += s * i._milliseconds, e._days += s * i._days, e._months += s * i._months, e._bubble();
  }function gn(e) {
    return e < 0 ? Math.floor(e) : Math.ceil(e);
  }function pn(e) {
    return 4800 * e / 146097;
  }function vn(e) {
    return 146097 * e / 4800;
  }function wn(e) {
    return function () {
      return this.as(e);
    };
  }var Mn = wn("ms"),
      Sn = wn("s"),
      Dn = wn("m"),
      kn = wn("h"),
      Yn = wn("d"),
      On = wn("w"),
      Tn = wn("M"),
      xn = wn("y");function bn(e) {
    return function () {
      return this.isValid() ? this._data[e] : NaN;
    };
  }var Pn = bn("milliseconds"),
      Wn = bn("seconds"),
      Hn = bn("minutes"),
      Rn = bn("hours"),
      Cn = bn("days"),
      Fn = bn("months"),
      Ln = bn("years");var Un = Math.round,
      Nn = { ss: 44, s: 45, m: 45, h: 22, d: 26, M: 11 };var Gn = Math.abs;function Vn(e) {
    return (0 < e) - (e < 0) || +e;
  }function En() {
    if (!this.isValid()) return this.localeData().invalidDate();var e,
        t,
        n = Gn(this._milliseconds) / 1e3,
        s = Gn(this._days),
        i = Gn(this._months);t = D((e = D(n / 60)) / 60), n %= 60, e %= 60;var r = D(i / 12),
        a = i %= 12,
        o = s,
        u = t,
        l = e,
        d = n ? n.toFixed(3).replace(/\.?0+$/, "") : "",
        h = this.asSeconds();if (!h) return "P0D";var c = h < 0 ? "-" : "",
        f = Vn(this._months) !== Vn(h) ? "-" : "",
        m = Vn(this._days) !== Vn(h) ? "-" : "",
        _ = Vn(this._milliseconds) !== Vn(h) ? "-" : "";return c + "P" + (r ? f + r + "Y" : "") + (a ? f + a + "M" : "") + (o ? m + o + "D" : "") + (u || l || d ? "T" : "") + (u ? _ + u + "H" : "") + (l ? _ + l + "M" : "") + (d ? _ + d + "S" : "");
  }var In = Ht.prototype;return In.isValid = function () {
    return this._isValid;
  }, In.abs = function () {
    var e = this._data;return this._milliseconds = _n(this._milliseconds), this._days = _n(this._days), this._months = _n(this._months), e.milliseconds = _n(e.milliseconds), e.seconds = _n(e.seconds), e.minutes = _n(e.minutes), e.hours = _n(e.hours), e.months = _n(e.months), e.years = _n(e.years), this;
  }, In.add = function (e, t) {
    return yn(this, e, t, 1);
  }, In.subtract = function (e, t) {
    return yn(this, e, t, -1);
  }, In.as = function (e) {
    if (!this.isValid()) return NaN;var t,
        n,
        s = this._milliseconds;if ("month" === (e = R(e)) || "year" === e) return t = this._days + s / 864e5, n = this._months + pn(t), "month" === e ? n : n / 12;switch (t = this._days + Math.round(vn(this._months)), e) {case "week":
        return t / 7 + s / 6048e5;case "day":
        return t + s / 864e5;case "hour":
        return 24 * t + s / 36e5;case "minute":
        return 1440 * t + s / 6e4;case "second":
        return 86400 * t + s / 1e3;case "millisecond":
        return Math.floor(864e5 * t) + s;default:
        throw new Error("Unknown unit " + e);}
  }, In.asMilliseconds = Mn, In.asSeconds = Sn, In.asMinutes = Dn, In.asHours = kn, In.asDays = Yn, In.asWeeks = On, In.asMonths = Tn, In.asYears = xn, In.valueOf = function () {
    return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * k(this._months / 12) : NaN;
  }, In._bubble = function () {
    var e,
        t,
        n,
        s,
        i,
        r = this._milliseconds,
        a = this._days,
        o = this._months,
        u = this._data;return 0 <= r && 0 <= a && 0 <= o || r <= 0 && a <= 0 && o <= 0 || (r += 864e5 * gn(vn(o) + a), o = a = 0), u.milliseconds = r % 1e3, e = D(r / 1e3), u.seconds = e % 60, t = D(e / 60), u.minutes = t % 60, n = D(t / 60), u.hours = n % 24, o += i = D(pn(a += D(n / 24))), a -= gn(vn(i)), s = D(o / 12), o %= 12, u.days = a, u.months = o, u.years = s, this;
  }, In.clone = function () {
    return At(this);
  }, In.get = function (e) {
    return e = R(e), this.isValid() ? this[e + "s"]() : NaN;
  }, In.milliseconds = Pn, In.seconds = Wn, In.minutes = Hn, In.hours = Rn, In.days = Cn, In.weeks = function () {
    return D(this.days() / 7);
  }, In.months = Fn, In.years = Ln, In.humanize = function (e) {
    if (!this.isValid()) return this.localeData().invalidDate();var t,
        n,
        s,
        i,
        r,
        a,
        o,
        u,
        l,
        d,
        h,
        c = this.localeData(),
        f = (n = !e, s = c, i = At(t = this).abs(), r = Un(i.as("s")), a = Un(i.as("m")), o = Un(i.as("h")), u = Un(i.as("d")), l = Un(i.as("M")), d = Un(i.as("y")), (h = r <= Nn.ss && ["s", r] || r < Nn.s && ["ss", r] || a <= 1 && ["m"] || a < Nn.m && ["mm", a] || o <= 1 && ["h"] || o < Nn.h && ["hh", o] || u <= 1 && ["d"] || u < Nn.d && ["dd", u] || l <= 1 && ["M"] || l < Nn.M && ["MM", l] || d <= 1 && ["y"] || ["yy", d])[2] = n, h[3] = 0 < +t, h[4] = s, function (e, t, n, s, i) {
      return i.relativeTime(t || 1, !!n, e, s);
    }.apply(null, h));return e && (f = c.pastFuture(+this, f)), c.postformat(f);
  }, In.toISOString = En, In.toString = En, In.toJSON = En, In.locale = Qt, In.localeData = Kt, In.toIsoString = n("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", En), In.lang = Xt, I("X", 0, 0, "unix"), I("x", 0, 0, "valueOf"), ue("x", se), ue("X", /[+-]?\d+(\.\d{1,3})?/), ce("X", function (e, t, n) {
    n._d = new Date(1e3 * parseFloat(e, 10));
  }), ce("x", function (e, t, n) {
    n._d = new Date(k(e));
  }), c.version = "2.22.2", e = Tt, c.fn = ln, c.min = function () {
    return Pt("isBefore", [].slice.call(arguments, 0));
  }, c.max = function () {
    return Pt("isAfter", [].slice.call(arguments, 0));
  }, c.now = function () {
    return Date.now ? Date.now() : +new Date();
  }, c.utc = y, c.unix = function (e) {
    return Tt(1e3 * e);
  }, c.months = function (e, t) {
    return fn(e, t, "months");
  }, c.isDate = h, c.locale = ot, c.invalid = v, c.duration = At, c.isMoment = S, c.weekdays = function (e, t, n) {
    return mn(e, t, n, "weekdays");
  }, c.parseZone = function () {
    return Tt.apply(null, arguments).parseZone();
  }, c.localeData = lt, c.isDuration = Rt, c.monthsShort = function (e, t) {
    return fn(e, t, "monthsShort");
  }, c.weekdaysMin = function (e, t, n) {
    return mn(e, t, n, "weekdaysMin");
  }, c.defineLocale = ut, c.updateLocale = function (e, t) {
    if (null != t) {
      var n,
          s,
          i = nt;null != (s = at(e)) && (i = s._config), (n = new P(t = b(i, t))).parentLocale = st[e], st[e] = n, ot(e);
    } else null != st[e] && (null != st[e].parentLocale ? st[e] = st[e].parentLocale : null != st[e] && delete st[e]);return st[e];
  }, c.locales = function () {
    return s(st);
  }, c.weekdaysShort = function (e, t, n) {
    return mn(e, t, n, "weekdaysShort");
  }, c.normalizeUnits = R, c.relativeTimeRounding = function (e) {
    return void 0 === e ? Un : "function" == typeof e && (Un = e, !0);
  }, c.relativeTimeThreshold = function (e, t) {
    return void 0 !== Nn[e] && (void 0 === t ? Nn[e] : (Nn[e] = t, "s" === e && (Nn.ss = t - 1), !0));
  }, c.calendarFormat = function (e, t) {
    var n = e.diff(t, "days", !0);return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse";
  }, c.prototype = ln, c.HTML5_FMT = { DATETIME_LOCAL: "YYYY-MM-DDTHH:mm", DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss", DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS", DATE: "YYYY-MM-DD", TIME: "HH:mm", TIME_SECONDS: "HH:mm:ss", TIME_MS: "HH:mm:ss.SSS", WEEK: "YYYY-[W]WW", MONTH: "YYYY-MM" }, c;
});
/*!
 * A polyfill for object-fit
 *
 * @author: Toni Pinel
 *
 */

;(function (window, document) {
  'use strict';

  var supports = function () {

    var div = document.createElement('div'),
        vendors = 'Khtml Ms O Moz Webkit'.split(' '),
        len = vendors.length;

    return function (prop) {
      if (prop in div.style) return true;

      prop = prop.replace(/^[a-z]/, function (val) {
        return val.toUpperCase();
      });

      while (len--) {
        if (vendors[len] + prop in div.style) {
          // browser supports box-shadow. Do what you need.
          // Or use a bang (!) to test if the browser doesn't.
          return true;
        }
      }
      return false;
    };
  }();

  var copyComputedStyle = function (from, to) {
    var computed_style_object = false;
    //trying to figure out which style object we need to use depense on the browser support
    //so we try until we have one
    computed_style_object = from.currentStyle || document.defaultView.getComputedStyle(from, null);

    //if the browser dose not support both methods we will return null
    if (!computed_style_object) return null;

    var stylePropertyValid = function (name, value) {
      //checking that the value is not a undefined
      return typeof value !== 'undefined' &&
      //checking that the value is not a object
      typeof value !== 'object' &&
      //checking that the value is not a function
      typeof value !== 'function' &&
      //checking that we dosent have empty string
      value.length > 0 &&
      //checking that the property is not int index ( happens on some browser
      value != parseInt(value);
    };

    //we iterating the computed style object and compy the style props and the values
    for (var property in computed_style_object) {
      //checking if the property and value we get are valid sinse browser have different implementations
      if (stylePropertyValid(property, computed_style_object[property])) {
        //applying the style property to the target element
        to.style[property] = computed_style_object[property];
      }
    }
  };

  if (supports('object-fit') === false) {

    var oImages = document.querySelectorAll('[data-object-fit]'),
        oDiv,
        sSource;

    for (var nKey = 0; nKey < oImages.length; nKey++) {

      oDiv = document.createElement('div');

      if (oImages[nKey].getAttribute('data-src-retina')) {
        sSource = oImages[nKey].getAttribute('data-src-retina');
      } else if (oImages[nKey].getAttribute('data-src')) {
        sSource = oImages[nKey].getAttribute('data-src');
      } else {
        sSource = oImages[nKey].src;
      }

      copyComputedStyle(oImages[nKey], oDiv);

      oDiv.style.display = "block";
      oDiv.style.backgroundImage = "url(" + sSource + ")";
      oDiv.style.backgroundPosition = "center center";
      oDiv.style.className = oImages[nKey].className;
      oDiv.style.backgroundRepeat = "no-repeat";

      switch (oImages[nKey].getAttribute('data-object-fit')) {
        case "cover":
          oDiv.style.backgroundSize = "cover";
          break;
        case "contain":
          oDiv.style.backgroundSize = "contain";
          break;
        case "fill":
          oDiv.style.backgroundSize = "100% 100%";
          break;
        case "none":
          oDiv.style.backgroundSize = "auto";
          break;
      }

      oImages[nKey].parentNode.replaceChild(oDiv, oImages[nKey]);
    }
  }
})(window, document);

!function (a) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();else if ("function" == typeof define && define.amd) define([], a);else {
    var b;b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.ProgressBar = a();
  }
}(function () {
  var a;return function () {
    function a(b, c, d) {
      function e(g, h) {
        if (!c[g]) {
          if (!b[g]) {
            var i = "function" == typeof require && require;if (!h && i) return i(g, !0);if (f) return f(g, !0);var j = new Error("Cannot find module '" + g + "'");throw j.code = "MODULE_NOT_FOUND", j;
          }var k = c[g] = { exports: {} };b[g][0].call(k.exports, function (a) {
            return e(b[g][1][a] || a);
          }, k, k.exports, a, b, c, d);
        }return c[g].exports;
      }for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);return e;
    }return a;
  }()({ 1: [function (b, c, d) {
      !function (b, e) {
        "object" == typeof d && "object" == typeof c ? c.exports = e() : "function" == typeof a && a.amd ? a("shifty", [], e) : "object" == typeof d ? d.shifty = e() : b.shifty = e();
      }(window, function () {
        return function (a) {
          function b(d) {
            if (c[d]) return c[d].exports;var e = c[d] = { i: d, l: !1, exports: {} };return a[d].call(e.exports, e, e.exports, b), e.l = !0, e.exports;
          }var c = {};return b.m = a, b.c = c, b.d = function (a, c, d) {
            b.o(a, c) || Object.defineProperty(a, c, { enumerable: !0, get: d });
          }, b.r = function (a) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(a, "__esModule", { value: !0 });
          }, b.t = function (a, c) {
            if (1 & c && (a = b(a)), 8 & c) return a;if (4 & c && "object" == typeof a && a && a.__esModule) return a;var d = Object.create(null);if (b.r(d), Object.defineProperty(d, "default", { enumerable: !0, value: a }), 2 & c && "string" != typeof a) for (var e in a) b.d(d, e, function (b) {
              return a[b];
            }.bind(null, e));return d;
          }, b.n = function (a) {
            var c = a && a.__esModule ? function () {
              return a.default;
            } : function () {
              return a;
            };return b.d(c, "a", c), c;
          }, b.o = function (a, b) {
            return Object.prototype.hasOwnProperty.call(a, b);
          }, b.p = "", b(b.s = 3);
        }([function (a, b, c) {
          "use strict";
          (function (a) {
            function d(a, b) {
              for (var c = 0; c < b.length; c++) {
                var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
              }
            }function e(a) {
              return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (a) {
                return typeof a;
              } : function (a) {
                return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
              })(a);
            }function f(a, b) {
              var c = Object.keys(a);if (Object.getOwnPropertySymbols) {
                var d = Object.getOwnPropertySymbols(a);b && (d = d.filter(function (b) {
                  return Object.getOwnPropertyDescriptor(a, b).enumerable;
                })), c.push.apply(c, d);
              }return c;
            }function g(a) {
              for (var b = 1; b < arguments.length; b++) {
                var c = null != arguments[b] ? arguments[b] : {};b % 2 ? f(Object(c), !0).forEach(function (b) {
                  h(a, b, c[b]);
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(c)) : f(Object(c)).forEach(function (b) {
                  Object.defineProperty(a, b, Object.getOwnPropertyDescriptor(c, b));
                });
              }return a;
            }function h(a, b, c) {
              return b in a ? Object.defineProperty(a, b, { value: c, enumerable: !0, configurable: !0, writable: !0 }) : a[b] = c, a;
            }function i() {
              var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                  b = new v(),
                  c = b.tween(a);return c.tweenable = b, c;
            }c.d(b, "e", function () {
              return q;
            }), c.d(b, "c", function () {
              return s;
            }), c.d(b, "b", function () {
              return t;
            }), c.d(b, "a", function () {
              return v;
            }), c.d(b, "d", function () {
              return i;
            });var j = c(1),
                k = "undefined" != typeof window ? window : a,
                l = k.requestAnimationFrame || k.webkitRequestAnimationFrame || k.oRequestAnimationFrame || k.msRequestAnimationFrame || k.mozCancelRequestAnimationFrame && k.mozRequestAnimationFrame || setTimeout,
                m = function () {},
                n = null,
                o = null,
                p = g({}, j),
                q = function (a, b, c, d, e, f, g) {
              var h = a < f ? 0 : (a - f) / e;for (var i in b) {
                var j = g[i],
                    k = j.call ? j : p[j],
                    l = c[i];b[i] = l + (d[i] - l) * k(h);
              }return b;
            },
                r = function (a, b) {
              var c = a._attachment,
                  d = a._currentState,
                  e = a._delay,
                  f = a._easing,
                  g = a._originalState,
                  h = a._duration,
                  i = a._step,
                  j = a._targetState,
                  k = a._timestamp,
                  l = k + e + h,
                  m = b > l ? l : b,
                  n = h - (l - m);m >= l ? (i(j, c, n), a.stop(!0)) : (a._applyFilter("beforeTween"), m < k + e ? (m = 1, h = 1, k = 1) : k += e, q(m, d, g, j, h, k, f), a._applyFilter("afterTween"), i(d, c, n));
            },
                s = function () {
              for (var a = v.now(), b = n; b;) {
                var c = b._next;r(b, a), b = c;
              }
            },
                t = function (a) {
              var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "linear",
                  c = {},
                  d = e(b);if ("string" === d || "function" === d) for (var f in a) c[f] = b;else for (var g in a) c[g] = b[g] || "linear";return c;
            },
                u = function (a) {
              if (a === n) (n = a._next) ? n._previous = null : o = null;else if (a === o) (o = a._previous) ? o._next = null : n = null;else {
                var b = a._previous,
                    c = a._next;b._next = c, c._previous = b;
              }a._previous = a._next = null;
            },
                v = function () {
              function a() {
                var b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;!function (a, b) {
                  if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
                }(this, a), this._currentState = b, this._configured = !1, this._filters = [], this._timestamp = null, this._next = null, this._previous = null, c && this.setConfig(c);
              }var b, c, e;return b = a, (c = [{ key: "_applyFilter", value: function (a) {
                  var b = !0,
                      c = !1,
                      d = void 0;try {
                    for (var e, f = this._filters[Symbol.iterator](); !(b = (e = f.next()).done); b = !0) {
                      var g = e.value[a];g && g(this);
                    }
                  } catch (a) {
                    c = !0, d = a;
                  } finally {
                    try {
                      b || null == f.return || f.return();
                    } finally {
                      if (c) throw d;
                    }
                  }
                } }, { key: "tween", value: function () {
                  var b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0,
                      c = this._attachment,
                      d = this._configured;return !b && d || this.setConfig(b), this._pausedAtTime = null, this._timestamp = a.now(), this._start(this.get(), c), this.resume();
                } }, { key: "setConfig", value: function () {
                  var b = this,
                      c = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                      d = c.attachment,
                      e = c.delay,
                      f = void 0 === e ? 0 : e,
                      h = c.duration,
                      i = void 0 === h ? 500 : h,
                      j = c.easing,
                      k = c.from,
                      l = c.promise,
                      n = void 0 === l ? Promise : l,
                      o = c.start,
                      p = void 0 === o ? m : o,
                      q = c.step,
                      r = void 0 === q ? m : q,
                      s = c.to;this._configured = !0, this._attachment = d, this._isPlaying = !1, this._pausedAtTime = null, this._scheduleId = null, this._delay = f, this._start = p, this._step = r, this._duration = i, this._currentState = g({}, k || this.get()), this._originalState = this.get(), this._targetState = g({}, s || this.get());var u = this._currentState;this._targetState = g({}, u, {}, this._targetState), this._easing = t(u, j);var v = a.filters;for (var w in this._filters.length = 0, v) v[w].doesApply(this) && this._filters.push(v[w]);return this._applyFilter("tweenCreated"), this._promise = new n(function (a, c) {
                    b._resolve = a, b._reject = c;
                  }), this._promise.catch(m), this;
                } }, { key: "get", value: function () {
                  return g({}, this._currentState);
                } }, { key: "set", value: function (a) {
                  this._currentState = a;
                } }, { key: "pause", value: function () {
                  if (this._isPlaying) return this._pausedAtTime = a.now(), this._isPlaying = !1, u(this), this;
                } }, { key: "resume", value: function () {
                  if (null === this._timestamp) return this.tween();if (this._isPlaying) return this._promise;var b = a.now();return this._pausedAtTime && (this._timestamp += b - this._pausedAtTime, this._pausedAtTime = null), this._isPlaying = !0, null === n ? (n = this, o = this, function a() {
                    n && (l.call(k, a, 1e3 / 60), s());
                  }()) : (this._previous = o, o._next = this, o = this), this._promise;
                } }, { key: "seek", value: function (b) {
                  b = Math.max(b, 0);var c = a.now();return this._timestamp + b === 0 ? this : (this._timestamp = c - b, this._isPlaying || r(this, c), this);
                } }, { key: "stop", value: function () {
                  var a = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                      b = this._attachment,
                      c = this._currentState,
                      d = this._easing,
                      e = this._originalState,
                      f = this._targetState;if (this._isPlaying) return this._isPlaying = !1, u(this), a ? (this._applyFilter("beforeTween"), q(1, c, e, f, 1, 0, d), this._applyFilter("afterTween"), this._applyFilter("afterTweenEnd"), this._resolve(c, b)) : this._reject(c, b), this;
                } }, { key: "isPlaying", value: function () {
                  return this._isPlaying;
                } }, { key: "setScheduleFunction", value: function (b) {
                  a.setScheduleFunction(b);
                } }, { key: "dispose", value: function () {
                  for (var a in this) delete this[a];
                } }]) && d(b.prototype, c), e && d(b, e), a;
            }();v.setScheduleFunction = function (a) {
              return l = a;
            }, v.formulas = p, v.filters = {}, v.now = Date.now || function () {
              return +new Date();
            };
          }).call(this, c(2));
        }, function (a, b, c) {
          "use strict";
          c.r(b), c.d(b, "linear", function () {
            return d;
          }), c.d(b, "easeInQuad", function () {
            return e;
          }), c.d(b, "easeOutQuad", function () {
            return f;
          }), c.d(b, "easeInOutQuad", function () {
            return g;
          }), c.d(b, "easeInCubic", function () {
            return h;
          }), c.d(b, "easeOutCubic", function () {
            return i;
          }), c.d(b, "easeInOutCubic", function () {
            return j;
          }), c.d(b, "easeInQuart", function () {
            return k;
          }), c.d(b, "easeOutQuart", function () {
            return l;
          }), c.d(b, "easeInOutQuart", function () {
            return m;
          }), c.d(b, "easeInQuint", function () {
            return n;
          }), c.d(b, "easeOutQuint", function () {
            return o;
          }), c.d(b, "easeInOutQuint", function () {
            return p;
          }), c.d(b, "easeInSine", function () {
            return q;
          }), c.d(b, "easeOutSine", function () {
            return r;
          }), c.d(b, "easeInOutSine", function () {
            return s;
          }), c.d(b, "easeInExpo", function () {
            return t;
          }), c.d(b, "easeOutExpo", function () {
            return u;
          }), c.d(b, "easeInOutExpo", function () {
            return v;
          }), c.d(b, "easeInCirc", function () {
            return w;
          }), c.d(b, "easeOutCirc", function () {
            return x;
          }), c.d(b, "easeInOutCirc", function () {
            return y;
          }), c.d(b, "easeOutBounce", function () {
            return z;
          }), c.d(b, "easeInBack", function () {
            return A;
          }), c.d(b, "easeOutBack", function () {
            return B;
          }), c.d(b, "easeInOutBack", function () {
            return C;
          }), c.d(b, "elastic", function () {
            return D;
          }), c.d(b, "swingFromTo", function () {
            return E;
          }), c.d(b, "swingFrom", function () {
            return F;
          }), c.d(b, "swingTo", function () {
            return G;
          }), c.d(b, "bounce", function () {
            return H;
          }), c.d(b, "bouncePast", function () {
            return I;
          }), c.d(b, "easeFromTo", function () {
            return J;
          }), c.d(b, "easeFrom", function () {
            return K;
          }), c.d(b, "easeTo", function () {
            return L;
          });var d = function (a) {
            return a;
          },
              e = function (a) {
            return Math.pow(a, 2);
          },
              f = function (a) {
            return -(Math.pow(a - 1, 2) - 1);
          },
              g = function (a) {
            return (a /= .5) < 1 ? .5 * Math.pow(a, 2) : -.5 * ((a -= 2) * a - 2);
          },
              h = function (a) {
            return Math.pow(a, 3);
          },
              i = function (a) {
            return Math.pow(a - 1, 3) + 1;
          },
              j = function (a) {
            return (a /= .5) < 1 ? .5 * Math.pow(a, 3) : .5 * (Math.pow(a - 2, 3) + 2);
          },
              k = function (a) {
            return Math.pow(a, 4);
          },
              l = function (a) {
            return -(Math.pow(a - 1, 4) - 1);
          },
              m = function (a) {
            return (a /= .5) < 1 ? .5 * Math.pow(a, 4) : -.5 * ((a -= 2) * Math.pow(a, 3) - 2);
          },
              n = function (a) {
            return Math.pow(a, 5);
          },
              o = function (a) {
            return Math.pow(a - 1, 5) + 1;
          },
              p = function (a) {
            return (a /= .5) < 1 ? .5 * Math.pow(a, 5) : .5 * (Math.pow(a - 2, 5) + 2);
          },
              q = function (a) {
            return 1 - Math.cos(a * (Math.PI / 2));
          },
              r = function (a) {
            return Math.sin(a * (Math.PI / 2));
          },
              s = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1);
          },
              t = function (a) {
            return 0 === a ? 0 : Math.pow(2, 10 * (a - 1));
          },
              u = function (a) {
            return 1 === a ? 1 : 1 - Math.pow(2, -10 * a);
          },
              v = function (a) {
            return 0 === a ? 0 : 1 === a ? 1 : (a /= .5) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * --a));
          },
              w = function (a) {
            return -(Math.sqrt(1 - a * a) - 1);
          },
              x = function (a) {
            return Math.sqrt(1 - Math.pow(a - 1, 2));
          },
              y = function (a) {
            return (a /= .5) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
          },
              z = function (a) {
            return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375;
          },
              A = function (a) {
            var b = 1.70158;return a * a * ((b + 1) * a - b);
          },
              B = function (a) {
            var b = 1.70158;return (a -= 1) * a * ((b + 1) * a + b) + 1;
          },
              C = function (a) {
            var b = 1.70158;return (a /= .5) < 1 ? a * a * ((1 + (b *= 1.525)) * a - b) * .5 : .5 * ((a -= 2) * a * ((1 + (b *= 1.525)) * a + b) + 2);
          },
              D = function (a) {
            return -1 * Math.pow(4, -8 * a) * Math.sin((6 * a - 1) * (2 * Math.PI) / 2) + 1;
          },
              E = function (a) {
            var b = 1.70158;return (a /= .5) < 1 ? a * a * ((1 + (b *= 1.525)) * a - b) * .5 : .5 * ((a -= 2) * a * ((1 + (b *= 1.525)) * a + b) + 2);
          },
              F = function (a) {
            var b = 1.70158;return a * a * ((b + 1) * a - b);
          },
              G = function (a) {
            var b = 1.70158;return (a -= 1) * a * ((b + 1) * a + b) + 1;
          },
              H = function (a) {
            return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375;
          },
              I = function (a) {
            return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 2 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : a < 2.5 / 2.75 ? 2 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 2 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375);
          },
              J = function (a) {
            return (a /= .5) < 1 ? .5 * Math.pow(a, 4) : -.5 * ((a -= 2) * Math.pow(a, 3) - 2);
          },
              K = function (a) {
            return Math.pow(a, 4);
          },
              L = function (a) {
            return Math.pow(a, .25);
          };
        }, function (a, b) {
          var c;c = function () {
            return this;
          }();try {
            c = c || new Function("return this")();
          } catch (a) {
            "object" == typeof window && (c = window);
          }a.exports = c;
        }, function (a, b, c) {
          "use strict";
          function d(a) {
            return parseInt(a, 16);
          }function e(a) {
            var b = a._currentState;[b, a._originalState, a._targetState].forEach(B), a._tokenData = E(b);
          }function f(a) {
            var b = a._currentState,
                c = a._originalState,
                d = a._targetState,
                e = a._easing,
                f = a._tokenData;K(e, f), [b, c, d].forEach(function (a) {
              return F(a, f);
            });
          }function g(a) {
            var b = a._currentState,
                c = a._originalState,
                d = a._targetState,
                e = a._easing,
                f = a._tokenData;[b, c, d].forEach(function (a) {
              return J(a, f);
            }), L(e, f);
          }function h(a, b) {
            var c = Object.keys(a);if (Object.getOwnPropertySymbols) {
              var d = Object.getOwnPropertySymbols(a);b && (d = d.filter(function (b) {
                return Object.getOwnPropertyDescriptor(a, b).enumerable;
              })), c.push.apply(c, d);
            }return c;
          }function i(a) {
            for (var b = 1; b < arguments.length; b++) {
              var c = null != arguments[b] ? arguments[b] : {};b % 2 ? h(Object(c), !0).forEach(function (b) {
                j(a, b, c[b]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(c)) : h(Object(c)).forEach(function (b) {
                Object.defineProperty(a, b, Object.getOwnPropertyDescriptor(c, b));
              });
            }return a;
          }function j(a, b, c) {
            return b in a ? Object.defineProperty(a, b, { value: c, enumerable: !0, configurable: !0, writable: !0 }) : a[b] = c, a;
          }function k(a) {
            return function (a) {
              if (Array.isArray(a)) {
                for (var b = 0, c = new Array(a.length); b < a.length; b++) c[b] = a[b];return c;
              }
            }(a) || function (a) {
              if (Symbol.iterator in Object(a) || "[object Arguments]" === Object.prototype.toString.call(a)) return Array.from(a);
            }(a) || function () {
              throw new TypeError("Invalid attempt to spread non-iterable instance");
            }();
          }function l(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
            }
          }function m(a, b) {
            var c = b.get(a);if (!c) throw new TypeError("attempted to get private field on non-instance");return c.get ? c.get.call(a) : c.value;
          }function n(a, b, c, d, e, f) {
            var g,
                h,
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0,
                n = 0,
                o = function (a) {
              return ((i * a + j) * a + k) * a;
            },
                p = function (a) {
              return (3 * i * a + 2 * j) * a + k;
            },
                q = function (a) {
              return a >= 0 ? a : 0 - a;
            };return i = 1 - (k = 3 * b) - (j = 3 * (d - b) - k), l = 1 - (n = 3 * c) - (m = 3 * (e - c) - n), g = a, h = function (a) {
              return 1 / (200 * a);
            }(f), function (a) {
              return ((l * a + m) * a + n) * a;
            }(function (a, b) {
              var c, d, e, f, g, h;for (e = a, h = 0; h < 8; h++) {
                if (f = o(e) - a, q(f) < b) return e;if (g = p(e), q(g) < 1e-6) break;e -= f / g;
              }if ((e = a) < (c = 0)) return c;if (e > (d = 1)) return d;for (; c < d;) {
                if (f = o(e), q(f - a) < b) return e;a > f ? c = e : d = e, e = .5 * (d - c) + c;
              }return e;
            }(g, h));
          }c.r(b);var o = {};c.r(o), c.d(o, "doesApply", function () {
            return M;
          }), c.d(o, "tweenCreated", function () {
            return e;
          }), c.d(o, "beforeTween", function () {
            return f;
          }), c.d(o, "afterTween", function () {
            return g;
          });var p,
              q,
              r = c(0),
              s = /(\d|-|\.)/,
              t = /([^\-0-9.]+)/g,
              u = /[0-9.-]+/g,
              v = (p = u.source, q = /,\s*/.source, new RegExp("rgb\\(".concat(p).concat(q).concat(p).concat(q).concat(p, "\\)"), "g")),
              w = /^.*\(/,
              x = /#([0-9]|[a-f]){3,6}/gi,
              y = function (a, b) {
            return a.map(function (a, c) {
              return "_".concat(b, "_").concat(c);
            });
          },
              z = function (a) {
            return "rgb(".concat((b = a, 3 === (b = b.replace(/#/, "")).length && (b = (b = b.split(""))[0] + b[0] + b[1] + b[1] + b[2] + b[2]), [d(b.substr(0, 2)), d(b.substr(2, 2)), d(b.substr(4, 2))]).join(","), ")");var b;
          },
              A = function (a, b, c) {
            var d = b.match(a),
                e = b.replace(a, "VAL");return d && d.forEach(function (a) {
              return e = e.replace("VAL", c(a));
            }), e;
          },
              B = function (a) {
            for (var b in a) {
              var c = a[b];"string" == typeof c && c.match(x) && (a[b] = A(x, c, z));
            }
          },
              C = function (a) {
            var b = a.match(u).map(Math.floor);return "".concat(a.match(w)[0]).concat(b.join(","), ")");
          },
              D = function (a) {
            return a.match(u);
          },
              E = function (a) {
            var b,
                c,
                d = {};for (var e in a) {
              var f = a[e];"string" == typeof f && (d[e] = { formatString: (b = f, c = void 0, c = b.match(t), c ? (1 === c.length || b.charAt(0).match(s)) && c.unshift("") : c = ["", ""], c.join("VAL")), chunkNames: y(D(f), e) });
            }return d;
          },
              F = function (a, b) {
            var c = function (c) {
              D(a[c]).forEach(function (d, e) {
                return a[b[c].chunkNames[e]] = +d;
              }), delete a[c];
            };for (var d in b) c(d);
          },
              G = function (a, b) {
            var c = {};return b.forEach(function (b) {
              c[b] = a[b], delete a[b];
            }), c;
          },
              H = function (a, b) {
            return b.map(function (b) {
              return a[b];
            });
          },
              I = function (a, b) {
            return b.forEach(function (b) {
              return a = a.replace("VAL", +b.toFixed(4));
            }), a;
          },
              J = function (a, b) {
            for (var c in b) {
              var d = b[c],
                  e = d.chunkNames,
                  f = d.formatString,
                  g = I(f, H(G(a, e), e));a[c] = A(v, g, C);
            }
          },
              K = function (a, b) {
            var c = function (c) {
              var d = b[c].chunkNames,
                  e = a[c];if ("string" == typeof e) {
                var f = e.split(" "),
                    g = f[f.length - 1];d.forEach(function (b, c) {
                  return a[b] = f[c] || g;
                });
              } else d.forEach(function (b) {
                return a[b] = e;
              });delete a[c];
            };for (var d in b) c(d);
          },
              L = function (a, b) {
            for (var c in b) {
              var d = b[c].chunkNames,
                  e = a[d[0]];a[c] = "string" == typeof e ? d.map(function (b) {
                var c = a[b];return delete a[b], c;
              }).join(" ") : e;
            }
          },
              M = function (a) {
            var b = a._currentState;return Object.keys(b).some(function (a) {
              return "string" == typeof b[a];
            });
          },
              N = new r.a(),
              O = r.a.filters,
              P = function (a, b, c, d) {
            var e = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
                f = i({}, a),
                g = Object(r.b)(a, d);for (var h in N._filters.length = 0, N.set({}), N._currentState = f, N._originalState = a, N._targetState = b, N._easing = g, O) O[h].doesApply(N) && N._filters.push(O[h]);N._applyFilter("tweenCreated"), N._applyFilter("beforeTween");var j = Object(r.e)(c, f, a, b, 1, e, g);return N._applyFilter("afterTween"), j;
          },
              Q = function () {
            function a() {
              !function (a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
              }(this, a), R.set(this, { writable: !0, value: [] });for (var b = arguments.length, c = new Array(b), d = 0; d < b; d++) c[d] = arguments[d];c.forEach(this.add.bind(this));
            }var b, c, d;return b = a, (c = [{ key: "add", value: function (a) {
                return m(this, R).push(a), a;
              } }, { key: "remove", value: function (a) {
                var b = m(this, R).indexOf(a);return ~b && m(this, R).splice(b, 1), a;
              } }, { key: "empty", value: function () {
                return this.tweenables.map(this.remove.bind(this));
              } }, { key: "isPlaying", value: function () {
                return m(this, R).some(function (a) {
                  return a.isPlaying();
                });
              } }, { key: "play", value: function () {
                return m(this, R).forEach(function (a) {
                  return a.tween();
                }), this;
              } }, { key: "pause", value: function () {
                return m(this, R).forEach(function (a) {
                  return a.pause();
                }), this;
              } }, { key: "resume", value: function () {
                return m(this, R).forEach(function (a) {
                  return a.resume();
                }), this;
              } }, { key: "stop", value: function (a) {
                return m(this, R).forEach(function (b) {
                  return b.stop(a);
                }), this;
              } }, { key: "tweenables", get: function () {
                return k(m(this, R));
              } }, { key: "promises", get: function () {
                return m(this, R).map(function (a) {
                  return a._promise;
                });
              } }]) && l(b.prototype, c), d && l(b, d), a;
          }(),
              R = new WeakMap(),
              S = function (a, b, c, d, e) {
            var f = function (a, b, c, d) {
              return function (e) {
                return n(e, a, b, c, d, 1);
              };
            }(b, c, d, e);return f.displayName = a, f.x1 = b, f.y1 = c, f.x2 = d, f.y2 = e, r.a.formulas[a] = f;
          },
              T = function (a) {
            return delete r.a.formulas[a];
          };c.d(b, "processTweens", function () {
            return r.c;
          }), c.d(b, "Tweenable", function () {
            return r.a;
          }), c.d(b, "tween", function () {
            return r.d;
          }), c.d(b, "interpolate", function () {
            return P;
          }), c.d(b, "Scene", function () {
            return Q;
          }), c.d(b, "setBezierFunction", function () {
            return S;
          }), c.d(b, "unsetBezierFunction", function () {
            return T;
          }), r.a.filters.token = o;
        }]);
      });
    }, {}], 2: [function (a, b, c) {
      var d = a("./shape"),
          e = a("./utils"),
          f = function (a, b) {
        this._pathTemplate = "M 50,50 m 0,-{radius} a {radius},{radius} 0 1 1 0,{2radius} a {radius},{radius} 0 1 1 0,-{2radius}", this.containerAspectRatio = 1, d.apply(this, arguments);
      };f.prototype = new d(), f.prototype.constructor = f, f.prototype._pathString = function (a) {
        var b = a.strokeWidth;a.trailWidth && a.trailWidth > a.strokeWidth && (b = a.trailWidth);var c = 50 - b / 2;return e.render(this._pathTemplate, { radius: c, "2radius": 2 * c });
      }, f.prototype._trailString = function (a) {
        return this._pathString(a);
      }, b.exports = f;
    }, { "./shape": 7, "./utils": 9 }], 3: [function (a, b, c) {
      var d = a("./shape"),
          e = a("./utils"),
          f = function (a, b) {
        this._pathTemplate = b.vertical ? "M {center},100 L {center},0" : "M 0,{center} L 100,{center}", d.apply(this, arguments);
      };f.prototype = new d(), f.prototype.constructor = f, f.prototype._initializeSvg = function (a, b) {
        var c = b.vertical ? "0 0 " + b.strokeWidth + " 100" : "0 0 100 " + b.strokeWidth;a.setAttribute("viewBox", c), a.setAttribute("preserveAspectRatio", "none");
      }, f.prototype._pathString = function (a) {
        return e.render(this._pathTemplate, { center: a.strokeWidth / 2 });
      }, f.prototype._trailString = function (a) {
        return this._pathString(a);
      }, b.exports = f;
    }, { "./shape": 7, "./utils": 9 }], 4: [function (a, b, c) {
      b.exports = { Line: a("./line"), Circle: a("./circle"), SemiCircle: a("./semicircle"), Square: a("./square"), Path: a("./path"), Shape: a("./shape"), utils: a("./utils") };
    }, { "./circle": 2, "./line": 3, "./path": 5, "./semicircle": 6, "./shape": 7, "./square": 8, "./utils": 9 }], 5: [function (a, b, c) {
      var d = a("shifty"),
          e = a("./utils"),
          f = d.Tweenable,
          g = { easeIn: "easeInCubic", easeOut: "easeOutCubic", easeInOut: "easeInOutCubic" },
          h = function a(b, c) {
        if (!(this instanceof a)) throw new Error("Constructor was called without new keyword");c = e.extend({ delay: 0, duration: 800, easing: "linear", from: {}, to: {}, step: function () {} }, c);var d;d = e.isString(b) ? document.querySelector(b) : b, this.path = d, this._opts = c, this._tweenable = null;var f = this.path.getTotalLength();this.path.style.strokeDasharray = f + " " + f, this.set(0);
      };h.prototype.value = function () {
        var a = this._getComputedDashOffset(),
            b = this.path.getTotalLength(),
            c = 1 - a / b;return parseFloat(c.toFixed(6), 10);
      }, h.prototype.set = function (a) {
        this.stop(), this.path.style.strokeDashoffset = this._progressToOffset(a);var b = this._opts.step;if (e.isFunction(b)) {
          var c = this._easing(this._opts.easing);b(this._calculateTo(a, c), this._opts.shape || this, this._opts.attachment);
        }
      }, h.prototype.stop = function () {
        this._stopTween(), this.path.style.strokeDashoffset = this._getComputedDashOffset();
      }, h.prototype.animate = function (a, b, c) {
        b = b || {}, e.isFunction(b) && (c = b, b = {});var d = e.extend({}, b),
            g = e.extend({}, this._opts);b = e.extend(g, b);var h = this._easing(b.easing),
            i = this._resolveFromAndTo(a, h, d);this.stop(), this.path.getBoundingClientRect();var j = this._getComputedDashOffset(),
            k = this._progressToOffset(a),
            l = this;this._tweenable = new f(), this._tweenable.tween({ from: e.extend({ offset: j }, i.from), to: e.extend({ offset: k }, i.to), duration: b.duration, delay: b.delay, easing: h, step: function (a) {
            l.path.style.strokeDashoffset = a.offset;var c = b.shape || l;b.step(a, c, b.attachment);
          } }).then(function (a) {
          e.isFunction(c) && c();
        }).catch(function (a) {
          throw console.error("Error in tweening:", a), a;
        });
      }, h.prototype._getComputedDashOffset = function () {
        var a = window.getComputedStyle(this.path, null);return parseFloat(a.getPropertyValue("stroke-dashoffset"), 10);
      }, h.prototype._progressToOffset = function (a) {
        var b = this.path.getTotalLength();return b - a * b;
      }, h.prototype._resolveFromAndTo = function (a, b, c) {
        return c.from && c.to ? { from: c.from, to: c.to } : { from: this._calculateFrom(b), to: this._calculateTo(a, b) };
      }, h.prototype._calculateFrom = function (a) {
        return d.interpolate(this._opts.from, this._opts.to, this.value(), a);
      }, h.prototype._calculateTo = function (a, b) {
        return d.interpolate(this._opts.from, this._opts.to, a, b);
      }, h.prototype._stopTween = function () {
        null !== this._tweenable && (this._tweenable.stop(!0), this._tweenable = null);
      }, h.prototype._easing = function (a) {
        return g.hasOwnProperty(a) ? g[a] : a;
      }, b.exports = h;
    }, { "./utils": 9, shifty: 1 }], 6: [function (a, b, c) {
      var d = a("./shape"),
          e = a("./circle"),
          f = a("./utils"),
          g = function (a, b) {
        this._pathTemplate = "M 50,50 m -{radius},0 a {radius},{radius} 0 1 1 {2radius},0", this.containerAspectRatio = 2, d.apply(this, arguments);
      };g.prototype = new d(), g.prototype.constructor = g, g.prototype._initializeSvg = function (a, b) {
        a.setAttribute("viewBox", "0 0 100 50");
      }, g.prototype._initializeTextContainer = function (a, b, c) {
        a.text.style && (c.style.top = "auto", c.style.bottom = "0", a.text.alignToBottom ? f.setStyle(c, "transform", "translate(-50%, 0)") : f.setStyle(c, "transform", "translate(-50%, 50%)"));
      }, g.prototype._pathString = e.prototype._pathString, g.prototype._trailString = e.prototype._trailString, b.exports = g;
    }, { "./circle": 2, "./shape": 7, "./utils": 9 }], 7: [function (a, b, c) {
      var d = a("./path"),
          e = a("./utils"),
          f = "Object is destroyed",
          g = function a(b, c) {
        if (!(this instanceof a)) throw new Error("Constructor was called without new keyword");if (0 !== arguments.length) {
          this._opts = e.extend({ color: "#555", strokeWidth: 1, trailColor: null, trailWidth: null, fill: null, text: { style: { color: null, position: "absolute", left: "50%", top: "50%", padding: 0, margin: 0, transform: { prefix: !0, value: "translate(-50%, -50%)" } }, autoStyleContainer: !0, alignToBottom: !0, value: null, className: "progressbar-text" }, svgStyle: { display: "block", width: "100%" }, warnings: !1 }, c, !0), e.isObject(c) && void 0 !== c.svgStyle && (this._opts.svgStyle = c.svgStyle), e.isObject(c) && e.isObject(c.text) && void 0 !== c.text.style && (this._opts.text.style = c.text.style);var f,
              g = this._createSvgView(this._opts);if (!(f = e.isString(b) ? document.querySelector(b) : b)) throw new Error("Container does not exist: " + b);this._container = f, this._container.appendChild(g.svg), this._opts.warnings && this._warnContainerAspectRatio(this._container), this._opts.svgStyle && e.setStyles(g.svg, this._opts.svgStyle), this.svg = g.svg, this.path = g.path, this.trail = g.trail, this.text = null;var h = e.extend({ attachment: void 0, shape: this }, this._opts);this._progressPath = new d(g.path, h), e.isObject(this._opts.text) && null !== this._opts.text.value && this.setText(this._opts.text.value);
        }
      };g.prototype.animate = function (a, b, c) {
        if (null === this._progressPath) throw new Error(f);this._progressPath.animate(a, b, c);
      }, g.prototype.stop = function () {
        if (null === this._progressPath) throw new Error(f);void 0 !== this._progressPath && this._progressPath.stop();
      }, g.prototype.pause = function () {
        if (null === this._progressPath) throw new Error(f);void 0 !== this._progressPath && this._progressPath._tweenable && this._progressPath._tweenable.pause();
      }, g.prototype.resume = function () {
        if (null === this._progressPath) throw new Error(f);void 0 !== this._progressPath && this._progressPath._tweenable && this._progressPath._tweenable.resume();
      }, g.prototype.destroy = function () {
        if (null === this._progressPath) throw new Error(f);this.stop(), this.svg.parentNode.removeChild(this.svg), this.svg = null, this.path = null, this.trail = null, this._progressPath = null, null !== this.text && (this.text.parentNode.removeChild(this.text), this.text = null);
      }, g.prototype.set = function (a) {
        if (null === this._progressPath) throw new Error(f);this._progressPath.set(a);
      }, g.prototype.value = function () {
        if (null === this._progressPath) throw new Error(f);return void 0 === this._progressPath ? 0 : this._progressPath.value();
      }, g.prototype.setText = function (a) {
        if (null === this._progressPath) throw new Error(f);null === this.text && (this.text = this._createTextContainer(this._opts, this._container), this._container.appendChild(this.text)), e.isObject(a) ? (e.removeChildren(this.text), this.text.appendChild(a)) : this.text.innerHTML = a;
      }, g.prototype._createSvgView = function (a) {
        var b = document.createElementNS("http://www.w3.org/2000/svg", "svg");this._initializeSvg(b, a);var c = null;(a.trailColor || a.trailWidth) && (c = this._createTrail(a), b.appendChild(c));var d = this._createPath(a);return b.appendChild(d), { svg: b, path: d, trail: c };
      }, g.prototype._initializeSvg = function (a, b) {
        a.setAttribute("viewBox", "0 0 100 100");
      }, g.prototype._createPath = function (a) {
        var b = this._pathString(a);return this._createPathElement(b, a);
      }, g.prototype._createTrail = function (a) {
        var b = this._trailString(a),
            c = e.extend({}, a);return c.trailColor || (c.trailColor = "#eee"), c.trailWidth || (c.trailWidth = c.strokeWidth), c.color = c.trailColor, c.strokeWidth = c.trailWidth, c.fill = null, this._createPathElement(b, c);
      }, g.prototype._createPathElement = function (a, b) {
        var c = document.createElementNS("http://www.w3.org/2000/svg", "path");return c.setAttribute("d", a), c.setAttribute("stroke", b.color), c.setAttribute("stroke-width", b.strokeWidth), b.fill ? c.setAttribute("fill", b.fill) : c.setAttribute("fill-opacity", "0"), c;
      }, g.prototype._createTextContainer = function (a, b) {
        var c = document.createElement("div");c.className = a.text.className;var d = a.text.style;return d && (a.text.autoStyleContainer && (b.style.position = "relative"), e.setStyles(c, d), d.color || (c.style.color = a.color)), this._initializeTextContainer(a, b, c), c;
      }, g.prototype._initializeTextContainer = function (a, b, c) {}, g.prototype._pathString = function (a) {
        throw new Error("Override this function for each progress bar");
      }, g.prototype._trailString = function (a) {
        throw new Error("Override this function for each progress bar");
      }, g.prototype._warnContainerAspectRatio = function (a) {
        if (this.containerAspectRatio) {
          var b = window.getComputedStyle(a, null),
              c = parseFloat(b.getPropertyValue("width"), 10),
              d = parseFloat(b.getPropertyValue("height"), 10);e.floatEquals(this.containerAspectRatio, c / d) || (console.warn("Incorrect aspect ratio of container", "#" + a.id, "detected:", b.getPropertyValue("width") + "(width)", "/", b.getPropertyValue("height") + "(height)", "=", c / d), console.warn("Aspect ratio of should be", this.containerAspectRatio));
        }
      }, b.exports = g;
    }, { "./path": 5, "./utils": 9 }], 8: [function (a, b, c) {
      var d = a("./shape"),
          e = a("./utils"),
          f = function (a, b) {
        this._pathTemplate = "M 0,{halfOfStrokeWidth} L {width},{halfOfStrokeWidth} L {width},{width} L {halfOfStrokeWidth},{width} L {halfOfStrokeWidth},{strokeWidth}", this._trailTemplate = "M {startMargin},{halfOfStrokeWidth} L {width},{halfOfStrokeWidth} L {width},{width} L {halfOfStrokeWidth},{width} L {halfOfStrokeWidth},{halfOfStrokeWidth}", d.apply(this, arguments);
      };f.prototype = new d(), f.prototype.constructor = f, f.prototype._pathString = function (a) {
        var b = 100 - a.strokeWidth / 2;return e.render(this._pathTemplate, { width: b, strokeWidth: a.strokeWidth, halfOfStrokeWidth: a.strokeWidth / 2 });
      }, f.prototype._trailString = function (a) {
        var b = 100 - a.strokeWidth / 2;return e.render(this._trailTemplate, { width: b, strokeWidth: a.strokeWidth, halfOfStrokeWidth: a.strokeWidth / 2, startMargin: a.strokeWidth / 2 - a.trailWidth / 2 });
      }, b.exports = f;
    }, { "./shape": 7, "./utils": 9 }], 9: [function (a, b, c) {
      function d(a, b, c) {
        a = a || {}, b = b || {}, c = c || !1;for (var e in b) if (b.hasOwnProperty(e)) {
          var f = a[e],
              g = b[e];c && l(f) && l(g) ? a[e] = d(f, g, c) : a[e] = g;
        }return a;
      }function e(a, b) {
        var c = a;for (var d in b) if (b.hasOwnProperty(d)) {
          var e = b[d],
              f = "\\{" + d + "\\}",
              g = new RegExp(f, "g");c = c.replace(g, e);
        }return c;
      }function f(a, b, c) {
        for (var d = a.style, e = 0; e < p.length; ++e) {
          d[p[e] + h(b)] = c;
        }d[b] = c;
      }function g(a, b) {
        m(b, function (b, c) {
          null !== b && void 0 !== b && (l(b) && !0 === b.prefix ? f(a, c, b.value) : a.style[c] = b);
        });
      }function h(a) {
        return a.charAt(0).toUpperCase() + a.slice(1);
      }function i(a) {
        return "string" == typeof a || a instanceof String;
      }function j(a) {
        return "function" == typeof a;
      }function k(a) {
        return "[object Array]" === Object.prototype.toString.call(a);
      }function l(a) {
        return !k(a) && "object" == typeof a && !!a;
      }function m(a, b) {
        for (var c in a) if (a.hasOwnProperty(c)) {
          var d = a[c];b(d, c);
        }
      }function n(a, b) {
        return Math.abs(a - b) < q;
      }function o(a) {
        for (; a.firstChild;) a.removeChild(a.firstChild);
      }var p = "Webkit Moz O ms".split(" "),
          q = .001;b.exports = { extend: d, render: e, setStyle: f, setStyles: g, capitalize: h, isString: i, isFunction: j, isObject: l, forEachObject: m, floatEquals: n, removeChildren: o };
    }, {}] }, {}, [4])(4);
});
//# sourceMappingURL=progressbar.min.js.map

function SVGInliner(elements) {
  "use strict";

  this.elements = elements;
  this.results = {};
  this.images = [];
  this.init();
}

SVGInliner.prototype.init = function () {
  "use strict";

  this.replaceImages();
};

SVGInliner.prototype.isSVG = function (img) {
  "use strict";

  if (img.hasAttribute("src")) {
    var splits = img.getAttribute("src").split(".");

    return splits[splits.length - 1].substr(0, 3) === "svg";
  } else {
    return false;
  }
};

SVGInliner.prototype.replaceImages = function () {
  "use strict";

  for (var i = 0; i < this.elements.length; i++) {
    if (this.isSVG(this.elements[i])) {
      this.images.push(new SVGImage(this.elements[i], this));
    }
  }
};

function SVGImage(img, inliner) {
  "use strict";

  this.image = img;
  this.inliner = inliner;

  if (img !== null && typeof img !== "undefined") {
    this.image.style.display = "none";

    this.getData(function (element) {
      this.createSVG(element);
      this.injectSVG();
    }.bind(this));
  }
}

SVGImage.prototype.getData = function (cb) {
  "use strict";

  var src = this.image.getAttribute("src");

  if (typeof this.inliner.results[src] !== "undefined") {
    cb(this.inliner.results[src]);
  } else {

    this.xhr = new XMLHttpRequest();
    this.xhr.onload = function (e) {
      if (this.xhr.status === 200) {
        this.inliner.results[src] = this.xhr.responseXML;

        cb(this.xhr.responseXML);
      }
    }.bind(this);
    this.xhr.open("GET", src, true);
    this.xhr.overrideMimeType("image/svg+xml");
    this.xhr.send("");
  }
};

SVGImage.prototype.createSVG = function (element) {
  "use strict";

  this.element = element.firstChild ? element.firstChild : element;

  if (this.hasHash()) {
    this.filterSVG();
  }
};

SVGImage.prototype.cloneAttributes = function () {
  "use strict";

  var className = this.image.getAttribute("class");
  if (className !== null) {
    this.element.setAttribute("class", className);
  }

  var idName = this.image.getAttribute("id");
  if (idName !== null) {
    this.element.setAttribute("id", idName);
  }
};

SVGImage.prototype.filterSVG = function () {
  "use strict";

  var hash = this.extractHash();
  var id = hash[hash.length - 1];
  var width = 0;
  var height = 0;

  var children = this.element.getElementsByTagName("svg");
  for (var i = 0; i < children.length; i++) {
    if (children[i].getAttribute("id") === id) {
      this.element = children[i];
      this.setDefaultAttributes();
    }
  }
};

SVGImage.prototype.setDefaultAttributes = function () {
  "use strict";

  this.element.setAttribute("y", "0px");
  this.element.setAttribute("x", "0px");
  this.element.setAttribute("version", "1.1");
  this.element.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  this.element.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  this.element.setAttribute("preserveAspectRatio", "xMidYMid meet");
  this.element.setAttribute("xml:space", "preserve");
  this.element.removeAttribute("width");
  this.element.removeAttribute("height");
};

SVGImage.prototype.hasHash = function () {
  "use strict";

  return this.image.getAttribute("src").indexOf("#") !== -1;
};

SVGImage.prototype.extractHash = function () {
  "use strict";

  return this.image.getAttribute("src").split("#");
};

SVGImage.prototype.injectSVG = function () {
  "use strict";

  this.cloneAttributes();

  this.image.parentNode.replaceChild(this.element, this.image);
};

if (typeof module !== "undefined") {
  module.exports = SVGInliner;
}
document.addEventListener('DOMContentLoaded', function () {
  $('.burger').on('click', function () {
    $('.mob-menu').addClass('active');
  });
  $('.mob-menu__head-close, .mob-menu a').on('click', function () {
    $('.mob-menu').removeClass('active');
  });

  document.addEventListener("click", x => 0);
  $('#preloader').fadeOut();
  if (document.querySelector('#fullpage')) {
    $('.header').addClass('header-main');
    $('#fullpage').fullpage({
      //options here
      // autoScrolling: true,
      scrollOverflow: true,
      licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
      fixedElements: '.s_popup #preloader',
      sectionSelector: '.js-fullpage-section',
      anchors: ['main', 'publishers', 'advertisers', 'contacts'],
      onLeave: function (origin, destination, direction) {
        if (destination.anchor === 'contacts') {
          $('.header').fadeOut();
        } else {
          $('.header').fadeIn();
        }
      }
      // normalScrollElements: '.contacts .container'
    });
    //methods
    // $.fn.fullpage.setAllowScrolling(false);
  } else {
    $('.header').addClass('header--pages');
    $('.menu').addClass('menu--pages');
    function checkHeader() {
      if (window.scrollY > 50) {
        $(".header").addClass('header--fixed');
      } else {
        $(".header").removeClass('header--fixed');
      }
    }
    checkHeader();
    $(window).on('scroll', checkHeader);
  }

  //svg inliner
  new SVGInliner(document.querySelectorAll(".svg-to-inline"), function () {});

  // header calc
  //  function calcHeader() {
  //   if(document.querySelector('.js-header-calc')){
  //     $('.js-header-calc').css('paddingTop',$('.s_header').outerHeight());
  //   }
  // }
  // calcHeader();
  // $(window).on('resize',function(){
  //   setTimeout(calcHeader,100);
  // })
  // $(window).on('load',function(){
  //   setTimeout(calcHeader,100);
  // })


  //validation
  $.validator.addMethod("plus", function (value, element) {
    var Reg61 = new RegExp("^.*[^+-/(/)1234567890 ].*$");
    return !Reg61.test(value);
  });
  $.validator.addMethod("correctPassword", function (value, element) {
    if (value === $('input[name="Password"]').val()) {
      return true;
    } else {
      return false;
    }
  }, "Пароли должны совпадать");

  $.validator.addMethod("notnumbers", function (value, element) {
    var Reg61 = new RegExp("^.*[^A-zА-яЁёіЇїЄєҐґ ].*$");
    return !Reg61.test(value);
  });
  //add validation rules
  var rules = {
    email: {
      required: true,
      email: true
    },
    name: {
      required: true,
      notnumbers: true,
      minlength: 2
    },
    company: {
      required: true,
      notnumbers: true,
      minlength: 2
    },
    phone: {
      required: true,
      plus: true,
      minlength: 10
      // digits: true,
    },
    message: {
      required: false,
      minlength: 2
    }
  };
  var messages = {
    email: {
      required: $('input[name="email"]').attr('data-error'),
      email: $('input[name="email"]').attr('data-error')
    },
    name: {
      required: $('input[name="name"]').attr('data-error'),
      minlength: $('input[name="name"]').attr('data-error'),
      notnumbers: $('input[name="name"]').attr('data-error')
    },
    company: {
      required: $('input[name="company"]').attr('data-error'),
      minlength: $('input[name="company"]').attr('data-error'),
      notnumbers: $('input[name="company"]').attr('data-error')
    },
    message: {
      required: $('textarea[name="message"]').attr('data-error'),
      minlength: $('textarea[name="message"]').attr('data-error'),
      notnumbers: $('textarea[name="message"]').attr('data-error')
    }
  };

  // validation example
  if (document.querySelector('#js-contacts-form')) {
    let form = $('#js-contacts-form');
    form.validate({
      rules: rules,
      highlight: function (element, errorClass) {
        $(element).parent().addClass('input--error');
      },
      unhighlight: function (element, errorClass) {
        $(element).parent().removeClass('input--error');
      },
      messages: messages,
      submitHandler: function submitHandler(form) {
        $('#preloader').fadeIn();
        $('body').addClass('body-overflow');
        const action = $('#js-subscribe-form').attr('data-action');
        $.post('/wp-admin/admin-ajax.php?action=' + action, {
          type: $('#js-contacts-form').attr('data-type'),
          name: $(form).find('input[name="name"]').val(),
          email: $(form).find('input[name="email"]').val(),
          company: $(form).find('input[name="company"]').val(),
          message: $(form).find('textarea').val()
        }).done(function (data) {
          popupthanks();
          const validator = $('#js-contacts-form').validate();
          validator.resetForm();
          document.querySelector('#js-contacts-form').reset();
        }).always(function () {
          // preloader
          $('#preloader').fadeOut();
          $('body').removeClass('body-overflow');
        });
      }
    });
  }

  if (document.querySelector('#js-subscribe-form')) {
    let form = $('#js-subscribe-form');
    form.validate({
      rules: rules,
      highlight: function (element, errorClass) {
        $(element).parent().addClass('input--error');
      },
      unhighlight: function (element, errorClass) {
        $(element).parent().removeClass('input--error');
      },
      messages: messages,
      submitHandler: function submitHandler(form) {
        $('#preloader').fadeIn();
        $('body').addClass('body-overflow');
        const action = $('#js-subscribe-form').attr('data-action');
        $.post('/wp-admin/admin-ajax.php?action=' + action, {
          type: $('#js-subscribe-form').attr('data-type'),
          email: $(form).find('input[name="email"]').val()
        }).done(function (data) {
          subscriptionthanks();
          const validator = $('#js-subscribe-form').validate();
          validator.resetForm();
          document.querySelector('#js-subscribe-form').reset();
        }).always(function () {
          // preloader
          $('#preloader').fadeOut();
          $('body').removeClass('body-overflow');
        });
      }
    });
  }

  //popup thank
  function popupthanks() {
    $('body').addClass('body-overflow');
    $('.s_popup').fadeOut();
    // dont forget to clear forms
    $('.s_popup--thanks').fadeIn();
    setTimeout(function () {
      $('.s_popup--thanks').fadeOut();
      $('body').removeClass('body-overflow');
    }, 3000);
  }

  function subscriptionthanks() {
    $('body').addClass('body-overflow');
    $('.s_popup').fadeOut();
    // dont forget to clear forms
    $('.s_popup--subscription').fadeIn();
    setTimeout(function () {
      $('.s_popup--subscription').fadeOut();
      $('body').removeClass('body-overflow');
    }, 3000);
  }

  // js-close popup
  if (document.querySelector('.js-popup-close')) {
    $('.js-popup-close').click(function () {
      $('.s_popup').fadeOut();
      $('body').removeClass('body-overflow');
      // dont forget to clear forms
    });
  }

  // popupmore
  $('.s_popup').mouseup(function (e) {
    var content = $('.s_popup_content');
    if (!content.is(e.target) && content.has(e.target).length === 0) {
      $('.s_popup').fadeOut();
      $('body').removeClass('body-overflow');
      //clear forms
      var validator = $('#yourformid').validate();
      validator.resetForm();
      document.querySelector('#yourformid').reset();
    }
  });

  function inWindow(s) {
    var scrollTop = $(window).scrollTop();
    var viewportBottom = scrollTop + $(window).height();

    var windowHeight = $(window).height();
    var currentEls = $(s);
    var result = [];
    currentEls.each(function () {
      var el = $(this);
      var offset = el.offset();
      if (el.outerHeight() + offset.top > scrollTop && offset.top < viewportBottom) {
        result.push(this);
      }
    });
    return $(result);
  }

  if (document.querySelector('.site-input')) {
    $('.site-input input, .site-input textarea').focus(function () {
      const value = $(this).val();
      $(this).parent().removeClass('site-input--unfocus');
      if (value.length == 0) {
        $(this).parent().addClass('site-input--focus');
      }
    }).focusout(function () {
      const value = $(this).val();
      if (value.length == 0) {
        $(this).parent().removeClass('site-input--focus');
      } else {
        $(this).parent().addClass('site-input--unfocus');
      }
    });
  }

  if (document.querySelector('.js-to-top')) {
    $('.js-to-top').click(function () {
      if (document.querySelector('#fullpage')) {
        fullpage_api.moveTo('main', 0);
      } else {
        const body = $("html, body");
        body.stop().animate({ scrollTop: 0 }, 500, 'swing');
      }
    });
  }

  if (document.querySelector('.js-burger')) {
    $('.js-burger').on('click', function () {
      $('body').addClass('body-overflow');
      $('.menu').fadeIn();
    });
  }
  if (document.querySelector('.js-close')) {
    $('.js-close').on('click', function () {
      $('body').removeClass('body-overflow');
      $('.menu').fadeOut();
    });
  }

  if (document.querySelector('.slider')) {
    $('.slider').slick({
      infinite: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      //        appendDots: '.sdv_dots',
      customPaging: function (slider, i) {
        // this example would render "tabs" with titles
        return '<span class="dot"></span>';
      },
      arrows: true,
      prevArrow: '<div class="prev arrow_carousel"><i class="fa fa-arrow-left"></i></div>',
      nextArrow: '<div class="next arrow_carousel"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>',
      fade: true
    });
  }

  if (document.querySelector('.js-sdv-slider')) {
    $('.js-results-slider').slick({
      infinite: true,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      fade: true
    });
  }

  if (document.querySelector('.tools')) {
    const blue = document.querySelectorAll('.tools_progress--blue');
    for (var i = 0; i < blue.length; i++) {
      new ProgressBar.Circle(blue[i], {
        color: '#2041F8',
        duration: 0,
        easing: 'easeInOut',
        strokeWidth: 1
      }).animate(1);
    }
    const green = document.querySelectorAll('.tools_progress--green');
    for (var i = 0; i < green.length; i++) {
      new ProgressBar.Circle(green[i], {
        color: '#2CF2AE',
        duration: 0,
        easing: 'easeInOut',
        strokeWidth: 1
      }).animate(0.95);
    }
  }

  if (document.querySelector('.js-serve-slider')) {
    $('.js-serve-slider').slick({
      autoplay: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: true,
      prevArrow: '.serve_arrow--left',
      nextArrow: '.serve_arrow--right',
      fade: true
    });
  }

  if (document.querySelector('.js-posts-slider')) {
    $('.js-posts-slider').slick({
      infinite: true,
      autoplay: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      responsive: [{
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    });
  }

  if (document.querySelector('.js-devices-slider')) {
    $('.js-devices-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      $('.js-device-slide').removeClass('active');
      $('.js-device-slide').eq(nextSlide).addClass('active');
      const allVideos = $('.js-devices-slider  video');
      for (var i = 0; i < allVideos.length; i++) {
        $(allVideos)[i].pause();
      }
    });
    $('.js-devices-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
      const arr = $('.js-devices-slider .slick-active video');
      for (var i = 0; i < arr.length; i++) {
        $(arr)[i].play();
      }
    });
    $('.js-device-slide').on('click', function () {
      $('.js-devices-slider').slick('slickGoTo', $(this).data('slide'));
    });
    $('.js-devices-slider').on('init', function () {
      const arr = $('.js-devices-slider .slick-active video');
      for (var i = 0; i < arr.length; i++) {
        $(arr)[i].play();
      }
    });
    $('.js-devices-slider').slick({
      infinite: true,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      fade: true
    });
  }

  if (document.querySelector('.js-nav')) {
    const elements = $('.js-nav');
    function checkPos() {
      const prev = $('.navbar_item.active');
      $('.navbar_item').removeClass('active');
      const result = inWindow(elements);
      if (result.length === 0) {
        $(prev).addClass('active');
      } else {
        $('.navbar_item[href="#' + $(result).eq(result.length - 1).attr('id') + '"]').addClass('active');
      }
    }
    checkPos();
    $(window).on('scroll', checkPos);
  }

  // if(document.querySelector('.js-section')) {
  //   const sections = $('.js-section');
  //   function checkSection() {
  //     if(window.scrollY > 40) {
  //       $('.header').addClass('header--fixed');
  //     } else {
  //       $('.header').removeClass('header--fixed');
  //     }
  //     console.log(inWindow(sections));
  //     const result = inWindow(sections);
  //     if(result.length === 0) {
  //       // $(prev).addClass('active')
  //     } else {
  //       $('.header').removeClass('header--white');
  //       $('.header').removeClass('header--blue');
  //       $('.header').addClass($(result).eq(0).data('color'));
  //     }
  //
  //   }
  //   checkSection();
  //   $(window).on('scroll', checkSection);
  // }

  if (document.querySelector('.js-scroll-to-section')) {
    $('.js-scroll-to-section').on('click', function (e) {
      e.preventDefault;
      const id = $(this).attr('href');
      const body = $("html, body");
      body.stop().animate({ scrollTop: $(id).offset().top }, 500, 'swing');
    });
  }

  if (document.querySelector('.wow')) {
    new WOW().init();
  }

  if (document.querySelector('.js-show-more-jobs')) {
    $('.js-show-more-jobs').on('click', function (e) {
      e.preventDefault;
      const action = $(this).data('action');
      $('#preloader').fadeIn();
      $('body').addClass('body-overflow');
      $.get('/wp-admin/admin-ajax.php?action=' + action, {}).done(function (result) {
        $('.jobs_items').append(result);
        $('.jobs_more').fadeOut();
      }).always(function () {
        // preloader
        $('#preloader').fadeOut();
        $('body').removeClass('body-overflow');
      });
    });
  }
});