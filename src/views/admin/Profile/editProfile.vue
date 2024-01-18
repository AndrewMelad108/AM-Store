<template>
  <section class="capitalize h-screen grid content-center">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm bg-product-bg-cover min-h-[50vh] p-4 max-sm:p-0 grid grid-cols-2 content-around"
    >
      <el-form-item label="firstName" prop="firstName">
        <el-input v-model="ruleForm.firstName" class="rounded-md"></el-input>
      </el-form-item>
      <el-form-item label="lastName" prop="lastName">
        <el-input v-model="ruleForm.lastName" class="rounded-md"></el-input>
      </el-form-item>
      <el-form-item label="city" prop="city">
        <el-input v-model="ruleForm.city"></el-input>
      </el-form-item>
      <el-form-item label=" phone" prop="phone" class="input-number">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>

      <el-form-item label="renouncing me" prop="des">
        <el-input
          type="textarea"
          v-model="ruleForm.des"
          class="resize"
          placeholder="Enter your description admin"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          class="capitalize w-full"
          >save change</el-button
        >
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
import firebase from "@/Firebase.js";
export default {
  data() {
    return {
      userEmail: "",
      ruleForm: {},
      rules: {
        firstName: [
          {
            required: true,
            message: "Please  product name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 12,
            message: "Length should be 3 to 12",
            trigger: "blur",
          },
        ],
        lastName: [
          {
            required: true,
            message: "Please  product name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 12,
            message: "Length should be 3 to 12",
            trigger: "blur",
          },
        ],
        city: [
          {
            required: true,
            message: "Please  Enter your city",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "Please enter your phone ",
            trigger: "blur",
          },
        ],
        des: [
          {
            message: "Please input description from user",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.userEmail = JSON.parse(localStorage.getItem("user-info")).email;
    if (this.userEmail !== null) {
      firebase
        .firestore()
        .collection("users")
        .get()
        .then((res) => {
          res.forEach((element) => {
            if (element.data().email === this.userEmail) {
              this.ruleForm = element.data();
              this.ruleForm.id = element.id;
            }
          });
        });
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          firebase
            .firestore()
            .collection("users")
            .doc(this.ruleForm.id)
            .update({
              ...this.ruleForm,
            })
            .then(() => {
              localStorage.setItem(
                "user-info",
                JSON.stringify({ ...this.ruleForm })
              );
              this.$message({
                showClose: true,
                message: "add user data successfully",
              });
            })
            .then(() => {
              setTimeout(() => {
                this.$router.push(
                  {
                    name: "setting",
                  },
                  2000
                );
              });
            })
            .catch((err) => {
              this.$message({
                showClose: true,
                message: err,
                type: "error",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style>
.el-textarea__inner {
  resize: none;
}
</style>
