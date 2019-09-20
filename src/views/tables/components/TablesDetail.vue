<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="createPost-main-container">
        <el-col :span="24">
          <div class="postInfo-container">
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="120px" label="餐桌名称:" prop="name">
                  <el-input v-model="postForm.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="120px" label="最大用餐人数:" prop="max_people">
                  <el-input v-model="postForm.max_people"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="120px" label="餐桌类型" prop="type">
                  <el-select v-model="postForm.type">
                    <el-option
                      v-for="(item, index) in typeMap"
                      :key="index"
                      :label="item"
                      :value="index"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="120px" label="餐桌状态" prop="status">
                  <el-select v-model="postForm.status">
                    <el-option
                      v-for="(item, index) in statusMap"
                      :key="index"
                      :label="item"
                      :value="index"
                    />
                  </el-select>
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
import { fetchTable } from "@/api/tables";
import { updateTable } from "@/api/tables";
import { addTable } from "@/api/tables";
import { validURL } from "@/utils/validate";

const defaultForm = {
  username: "",
  password: ""
};

export default {
  name: "TablesDetail",
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
      typeMap: this.$store.getters.system.table.type_map,
      statusMap: this.$store.getters.system.table.status_map,
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
    console.log(this.$store.getters);
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
      fetchTable(id)
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
            updateTable(this.postForm).then(() => {
              this.$notify({
                title: "Success",
                message: "更新成功",
                type: "success",
                duration: 2000
              });
            });
          } else {
            addTable(this.postForm).then(() => {
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

