<template>
  <div class="class-name" style="width: 600px; margin: auto;">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="客户名称" prop="customerName">
        <el-input v-model="form.customerName"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contactName">
        <el-input v-model="form.contactName"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-input v-model="form.city"></el-input>
      </el-form-item>
      <el-form-item label="国家" prop="country">
        <el-input v-model="form.country"></el-input>
      </el-form-item>
      <el-form-item label="邮编号码" prop="postalCode">
        <el-input v-model="form.postalCode"></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">立即创建</el-button>
        <el-button @click="handlecors">测试CORS</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        customerName: '',
        contactName: '',
        address: '',
        city: '',
        country: '',
        postalCode: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      axios.post('/api/user/create/customer', this.form).then(res => {
        if (res.data.code === 1) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
        for (let key of this.form) {
          this.form[key] = ''
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handlecors () {
      axios.get('http://localhost:8080/backend/test?name=Liuyaochang', {
        // `headers` are custom headers to be sent
        headers: {'X-Requested-With': 'XMLHttpRequest'}
      })
    }
  }
}
</script>
