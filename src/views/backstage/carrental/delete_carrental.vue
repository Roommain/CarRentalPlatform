<template>
  <div class="delete-carrental">
    <div class="batch">
        <Button type="warning" @click="batchButton()">批量删除</Button> 
    </div>
    <Table stripe :loading="loading" :columns="columns" :data="pageData" :height="tableHeight" @on-selection-change="getassessments"></Table>
    <div class="page">
        <Page :total="pantectTotalSize" :current=page :page-size="size" @on-change="changePage" @on-page-size-change="changeSize" show-elevator show-sizer show-total/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        licensePlateNumberArr:[],
        loading: true,//是否加载状态
        tableHeight: '',//table高度
        pageData:[],//分页数据
        pantectTotalSize: 0,//总数据
        page:1,
        size:20,
        columns: [
        {
            type: 'selection',
            width: 30,
            align: 'center'
        },
        {
            type: 'index',
            title: '序号',
            width: 70,
            align: 'center'
        },
        {
            title: '品牌车型',
            key: 'vehicleType',
            align: 'center',
            ellipsis:true,
            tooltip:true,
        },
        {
            title: '汽车排量',
            key: 'displacement',
            align: 'center',
            ellipsis:true,
            tooltip:true,
            render: (h, params) => {
                return h('div', [
                    params.row.displacement + 'L'
                ]);
            }
        },
        {
            title: '车牌号',
            key: 'licensePlateNumber',
            align: 'center',
            tooltip:true,
        },
        {
            title: '地区',
            key: 'city',
            align: 'center',
            tooltip:true,
        },
        {
            title: '车型',
            key: 'autoOrHand',
            align: 'center',
            tooltip:true,
            render: (h, params) => {
                return h('div', [
                    params.row.autoOrHand === 0 &&  h(
                        'span',
                        {
                            props: {
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px',
                                color: '#2d8cf0'
                            },
                        },
                        '手动档' 
                    ),
                    params.row.autoOrHand === 1 &&  h(
                        'span',
                        {
                            props: {
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px',
                                color: 'green'
                            },
                        },
                        '自动档' 
                    ),
                ]);
            }
          },
      ],
      data: [
        {
          autoOrHand: 0,
          carOwner: "root",
          carYear: 3,
          chairNumber: 0,
          city: "重庆",
          displacement: 1,
          displayType: 0,
          gasolineType: 93,
          licensePlateNumber: "渝A22312",
          vehicleDescription: "撒大苏打",
          vehiclePictures: "/home/car/root_渝A22312_0.jpg,/home/car/root_渝A22312_1.jpg",
          vehicleRemark: "飞洒发",
          vehicleType: "宝马"
        },
      ],
    }
  },
  created() {
    this.getCarData();
  },
  methods:{
    getCarData () {
        this.$axios.get('api/car/queryAll')
        .then(data => {
            this.loading = false;
            if(data.data.code == 200){
              console.log(data);
              if (data.data.msg == '暂无相关数据') {
                  this.data = data.data.data || [];
                  this.pantectTotalSize = 0;
                  this.paging(this.data,this.page,this.size);
              }else {
                  this.data = data.data.data || [];
                  this.pantectTotalSize = data.data.data.length;
                  this.paging(this.data,this.page,this.size);
              }
            }else {
                this.$Message.error(data.data.msg);
            }
        }); 
    },
    batchButton() {
      this.$axios.post('api/car/deleteOneOrBatch',this.licensePlateNumberArr)
          .then(data => {
              // console.log(data);
              if(data.data.code == 200){
                  this.getCarData();
                  this.$Message.success(data.data.msg);
              }else {
                  this.$Message.error(data.data.msg);
              }
          });   
    },
    // 控制表分页
    paging (number,page,size) {
        var startIndex = (page-1) * size;
        var endIndex = page * size;
        this.pageData = number.slice(startIndex,endIndex);
        if(this.pageData.length > 10){
            this.tableHeight = 520;
        }else{
            this.tableHeight = 0;
        }
    },
    // 改变page
    changePage (val) {
        this.page = val;
        this.paging (this.data,this.page,this.size);
    },
    //改变size
    changeSize (val) {
        this.size = val;
        this.paging (this.data,this.page,this.size);
    },
    getassessments (value) {
        this.licensePlateNumberArr = [];
        value.forEach(item => {
            this.licensePlateNumberArr.push(item.licensePlateNumber);
        });
        console.log(this.licensePlateNumberArr);
    }
  },
}
</script>

<style  lang="less">
.batch {
    margin-bottom: 10px;
    text-align: right;
}
.page {
    margin-top: 10px;
    text-align: center;
}
.user-message .user-view .user-main-view {
    padding: 22px 0 22px 0;
}
</style>