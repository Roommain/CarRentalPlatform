<template>
  <div class="add-ass">
      <el-form ref="assessData" status-icon :rules="rules" :model="assessData" label-width="80px">
          <el-form-item label="品牌" prop="vehicleType">
                <el-select v-model="assessData.vehicleType" placeholder="请选择品牌" style="width:300px">
                  <el-option
                    v-for="item in brandOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="排量" prop="displacement">
                <el-select v-model="assessData.displacement" placeholder="请选择排量" style="width:300px">
                  <el-option
                    v-for="item in displacementOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="租金" prop="rented">
            <el-input v-model="assessData.rented" style="width:300px"></el-input><span class="day">/ 天</span>
          </el-form-item>
          <el-form-item label="收益" prop="profit">
            <el-input v-model="assessData.profit" style="width:300px"></el-input><span class="day">/ 天</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('assessData')">录入数据</el-button>
            <el-button @click="resetForm('assessData')">重置</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assessData:{
        vehicleType:'',
        displacement:'',
        rented:'',
        profit:'',
      },
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
      rules: {
        vehicleType: [
          { required: true, message: '请选择品牌', trigger: 'change' },
        ],
        displacement: [
          { required: true, message: '请选择排量', trigger: 'change' }
        ],
        rented: [
          { required: true, message: '请输入租金', trigger: 'change' }
        ],
        profit: [
          { required: true, message: '请输入收益', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
      submitForm(assessData) {
        this.$refs[assessData].validate((valid) => {
          if (valid) {
            this.$axios
                .post('/api/vehicleTypeRented/insertOne',this.assessData)
                .then(data => {
                  this.$Message.success(data.data.msg);
                  // this.resetForm(assessData);
                }).catch(() => {
                  this.$Message.error('获取失败');
                  return;
                });
          } else {
            return false;
          }
        });
      },
      resetForm(assessData) {
        this.$refs[assessData].resetFields();
      }
  }
}
</script>

<style  lang="less">
.add-ass{
  .day {
    font-size: 18px;
    margin-left: 5px;
  }
}
.user-message .user-view .user-main-view {
    padding: 22px 0 22px 0;
}
</style>
