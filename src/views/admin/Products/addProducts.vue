<template>
  <section class="min-h-[800px]">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm bg-product-bg-cover h-screen p-4 max-sm:p-0"
    >
      <el-row type="flex" class="drop row-bg" justify="center">
        <el-col :lg="20">
          <div
            class="img display-inline align-center"
            @click="$refs.fileInput.click()"
          >
            <div v-if="!image">
              <span class="el-icon-download" id="upload-icon"></span>
              <h2>Drop an image or Browse</h2>
              <label class="display-inline">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  @change="onFileSelceted($event)"
                  ref="fileInput"
                />
              </label>
            </div>
            <div
              class="img display-inline align-center"
              v-else
              v-bind:class="{ image: true }"
            >
              <img :src="image" alt="" class="img" />
              <br />
              <br />
              <button class="btn" @click.stop="removeFile">REMOVE</button>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-form-item label="productName" prop="productName">
        <el-input
          v-model="ruleForm.productName"
          class="rounded-md"
          placeholder="Enter name product"
        ></el-input>
      </el-form-item>
      <el-form-item label="colors" prop="colors">
        <el-input
          v-model="ruleForm.colors"
          placeholder="Enter your  color product"
        ></el-input>
      </el-form-item>
      <el-form-item label=" price" prop="price" class="input-number">
        <el-input-number
          v-model="ruleForm.price"
          :step="5"
          :max="1000000000"
          placeholder="Enter price product"
        ></el-input-number>
      </el-form-item>
      <el-form-item label=" discount" prop="discount" class="input-number">
        <el-input-number
          v-model="ruleForm.discount"
          :step="0.1"
          :max="100"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="rate" prop="rate" class="input-number">
        <el-input-number
          v-model="ruleForm.rate"
          placeholder="Enter your rate product"
          :step="0.1"
          :max="5"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="categories" prop="category" required>
        <el-select v-model="ruleForm.category" placeholder="categories name">
          <el-option
            v-for="cat in categories"
            :key="cat.id"
            :label="cat.name"
            :value="cat.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Date created" required>
        <el-col :span="11">
          <el-form-item prop="day">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="ruleForm.day"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="time">
            <el-time-picker
              placeholder="Pick a time"
              v-model="ruleForm.time"
              style="width: 100%"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="Activity form" prop="des" required>
        <el-input
          type="textarea"
          v-model="ruleForm.des"
          placeholder="Enter your description product"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >Create</el-button
        >
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
import firebase from "@/Firebase.js";
export default {
  data() {
    return {
      user: {},
      image: "",
      ruleForm: {
        productName: "",
        category: "",
        rate: null,
        day: "",
        time: "",
        des: "",
        imageUrl: "",
        colors: "",
        discount: null,
        price: null,
      },
      dialogVisible: false,
      categories: [],
      rules: {
        productName: [
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
        colors: [
          {
            required: true,
            message: "Please  color name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 12,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        discount: [
          {
            required: true,
            message: "Please enter  discount ",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "Please  price product",
            trigger: "blur",
          },
        ],
        rate: [
          {
            required: true,
            message: "Please  rate product",
            trigger: "blur",
          },
        ],
        category: [
          {
            required: true,
            message: "Please select category name",
            trigger: "change",
          },
        ],
        day: [
          {
            type: "date",
            required: true,
            message: "Please pick a date",
            trigger: "change",
          },
        ],
        time: [
          {
            type: "date",
            required: true,
            message: "Please pick a time",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: true,
            message: "Please input activity form",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user-info"));
    if (this.user !== null) {
      firebase
        .firestore()
        .collection("categories")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.categories.push(doc.data());
          });

          console.log(this.categories);
        });
    }
  },
  methods: {
    onFileSelceted(event) {
      this.image = URL.createObjectURL(event.target.files[0]);
      firebase
        .storage()
        .ref()
        .child(`products/images/${event.target.files[0].name}`)
        .put(event.target.files[0])
        .then((res) => {
          res.ref.getDownloadURL().then((res) => {
            console.log(res);
            this.ruleForm.imageUrl = res;
          });
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          firebase
            .firestore()
            .collection("products")
            .add({
              ...this.ruleForm,
              adminID: this.user.id,
            })
            .then(() => {
              setTimeout(() => {
                this.$router.push(
                  {
                    name: "adminProducts",
                  },
                  2000
                );
              });
              this.$message({
                showClose: true,
                message: "Product added successfully",
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    removeFile() {
      this.image = "";
    },
  },
};
</script>
<style scoped>
.el-select {
  width: 100%;
}
.btn {
  background-color: #d3394c;
  border: 0;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-weight: bold;
  position: relative;
  padding: 10px;
  border-radius: 10%;
  transition: all ease-in-out 0.5s;
}
.btn:hover {
  background-color: #722040;
}
.el-date-editor {
  width: 100% !important;
}
input[type="file"] {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
.align-center {
  text-align: center;
}
.helper {
  height: 90%;
  display: inline-block;
  vertical-align: middle;
  width: 0;
}
.hidden {
  display: none;
}
.hidden.image {
  display: inline-block;
}
.image {
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  width: 100%;
}
.display-inline {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  width: 100%;
}
.img {
  width: 100%;
  max-height: 100%;
  border: 1px solid #f6f6f6;
  display: inline-block;
}
.drop {
  padding: 20px;
  margin-top: 15px;
  text-align: center;
  background-color: #f2f2f2;
  border: 4px dashed #ccc;
  background-color: #f6f6f6;
  border-radius: 2px;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  width: 40%;
  margin-bottom: 9%;
  cursor: pointer;
}
.add {
  border: 1px solid #ff8303;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  text-align: center;
  background-color: rgb(245, 245, 245);
}
.all {
  width: 100%;
  padding: 20px;
  line-height: 10px;
  margin-bottom: 60px;
}
#upload-icon {
  font-size: 45px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
}
#btn {
  width: 150px;
}
.input-number {
  display: inline-block;
  width: fit-content;
}
</style>
