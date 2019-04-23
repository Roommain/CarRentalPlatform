<template>
    <div class="update-carrental">
        <Table stripe :loading="loading" :columns="columns" :data="pageData" :height="tableHeight"  @on-row-click="clickrow"></Table>
        <div class="page">
            <Page :total="pantectTotalSize" :current=page :page-size="size" @on-change="changePage" @on-page-size-change="changeSize" show-elevator show-sizer show-total/>
        </div>
        <Modal
            v-model="modal"
            title="车主车辆审核"
            width=700
            :draggable="true"
            :footer-hide="true">
            <div class="clearfix">
                <el-form ref="carData" class="modal-form" :model="carData" label-width="80px">
                    <el-form-item label="车牌号:" prop="licensePlateNumber">
                        <p>{{carData.licensePlateNumber}}</p>
                    </el-form-item>
                    <el-form-item label="城市:" prop="city">
                        <p>{{carData.city}}</p>
                    </el-form-item>
                    <el-form-item label="车龄:" prop="carYear">
                        <p>{{carData.carYear}}</p>
                    </el-form-item>
                    <el-form-item label="用油类型:" prop="gasolineType">
                        <p>{{carData.gasolineType}}</p>
                    </el-form-item>
                    <el-form-item label="核载人数:" prop="chairNumber">
                        <p>{{carData.chairNumber}}</p>
                    </el-form-item>
                    <el-form-item label="车辆描述:" prop="vehicleDescription">
                        <p>{{carData.vehicleDescription}}</p>
                    </el-form-item>
                    <el-form-item label="备注:" prop="vehicleRemark">
                        <p>{{carData.vehicleRemark}}</p>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitUpdate('1')" style="width:120px">通过</el-button>
                        <el-button type="primary" @click="submitUpdate('0')" style="width:120px">不通过</el-button>
                    </el-form-item>
                </el-form>
                <div class="modal-img">
                    <img :src=carData.vehiclePictures[0] alt="">
                    <img :src=carData.vehiclePictures[1] alt="">
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
  data() {
    return {
        modal:false,
        carData:{
            licensePlateNumber:'',
            city:'',
            carYear:'',
            gasolineType:'',//车油93，97
            vehicleDescription:'',//车辆描述
            vehicleRemark:'',//用车备注
            vehiclePictures:['',''],
        },
        licensePlateNumberArr:[],
        loading: true,//是否加载状态
        tableHeight: '',//table高度
        pageData:[],//分页数据
        pantectTotalSize: 0,//总数据
        page:1,
        size:20,
        columns: [
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
            title: '核载人数',
            key: 'chairNumber',
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
    }
  },
  created() {
    this.getCarData();
  },
  methods:{
    getCarData () {
        this.$axios.get('api/authentication/findAllCarInfoPreprocess')
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
    clickrow (index) {
        this.modal = true;
        this.carData = index;
    },
    submitUpdate (result) {
        const params = {
          carYear : this.carData.carYear,
          displacement : this.carData.displacement,
          vehicleType : this.carData.vehicleType,
          autoOrHand : this.carData.autoOrHand,
          chairNumber : this.carData.chairNumber,
          gasolineType : this.carData.gasolineType,
          licensePlateNumber : this.carData.licensePlateNumber,
          city : this.carData.city,
          vehicleDescription : this.carData.vehicleDescription,
          vehicleRemark : this.carData.vehicleRemark,  
          result : result, 
          carOwner: this.carData.carOwner,
        };
        this.$axios
            .post('/api/car/examineUserCar',params)
            .then(data => {
                if (data.data.code == '200') {
                    this.$Message.success(data.data.msg);
                    this.getCarData();
                    this.modal = false;
                }else {
                    this.$Message.error('审核失败');
                }
            }).catch(() => {
                this.$Message.error('审核失败');
                return;
            });
    }
  },
}
</script>

<style  lang="less">
.page {
    margin-top: 10px;
    text-align: center;
}
.user-message .user-view .user-main-view {
    padding: 22px 0 22px 0;
}
.modal-form {
    width: 400px;
}
.modal-img {
    width: 250px;
    img {
        width: 250px;
        height: 150px;
    }
}
.modal-img,.modal-form {
    float: left;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>