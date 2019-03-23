const rule = {
    /**
   * 验证密码强度，-1位不合格，1为最低，依次递增
   * @param {string,number} value 密码
   */
    strength (value) {
        if (!value) {
            return;
        }
        var strengthCount = 0;
        if (/[a-zA-Z]/.test(value)) {
            strengthCount++;
        }            
        if (/[0-9]/.test(value)) {
            strengthCount++;
        }
        if (/[`~!@#$%^&*()_+<>?:"{},./;'[\]\\ ]/g.test(value)) {
            strengthCount++;
        }
        if (value.length < 6 || value.length > 30) {
            strengthCount = -1;
        }
        return strengthCount;
    },
    /**
   * 清除不匹配的字符，必须传入event事件，规则不传则默认清除特殊字符
   * 如果该数据绑定v-model则无效
   * @param {string,number} e 密码
   * *@param {RegExp} regExp 正则
   */
    replaceStr(e, regExp) {
        var regexpStr = regExp || /[`~!@#$%^&*()_+<>?:"{}\\,\s.\ /,'[\]]/g;
        e.target.value = e.target.value.replace(regexpStr, '');
        return this;
    }
};

export default rule;
    

 

 