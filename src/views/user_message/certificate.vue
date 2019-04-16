<template>
    <div class="certificate">
      <el-tabs type="border-card" class="tabs" v-model="activeName">
        <el-tab-pane name="0" label="身份证">
          <Form class="form" ref="formInline" v-show="formShow" :model="formInline" :rules="ruleInline" inline>
              <FormItem prop="name">
                  <Input type="text" size="large" v-model="formInline.name" placeholder="姓名" style="width: 400px">
                  </Input>
              </FormItem>
              <br>
              <FormItem prop="idCard">
                  <Input type="text" size="large" v-model="formInline.idCard" placeholder="身份证号码" style="width: 400px">
                  </Input>
              </FormItem>
              <br>
              <FormItem>
                  <Button class="login-button" size="large" type="primary" @click="handleSubmit('formInline')" style="width: 400px">提交认证</Button>
              </FormItem>
          </Form>
          <div v-show="!formShow">
            <p class="identity">身份证认证成功</p>
            验证的身份证为：{{idCard}}
          </div>
        </el-tab-pane>
        <!-- 租客驾驶证 -->
        <el-tab-pane name="1" label="租客驾驶证">
          <div v-show="!tenantShow">
            <p class="identity">提交成功，等待审核中...</p>
          </div>
          <el-form ref="form" v-show="tenantShow" :model="form" label-width="80px">
            <label class="el-form-item__label" style="width: 80px;">上传图片</label>
            <!--elementui的上传图片的upload组件-->
            <!--
              :auto-upload=false  // 取消自动上传
              :on-remove="handleRemove" // 处理删除图片的操作
              :on-change="onchange" // 通过onchange这个属性来获取现在的图片和所有准备上传的图片
              :limit=1 // 限制只能上传一张，这里暂时只考虑一张图片的情况
              drag // 设置这个让可以把图片拖进来上传
              action="" // 这里暂时不设置上传地址，因为我们是要拦截在form中上传
              -->
            <el-upload
              class="upload-demo"
              :multiple="true"
              action=""
              :auto-upload=false
              :on-change="onchange"
              :on-remove="handleRemove"
              :on-preview="handlePreview"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-form-item style="padding-top:20px;">
              <el-button type="primary" @click="onSubmit">提交认证</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 车主行驶证 -->
        <el-tab-pane name="2" label="车主行驶证">
          <div v-show="!ownerShow">
            <p class="identity">提交成功，等待审核中...</p>
          </div>
          <el-form v-show="ownerShow" ref="form" :model="form" label-width="80px">
            <label class="el-form-item__label" style="width: 80px;">上传图片</label>
            <el-upload
              class="upload-demo"
              :multiple="true"
              action=""
              :auto-upload=false
              :on-change="onchange"
              :on-remove="handleRemove"
              :on-preview="handlePreview"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-form-item style="padding-top:20px;">
              <el-button type="primary" @click="onSubmit">提交认证</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>/>

<script>
  export default {
    data() {
        return {
          activeName: '0',
          formShow: true,
          tenantShow: true,
          ownerShow: true,
          idCard: '',
          isIdCard: 0,
          isTenant: 0,
          isVehicleOwner: 0,
          form: {
            purpose: 'tenant'
          },
          formInline: {
              idCard: '',
              name: ''
          },
          ruleInline: {
              name: [
                  { required: true, message: '请输入姓名', trigger: 'blur' },
              ],
              idCard: [
                  { required: true, message: '请输入身份证', trigger: 'blur' },
                  { type: 'string', min: 18, message: '请正确输入身份证', trigger: 'blur' }
              ]
          },
          fileList: [
            // {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
            // {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
          ]
        };
    },
    created(){
        this.getUserRelationship();
    },
    methods: {
      onchange(file,filesList) {
				//创建临时的路径来展示图片
				var windowURL = window.URL || window.webkitURL;
				this.src=windowURL.createObjectURL(file.raw);
				//重新写一个表单上传的方法
        this.param = new FormData();
        // this.param.append('file', file.raw, file.name);
        for(var i = 0;i<filesList.length;i++) {
          this.param.append('file', filesList[i].raw, filesList[i].name);
        }
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                const params = {
                    name : this.formInline.name,
                    idCard : this.formInline.idCard
                };
                this.$axios
                    .post('api/user/identityAuthentication',params)
                    .then(data => {
                        if (data.data.code == 200) {
                          this.getUserRelationship();
                        }else {
                            this.$Message.error(data.data.msg);
                        }
                    }).catch(() => {
                        this.$Message.error('提交失败');
                        return;
                    });
            } else {
                this.$Message.error('提交失败');
            }
        })
      },
      getUserRelationship () {
        this.$axios
          .get('api/user/userRelationship')
          .then(data => {
              if (data.data.code == 200 && data.data.data.isIdCard == 1) {
                this.formShow = false;
                this.idCard = data.data.data.idCard;
              }
              if (data.data.code == 200 && data.data.data.isTenant == 1) {
                this.tenantShow = false;
                this.isTenant = data.data.data.isTenant;
              }
              if (data.data.code == 200 && data.data.data.isVehicleOwner == 1) {
                this.ownerShow = false;
                this.isVehicleOwner = data.data.data.isVehicleOwner;
              }
          }).catch(() => {
              this.$Message.error('提交失败');
              return;
          });
      },
      onSubmit(){
				var purpose = this.form.purpose;
        this.param.append('purpose', purpose);
        // this.param.append('file', purpose);
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
        };
        console.log(typeof(this.param));
        this.$axios.post("/api/authentication/identityAuthentication", this.param, config)
        .then(data => {
          this.$Message.success(data.data.msg);
          this.getUserRelationship();
				})
			}
    },
    watch: {
      activeName:function() {
        if(this.activeName == 1){
          this.form.purpose = 'tenant';
        }else if (this.activeName == 2) {
          this.form.purpose = 'vehicle-owner';
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.certificate {
  // width: 100%;
  // height: 80%;
  .identity {
    color: green;
    margin-bottom: 10px;
  }
  .tabs {
    // height: 80%;
    .form {
      // text-align: center;
    }
  }
  .upload {
      margin-top: 20px;
  }

}
.user-message .user-view .user-main-view {
    padding: 22px 0 22px 0px;
}

</style>
