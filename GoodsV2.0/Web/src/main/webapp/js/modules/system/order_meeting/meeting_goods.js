//颜色尺码选择以及填库存
var stockItem = Vue.extend({
  name: 'stock-item',
  model: {
    prop: 'stockArray',
    event: 'stockDataChange'
  },
  data: function () {
    return {
      orderColorSelected: [],
      orderPlatformColor: [],
      setValueEvent: false
    }
  },
  methods: {
    remarkChange: function () {
      this.manageOrderPlatformStockTable();
    },
    orderPlatformSizeCheck: function () {
      this.manageOrderPlatformStockTable();
    },
    orderPlatformColorCheck: function () {
      this.manageOrderPlatformStockTable();
    },
    manageOrderPlatformStockTable: function () {
      var newStockTableData = [];
      for (var index = 0; index < this.orderPlatformColor.length; index++) {
        var indexColor = this.orderPlatformColor[index];
        for (var subIndex = 0; subIndex < this.orderPlatformSize.length; subIndex++) {
          var stockOne = {
            seq: indexColor.seq,
            code: indexColor.code,
            name: indexColor.name,
            showName: (subIndex === 0)
          };
          // console.log(stockOne);

          // 还原之前数据值
          var oldStock = this.findSameStock(indexColor.seq, stockOne.sizeSeq);
          if (oldStock) {
            stockOne.stock = oldStock.stock;
            if (oldStock.setStock) {
              stockOne.setStock = oldStock.setStock;
            }
          }
          newStockTableData.push(stockOne);
        }
      }

      this.setValueEvent = true;
      this.stockArray = newStockTableData;
      this.$emit('stockDataChange', this.stockArray);
    },
    findSameStock: function (seq, sizeSeq) {
      for (var oldIndex = 0; oldIndex < this.stockArray.length; oldIndex++) {
        var oldStock = this.stockArray[oldIndex];
        if (oldStock.seq == seq && oldStock.sizeSeq == sizeSeq) {
          return oldStock;
        }
      }
      return null;
    }
  },
  props: {
    colorArray: {type: Array, default: []},
    stockArray: {type: Array, default: []},
    changeStock: {type: Boolean, default: false}
  },
  watch: {
    stockArray: function (array) {
      if (array.length == 0 && !this.setValueEvent) {
        /*新增界面初始化*/
   
        this.orderSizeSelected = [];
        this.orderPlatformColor = [];
        this.orderPlatformSize = [];
        for (var i = 0; i < this.sizeArray.length; i++) {
          this.sizeArray[i].remark = "";
        }
        return;
      }
      if (this.setValueEvent) {
        this.setValueEvent = false;
        return;
      }
      if (array.length > 0 && array[0]["length"]) {
        return;
      }
      var stockObj = {}, sizeArray = [], sizeArray2 = [];
      for (var aIndex = 0; aIndex < array.length; aIndex++) {
        var oneStock = array[aIndex];
        var seqArray = stockObj[oneStock.seq];
        if (seqArray == null) {
          seqArray = [];
          stockObj[oneStock.seq] = seqArray;
        }
        seqArray.push(oneStock);

        var hasSize = -1;
        for (var sIndex = 0; sIndex < sizeArray.length; sIndex++) {
          if (sizeArray[sIndex].seq == oneStock.sizeSeq) {
            hasSize = sIndex;
            break;
          }
        }

        if (hasSize == -1) {
          var tIndex = 0;
          for (tIndex = 0; tIndex < this.sizeArray.length; tIndex++) {
            if (this.sizeArray[tIndex].seq == oneStock.sizeSeq) {
              this.sizeArray[tIndex].remark = oneStock.remark;
              break;
            }
          }
          sizeArray.push(this.sizeArray[tIndex]);
          sizeArray2.push(this.sizeArray[tIndex]);
        }
      }
      var resultArray = [], colorArray = [], colorArray2 = [];
      for (var keySeq in stockObj) {
        var stockArray = stockObj[keySeq];
        colorArray.push({seq: keySeq, name: stockArray[0].name, code: stockArray[0].code});
        colorArray2.push({seq: keySeq, name: stockArray[0].name, code: stockArray[0].code});

        stockArray[0].length = stockArray.length;
        stockArray[0].showName = true;

        for (var subIndex = 1; subIndex < stockArray.length; subIndex++) {
          stockArray[subIndex].showName = false;
        }
        resultArray = resultArray.concat(stockArray);
      }


      this.orderPlatformColor = colorArray2;
      this.orderSizeSelected = sizeArray;
      this.orderPlatformSize = sizeArray2;
      this.stockArray = resultArray;
    }
  },
  template: `
    <div>
       <!--颜色-->
      <div class="form-group">
       <div class="col-xs-2 control-label" style="text-align: left;">颜色</div>
      </div>
      <div class="form-group">
         <div class="col-xs-3" v-for="item in orderColorSelected">
          <div class="checkbox">
            <label>
             <input type="checkbox" :value="item" v-model="orderPlatformColor" @click="orderPlatformColorCheck">{{item.name}}({{item.code}})
           </label>
          </div>
        </div>
      </div>
    </div>
`,

});

$(function () {
	loadGoodsGrid();
});


function loadGoodsGrid() {
  $("#jqGrid").jqGrid({
    url: baseURL + 'system/meetingGoods/getGoodsList',
    datatype: "local",
    mtype: "POST",
    postData: {
      'meetingSeq': vm.meetingSeq,
      'keywords': vm.keywords
    },
    colModel: [ {label: '货号', name: 'goodID', width: 100, align: "center"},
    {label: '图片', name: 'img', width: 120, align: "center", formatter: function (cellvalue) {
          var detail = '<image src="' + cellvalue + '" style="width: 75px;height: 75px;"/>';
          return detail;
    	}
      },
      {label: '颜色', name: 'optionalColorNames', width: 100, align: "center"},
      {label: '最小尺码', name: 'minSize', width: 100, align: "center"},
      {label: '最大尺码', name: 'maxSize', width: 100, align: "center"},
      {label: '面料', name: 'surfaceMaterial', width: 100, align: "center"},
      {label: '里料', name: 'innerMaterial', width: 100, align: "center"},
      {label: '底料', name: 'soleMaterial', width: 100, align: "center"},
      {label: '大类', name: 'firstCategory', width: 100, align: "center"},
      {label: '小类', name: 'secondCategory', width: 100, align: "center"},
      {label: '风格', name: 'thirdCategory', width: 100, align: "center"},
      {label: '价格', name: 'price', width: 100, align: "center"},
      {label: '厂家', name: 'factory', width: 100, align: "center"},
      {label: '厂家货号', name: 'factoryGoodId', width: 100, align: "center"},
      {label: '供应价', name: 'factoryPrice', width: 100, align: "center"},
      {label: '入库时间', name: 'inputTime', width: 150, align: "center"},
      {
        label: '操作', name: 'createDate', width: 150, align: "center",
        formatter: function (cellvalue, options, rowObject) {
          var detail = '';
          detail += ('<button class="operation-btn-security" onclick="lineEdit(' + rowObject.seq + ')">修改</button>')
              + '&nbsp'
              + ('<button class="operation-btn-dangery" onclick="del(' + rowObject.seq + ')">删除</button>');
          return detail;
        }
      }],
    height: 'auto',
    rowNum: 10,
    rowList: [10, 30, 50],
    rownumbers: true,
    rownumWidth: 25,
    autowidth: true,
    multiselect: false,
//	    shrinkToFit:false,
//	    autoScroll: true,
    pager: "#jqGridPager",
    jsonReader: {
      root: "page.list",
      page: "page.currPage",
      total: "page.totalPage",
      records: "page.totalCount"
    },
    prmNames: {
      page: "page",
      rows: "limit",
      order: "order"
    },
    gridComplete: function () {
      // 隐藏grid底部滚动条
      $("#jqGrid").closest(".ui-jqgrid-bdiv").css({
        "overflow-x": "hidden"
      });
    }
  });
}

var setting = {
  data: {
    simpleData: {
      enable: true,
      idKey: "seq",
      pIdKey: "parentSeq",
      rootPId: -1
    },
    key: {
      url: "nourl"
    }
  },
  callback: {
//    onClick: categoryClick
  }
};
var ztree;

var vm = new Vue({
  el: '#rrapp',
  components: {
    'stockItem': stockItem
  },
  data: {
    colorArray: [],
    sizeArray: [],
    meetings: {},
    // 表格加载条件
    currentPeriodYear: '',
    meetingSeq: -1,
    selectPeriodName: '',
    SelectMeetingSeq:-1,
   selectMeetingName:'',
    //界面显示属性
    showList: true,
    title: '',

    //颜色、尺码、库存
    orderPlatformStock: [],
    onlineSaleStock: [],
  	meetingName:'',
    // 商品详情内容
    goodsDetail: {
    },
    keywords:'',
      categoryArray:[],
      colorList: [],
      selectColorSeq:"",
      searchVal:""
  },
  methods: {
    loadPeriod: function () {
      $.get(baseURL + "system/meetingGoods/meetings", function (r) {
        /*        if (isBlank(vm.currentPeriodYear)) {
                  for (var key in r.periods) {
                    vm.currentPeriodYear = key;
                    vm.periodSeq = r.periods[key][0].seq;
                    break;
                  }
                }*/
        vm.meetings = r.meetings;
        vm.reloadGoods(true);
      });
    },
      inputFunc:function(){
          if(this.searchVal.trim()){
              this.fuzzy_search(this.searchVal.trim());
          }
      },
      loadCategory: function () {
          // 加载分类树
          $.get(baseURL + "system/goodsCategory/list", function (r) {
              vm.categoryArray = r.list;
              vm.categoryArray.unshift({seq: -1, parentSeq: 0, name: "所有分类"})
            /*        var categorys = r.list;
             categorys.push({seq: 0, pIdKey: -1, name: "所有分类"});
             ztree = $.fn.zTree.init($("#categoryTree"), setting, categorys);
             ztree.expandAll(true);*/
          });
      },
      loadColor: function () {
          // 加载颜色
          $.get(baseURL + "system/goodsColor/alllist", function (r) {
              vm.colorList = r.list;
              $('.selectpicker').selectpicker('refresh');
              $('.selectpicker').selectpicker('render');
          });
      },
      addGoods: function () {
          var SelectMeetingSeq=vm.SelectMeetingSeq;
          if(SelectMeetingSeq==-1){
              alert("未选择订货会！");
              return false;
          }
          // 初始化参数
          vm.goodsDetail = {
              colorSeqs : ["","","","","","","",""],
              color1:0,
              color2:0,
              color3:0,
              color4:0,
              color5:0,
              color6:0,
              color7:0,
              color8:0
          };
          vm.goodsDetail.meetingSeq = vm.meetingSeq;
          vm.goodsDetail.meetingName = vm.meetingName;
          vm.goodsDetail.img = "";
          vm.showList = false;
          vm.title = '添加货品';
      },

      saveOrUpdateGoods:function () {
          var formData = goodsUploadValidator();
          if (!formData) {
              return;
          }
          var url = vm.goodsDetail.seq ? "system/meetingGoods/updateMeetingGoods" : "system/meetingGoods/insertMeetingGoods";
          parent.window.showLoading();
          $.ajax({
              type: "POST",
              url: baseURL + url,
              contentType: false,
              processData: false,
              enctype: 'multipart/form-data',
              data: formData,
              cache: false,
              success: function (r) {
                  if (r.code === 0) {
                      parent.window.hideLoading();
                      alert(r.msg, function () {
                          if (vm.goodsDetail.seq) {
                              vm.reloadGoods(false);
                          } else {
                              vm.reloadGoods(true);
                          }
                      });
                  } else {
                      parent.window.hideLoading();
                      alert(r.msg);
                  }
              },
              error: function () {
                  parent.window.hideLoading();
                  alert('服务器出错啦');
              }
          });
      },
    reloadGoods: function (toFirstPage) {
      vm.showList = true;
      if (!vm.meetingSeq) {
        return;
      }

      var p = 1;
      if (!toFirstPage) {
        p = $("#jqGrid").jqGrid('getGridParam', 'page');//获取当前页
      }

      setTimeout(function () {
        $("#jqGrid").jqGrid('setGridParam', {
          datatype: 'json',
          postData: {
            'meetingSeq': vm.meetingSeq,
          },
          page: p,
        }).trigger('reloadGrid');
      }, 500);
    },

    /*    periodSelect: function (key, item) {
          vm.currentPeriodYear = key;
          vm.periodSeq = item.seq;

          vm.reloadGoods(true);
        },*/
    periodSelect: function (item) {
      if (item == -1) {
        vm.meetingSeq = -1;
        vm.selectPeriodName = "所有订货会";
        vm.SelectMeetingSeq = -1;
        vm.selectMeetingName = "所有订货会";
      } else {
        vm.meetingSeq = item.seq;
        vm.selectPeriodName = item.name;
        vm.SelectMeetingSeq = item.seq;
        vm.selectMeetingName = item.name;
        vm.meetingName = item.name;
      }
    },    
    categorySelect: function (item) {
      vm.goodsDetail.categorySeq = item.seq;
      vm.goodsDetail = Object.assign({},vm.goodsDetail,{categoryName : item.name});
    },
    handleDetailFileChange: function (event) {
      var inputDOM = event.target;
      var files = event.target.files;
      for (var i = 0; i < files.length; i++) {
        if (files[i].size >= 10 * 1024 * 1024) {
          alert("文件超过10M啦！");
          return;
        }
      }

      randerImages(0, inputDOM, vm.goodsDetail.description);
    },
    handleBandFileChange: function (value) {
      var inputDOM = value.target;
      for (var fileSize = 0; fileSize < inputDOM.files.length; fileSize++) {
        var size = Math.floor(inputDOM.files[fileSize].size / 1024 / 1024);
        if (size > 10) {
          alert("文件超过10M啦！");
          return;
        }
      }
      var desImage = {file: inputDOM.files[0]};
      if (!desImage.file || !window.FileReader) return;
      if (/^image/.test(desImage.file.type)) {
        var reader = new FileReader();
        reader.readAsDataURL(desImage.file);
        reader.onloadend = function () {
          desImage.image = this.result;
          vm.goodsDetail = Object.assign({},vm.goodsDetail,{img : desImage.image,goodImg : desImage.file});
        }
      }
    },
    bannerDel : function () {
        vm.goodsDetail.img = "";
    },
    handleVideoFileChange: function (value) {
      var inputDOM = value.target;

      var size = Math.floor(inputDOM.files[0].size / 1024 / 1024);

      if (size > 20) {
        alert("文件超过20M啦！");
        return;
      }
      vm.goodsDetail.videoFile = inputDOM.files[0];
    },


    dragStartImage: function (index, event) {
      // console.log("moveImage:", index, event)
      var fromTarget = event.target;
      var imageType = fromTarget.parentNode.parentNode.id;
      // console.log("fromTarget:", fromTarget, imageType)
      event.dataTransfer.setData("fromIndex", index);
      event.dataTransfer.setData("fromType", imageType);
    },
    dragEnterImage: function (index, event) {
      // console.log("dragEnterImage:",index,event)
      //目标元素边框改为红色
      var toTarget = event.target;
      // console.log("改变相框颜色为红色")
      toTarget.parentNode.style.border = "1px solid red";
    },
    dragOverImage: function (index, event) {
      // console.log("dragOverImage:",index,event)
    },
    dragLeaveImage: function (index, event) {
      // console.log("dragLeaveImage:",index,event)
      // console.log("还原相框颜色")
      var toTarget = event.target;
      toTarget.parentNode.removeAttribute("style");
    },
    dropImage: function (index, event) {
      // console.log("dropImage:", index, event);
      var toTarget = event.target;
      var imageType = toTarget.parentNode.parentNode.id;
      // console.log("toTarget:", toTarget, imageType)

      var fromIndex = event.dataTransfer.getData("fromIndex");
      var fromType = event.dataTransfer.getData("fromType");

      //去除红色边框
      toTarget.parentNode.removeAttribute("style");

      //判断源对象和目标对象是否相同
      if (fromType == imageType && fromIndex != index) {
        //相同类型的不同图片进行排序操作
        // console.log("图片位置进行交换...")
        if (imageType == "bannerImages") {
          //轮播图
          swapArr(vm.goodsDetail.banner, fromIndex, index);
        } else {
          //描述图
          swapArr(vm.goodsDetail.description, fromIndex, index);
        }
      } else {
        //不同类型的图片或同类型索引相同的图片不进行操作
        // console.log("忽略不操作")
      }

    },
    search: function () {
      $("#jqGrid").jqGrid('setGridParam', {
        datatype: 'json',
        postData: {
          'meetingSeq': vm.meetingSeq,
          'keywords': vm.keywords,
        },
        page: 1,
      }).trigger('reloadGrid');
    },




    exportQRCode: function () {
      var form = document.getElementById('exportQRCodeForm');
      form.action = baseURL + "system/meetingGoods/exportQRCode";
      form.token.value = token;
      form.submit();
    },
      exportMeetingGoods: function () {
        var form = document.getElementById('exportMeetingGoodsForm');
        form.action = baseURL + "system/meetingGoods/exportMeetingGoods";
        form.token.value = token;
        form.meetingSeq.value = vm.meetingSeq;
        form.keywords.value = vm.keywords;
        form.submit();
    },
      exportMeetingGoodsRank: function () {
      if(vm.meetingSeq == -1) {
          alert("未选择订货会！");
          return;
      }
          var form = document.getElementById('exportMeetingGoodsRankForm');
          form.action = baseURL + "system/meetingGoods/exportMeetingGoodsRank";
          form.token.value = token;
          form.meetingSeq.value = vm.meetingSeq;
          form.submit();
      },
    exportWxQRCode: function () {
      var form = document.getElementById('exportQRCodeForm');
      form.action = baseURL + "system/meetingGoods/miniAppCode";
      form.token.value = token;
      form.submit();
    },
    uploadGoodsExcel: function () {
      parent.window.showLoading();
      var SelectMeetingSeq=vm.SelectMeetingSeq;
      if(SelectMeetingSeq==-1){
    	  alert("未选择订货会！");
    	  parent.window.hideLoading();
    	  return false;
      }
      // console.log(vm.SelectMeetingSeq);
      $('#goodsExcelForm').ajaxSubmit({
        url: baseURL + 'system/meetingGoods/uploadGoodsExcel',
        dataType: 'json',
        success: function (r) {
        	// console.log(r)
          if (r.code === 0) {
            alert(r.msg, function () {
            	location.reload();
              });
          } else {
            alert(r.msg);
          }
          $("#goodsExcelForm").resetForm();
          parent.window.hideLoading();
        },
        error: function (r) {
          alert("导入商品出错！");
          $("#goodsExcelForm").resetForm();
          parent.window.hideLoading();
        }
      });
    },
      putColor:function (seq,id) {
        if((vm.goodsDetail.colorSeqs[id - 2] == "" || vm.goodsDetail.colorSeqs[id - 2] == undefined)&& id != 1 && seq != 0 && seq != undefined) {
            alert("请先选择颜色" + (id - 1));
            if(id == 1) {
                vm.goodsDetail = Object.assign({},vm.goodsDetail,{color1 : ""});
                vm.goodsDetail.colorSeqs[0] = "";
                $('#select1').val("");
            }
            if(id == 2) {
                vm.goodsDetail = Object.assign({},vm.goodsDetail,{color2 : ""});
                vm.goodsDetail.colorSeqs[1] = "";
                $('#select2').val("");
            }
            if(id == 3) {
                vm.goodsDetail = Object.assign({},vm.goodsDetail,{color3 : ""});
                vm.goodsDetail.colorSeqs[2] = "";
                $('#select3').val("");
            }
            if(id == 4) {
                vm.goodsDetail = Object.assign({},vm.goodsDetail,{color4 : ""});
                vm.goodsDetail.colorSeqs[3] = "";
                $('#select4').val("");
            }
            if(id == 5) {
                vm.goodsDetail = Object.assign({},vm.goodsDetail,{color5 : ""});
                vm.goodsDetail.colorSeqs[4] = "";
                $('#select5').val("");
            }
            if(id == 6) {
                vm.goodsDetail = Object.assign({},vm.goodsDetail,{color6 : ""});
                vm.goodsDetail.colorSeqs[5] = "";
                $('#select6').val("");
            }
            if(id == 7) {
                vm.goodsDetail = Object.assign({},vm.goodsDetail,{color7 : ""});
                vm.goodsDetail.colorSeqs[6] = "";
                $('#select7').val("");
            }
            if(id == 8) {
                vm.goodsDetail = Object.assign({},vm.goodsDetail,{color8 : ""});
                vm.goodsDetail.colorSeqs[7] = "";
                $('#select8').val("");
            }
            return;
        }
        if(vm.goodsDetail.colorSeqs.indexOf(seq) > -1) {
          for(var i = 0;i < vm.colorList.length;i++) {
            if(vm.colorList[i].seq == seq) {
              alert(vm.colorList[i].name + "已存在,请重新选择");
              if(id == 1) {
                  vm.goodsDetail = Object.assign({},vm.goodsDetail,{color1 : ""});
                  vm.goodsDetail.colorSeqs[0] = "";
                  $('#select1').val("");
              }
              if(id == 2) {
                  vm.goodsDetail = Object.assign({},vm.goodsDetail,{color2 : ""});
                  vm.goodsDetail.colorSeqs[1] = "";
                  $('#select2').val("");
              }
              if(id == 3) {
                  vm.goodsDetail = Object.assign({},vm.goodsDetail,{color3 : ""});
                  vm.goodsDetail.colorSeqs[2] = "";
                  $('#select3').val("");
              }
              if(id == 4) {
                  vm.goodsDetail = Object.assign({},vm.goodsDetail,{color4 : ""});
                  vm.goodsDetail.colorSeqs[3] = "";
                  $('#select4').val("");
              }
              if(id == 5) {
                  vm.goodsDetail = Object.assign({},vm.goodsDetail,{color5 : ""});
                  vm.goodsDetail.colorSeqs[4] = "";
                  $('#select5').val("");
              }
              if(id == 6) {
                  vm.goodsDetail = Object.assign({},vm.goodsDetail,{color6 : ""});
                  vm.goodsDetail.colorSeqs[5] = "";
                  $('#select6').val("");
              }
              if(id == 7) {
                  vm.goodsDetail = Object.assign({},vm.goodsDetail,{color7 : ""});
                  vm.goodsDetail.colorSeqs[6] = "";
                  $('#select7').val("");
              }
              if(id == 8) {
                  vm.goodsDetail = Object.assign({},vm.goodsDetail,{color8 : ""});
                  vm.goodsDetail.colorSeqs[7] = "";
                  $('#select8').val("");
              }
              return;
            }
          }
        }
        if(id == 1) {
            vm.goodsDetail.colorSeqs[0] = seq;
        }
        if(id == 2) {
            vm.goodsDetail.colorSeqs[1] = seq;
        }
        if(id == 3) {
            vm.goodsDetail.colorSeqs[2] = seq;
        }
        if(id == 4) {
            vm.goodsDetail.colorSeqs[3] = seq;
        }
        if(id == 5) {
            vm.goodsDetail.colorSeqs[4] = seq;
        }
        if(id == 6) {
            vm.goodsDetail.colorSeqs[5] = seq;
        }
        if(id == 7) {
            vm.goodsDetail.colorSeqs[6] = seq;
        }
        if(id == 8) {
            vm.goodsDetail.colorSeqs[7] = seq;
        }
          $('.selectpicker').selectpicker('refresh');
          $('.selectpicker').selectpicker('render');
      }
  },
  created: function () {
    this.loadPeriod();
    this.loadCategory();
    this.loadColor();
  }
});
function randerImages(fileIndex, inputDOM, vmData) {
  if (fileIndex < inputDOM.files.length) {
    var desImage = {file: inputDOM.files[fileIndex]};
    if (!desImage.file || !window.FileReader) return;
    if (/^image/.test(desImage.file.type)) {
      var reader = new FileReader();
      reader.readAsDataURL(desImage.file);
      reader.onloadend = function () {
        desImage.image = this.result;
        vmData.push(desImage);
        /* if (fileIndex + 1 === inputDOM.files.length) {
           inputDOM.type = 'text';
           inputDOM.type = 'file';
         }*/
        randerImages(++fileIndex, inputDOM, vmData);
      }
    }
  }
}

function lineEdit(seq) {
  $.get(baseURL + "system/meetingGoods/selectBySeq?seq=" + seq, function (r) {
    $('.selectpicker').selectpicker('refresh');
    vm.goodsDetail = r.result;
    vm.showList = false;
    vm.title = "商品详情";
    $('#select1').val(r.result.color1);
    $('#select2').val(r.result.color2);
    $('#select3').val(r.result.color3);
    $('#select4').val(r.result.color4);
    $('#select5').val(r.result.color5);
    $('#select6').val(r.result.color6);
    $('#select7').val(r.result.color7);
    $('#select8').val(r.result.color8);
    $('.selectpicker').selectpicker('render');
  });
}

function del(id) {
  $.get(baseURL + "system/meetingGoods/delete?seq=" + id, function (r) {
	  if (r.code == 0) {
	        layer.msg("删除成功")
            vm.reloadGoods(false);
	      } else {
	        layer.alert(r.msg)
	      }
  });
}

/*function categoryClick() {
  var nodes = ztree.getSelectedNodes();
  if (nodes.length > 0) {
    var node = nodes[0];
    if (node.seq === -1) {
      vm.categorySeq = '';
    } else {
      vm.categorySeq = node.seq;
    }

    vm.reloadGoods(true);
  }
}*/



//ajax 方式提交form表单，导入素材压缩包
/*function uploadSourceZip() {
  var fileDir = $("#sourceZipFile").val();
  var suffix = fileDir.substr(fileDir.lastIndexOf("."));
  if ("" == fileDir) {
    alert("选择需要导入的压缩包文件！");
    return false;
  }
  if (".rar" != suffix && ".zip" != suffix) {
    alert("选择压缩包格式的文件导入！");
    return false;
  }

  $('#sourceZipForm').ajaxSubmit({
    url: baseURL + 'system/meetingGoods/uploadSourceZip',
    dataType: 'json',
    success: function (r) {
      if (r.code === 0) {
        alert(r.msg);
        $("#sourceZipFile").val("");
        vm.reloadGoods(true);
      } else {
        alert(r.msg);
        $("#sourceZipFile").val("");
      }
    },
    error: function (r) {
      alert("导入素材出错！");
      $("#sourceZipFile").val("");
    },
  });
}*/
document.getElementById('sourceZipFile').onchange = function(e) {
    var fileDir = $("#sourceZipFile").val();
    if ("" == fileDir) {
        alert("选择需要导入的文件夹！");
        return false;
    }
    var files = e.target.files;
    for(var i = 0;i < files.length;i++) {
      var name = files[i].name;
      var type = name.split(".")[1];
      if(type != "jpg") {
          alert("只能上传jpg格式的文件");
          return false;
      }
    }
    $('#sourceZipForm').ajaxSubmit({
        url: baseURL + 'system/meetingGoods/uploadSourceZip',
        dataType: 'json',
        success: function (r) {
            if (r.code === 0) {
                alert(r.msg);
                $("#sourceZipFile").val("");
                vm.reloadGoods(true);
            } else {
                alert(r.msg);
                $("#sourceZipFile").val("");
            }
        },
        error: function (r) {
            alert("导入素材出错！");
            $("#sourceZipFile").val("");
        },
    });
}
function exportImgs() {
  if(vm.meetingSeq == -1) {
    alert("请选择订货会");
    return;
  }
    var form = document.getElementById('exportMeetingGoodsImgForm');
    form.action = baseURL + "system/meetingGoods/downGoodImg";
    form.token.value = token;
    form.meetingSeq.value = vm.meetingSeq;
    form.submit();
}

/*对尺码大小进行排序    sizeArray*/
function sizeSortNumber(a, b) {
  var _a = parseInt(a.sizeName).toString();
  var _b = parseInt(b.sizeName).toString();
  if (_a == "NaN") {
    return 1;
  }
  if (_b == "NaN") {
    return -1;
  }
  return _a - _b;
}

function goodsUploadValidator() {
    var formData = new FormData();
    if (isBlank(vm.goodsDetail.goodID)) {
        alert("货号不能为空");
        return;
    }
    formData.append("goodID", vm.goodsDetail.goodID);

    formData.append("meetingSeq", vm.goodsDetail.meetingSeq);

    if (isBlank(vm.goodsDetail.minSize)) {
        alert("最小尺码不能为空");
        return;
    }
    if((isNaN(vm.goodsDetail.minSize) || typeof(parseInt(vm.goodsDetail.minSize)) != 'number') && vm.goodsDetail.minSize != "" && vm.goodsDetail.minSize != undefined) {
        alert("最小尺码为数字类型");
        return;
    }
    formData.append("minSize", vm.goodsDetail.minSize);

    if (isBlank(vm.goodsDetail.maxSize)) {
        alert("最大尺码不能为空");
        return;
    }
    if((isNaN(vm.goodsDetail.maxSize) || typeof(parseInt(vm.goodsDetail.maxSize)) != 'number') && vm.goodsDetail.maxSize != "" && vm.goodsDetail.maxSize != undefined) {
        alert("最大尺码为数字类型");
        return;
    }
    formData.append("maxSize", vm.goodsDetail.maxSize);
    if(vm.goodsDetail.maxSize <= vm.goodsDetail.minSize) {
        alert("最大尺码必须大于最小尺码");
        return;
    }

    if(isBlank(vm.goodsDetail.color1)){
        alert("颜色1不能为空");
        return;
    }
    formData.append("color1", vm.goodsDetail.color1);
    if(vm.goodsDetail.color2 != undefined) {
        formData.append("color2", vm.goodsDetail.color2);
    }
    if(vm.goodsDetail.color3 != undefined) {
        formData.append("color3", vm.goodsDetail.color3);
    }
    if(vm.goodsDetail.color4 != undefined) {
        formData.append("color4", vm.goodsDetail.color4);
    }
    if(vm.goodsDetail.color5 != undefined) {
        formData.append("color5", vm.goodsDetail.color5);
    }
    if(vm.goodsDetail.color6 != undefined) {
        formData.append("color6", vm.goodsDetail.color6);
    }
    if(vm.goodsDetail.color7 != undefined) {
        formData.append("color7", vm.goodsDetail.color7);
    }
    if(vm.goodsDetail.color8 != undefined) {
        formData.append("color8", vm.goodsDetail.color8);
    }
    if((isNaN(vm.goodsDetail.price) || typeof(parseInt(vm.goodsDetail.price)) != 'number') && vm.goodsDetail.price != "" && vm.goodsDetail.price != undefined) {
        alert("价格为数字类型");
        return;
    }
    if(vm.goodsDetail.price != undefined) {
        formData.append("price", vm.goodsDetail.price);
    }
    if(vm.goodsDetail.surfaceMaterial != undefined) {
        formData.append("surfaceMaterial", vm.goodsDetail.surfaceMaterial);
    }
    if(vm.goodsDetail.innerMaterial != undefined) {
        formData.append("innerMaterial", vm.goodsDetail.innerMaterial);
    }
    if(vm.goodsDetail.soleMaterial != undefined) {
        formData.append("soleMaterial", vm.goodsDetail.soleMaterial);
    }
    if(vm.goodsDetail.factory != undefined) {
        formData.append("factory", vm.goodsDetail.factory);
    }
    if(vm.goodsDetail.factoryGoodId != undefined) {
        formData.append("factoryGoodId", vm.goodsDetail.factoryGoodId);
    }
    if((isNaN(vm.goodsDetail.factoryPrice) || typeof(parseInt(vm.goodsDetail.factoryPrice)) != 'number') && vm.goodsDetail.factoryPrice != "" && vm.goodsDetail.factoryPrice != undefined) {
        alert("供应价为数字类型");
        return;
    }
    if(vm.goodsDetail.factoryPrice != undefined) {
        formData.append("factoryPrice", vm.goodsDetail.factoryPrice);
    }
    if(vm.goodsDetail.categorySeq != undefined) {
        formData.append("categorySeq", vm.goodsDetail.categorySeq);
    }
    if((isNaN(vm.goodsDetail.attention) || typeof(parseInt(vm.goodsDetail.attention)) != 'number') && vm.goodsDetail.attention != "" && vm.goodsDetail.attention != undefined) {
        alert("关注度为数字类型");
        return;
    }
    if(vm.goodsDetail.attention != undefined) {
        formData.append("attention", vm.goodsDetail.attention);
    }
    if((isNaN(vm.goodsDetail.orderQuantity) || typeof(parseInt(vm.goodsDetail.orderQuantity)) != 'number') && vm.goodsDetail.orderQuantity != "" && vm.goodsDetail.orderQuantity != undefined) {
        alert("订货量数字类型");
        return;
    }
    if(vm.goodsDetail.orderQuantity != undefined) {
        formData.append("orderQuantity", vm.goodsDetail.orderQuantity);
    }
    if(vm.goodsDetail.goodImg != undefined) {
        formData.append("goodImg", vm.goodsDetail.goodImg);
    }
    if (vm.goodsDetail.seq) {
        formData.append("seq", vm.goodsDetail.seq);
    }
    return formData;
}
