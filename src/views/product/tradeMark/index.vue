<template>
    <div>
      <el-button type="primary" icon="el-icon-plus" @click="showDialog"  style="margin:10px 0px"></el-button>
      <!-- data: 表格展示的数据，一定是数组类型的 
          border 边框
        el-table-column： 表格的列
      -->
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="序号" align="center" width="80"></el-table-column>
        <el-table-column prop="tmName" label="品牌名称" align="center" width="width"></el-table-column>
        <el-table-column prop="logoUrl" label="品牌LOGO" align="center" width="width">
          <template slot-scope="{row}"><!-- row为插槽回传的行的内容 还有个属性$index 不可重命名--> 
            <img :src="row.logoUrl" alt="" style="width:150px;height:100px">
          </template>
        </el-table-column>
        <el-table-column  align="center" label="操作">
          <template slot-scope="{row}">
            <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button> 
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页：总数total、当前第几页current-page、每一页展示条数page-size、连续页码数（默认5）
        page-sizes 设置每页展示的个数
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        layout:顺序为分页器展示的顺序（-> 占位 可让后边内容到最右边）
        pager-count:页码按钮的数量（如果为9 连续页码数为7）
      -->
      <el-pagination
        style="margin-top:10px;textAlign:center"
        :total="total"
        :current-page="page"
        :page-size="limit"
        :pager-count="7"
        :page-sizes="[3, 5, 10]"
        layout=" prev, pager, next, jumper, ->, sizes, total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        >
      </el-pagination>


      <!-- 添加按钮的对话框 -->
      <el-dialog :title="tradeMarkForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
        <!-- model 属性，将表单数据收集到该对象身上-->
        <el-form :model="tradeMarkForm" ref="ruleForm" :rules="formRules" style="width:80%">
          <el-form-item prop="tmName" label="品牌名称" :label-width="formLabelWidth">
            <el-input v-model="tradeMarkForm.tmName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="logoUrl" label="品牌LOGO" :label-width="formLabelWidth">
            <!-- 上传组件收集数据不能使用v-model ，不是一个表单元素
              action：设置图片上传地址 
              on-success: 可以监测图片上传成功，图片上传成功会执行一次
              before-upload: 在上传图之前执行一次
            -->
            <el-upload
              class="avatar-uploader"
              action="/dev-api/admin/product/fileUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="tradeMarkForm.logoUrl" :src="tradeMarkForm.logoUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="restForm">取 消</el-button>
          <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    name:'TradeMark',
    data() {
      return {
        // 分页器第几页
        page: 1,
        // 当前页展示数据条数
        limit: 3,
        // 总数
        total: 0,
        // 列表展示的数据
        list: [],
        // 添加对话框是否展示
        dialogFormVisible: false,
        tradeMarkForm: {
          logoUrl:'',
          tmName:''
        },
        formLabelWidth: '120px',
        formRules:{
          tmName: [
            {required: true, message: "请输入品牌名称", trigger: "blur"},
            {min: 2, max: 10, message: "长度在2到10个字符", trigger: "change"}
          ],
          logoUrl: [
            {required: true, message: "请选择品牌logo"},
          ]

        }
      }
    },
    mounted() {
      this.getPageList()
    },
    methods: {
      // 获取品牌列表数据
      async getPageList() {
        let result = await this.$API.trademark.reqTradeMarkList(this.page, this.limit)
        if (result.code == 200){
          this.total = result.data.total
          this.list = result.data.records
        }
      },
      handleCurrentChange(pager) {
        // 切换页码
        // pager为你点击选中的页码
        this.page = pager
        this.getPageList()
      },
      handleSizeChange(limit) {
        // 修改展示数据条数
        this.limit = limit
        this.getPageList()
      },
      showDialog() {
        this.dialogFormVisible = true
        this.tradeMarkForm = {logoUrl:'', tmName:''}
      },
      updateTradeMark(row) {
        this.dialogFormVisible = true
        // row为服务器返回数据，赋值给tradeForm，但是修改品牌信息不点确定，页面内容也会被修改
        // 所以需要利用...扩展运算符对row进行浅拷贝 (对象中都是基本数据类型，浅拷贝时不共用地址)
        this.tradeMarkForm = {...row};
      },
      deleteTradeMark(row) {
        console.log(row)
        this.$confirm('此操作将永久删除该品牌, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id)
          if(result.code == 200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })        
        })
      },
      // 上传图片相关---上传成功
      handleAvatarSuccess(res, file) {
        // res:上传成功之后返回前端的数据 code、data（图片地址）
        // file: 上传成功之后返回前端的数据
        this.tradeMarkForm.logoUrl = URL.createObjectURL(file.raw);
      },
      // 上传之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 点击确定按钮
      addOrUpdateTradeMark() {
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            // 发请求
            let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tradeMarkForm)
            if(result.code == 200) {
              this.dialogFormVisible = false
              this.$message({
                message: this.tradeMarkForm.id ? '修改品牌成功':'添加品牌成功',
                type: 'success'
              })
              this.getPageList(this.tradeMarkForm.id ? this.page : 1)
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      },
      restForm() {
        this.dialogFormVisible = false
        this.$refs.ruleForm.resetFields()
      }
    }
  }
  </script>
  
  <style>
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
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