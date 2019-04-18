<template>
  <div class="add-carrental">
      <el-form ref="carrentalData" status-icon :rules="rules" :model="carrentalData" label-width="120px">
          <el-form-item label="品牌" prop="vehicleType">
                <el-select v-model="carrentalData.vehicleType" placeholder="请选择品牌" style="width:300px">
                  <el-option
                    v-for="item in brandOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="排量" prop="displacement">
                <el-select v-model="carrentalData.displacement" placeholder="请选择排量" style="width:300px">
                  <el-option
                    v-for="item in displacementOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="自动手动型" prop="autoOrHand">
                <el-select v-model="carrentalData.autoOrHand" placeholder="请选择自动手动型" style="width:300px">
                  <el-option
                    v-for="item in autoOrHandOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="汽车用油" prop="gasolineType">
                <el-select v-model="carrentalData.gasolineType" placeholder="请选择汽车用油型号" style="width:300px">
                  <el-option
                    v-for="item in gasolineTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="车牌号" prop="licensePlateNumber">
            <el-input v-model="carrentalData.licensePlateNumber" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="车龄" prop="carYear">
            <el-input v-model="carrentalData.carYear" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="核载人数" prop="chairNumber">
            <el-input v-model="carrentalData.chairNumber" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-input v-model="carrentalData.city" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="车辆描述" prop="vehicleDescription">
            <el-input type="textarea" v-model="carrentalData.vehicleDescription" style="width:500px;"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="vehicleRemark">
            <el-input type="textarea" v-model="carrentalData.vehicleRemark" style="width:500px;"></el-input>
          </el-form-item>
          <el-form-item label="车子图片" prop="file">
            <el-upload
              :multiple="true"
              :data="carrentalData"
              action=""
              :auto-upload=false
              :on-change="onchange"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('carrentalData')">录入数据</el-button>
            <el-button @click="resetForm('carrentalData')">重置</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      doUpload:false,
      carrentalData:{
        chairNumber:'',//核载人数
        vehicleType:'',//车型
        autoOrHand:'',//手动自动（0，1）
        licensePlateNumber:'',//车牌号
        carYear:'',//车龄
        gasolineType:'',//车油93，97
        city:'',//城市
        vehicleDescription:'',//车辆描述
        vehicleRemark:'',//用车备注
        displacement:'',//排量
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
      autoOrHandOptions:[{
        value: '0',
        label: '手动挡'
      },{
        value: '1',
        label: '自动挡'
      }],
      gasolineTypeOptions:[{
        value: '93',
        label: '93'
      },{
        value: '97',
        label: '97'
      }],
      rules: {
        vehicleType: [
          { required: true, message: '请选择品牌', trigger: 'change' },
        ],
        displacement: [
          { required: true, message: '请选择排量', trigger: 'change' }
        ],
        autoOrHand: [
          { required: true, message: '请选择车子挡型', trigger: 'change' }
        ],
        licensePlateNumber: [
          { required: true, message: '请输入车牌号', trigger: 'change' }
        ],
        carYear: [
          { required: true, message: '请输入车龄', trigger: 'change' },
        ],
        chairNumber: [
          { required: true, message: '请输入核载人数', trigger: 'change' },
        ],
        gasolineType: [
          { required: true, message: '请选择用油类型', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请输入城市', trigger: 'change' }
        ],
        vehicleDescription: [
          { required: true, message: '请输入车辆描述', trigger: 'change' }
        ],
        vehicleRemark: [
          { required: true, message: '请输入用车备注', trigger: 'change' }
        ],
        file: [
          { required: true, message: ' '}
        ],
      }
    }
  },
  methods: {
      submitForm(carrentalData) {
        if (this.doUpload) {
        this.rules.file = []
        }
        this.$refs[carrentalData].validate((valid) => {
          if (valid) {
              this.param.append('vehicleType', this.carrentalData.vehicleType);
              this.param.append('displacement', this.carrentalData.displacement);
              this.param.append('autoOrHand', this.carrentalData.autoOrHand);
              this.param.append('licensePlateNumber', this.carrentalData.licensePlateNumber);
              this.param.append('carYear', this.carrentalData.carYear);
              this.param.append('gasolineType', this.carrentalData.gasolineType);
              this.param.append('city', this.carrentalData.city);
              this.param.append('vehicleDescription', this.carrentalData.vehicleDescription);
              this.param.append('vehicleRemark', this.carrentalData.vehicleRemark);
              this.param.append('chairNumber', this.carrentalData.chairNumber);
              let config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              };
              this.$axios.post("/api/car/insertOne", this.param, config)
              .then(data => {
                if (data.data.code == '200') {
                  this.$Message.success(data.data.msg);
                }else {
                  this.$Message.error(data.data.msg);
                }
              })
          } else {
            this.$Message.error('请检查必填项');
          }
        });
      },
      resetForm(carrentalData) {
        this.$refs[carrentalData].resetFields();
      },
      onchange(file,filesList) {
				//创建临时的路径来展示图片
				var windowURL = window.URL || window.webkitURL;
				this.src=windowURL.createObjectURL(file.raw);
				//重新写一个表单上传的方法
        this.param = new FormData();
        this.doUpload = true;
        // this.param.append('file', file.raw, file.name);
        for(var i = 0;i<filesList.length;i++) {
          this.param.append('file', filesList[i].raw, filesList[i].name);
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
