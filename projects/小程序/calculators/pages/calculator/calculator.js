// pages/calculator/calculator.js
Page({
  /**
   * 页面的初始数据 
   * 乘号：× 除号：÷
   */

  data: {
    // 展示区域，对应所有的数字和操作符
    show: "0",
    // 指currentNum之前的展示部分。
    lastShow: '',
    // 结果部分
    result: '',
    isResult: false,
    defaultColor: '#fff',
    // 19个格子对应的背景颜色
    clearColor: '#454545',
    neColor: '#454545',
    delColor: '#454545',
    divideColor: '#CD3333',
    mulColor: '#CD3333',
    subColor: '#CD3333',
    addColor: '#CD3333',
    equalColor: '#CD3333',
    sevenColor: '#454545',
    eightColor: '#454545',
    nineColor: '#454545',
    fourColor: '#454545',
    fiveColor: '#454545',
    sixColor: '#454545',
    oneColor: '#454545',
    twoColor: '#454545',
    threeColor: '#454545',
    zeroColor: '#454545',
    pointColor: '#454545',
    // 存放所有操作数字的数组
    numList: [],
    // 存放操作的数组，1代表+ 0代表-
    opList: [],
    // 当前正在输入的数字串，指的是初始时输入的数字或者输入一个操作符后输入的数字
    currentNum: '',
    // 当前计算的类型 1表示X  0表示除 默认为乘法
    currentOpType: 1,
    // 计算的数字
    caculateNum: 1,
    // 当前计算区块的计算结果
    resultNum: 0,
    // 下方的区域的展示与隐藏
    showOp: true,
    // 待操作数组,指得是已经输入过的数字和操作符
    todoList: [],
    // 存放计算过的数字的数组
    calculatedList: [],
    // 存放当前需要计算的数字。暂时用处不大
    //calculateList: [],
    // 当前计算数字的下标
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 当点击数字或者操作时，改变show区域的内容显示
   */
  changeShow: function (currentNum) {
    // str 就代表了currentNum。
    var that = this;
    var lastShow = that.data.lastShow;
    // 判断传入的currentNum是不是操作符 (+ - * /);
    if (currentNum == "×" || currentNum == "-" || currentNum == "+" || currentNum == "÷") {
      // // 先判断lastShow的最后一个字符是不是符号,此处是匹配到+-*/
      // if(lastShow.lastIndexOf("+")>-1 || lastShow.lastIndexOf("-")>-1 || lastShow.lastIndexOf("×")>-1 || lastShow.lastIndexOf("÷")>-1) {
      //   lastShow = lastShow.substring(0,lastShow.length-1);
      // }
      lastShow = lastShow + currentNum;
      that.setData({
        show: lastShow,
        lastShow: lastShow
      })
    }
    // 如果传入的是数字，那么就正常地更改显示信息
    else {
      that.setData({
        show: lastShow + currentNum,
        currentNum: currentNum
      })
    }
  },

  /**
   * 控制下方operate区域的显示与隐藏 
   */
  opShow: function () {
    var that = this;
    var reverse = !that.data.showOp;
    console.log(reverse);
    that.setData({
      showOp: reverse
    })
  },

  /**
   * 初始化背景色
   */
  initColor: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        clearColor: '#454545',
        neColor: '#454545',
        delColor: '#454545',
        divideColor: '#CD3333',
        mulColor: '#CD3333',
        subColor: '#CD3333',
        addColor: '#CD3333',
        equalColor: '#CD3333',
        sevenColor: '#454545',
        eightColor: '#454545',
        nineColor: '#454545',
        fourColor: '#454545',
        fiveColor: '#454545',
        sixColor: '#454545',
        oneColor: '#454545',
        twoColor: '#454545',
        threeColor: '#454545',
        zeroColor: '#454545',
        pointColor: '#454545',
      })
    }, 150)
  },

  /**
   * C 的功能：所有内容初始化
   */
  clear: function () {
    var that = this;
    that.setData({
      clearColor: '#383838',
      show: '0',
      isResult: false,
      result: '',
      currentNum: '',
      lastShow: '',
      caculateNum: 1,
      currentOpType: 1,
      resultNum: 0,
      calculatedList: [],
      index: 0,
      numList: [],
      opList: [],
    });
    that.initColor();
  },

  /**
   * 负值功能
   */
  ne: function () {
    var that = this;
    that.setData({
      neColor: '#383838',
      show: '0'
    });
    that.initColor();
  },

  /**
   * 删除功能
   */
  del: function () {
    var that = this;
    that.setData({
      delColor: '#383838',
      show: '0'
    });
    that.initColor();
  },

  /**
   * 数字功能
   */
  one: function () {
    var that = this;
    that.setData({
      oneColor: '#383838',
    });
    that.initColor();
    // 处理点击后当前数字的一个拼接
    var currentNum = that.data.currentNum;
    if (that.checkNum(currentNum)) {
      if (currentNum == "0") {
        currentNum = "";
      }
      currentNum = currentNum + "1";
    }
    else {
      wx.showToast({
        title: '错误,数字长度不可超过15',
        duration: 1500
      })
      return;
    }
    // 改变show区域的数字
    that.changeShow(currentNum);
    // 实时更新当前运算块的结果
    that.calCurNum(that.data.caculateNum, currentNum, that.data.currentOpType);
  },

  two: function () {
    var that = this;
    that.setData({
      twoColor: '#383838',
    });
    that.initColor();
    // 处理点击后当前数字的一个拼接
    var currentNum = that.data.currentNum;
    if (that.checkNum(currentNum)) {
      if (currentNum == "0") {
        currentNum == "";
      }
      currentNum = currentNum + "2";
    }
    else {
      wx.showToast({
        title: '错误,数字长度不可超过15',
        duration: 1500
      })
      return;
    }
    // 改变show区域的数字内容
    that.changeShow(currentNum);
    // 实时更新当前运算块的结果
    that.calCurNum(that.data.caculateNum, currentNum, that.data.currentOpType);
  },

  three: function () {
    var that = this;
    that.setData({
      threeColor: '#383838',
    });
    that.initColor();
    // 处理点击后当前数字的一个拼接
    var currentNum = that.data.currentNum;
    if (that.checkNum(currentNum)) {
      if (currentNum == "0") {
        currentNum == "";
      }
      currentNum = currentNum + "3";
    }
    else {
      wx.showToast({
        title: '错误,数字长度不可超过15',
        duration: 1500
      })
      return;
    }
    // 改变show区域的数字内容
    that.changeShow(currentNum);
    // 实时更新当前运算块的结果
    that.calCurNum(that.data.caculateNum, currentNum, that.data.currentOpType);
  },

  four: function () {
    var that = this;
    that.setData({
      fourColor: '#383838',
    });
    that.initColor();
    // 处理点击后当前数字的一个拼接
    var currentNum = that.data.currentNum;
    if (that.checkNum(currentNum)) {
      if (currentNum == "0") {
        currentNum == "";
      }
      currentNum = currentNum + "4";
    }
    else {
      wx.showToast({
        title: '错误,数字长度不可超过15',
        duration: 1500
      })
      return;
    }
    // 改变show区域的数字内容
    that.changeShow(currentNum);
    // 实时更新当前运算块的结果
    that.calCurNum(that.data.caculateNum, currentNum, that.data.currentOpType);
  },

  five: function () {
    var that = this;
    that.setData({
      fiveColor: '#383838'
    });
    that.initColor();
    // 处理点击后当前数字的一个拼接
    var currentNum = that.data.currentNum;
    if (that.checkNum(currentNum)) {
      if (currentNum == "0") {
        currentNum == "";
      }
      currentNum = currentNum + "5";
    }
    else {
      wx.showToast({
        title: '错误,数字长度不可超过15',
        duration: 1500
      })
      return;
    }
    // 改变show区域的数字内容
    that.changeShow(currentNum);
    // 实时更新当前运算块的结果
    that.calCurNum(that.data.caculateNum, currentNum, that.data.currentOpType);
  },

  six: function () {
    var that = this;
    that.setData({
      sixColor: '#383838',
    });
    that.initColor();
    // 处理点击后当前数字的一个拼接
    var currentNum = that.data.currentNum;
    if (that.checkNum(currentNum)) {
      if (currentNum == "0") {
        currentNum == "";
      }
      currentNum = currentNum + "6";
    }
    else {
      wx.showToast({
        title: '错误,数字长度不可超过15',
        duration: 1500
      })
      return;
    }
    // 改变show区域的数字内容
    that.changeShow(currentNum);
    // 实时更新当前运算块的结果
    that.calCurNum(that.data.caculateNum, currentNum, that.data.currentOpType);
  },

  seven: function () {
    var that = this;
    that.setData({
      sevenColor: '#383838',
    });
    that.initColor();
    // 处理点击后当前数字的一个拼接
    var currentNum = that.data.currentNum;
    if (that.checkNum(currentNum)) {
      if (currentNum == "0") {
        currentNum == "";
      }
      currentNum = currentNum + "7";
    }
    else {
      wx.showToast({
        title: '错误,数字长度不可超过15',
        duration: 1500
      })
      return;
    }
    // 改变show区域的数字内容
    that.changeShow(currentNum);
    // 实时更新当前运算块的结果
    that.calCurNum(that.data.caculateNum, currentNum, that.data.currentOpType);
  },

  eight: function () {
    var that = this;
    that.setData({
      eightColor: '#383838',
    });
    that.initColor();
    // 处理点击后当前数字的一个拼接
    var currentNum = that.data.currentNum;
    if (that.checkNum(currentNum)) {
      if (currentNum == "0") {
        currentNum == "";
      }
      currentNum = currentNum + "8";
    }
    else {
      wx.showToast({
        title: '错误,数字长度不可超过15',
        duration: 1500
      })
      return;
    }
    // 改变show区域的数字内容
    that.changeShow(currentNum);
    // 实时更新当前运算块的结果
    that.calCurNum(that.data.caculateNum, currentNum, that.data.currentOpType);
  },

  nine: function () {
    var that = this;
    that.setData({
      nineColor: '#383838'
    });
    that.initColor();
    // 处理点击后当前数字的一个拼接
    var currentNum = that.data.currentNum;
    if (that.checkNum(currentNum)) {
      if (currentNum == "0") {
        currentNum == "";
      }
      currentNum = currentNum + "9";
    }
    else {
      wx.showToast({
        title: '错误,数字长度不可超过15',
        duration: 1500
      })
      return;
    }
    // 改变show区域的数字内容
    that.changeShow(currentNum);
    // 实时更新当前运算块的结果
    that.calCurNum(that.data.caculateNum, currentNum, that.data.currentOpType);
  },

  zero: function () {
    var that = this;
    that.setData({
      zeroColor: '#383838'
    });
    that.initColor();
    // 处理点击后当前数字的一个拼接：
    var currentNum = that.data.currentNum;
    if (that.checkNum(currentNum)) {
      currentNum = currentNum + "0";
      if (currentNum == "00") {
        currentNum = "0";
      }
    }
    else {
      wx.showToast({
        title: '错误,数字长度不可超过15',
        duration: 1500
      })
      return;
    }
    // 改变show区域的数字
    that.changeShow(currentNum);
    // 实时更新当前运算块的结果
    that.calCurNum(that.data.caculateNum, currentNum, that.data.currentOpType);
  },

  point: function () {
    var that = this;
    that.setData({
      pointColor: '#383838',
    });
    that.initColor();
    // 处理点击后当前数字的一个拼接：
    var currentNum = that.data.currentNum;
    if (that.checkNum(currentNum)) {
      if (currentNum == "" || currentNum == "0") {
        currentNum = "0.";
      }
      // 处理已经有小数点的情况
      else if (currentNum.indexOf(".") > -1) {
        currentNum = currentNum;
      }
      else {
        currentNum = currentNum + '.';
      }
    }
    else {
      wx.showToast({
        title: '错误,数字长度不可超过15',
        duration: 1500
      })
      return;
    }
    // 改变show区域的数字
    that.changeShow(currentNum);
    // 实时更新当前运算块的结果
    that.calCurNum(that.data.caculateNum, currentNum, that.data.currentOpType);
  },

  /**
   * 操作符功能部分
   */
  divide: function () {
    var that = this;
    that.setData({
      divideColor: '#8c2d2d',
    });
    that.initColor();
    // 1、将currentNum push到待运算数组numList中。先判断currentNum是否为空
    var currentNum = that.data.currentNum;
    var numList = that.data.numList;
    var lastShow = that.data.lastShow;
    var caculateNum = that.data.resultNum;
    lastShow = lastShow + currentNum;
    if (currentNum == "") {
      // 如果当前没有任何的数字，那么操作符就无法显示
      return;
    }
    else {
      numList.push(currentNum);
    }
    currentNum = "";

    that.setData({
      currentOpType: 0,
      caculateNum: caculateNum,
      numList: numList,
      lastShow: lastShow,
      currentNum: currentNum
    })
    that.changeShow("÷");
  },

  mul: function () {
    var that = this;
    that.setData({
      mulColor: '#8c2d2d'
    });
    that.initColor();
    // 1、将currentNum push到待运算数组numList中。先判断currentNum是否为空
    var currentNum = that.data.currentNum;
    var numList = that.data.numList;
    var lastShow = that.data.lastShow;
    var caculateNum = that.data.resultNum;
    lastShow = lastShow + currentNum;
    if (currentNum == "") {
      // 如果当前没有任何的数字，那么操作符就无法显示
      return;
    }
    else {
      numList.push(currentNum);
    }
    currentNum = "";

    that.setData({
      currentOpType: 1,
      caculateNum: caculateNum,
      numList: numList,
      lastShow: lastShow,
      currentNum: currentNum
    })
    that.changeShow("×");
  },

  add: function () {
    var that = this;
    that.setData({
      addColor: '#8c2d2d',
    });
    that.initColor();
    // 1、将currentNum push到待运算数组numList中。先判断currentNum是否为空
    var currentNum = that.data.currentNum;
    var numList = that.data.numList;
    var lastShow = that.data.lastShow;
    lastShow = lastShow + currentNum;
    if (currentNum == "") {
      // 如果当前没有任何的数字，那么操作符就无法显示
      return;
    }
    else {
      numList.push(currentNum);
    }
    currentNum = "";
    that.setData({
      numList: numList,
      lastShow: lastShow,
      currentNum: currentNum
    })

    // 把前面计算的值放到caculatedList中，将calculateNum，resultNum初始化
    var resultNum = that.data.resultNum;
    var calculatedList = that.data.calculatedList;
    var opList = that.data.opList;
    var index = that.data.index;
    // 操作数组中 1代表+ 0代表-
    calculatedList[index] = resultNum;
    opList.push(1);

    console.log(calculatedList);
    console.log(opList);
    that.setData({
      resultNum: 0,
      caculateNum: 1,
      calculatedList: calculatedList,
      opList: opList,
      index: index + 1
    })

    that.changeShow("+");
  },

  sub: function () {
    var that = this;
    that.setData({
      subColor: '#8c2d2d',
      show: '0'
    });
    that.initColor();
    // 1、将currentNum push到待运算数组numList中。先判断currentNum是否为空
    var currentNum = that.data.currentNum;
    var numList = that.data.numList;
    var lastShow = that.data.lastShow;
    lastShow = lastShow + currentNum;
    if (currentNum == "") {
      // 如果当前没有任何的数字，那么操作符就无法显示
      return;
    }
    else {
      numList.push(currentNum);
    }
    currentNum = "";
    that.setData({
      numList: numList,
      lastShow: lastShow,
      currentNum: currentNum
    })

    // 把前面计算的值放到caculatedList中，将calculateNum，resultNum初始化
    var resultNum = that.data.resultNum;
    var calculatedList = that.data.calculatedList;
    var opList = that.data.opList;
    var index = that.data.index;
    // 操作数组中 1代表+ 0代表-
    calculatedList[index] = resultNum;
    opList.push(0);

    // console.log(calculatedList);
    // console.log(opList);
    that.setData({
      resultNum: 0,
      caculateNum: 1,
      calculatedList: calculatedList,
      opList: opList,
      index: index + 1
    })

    that.changeShow("-");
  },

  equal: function () {
    var that = this;
    that.setData({
      equalColor: '#8c2d2d',
    });
    that.initColor();
    // 计算结果：
    var calculatedList = that.data.calculatedList;
    var index = that.data.index;
    var resultNum = that.data.resultNum;
    var opList = that.data.opList;
    calculatedList[index] = resultNum;
    var result = that.calAll(calculatedList, opList);
    that.setData({
      isResult: true,
      result: "=" + result
    })
  },

  /**
   * 检验当前数字长度是否超过标准
   */
  checkNum: function (currentNum) {
    if (currentNum.indexOf(".") > -1) {
      if (currentNum.length >= 16) {
        return false;
      }
    }
    else {
      if (currentNum.length >= 15) {
        return false;
      }
    }

    return true;
  },

  /**
   * 计算当前的输入值
   */
  calCurNum: function (num, currentNum, type) {
    var that = this;
    currentNum = Number(currentNum);
    var result;
    //乘法
    if (type == 1) {
      result = num * currentNum;
    }
    // 除法
    else if (type == 0) {
      result = num / currentNum;
    }
    //console.log(result);
    that.setData({
      resultNum: result
    })
  },

  /**
   * 通过calculatedList[] 和 opList[] 来计算总值
   */
  calAll: function (calculatedList, opList) {
    // 先判断当前计算有无加减法操作
    var result = calculatedList[0];
    //    console.log(calculatedList);
    if (opList.length == 0) {
      // 暂时不做操作
    }
    // 由于opList 的长度必然比calculatedList的长度短1。可进行下面的操作:
    else {
      for (var i = 0; i < opList.length; i++) {
        // 加法操作：
        if (opList[i] == 1) {
          result = result + calculatedList[i + 1];
        }
        // 减法操作：
        else if (opList[i] == 0) {
          result = result - calculatedList[i + 1];
        }
      }
    }
    //console.log(result);
    return result;
  }
})