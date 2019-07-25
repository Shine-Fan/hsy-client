<template>
  <div class="PIM">
    <div class="title1">个人信息管理</div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户密码:">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="微信号:">
        <el-input v-model="form.wechat"></el-input>
      </el-form-item>
      <el-form-item label="QQ号:">
        <el-input v-model="form.qq"></el-input>
      </el-form-item>
      <el-form-item label="支付宝账号:">
        <el-input v-model="form.alipay"></el-input>
      </el-form-item>
      <el-form-item label="银行卡号:">
        <el-input v-model="form.bankCard"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="性别:">
        <el-input v-model="form.sex"></el-input>
      </el-form-item>
      <el-form-item label="生日:">
        <el-input v-model="form.birthday"></el-input>
      </el-form-item>
      <el-form-item label="地址:">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="text" @click="revise">修改个人信息</el-button>
    </div>
    <button @click="Commentget">123</button>
    <button @click="gett">1234</button>
  </div>
</template>
<script>
export default {
  name: "PIM",
  data() {
    return {
      form: {
        password: "",
        wechat: "",
        qq: "",
        alipay: "",
        bankCard: "",
        email: "",
        phone: "",
        sex: "",
        birthday: "",
        address: ""
      }
    };
  },
  methods: {
    revise() {
        console.log(this.form.password),
      this.$confirm("此操作将修改个人信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          console.log(9);
          this.PIMpost(); //执行修改
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    PIMpost: function() {
      console.log("send request");
      console.log(1);
      // axios({
      this.$ajax({
        method: "post",
        url: "http://192.168.46.112:8080/personal/revise_info",
        headers: { "content-type": "application/json", token: `${this.$store.state.token}` },
        data: form,
        //   password: this.form.Password,
        //   wechat: this.form.Wechat,
        //   qq: this.form.Qq,
        //   alipay: this.form.Alipay,
        //   bankCard: this.form.BankCard,
        //   email: this.form.Email,
        //   phone: this.form.Phone,
        //   sex: this.form.Sex,
        //   birthday: this.form.Birthday,
        //   address: this.form.Address
    
        // data:JSON.stringify(defaultData)
      })
        .then(response => {
          console.log(response);
        })
        .catch(function(error) {
          // 请求失败处理
          console.log("catached");
          console.log(error);
        });
    },
    Commentget: function() {
      console.log("send request");
      console.log(1);
      // axios({
      this.$ajax({
        method: "post",
        url: "http://106.15.192.168/login",
        header: { "content-type": "application/json" },
        data: {
          username: "zhangsan",
          password: "123456"
        }
      }).then(response => {
        console.log(response);
        this.$store.state.token = response.headers.token;
        console.log(response.headers.token);
      });
      console.log(this.$store.state.token);
    },
    gett: function() {
      this.$ajax({
        method: "get",
        url: "http://106.15.192.168/personal/info",
        headers: {
          "content-type": "application/json",
          token: `${this.$store.state.token}`
        }
        // data:JSON.stringify(defaultData)
      })
        .then(response => {
          console.log(response);
          this.form=response.data.data;
        //   this.form.Password= response.data.data.password;
        //   this.form.Wechat= response.data.data.wechat;
        //   this.form.Qq= response.data.data.qq;
        //   this.form.Alipay= response.data.data.alipay;
        //   this.form.BankCard= response.data.data.bankCard;
        //   this.form.Email= response.data.data.email;
        //   this.form.Phone= response.data.data.phone;
        //   this.form.Sex= response.data.data.sex;
        //   this.form.Birthday= response.data.data.birthday;
        //   this.form.Address= response.data.data.address;
          console.log(response.data.data.password);
        })
        .catch(function(error) {
          // 请求失败处理
          console.log("catached");
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.title1 {
  font-size: 20px;
}
</style>