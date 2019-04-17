<template>
  <div class="audit">
      <div class="box" v-show="auditShow" v-for="(item, index) in data" :key="index">
        <p class="user">用户：<span>{{item.telPhone}}</span> </p>
        <ul class="clearfix">
          <li>
            <img :src=item.path[0] alt="">
          </li>
          <li>
            <img :src=item.path[1] alt="">
          </li>
          <li>
            <p>审核：</p>
            <el-button type="success" @click="onSubmit(item.telPhone,'2')">符合要求</el-button>
            <el-button type="info" @click="onSubmit(item.telPhone,'3')">不符合要求</el-button>
          </li>
        </ul>
      </div>
      <div v-show="!auditShow">
        暂无待审核的数据
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pass:'',
      data:[],
      auditShow: false,
    }
  },
  created () {
    this.getAudit();
  },
  methods: {
    getAudit() {
      this.$axios
      .get('/api/authentication/getTenantPath')
      .then(data => {
        this.data = data.data.data;
        if (data.data.msg !== '暂无待审核的数据') {
          this.auditShow = true;
        }else {
          this.auditShow = false;
        }
      }).catch(() => {
        this.$Message.error('获取失败');
        return;
      });
    },
    onSubmit (user,num) {
      const params = {
          telPhone : user,
          purpose : 'tenant',
          result : num,
      };
      this.$axios
      .post('/api/authentication/authenticationToExamine',params)
      .then(data => {
        this.getAudit();
      }).catch(() => {
        this.$Message.error('获取失败');
        return;
      });
    }
  },
}
</script>

<style  lang="less">
.audit {
  width: 100%;
  .box {
    width: 100%;
    height: 200px;
    background-color: #eee;
    margin-top: 10px;
    .user {
      padding: 10px;
      span {
        color: green;
      }
    }
    ul {
      display: flex;
    }
    ul li {
      // float: left;
      list-style: none;
      margin: 0 10px;
      p {
        margin-bottom: 10px;
      }
      img {
        width: 240px;
        height: 150px;
      }
    }
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.user-message .user-view .user-main-view {
    padding: 22px 0 22px 0;
}
</style>