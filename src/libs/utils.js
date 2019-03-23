// 公共js组件
const utils = {
    /**
     * 判断是否有当前类
     * @param {element} elements 标签
     * @param {String}} cName 类名
     */
    hasClass(elements, cName) {
        return !!elements.className.match(
            new RegExp('(\\s|^)' + cName + '(\\s|$)'),
        ); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
    },
    /**
     * 新增加一个类
     * @param {element} elements 标签
     * @param {String} cName 类名
     */
    addClass(elements, cName) {
        if(elements.className =='' ){//判断class是否为空
            elements.className = cName;//是，直接给class赋值
        }else{
            if(!this.hasClass(elements,cName)){//判断是否存有相同的
                elements.className += ' '+ cName;//没有，就将新的类名 重新赋值给class（类）
            }
        }
    },
    /**
     * 删除一个类
     * @param {element} elements 标签
     * @param {String} cName 类名
     */
    removeClass(elements, cName) {
        if (this.hasClass(elements, cName)) {
            elements.className = elements.className.replace(
                new RegExp('(\\s|^)' + cName + '(\\s|$)'),
                ' ',
            ); // replace方法是替换
        }
    },
    /**
     * 获取指定子元素
     * @param {el} curEle 父DOM元素
     * @param {string} tagName 元素名
     */
    getElChildren(curEle, tagName) {
        let ary = [];
        if (tagName) ary = Array.prototype.slice.call(curEle.children);
        // 获取指定子元素
        let curTag;
        if (typeof tagName === 'string') {
            for (let i = 0; i < ary.length; i++) {
                curTag = ary[i];
                if (curTag.nodeName.toLowerCase() === tagName.toLowerCase()) {
                    return curTag;
                }
            }
        }
        return curTag;
    },
    /**
     * 统一cookie操作
     * @param {string} request 操作方式,get,set,del
     * @param {string} name cookie名
     * @param {*} value 值
     * @param {number} time cookie保留的时间  秒s，小时h，天d。例：s10，h12，d1
     *
     */
    cookie(request, name, value, time) {
        //   获取cookie,
        if (request == 'get') {
            var arr;

            var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
            arr = document.cookie.match(reg);
            if (arr) {
                return JSON.parse(unescape(arr[2]));
            } else {
                return null;
            }
        }
        // 设置cookie
        if (request == 'set') {
            var strsec = getsec(time);
            var exp = new Date();
            exp.setTime(exp.getTime() + strsec * 1);
            document.cookie =
                name + '=' + escape(value) + ';expires=' + exp.toGMTString();
        }
        // 删除cookie
        if (request == 'del') {
            new Date().setTime(exp.getTime() - 1);

            var regs = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
            var arrs = document.cookie.match(regs);

            if (arrs) {
                var cval = unescape(arrs[2]);
                if (cval != null) {
                    document.cookie =
                        name + '=' + cval + ';expires=' + exp.toGMTString();
                }
            }
        }
    },

    /**
     * 时间格式化，采用天数
     * @param {Date} time  时间
     */
    parseDate(time) {
        if (!time) {
            return null;
        }
        var delta = Date.now() - time;
        var d = parseInt(delta / 24 / 60 / 60 / 1000);
        var h = parseInt(delta / 60 / 60 / 1000);
        var m = parseInt(delta / 60 / 1000);

        if (d > 0 && d < 4) {
            return d + '天前';
        } else if (d > 3) {
            return new Date(time).Format('MM-DD HH:mm');
        } else if (h > 0) {
            return h + '小时前';
        } else if (m > 0) {
            return m + '分钟前';
        } else {
            return '刚刚';
        }
    },
    /**
     * 浮点加法运算
     * @param {number} num1 值1
     * @param {number} num2 值2
     */
    addFloat(num1, num2) {
        let baseNum;
        let baseNum1;
        let baseNum2;
        try {
            baseNum1 = num1.toString().split('.')[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split('.')[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        return (num1 * baseNum + num2 * baseNum) / baseNum;
    },
    /**
     * 浮点减法运算
     * @param {number} num1 值1
     * @param {number} num2 值2
     */
    subFloat(num1, num2) {
        let baseNum;
        let baseNum1;
        let baseNum2;
        try {
            baseNum1 = num1.toString().split('.')[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split('.')[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        return (num1 * baseNum - num2 * baseNum) / baseNum;
    },
    /**
     * 浮点乘法运算
     * @param {number} num1 值1
     * @param {number} num2 值2
     */
    tekeFloat(num1, num2) {
        let baseNum;
        let baseNum1;
        let baseNum2;
        try {
            baseNum1 = num1.toString().split('.')[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split('.')[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        return num1 * baseNum * (num2 * baseNum) / baseNum;
    },
    /**
     * 浮点除法法运算
     * @param {number} num1 值1
     * @param {number} num2 值2
     */
    divFloat(num1, num2) {
        let baseNum;
        let baseNum1;
        let baseNum2;
        try {
            baseNum1 = num1.toString().split('.')[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split('.')[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        return num1 * baseNum / (num2 * baseNum) / baseNum;
    },
    /**
    /*对象拷贝函数
    /*data 需要拷贝的数据
    */
    copy(data) {
        var newData;
        newData = Object.prototype.toString.call(data) == '[object Array]' ? [] : false;
        newData = Object.prototype.toString.call(data) == '[object Object]' ? {} : false;
        if (!newData) {
            return data;
        }
        message = copyData(data, newData);
        return message;
        function copyData(data, newData) {
            if (Object.prototype.toString.call(data) == '[object Array]') {
                for (var i = 0; i <= data.length - 1; i++) {
                    if (Object.prototype.toString.call(data[i]) == '[object Array]') {
                        var arr = [];
                        newData[i] = copyData(data[i], arr);
                    }
                    if (Object.prototype.toString.call(data[i]) == '[object Object]') {
                        var obj = {};
                        newData[i] = copyData(data[i], obj);
                    }
                    newData.push(data[i]);
                }
                var copyParams = newData;
                copyParams = JSON.parse(JSON.stringify(data));
                return copyParams;
            }
            if (Object.prototype.toString.call(data) == '[object Object]') {

                for (var key in data) {
                    if (Object.prototype.toString.call(data[key]) == '[object Object]') {
                        var obj1 = {};
                        newData[key] = copyData(data[key], obj1);
                    }

                    if (Object.prototype.toString.call(data[key]) == '[object Array]') {
                        var arr1 = [];
                        newData[key] = copyData(data[key], arr1);
                    }
                }
                var copyParam = newData;
                copyParam = JSON.parse(JSON.stringify(data));
                return copyParam;
            }
        }
    },
    hideTable(h,params) {
        return h('div', [
            h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                },
                domProps: {
                    title: params.row.nickname
                }
            }, params.row.nickname)
        ]);
    },
};

export default utils;

/*  公共函数内部需要使用到的一些公用方法  */

/**
 *
 * @param {str} str 时间
 */
function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == 's') {
        return str1 * 1000;
    } else if (str2 == 'h') {
        return str1 * 60 * 60 * 1000;
    } else if (str2 == 'd') {
        return str1 * 24 * 60 * 60 * 1000;
    }
}

/**
 *格式化时间
 * 这里将时间格式化函数封装在js自带函数Date中
 * @param  {String} formatStr yyyy-mm-dd hh:mm:ss w
 * @return {String}   时间字符串 "2017-06-02 14:05:01 六"
 *
 */
Date.prototype.Format = function(formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(
        /yy|YY/,
        this.getYear() % 100 > 9
            ? (this.getYear() % 100).toString()
            : '0' + this.getYear() % 100,
    );
    str = str.replace(
        /MM/,
        this.getMonth() + 1 > 9
            ? (this.getMonth() + 1).toString()
            : '0' + (this.getMonth() + 1),
    );
    str = str.replace(/M/g, this.getMonth() + 1);
    str = str.replace(/w|W/g, Week[this.getDay()]);
    str = str.replace(
        /dd|DD/,
        this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate(),
    );
    str = str.replace(/d|D/g, this.getDate());
    str = str.replace(
        /hh|HH/,
        this.getHours() > 9
            ? this.getHours().toString()
            : '0' + this.getHours(),
    );
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(
        /mm/,
        this.getMinutes() > 9
            ? this.getMinutes().toString()
            : '0' + this.getMinutes(),
    );
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(
        /ss|SS/,
        this.getSeconds() > 9
            ? this.getSeconds().toString()
            : '0' + this.getSeconds(),
    );
    str = str.replace(/s|S/g, this.getSeconds());
    return str;
};
