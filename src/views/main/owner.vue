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
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                    <el-form-item label="名称">
                        <el-input v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域">
                        <el-input v-model="formLabelAlign.region"></el-input>
                    </el-form-item>
                    <el-form-item label="活动形式">
                        <el-input v-model="formLabelAlign.type"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <!-- <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div> -->
        </el-card>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            labelPosition: 'right',
            formLabelAlign: {
                name: '',
                region: '',
                type: '',
            }
        }
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
    width: 450px;
  }
}
</style>