<template>
  <div class="owner">
    <div class="owner-img">
        <div>
            <img src="../../assets/carimg/owner_text01.15be5b89.png" alt="">
        </div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>上传爱车信息马上为你赚钱</span>
            </div>
            <div>
                <el-form :label-position="labelPosition" label-width="80px">
                    <el-form-item label="品牌">
                          <el-select v-model="brandValue" placeholder="请选择品牌" style="width:275px" @change="selectChange">
                            <el-option
                              v-for="item in brandOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                    </el-form-item>
                    <el-form-item label="排量">
                          <el-select v-model="displacementValue" placeholder="请选择排量" style="width:275px" @change="selectChange">
                            <el-option
                              v-for="item in displacementOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="clearfix">
              <p class="earnings">预计收益：<span>{{moneyValue}}</span>/天</p>
            </div>
            <!-- <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div> -->
        </el-card>
    </div>
    <div class="safeguard">
      <p class="title">车主保障</p>
      <ul>
        <li>
          <h4>提供全方位保障</h4>
          <p>保障包含车损保障及盗抢保障150万</p>
          <p>第三者责任保障100万和座位保障5万</p>
          <p>租客保障均独立购买，不影响车辆原有商业险</p>
        </li>
        <li>
        <li>
          <h4>严格的认证制度</h4>
          <p>在交易前累计扣分不超过11分</p>
          <p>车主对租客具有完备的评价体系，且时时更新</p>
        </li>
        <li>
          <h4>全方位定位系统，租车全程尽在掌控</h4>
          <p>为所有车辆安装凹凸租车智能车联网全方位终端</p>
          <p>精准定位车辆，随时掌控车辆信息</p>
          <p>行程全掌握，爱车共享无忧</p>
        </li>
      </ul>
    </div>
    <Footer/>
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
            moneyValue: '0',
            labelPosition: 'right',
            // 品牌
            brandOptions: [{
              value: '宝马',
              label: '宝马'
            }, {
              value: '奔驰',
              label: '奔驰'
            }, {
              value: '别克',
              label: '别克'
            }, {
              value: '雪弗莱',
              label: '雪弗莱'
            }, {
              value: '丰田',
              label: '丰田'
            }, {
              value: '奥迪',
              label: '奥迪'
            }, {
              value: '福特',
              label: '福特'
            }, {
              value: '保时捷',
              label: '保时捷'
            }, {
              value: '大众',
              label: '大众'
            }],
            // 排量
            displacementOptions: [{
              value: '1.0',
              label: '1.0L'
            }, {
              value: '1.1',
              label: '1.1L'
            }, {
              value: '1.2',
              label: '1.2L'
            }, {
              value: '1.3',
              label: '1.3L'
            }, {
              value: '1.4',
              label: '1.4L'
            }, {
              value: '1.5',
              label: '1.5L'
            }, {
              value: '1.6',
              label: '1.6L'
            }, {
              value: '1.7',
              label: '1.7L'
            }, {
              value: '1.8',
              label: '1.8L'
            }],
            brandValue: '',
            displacementValue: '',
            }
    },
    methods: {
      selectChange () {
        const params = {
            vehicleType : this.brandValue,
            displacement : this.displacementValue
        };
        this.$axios
            .post('api/vehicleTypeRented/selectOne',params)
            .then(data => {
                if (data.data.code == 200 && data.data.msg == "暂无相关数据") {
                  this.moneyValue = 0;
                }else if (data.data.code == 200 && data.data.msg == "成功") {
                  this.moneyValue = data.data.data.profit;
                }else {
                  this.$Message.error(data.data.msg);
                }
            }).catch(() => {
                this.$Message.error('获取失败');
                return;
            });
      },
    },
}
</script>

<style lang="less" scoped>
.owner {
  width: 100%;
  .owner-img {
    position: relative;
    width: 100%;
    height: 520px;
    background: url('../../assets/carimg/banner.c5e07275.jpg');
    img{
        position: absolute;
        left: 100px;
        top: 100px;
        width: 400px;
    }
  }
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

  .box-card {
    position: absolute;
    right: 100px;
    top: 50px;
    width: 400px;
  }
  .earnings {
    float: right;
    font-size: 16px;
    span {
      color: red;
      font-size: 24px;
    }
  }
  .safeguard {
    width: 100%;
    height: 240px;
    margin: auto;
    text-align: center;
    font-size: 16px;
    background-color: #f5f5f5;
    .title {
      padding-top: 20px;
      font-size: 24px;
    }
    ul li {
      float: left;
      list-style: none;
      width: 30%;
      line-height: 30px;
      margin-left: 2%;
      font-size: 13px;
      color: #999;
      h4 {
        text-align: center;
        color: #333;
        font-size: 20px;
        padding: 20px 0 10px;
      }
    }
  }
}
</style>