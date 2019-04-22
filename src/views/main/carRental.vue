<template>
  <div class="car-rental">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <p class="car-p">
            <span>热门:</span>
            <el-button type="success" size="mini" plain @click="getCarAll()">不限</el-button>
            <el-button type="success" size="mini" plain @click="getCarVehicleType('宝马')">宝马</el-button>
            <el-button type="success" size="mini" plain @click="getCarVehicleType('奔驰')">奔驰</el-button>
            <el-button type="success" size="mini" plain @click="getCarVehicleType('福特')">福特</el-button>
            <el-button type="success" size="mini" plain @click="getCarVehicleType('奥迪')">奥迪</el-button>
            <el-button type="success" size="mini" plain @click="getCarVehicleType('大众')">大众</el-button>
            <el-button type="success" size="mini" plain @click="getCarVehicleType('别克')">别克</el-button> 
            <el-button type="success" size="mini" plain @click="getCarVehicleType('丰田')">丰田</el-button>
            <el-button type="success" size="mini" plain @click="getCarVehicleType('雪弗莱')">雪弗莱</el-button>
            <el-button type="success" size="mini" plain @click="getCarVehicleType('保时捷')">保时捷</el-button>         
          </p>
        </div>
        <ul class="img-box clearfix" v-show="carRentalShow">
          <li v-for="(item,index) in pageData" :key="index">
            <p><img :src=item.vehiclePictures[0] alt="" @click="particulars(item.licensePlateNumber)"></p>
            <p class="car-type">{{item.vehicleType}} {{item.licensePlateNumber}} {{newAutoOrHand(item.autoOrHand)}}</p>
            <p class="car-price"><span>{{item.rented}}</span>元/天</p>
          </li>
        </ul>
        <div class="nodata-img" v-show="!carRentalShow"><img src="../../../static/img/timg.jpg" alt=""> </div>
        <div class="page">
          <Page :total="pantectTotalSize" :current=page :page-size="size" @on-change="changePage"/>      
        </div>
      </el-card>
      <Footer/>
    <div>
    </div>
  </div>
</template>

<script>
import Footer from '@/components/footer';
export default {
  components: {
        Footer
  },
  data() {
    return {
        carRentalShow:true,
        pantectTotalSize:0,
        page:1,
        size:20,
        pageData:[],
        imgData:[],
    }
  },
  created() {
    this.getCarAll();
  },
  computed: {
      /**
      * 封装进行状态修改的方法
      * @param {Object} obj 当前渲染的对象
      */
      newAutoOrHand(){
          return function(obj) {
              if(obj == 0){
                  return '手动挡';
              }
                else if (obj == 1) {
                  return '自动挡';
              }
          };
      },
  },
  methods: {
    particulars (licensePlateNumber) {
      // this.$Message.warning(licensePlateNumber);
      this.$router.push({
        name: '租车详情',
        params: {
            licensePlateNumber: licensePlateNumber
        }
      });
    },
    getCarAll () {
      this.page = 1;
      this.$axios.get('api/car/queryAllCarAndRented')
      .then(data => {
          if(data.data.code == 200){
            this.imgData = data.data.data || [];
            if (data.data.msg == '暂无相关数据') {
              this.carRentalShow = false;
              this.pantectTotalSize = 0;
              this.paging(this.imgData,this.page,this.size);
            }else {
              this.carRentalShow = true;
              this.pantectTotalSize = data.data.data.length;
              this.paging(this.imgData,this.page,this.size);
            }   
          }else {
              this.$Message.error(data.data.msg);
          }
      }); 
    },
    getCarVehicleType (vehicleType) {
      this.page = 1;
      const params = {
          vehicleType : vehicleType,
      };
      this.$axios
      .post('/api/car/queryAllCarByType',params)
      .then(data => {
        if (data.data.code == 200) {
            this.imgData = data.data.data || [];
          if (data.data.msg == '暂无该类型车辆相关数据') {
            this.$Message.warning(data.data.msg);
            this.carRentalShow = false;
            this.pantectTotalSize = 0;
            this.paging(this.imgData,this.page,this.size);
          }else {
            this.carRentalShow = true;
            this.pantectTotalSize = data.data.data.length;
            this.paging(this.imgData,this.page,this.size);
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
    },
    // 改变page
    changePage (val) {
        this.page = val;
        this.paging (this.imgData,this.page,this.size);
    },
  },
}
</script>

<style lang="less" scoped>
.car-rental {
  margin: 0 50px;
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .car-p {
    span {
      margin-right: 5px;
    }
  }
  .img-box {
    li {
      float: left;
      list-style: none;
      margin-right: 1%;
      width: 24%;
      height: 290px;
      p{
          margin-bottom: 10px;
        img {
          width: 100%;
          height: 200px;
          cursor: pointer;
        }
      }
    }
    .car-type {
      font-size: 14px;
      // font-weight: 700;
    }
    .car-price {
      color: red;
      font-size: 14px;
      span {
        font-weight: 800;
      }
    }
  }
  .page {
    text-align: center;
  }
}
.nodata-img {
    width: 300px;
    img {
        width: 300px;
    }
}
</style>
