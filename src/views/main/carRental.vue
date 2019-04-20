<template>
  <div class="car-rental">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <p class="car-p">
            <span>热门:</span>
            <el-button type="success" size="mini" plain>不限</el-button>
            <el-button type="success" size="mini" plain>宝马</el-button>
            <el-button type="success" size="mini" plain>奔驰</el-button>
            <el-button type="success" size="mini" plain>福特</el-button>
            <el-button type="success" size="mini" plain>奥迪</el-button>
            <el-button type="success" size="mini" plain>大众</el-button>
            <el-button type="success" size="mini" plain>别克</el-button> 
            <el-button type="success" size="mini" plain>丰田</el-button>
            <!-- <el-button type="success" size="mini" plain>本田</el-button> -->
            <el-button type="success" size="mini" plain>雪弗莱</el-button>
            <el-button type="success" size="mini" plain>保时捷</el-button>         
          </p>
        </div>
        <ul class="img-box clearfix">
          <li v-for="(item,index) in imgData" :key="index">
            <p><img :src=item.src alt="" @click="particulars()"></p>
            <p class="car-type">{{item.type}}</p>
            <p class="car-price"><span>{{item.price}}</span>元/天</p>
          </li>
        </ul>
        <div class="page">
          <el-pagination
            small
            layout="prev, pager, next"
            :total="80">
          </el-pagination>         
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
        imgData:[
            {src:'../../../static/img/car1.01eb86f8.png',type:'本田 CR-V 2.4L 自动挡',price:'200'},
            {src:'../../../static/img/car2.4286778f.png',type:'本田 CR-V 2.4L 自动挡',price:'300'},
            {src:'../../../static/img/car3.b2f7e8e6.png',type:'本田 CR-V 2.4L 自动挡',price:'400'},    
            {src:'../../../static/img/car3.b2f7e8e6.png',type:'本田 CR-V 2.4L 自动挡',price:'500'},
            {src:'../../../static/img/car4.91dccff8.png',type:'本田 CR-V 2.4L 自动挡',price:'200'},
            {src:'../../../static/img/car1.01eb86f8.png',type:'本田 CR-V 2.4L 自动挡',price:'200'},
            {src:'../../../static/img/car2.4286778f.png',type:'本田 CR-V 2.4L 自动挡',price:'300'},
            {src:'../../../static/img/car3.b2f7e8e6.png',type:'本田 CR-V 2.4L 自动挡',price:'400'},
            {src:'../../../static/img/car3.b2f7e8e6.png',type:'本田 CR-V 2.4L 自动挡',price:'500'},
            {src:'../../../static/img/car4.91dccff8.png',type:'本田 CR-V 2.4L 自动挡',price:'200'},
            {src:'../../../static/img/car1.01eb86f8.png',type:'本田 CR-V 2.4L 自动挡',price:'200'},
            {src:'../../../static/img/car2.4286778f.png',type:'本田 CR-V 2.4L 自动挡',price:'300'},
            {src:'../../../static/img/car3.b2f7e8e6.png',type:'本田 CR-V 2.4L 自动挡',price:'400'},
            {src:'../../../static/img/car3.b2f7e8e6.png',type:'本田 CR-V 2.4L 自动挡',price:'500'},
            {src:'../../../static/img/car4.91dccff8.png',type:'本田 CR-V 2.4L 自动挡',price:'600'},
            {src:'../../../static/img/car4.91dccff8.png',type:'本田 CR-V 2.4L 自动挡',price:'200'},
            {src:'../../../static/img/car1.01eb86f8.png',type:'本田 CR-V 2.4L 自动挡',price:'200'},
            {src:'../../../static/img/car2.4286778f.png',type:'本田 CR-V 2.4L 自动挡',price:'300'},
            {src:'../../../static/img/car3.b2f7e8e6.png',type:'本田 CR-V 2.4L 自动挡',price:'400'},
            {src:'../../../static/img/car3.b2f7e8e6.png',type:'本田 CR-V 2.4L 自动挡',price:'500'},
        ]
    }
  },
  methods: {
    particulars () {
      this.$Message.warning('暂无信息');
    }
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
          height: 100%;
          cursor: pointer;
        }
      }
    }
    .car-type {
      font-size: 18px;
      font-weight: 700;
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
</style>
