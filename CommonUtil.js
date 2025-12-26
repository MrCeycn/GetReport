//返回不带路径的文件名，不含后缀hyhhhhhhhh
function GetFileName(fileNameFullPath) {//fileNameFullPath为可能带路径的文件名
    var arr = fileNameFullPath.split("\\");
    var arrLength = arr.length;
    var lastItem = arr[arrLength - 1]; //文件名中可能带有点号
    var extension = "." + GetFileExtension(lastItem);
    return lastItem.replace(extension, "");
}

//返回文件后缀名，不含点号
function GetFileExtension(fileName) {
    var arr = fileName.split(".");
    return arr[arr.length - 1];
}

//删除记录，但不刷新列表页面,重新激活当前tab，相当于刷新当前tab
function fnConfirmWithTabF5(msg, url, tabIndex) {
    ymPrompt.confirmInfo({ message: msg, title: '确认对话框', handler: function (tp) {
        if (tp == 'ok') {
            $.get(url, function (data) {
                if (data == "OK") {
                    $("#tabs").tabs({ actived: tabIndex });
                }
                else alert(data);
            });
        }
    }
    });
}

//删除记录，但不刷新列表页面
function fnConfirmWithoutF5(msg, url, fn) {
    ymPrompt.confirmInfo({ message: msg, title: '确认对话框', handler: function (tp) {
        if (tp == 'ok') {
            $.get(url, function (data) {
                if (data == "OK") {
                    if (fn != null) {
                        fn();
                    }
                }
                else ymPrompt.alert(data);
            });
        }
    }
    });
}
//删除记录同时刷新列表页面(保留当前页数和查询条件) Add by Raven 2014-10-10
function fnConfirmWithF5WithOTable(msg, url, oTable) {
    ymPrompt.confirmInfo({ message: msg, title: '确认对话框', handler: function (tp) {
        if (tp == 'ok') {
            $.get(url, function (data) {
                if (data == "OK") {
                    oTable.api().ajax.reload(function () {
                        ymPrompt.alert("操作成功！");
                    }, false);
                }
                else {
                    ymPrompt.alert(data);
                }
            });
        }
    }
    });
}


//删除记录同时刷新列表页面
function fnConfirmWithF5(msg, url) {
    ymPrompt.confirmInfo({ message: msg, title: '确认对话框', handler: function (tp) {
        if (tp == 'ok') {
            $.get(url, function (data) {
                if (data == "OK") {
                    ymPrompt.alert("操作成功！");
                    //                    window.location.href = window.location.href;
                    window.location.reload();
                }
                else ymPrompt.alert(data);

            });
        }
    }
    });
}

//Ajax方式下载附件
function fnAjaxDownloadFile(action) {
    var form = $("<form>");   //定义一个form表单
    form.attr('style', 'display:none');
    form.attr('target', '');
    form.attr('method', 'post');
    form.attr('action', action);

    $('body').append(form);  //将表单放置在web中

    form.submit();   //表单提交
}

//设置cookie
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays)
    cookieVal = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    document.cookie = cookieVal;
}
//获取cookie
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

//自定义小数(默认2位小数)
function fnDecimals(mNum) {
    if (mNum.toFixed) {
        mNum = mNum.toFixed(2);
    }
    else {
        var div = Math.pow(10, 2);
        mNum = Math.round(mNum * div) / div;
    }
    return mNum;
}


//=========上传EXCEL验证=========
jQuery.validator.addMethod("Excel", function (value, element) {
    var pattern = /.xls$/;
    var leng = /^\s*$/;
    return (this.optional(element) && !leng.test(value)) || pattern.test(value);
}, "请上传EXCEL格式文件");

//======特殊字符验证（\，"，回车换行，制表符）==========
//jQuery.extend(jQuery.validator.messages, {
//    specialCharValidate: "非法字符[\', \", \\]"
//});
jQuery.validator.addMethod("specialCharValidate", function (value, element) {
    var pattern = new RegExp("[\\\\'\"\t]");
    return this.optional(element) || !pattern.test(value);
}, jQuery.format("非法字符[\', \", \\ ,制表符(Tab)]"));
//======特殊字符验证==========

//=========手机号码验证=========
jQuery.validator.addMethod("mobile", function (value, element) {
    var length = value.length;
    var mobile = /^1[3|4|5|7|8][0-9]\d{4,8}$/
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "手机号码格式错误");
//=========手机号码验证=========

//=========带中文字符串长度验证=========
jQuery.validator.addMethod("maxGBKlength", function (value, element, param) {
    var length = value.length;
    for (var i = 0; i < length; i++) {
        if (value.charCodeAt(i) > 127) {
            length++;
        }
    }
    return this.optional(element) || (length <= param);
}, $.validator.format("不能超过{0}个字符或一半汉字"));
//=========带中文字符串长度验证=========


//=========正整数验证=========
jQuery.validator.addMethod("positiveinteger", function (value, element, param) {
    var aint = parseInt(value);
    return aint > 0 && (aint + "") == value;
}, $.validator.format("不能为负数"));
//=========带中文字符串长度验证=========


//=========Autocomplete正确性验证=========
jQuery.validator.addMethod("ChkAutocomplete", function (value, element, param) {
    var chkObj = $(param).val();
    return this.optional(element) || (value == chkObj);
}, "输入有误,请在下拉框中选择!");
//=========Autocomplete正确性验证=========


var map = function (arr, callback, pThis) {
    var len = arr.length;
    var rlt = new Array(len);
    for (var i = 0; i < len; i++) {
        if (i in arr) rlt[i] = callback.call(pThis, arr[i], i, arr);
    }
    return rlt;
}
/**
* 函数参数重载方法 overload，对函数参数进行模式匹配。默认的dispatcher支持*和...以及?，"*"表示一个任意类型的参数，"..."表示多个任意类型的参数，"?"一般用在",?..."表示0个或任意多个参数
* @method overload
* @static
* @optional {dispatcher} 用来匹配参数负责派发的函数
* @param {func_maps} 根据匹配接受调用的函数列表
* @return {function} 已重载化的函数
*/
var FunctionH = {
    overload: function (dispatcher, func_maps) {
        if (!(dispatcher instanceof Function)) {
            func_maps = dispatcher;
            dispatcher = function (args) {
                var ret = [];
                return map(args, function (o) { return typeof o }).join();
            }
        }

        return function () {
            var key = dispatcher([].slice.apply(arguments));
            for (var i in func_maps) {
                var pattern = new RegExp("^" + i.replace("*", "[^,]*").replace("...", ".*") + "$");
                if (pattern.test(key)) {
                    return func_maps[i].apply(this, arguments);
                }
            }
        }
    }
};
//全选Checkbox(并且是enable的才选中)
function fnChkAll(chkName, isChecked) {
    if (isChecked) {
        $("input[name='" + chkName + "'][type='checkbox'][disabled!='disabled']").each(function () {
            this.checked = "checked";
        });
    }
    else {
        $("input[name='" + chkName + "'][disabled!='disabled']").attr("checked", isChecked);
    }
}

//获取所有选中的Checkbox的值
function fnGetAllCheckedValue(chkName) {
    var checked = $("input[type='checkbox'][name='" + chkName + "']:checked");
    var strChecked = "";
    $.each(checked, function (index, key) {
        strChecked += $(key).val() + ",";
    })
    strChecked = strChecked.substr(0, strChecked.length - 1);
    return strChecked;
}

Date.prototype.Format = function (formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, this.getMonth());

    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());

    return str;
}

//新窗口
function fnNewWindow(url, width, height, title) {
    var obj = document.body;
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;
    var objWidth = obj.offsetWidth;
    var objHeight = obj.offsetHeight;
    var objTop = obj.scrollTop;
    var objX = Math.abs((clientWidth - width) / 2);
    var objY = Math.abs((clientHeight - height) / 2);
    if(obj.scrollTop<(clientHeight/2))
        objY = objY + obj.scrollTop/4;
    if (objY > clientHeight) 
        objY = Math.abs((clientHeight - height) / 2);
   
    //alert(objY);
    ymPrompt.win({ 
        message: url, 
        width: width, 
        height: height, 
        title: title, 
        handler: null, 
        iframe: true, 
        winPos: [objX, objY] 
    });
}
//新窗口
function fnNewWindowCenter(url, width, height, title) {

    var obj = document.body;
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;
    var objWidth = obj.offsetWidth;
    var objHeight = obj.offsetHeight;
    var objTop = obj.scrollTop;
    var objX = Math.abs((clientWidth - width) / 2);
    var objY = Math.abs((clientHeight - height) / 2);
    if (obj.scrollTop < (clientHeight / 2)) objY = objY + obj.scrollTop / 4;
    if (objY > clientHeight) objY = Math.abs((clientHeight - height) / 2);
    //alert(objY);
    ymPrompt.win({ message: url, width: width, height: height, title: title, handler: null, iframe: true, winPos: [objX, objY] });
}
//关闭页面时，移除当前登录人访问当前页面的记录
//key:action_业务主键Id
function fnClosePage(key) {
    $.post("/Login/Clear?key=" + key, function (data) {

    });
}
//不同用户在操作同一action时的提示信息
function fnFilterMsg(msg, key) {
    if (msg != "") {
        ymPrompt.confirmInfo({ message: msg + "，是否继续访问？", title: '确认对话框', handler: function (tp) {
            if (tp != 'ok') {
                $.post("/Login/Clear?key=" + key, function (data) {
                    window.close();
                });
            }
        }
        });
    }
}


//记录日志
function fnRecordLog(obj) {
    var isChange = null;
    var FKValue = $(obj).attr("FKValue");
    var FKtype = $(obj).attr("FKtype");
    var pramas = "FKValue=" + FKValue + "&FKtype=" + FKtype;
    var url = "/BusinessLog/RecordLog?" + pramas;
    ymPrompt.win({ message: url, width: 700, height: 400, title: "消息", dragOut: false, handler: function () {

    }, iframe: true
    });
    $(document).keypress(function (event) {
        //        if (event.keyCode == 27) {  //esc关闭
        //            //刷新Table
        //            oTable.api().ajax.reload(function () {
        //            }, false);
        //        }
    });
}

function fnChangeImg(imgId, tableDatalength) {
    //获取所有图片对象
    var src = "../Content/themes/deepblue/webcss/img/Dialogbox.gif";
    if (tableDatalength == 1) {
        src = "../Content/themes/deepblue/webcss/img/Dialogbox-empty.gif";
    }
    $("table").find("img[fkvalue='" + imgId + "']").attr("src", src);
}

//金额格式化，如123456，格式化为123,456加n位小数
function fnMoney(s, n) //s:传入的float数字 ，n:希望返回小数点几位 
{
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}

function fnAuditFlow(AuditAction, IsAuditPass) {
    //不验证
    if (IsAuditPass) {
        $("#Remark").rules("remove");
    }
    else {
        $("#Remark").rules("add", { required: true, maxGBKlength: 3000,
            messages: { required: "请填写审核意见" }
        });
    }
    if (!$("#formAudit").valid()) return;

    $.post(AuditAction + "?IsAuditPass=" + IsAuditPass, $("#formAudit").serialize(), function (data) {
        if (data.Msg == "OK") {
            try {
                window.top.opener.fnReloadTable();
            } catch (err) { }
            window.close();
        }
        else ymPrompt.alert(data.Msg);
    });
}

function fnAuditWorkflow(IsAuditPass, NotValidateRemark) {
    //不验证
    if (NotValidateRemark) {
        $("#Remark").rules("remove");
    }
    else {
        $("#Remark").rules("add", { required: true, maxGBKlength: 3000,
            messages: { required: "请填写审核意见" }
        });
    }

    if ($("#formAudit").valid()) {
        $.post("/Workflow/AuditWorkflow?IsAuditPass=" + IsAuditPass, $("#formAudit").serialize(), function (data) {
            if (data.Msg == "OK") {
                try {
                    window.top.opener.fnReloadTable();
                } catch (err) { }
                window.close();
            }
            else ymPrompt.alert(data.Msg);
        });
    }

}

//撤销流程，并刷新列表
function fnCancelWorkflow(fkValue, flowCode, oTable) {

    ymPrompt.confirmInfo({ message: "确定要撤销审核流程？", title: '确认对话框', handler: function (tp) {
        if (tp == 'ok') {
            var url = "/Workflow/CancelWorkflow?applyId=" + fkValue + "&flowCode=" + flowCode;
            $.get(url, function (data) {
                if (data == "OK") {
                    oTable.api().ajax.reload(function () {
                        ymPrompt.alert("撤销成功！");
                    }, false);
                }
                else {
                    ymPrompt.alert(data);
                }
            });
        }
    }
    });
}


function fnShowWorkflowDetail(a) {
    var flowCodes = $(a).attr("data-flowcodes");
    var fkValue = $(a).attr("data-fkvalue");
    fnNewWindow("/LightFlow/LightflowDetail?flowCodes=" + flowCodes + "&fkValue=" + fkValue, 820, 420, '意见与审核进度');
    return false;
}
//创建工单 Add By Raven
function fnApplyAudiCreate(FKValue, flowId) {
    var pramas = "FKValue=" + FKValue + "&flowId=" + flowId;
    var url = "/LightFlow/CreateFlow?" + encodeURI(pramas);
    ymPrompt.win({ message: url, width: 370, height: 200, title: "创建工单", dragOut: false, handler: function () {
    }, iframe: true
    });
    return false;
}

function fnReloadTable() {
    if (window.oTable != null)
        window.oTable.api().ajax.reload(function () { }, false);
}

function fnReloadTableById(tableId) {
    $("#" + tableId).dataTable().api().ajax.reload(null, false); // 分页无需重置
}
//流程 ----- 结束

function fnShowInfo() {
    var sObj = document.getElementById("divBaseInfo");
    var obj = document.getElementById("imgShow");
    var aobj = document.getElementById("aShow");
    if (sObj.style.display != "none") {
        sObj.style.display = "none";
        obj.className = "c";
        obj.title = "展开";
        obj.src = "../../Content/themes/deepblue/webcss/img/iconSidebarUp.gif";
        aobj.innerHTML = "展开";
    } else {
        sObj.style.display = "block";
        obj.className = "";
        obj.title = "隐藏";
        obj.src = "../../Content/themes/deepblue/webcss/img/iconSidebarDown.gif";
        aobj.innerHTML = "隐藏";
    }
    obj.blur();
    return false;
}


function fnShowInfoByDivId(divId, imgShowId, aShowId) {
    var sObj = document.getElementById(divId);
    var obj = document.getElementById(imgShowId);
    var aobj = document.getElementById(aShowId);
    if (sObj.style.display != "none") {
        sObj.style.display = "none";
        obj.className = "c";
        obj.title = "展开";
        obj.src = "../../Content/themes/deepblue/webcss/img/iconSidebarUp.gif";
        aobj.innerHTML = "展开";
    } else {
        sObj.style.display = "block";
        obj.className = "";
        obj.title = "隐藏";
        obj.src = "../../Content/themes/deepblue/webcss/img/iconSidebarDown.gif";
        aobj.innerHTML = "隐藏";
    }
    obj.blur();
    return false;
}


$(window).load(function () {
    $("input[type=checkbox][data-checked-name]").click(function () {
        var _this = $(this);
        var _name = _this.attr("data-checked-name");
        var _checked = _this[0].checked;
        $("input[type=checkbox][name=" + _name + "]").each(function () {
            var _item = $(this)[0];
            if (!_item.disabled) {
                _item.checked = _checked;
            }
        });
    });

    //    $("#searchCompanyName").attr("placeholder", "请选择客户");
    //    $("#searchCompanyName").attr("readonly", "readonly");
    //    $("#searchCompanyCode").parent().parent().hide();
    //    $("#searchCompanyName").click(function () {
    //        ymPrompt.win({ message: "/CompanySearch/Search", width: 800, height: 360, title: "查找客户", handler: null, iframe: true });
    //    });
});


//打开选择客户的窗口
//businessType:业务类型（计量、环境、化学等）；IsShowAll：查看所有客户
function fnOpenCompanySelect(businessType, IsShowAll) {
    $("#searchCompanyName").attr("placeholder", "请选择客户");
    $("#searchCompanyName").attr("readonly", "readonly");
    $("#searchCompanyCode").parent().parent().hide();
    $("#searchCompanyName").click(function () {
        ymPrompt.win({ message: "/CompanySearch/Search?businessType=" + businessType + "&IsShowAll=" + IsShowAll, width: 600, height: 360, title: "查找客户", handler: null, iframe: true });
    });
}

//接收选择的客户，赋值到左侧查询条件中
function fnGetSelectCompanyInfo(json) {
    $("#searchCompanyCode").val(json[0]);
    $("#searchCompanyName").val(json[1]);
}




//完成对话框操作后，执行回调函数
function fnConfirm(msg, url, callBackFunction, param) {
    ymPrompt.confirmInfo({ message: msg, title: '确认对话框', handler: function (tp) {
        if (tp == 'ok') {
            $.get(url, function (data) {

                if (data == "OK") {
                    if (callBackFunction != null) {
                        callBackFunction(param);
                    }
                }
                else ymPrompt.alert(data);
            });
        }
    }
    });
}
//完成对话框操作后，执行回调函数
function fnConfirmMsg(msg, url, callBackFunction) {
    ymPrompt.confirmInfo({ message: msg, title: '确认对话框', handler: function (tp) {
        if (tp == 'ok') {
            $.get(url, function (data) {
                if (data.Msg == "OK") {
                    if (callBackFunction != null) {
                        callBackFunction();
                    }
                }
                else ymPrompt.alert(data.Msg);
            });
        }
    }
    });
}


//显示高级查询条件搜索后的搜索下拉列表
//input:输入框；code:存放结果选中后结果对应的code、id等值；
//url:根据关键字搜索的action，返回结果为json格式： var datas = [{ name: "某某公司1", code: "a2kvk3" },{ name: "某某公司2", code: "jdlk35" }]；
//minKeyLength：关键字最少字数，默认1
//isMultSelect：搜索结果是否可多选，默认单选
//fnCallback：回调函数，调用者实现，如不传，则使用默认的回调函数
function fnAutocomplete(input, code, url, minKeyLength, isMultSelect, fnCallback) {
    if (minKeyLength == undefined) minKeyLength = 1;
    //单选
    if (isMultSelect == undefined || isMultSelect == false) {
        $("#" + input).autocomplete({
            minLength: minKeyLength, //输入字符个数小于设定值，不查询            
            source: url,
            select: function (event, ui) {
                var result = new Array();
                result.push(ui.item);
                //回调函数，调用者实现
                if (fnCallback != null) {
                    fnCallback(input, code, result);
                }
                else {
                    fnAutocompleteCallBack(input, code, result);
                }
                return false;
            }
        });
    }
    else { //多选
        $('#' + input).bind('input propertychange', function () {
            var inputValue = $.trim($('#' + input).val());
            if (inputValue.length < minKeyLength) return; //输入字符个数小于设定值，不查询
            url = url + "?term=" + encodeURI(inputValue);
            $.getJSON(url, function (data) {//搜索数据并获取搜索结果
                fnInitItems(input, code, data);
            });
        });
    }
}

var resultContainer = $('<div></div>'); //创建一个子<div>
resultContainer.hide();
resultContainer.bind("mouseleave", function () { $(this).hide(); }); //鼠标离开，隐藏

//2：初始化搜索到的数据进行显示
function fnInitItems(input, code, items, fnCallback) {
    resultContainer.empty();
    for (var i = 0; i < items.length; i++) {
        var resultItem = $("<div title="+items[i].label+"></div>"); //创建一个子<div>
        //可多选
        resultItem.append("<input type='checkbox' name=" + input + " value=" + items[i].value + " />&nbsp;&nbsp;" + items[i].label);
        resultItem.css({ 'padding': '3px', 'white-space': 'nowrap', 'cursor': 'pointer', 'background-color': 'ffffff', 'color': '#000000' });
        resultItem.bind("mouseover", function () {
            $(this).css({ 'background-color': '#CFCFCF', 'color': '#FF4500' });
        });
        resultItem.bind("mouseout", function () {
            $(this).css({ 'background-color': '#FFFFFF', 'color': '#000000' });
        });
        resultItem.bind("click", function () {
            var result = fnGetChoiceData(input, code, items, this);
            //回调函数，调用者实现
            if (fnCallback != null) {
                fnCallback(input, code, result);
            }
            else {
                fnAutocompleteCallBack(input, code, result);
            }
        });  //选中后处理数据
        resultItem.appendTo(resultContainer);
        resultContainer.appendTo(document.body);
    }
    //结果div定位显示
    resultContainer.removeAttr("style");
    resultContainer.css({ 'border': '1px solid #ccc', 'max-height': '250px', 'top': $('#' + input).offset().top + $('#' + input).outerHeight(),
        'left': $('#' + input).offset().left, 'width': $('#' + input).width() > 200 ? $('#' + input).width() : 200, 'position': 'absolute', 'font-size': '12px', 'font-family': 'Arial',
        'z-index': 99999, 'background-color': '#FFFFFF', 'overflow-y': 'auto', 'overflow-x': 'hidden', 'white-space': 'nowrap'
    });
    resultContainer.show();
};

//3.选中后处理数据
function fnGetChoiceData(input, code, items, obj) {
    var result = new Array();
    var checkbox = $(obj).children();
    if (checkbox.is(':checked')) checkbox.checked = "checked";
    else checkbox.attr("checked", true);
    var checked = $("input[type='checkbox'][name='" + input + "']:checked");
    $.each(checked, function (index, key) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].value == $(key).val()) {
                result.push(items[i]);
                break;
            }
        }
    })
    return result;
};

//默认的回调函数
function fnAutocompleteCallBack(input, code, data) {
    var resultLabels = "";
    var resultValues = "";
    for (var i = 0; i < data.length; i++) {
        if (resultLabels == "") {
            resultLabels = data[i].label;
            resultValues = data[i].value;
        }
        else {
            resultLabels = resultLabels + "," + data[i].label;
            resultValues = resultValues + "," + data[i].value;
        }
    }
    $("#" + input).val(resultLabels);
    if (code != "") $("#" + code).val(resultValues);
}


//打印
function fnprinthtml() {
    bdhtml = window.document.body.innerHTML; //获取当前页的html代码
    sprnstr = "<!--startprint-->"; //设置打印开始区域
    eprnstr = "<!--endprint-->"; //设置打印结束区域
    prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr) + 18); //从开始代码向后取html
    prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr)); //从结束代码向前取html 
    window.document.body.innerHTML = prnhtml;

    window.print();
    window.document.body.innerHTML = bdhtml;
}