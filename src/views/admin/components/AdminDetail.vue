<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="createPost-main-container">
        <el-col :span="24">
          <div class="postInfo-container">
            <el-row>
              <el-col :span="12" v-if="isEdit">
                <el-form-item label-width="80px" label="账户名:" prop="username">
                  <el-input v-model="postForm.username" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-else>
                <el-form-item label-width="80px" label="账户名:" prop="username">
                  <el-input v-model="postForm.username"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="!isEdit">
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="80px" label="密码:" prop="password">
                    <el-input type="password" v-model="postForm.password"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="80px" label="确认密码:" prop="password_confirm">
                    <el-input type="password" v-model="postForm.password_confirm"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="80px" label="姓名:" prop="name">
                  <el-input v-model="postForm.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="80px" label="角色" prop="role">
                  <el-select v-model="postForm.role">
                    <el-option
                      v-for="item in userListOptions"
                      :key="item.key"
                      :label="item.name"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-upload
                  class="avatar-uploader"
                  action="http://192.168.112.20:9501/common/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  v-model="postForm.avatar"
                >
                  <img v-if="postForm.avatar" :src="postForm.avatar" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="介紹" prop="introduction">
                  <el-input type="textarea" v-model="postForm.introduction"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-button type="primary" @click="submitForm">{{this.buttonName}}</el-button>
          </div>
        </el-col>
      </div>
    </el-form>
  </div>
</template>

<script>
import { fetchAdmin } from "@/api/admin";
import { updateAdmin } from "@/api/admin";
import { addAdmin } from "@/api/admin";
import { validURL } from "@/utils/validate";

const defaultForm = {
  username: "",
  password: ""
};

export default {
  name: "AdminDetail",
  components: {},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        this.$message({
          message: rule.field + "为必传项",
          type: "error"
        });
        callback(new Error(rule.field + "为必传项"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.postForm.password_confirm !== "") {
          this.$refs.postForm.validateField("password_confirm");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.postForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [{ key: "1", name: "老板" }, { key: "2", name: "店员" }],
      roles: [],
      rules: {
        username: [{ validator: validateRequire }],
        password: [{ validator: validatePass, trigger: "blur" }],
        password_confirm: [{ validator: validatePass2, trigger: "blur" }]
      },
      tempRoute: {}
    };
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.buttonName = "编辑";
      this.fetchData(id);
    } else {
      this.buttonName = "创建";
      this.postForm = Object.assign({}, defaultForm);
    }
    this.tempRoute = Object.assign({}, this.$route);
  },
  methods: {
    fetchData(id) {
      fetchAdmin(id)
        .then(response => {
          this.postForm = response.data;
          this.setPageTitle();
        })
        .catch(err => {
          console.log(err);
        });
    },
    setPageTitle() {
      if (this.isEdit) {
        const title = "编辑";
        document.title = `${title} - ${this.postForm.username}`;
      } else {
        const title = "创建管理员";
        document.title = `${title}`;
      }
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          console.log(valid);
          this.loading = true;
          if (this.isEdit) {
            updateAdmin(this.postForm).then(() => {
              this.$notify({
                title: "Success",
                message: "更新成功",
                type: "success",
                duration: 2000
              });
            });
          } else {
            addAdmin(this.postForm).then(() => {
              this.$notify({
                title: "Success",
                message: "创建成功",
                type: "success",
                duration: 2000
              });
            });
          }
          this.loading = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.postForm.avatar = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

