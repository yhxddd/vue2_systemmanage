<template>
  <div>
    <el-card style="margin-bottom:20px">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" @click="addAttr" :disabled="!category3Id" style="margin-bottom:6px" size="small">
          添加属性
        </el-button>
        <el-table style="width:100%" border :data="attrList">
          <el-table-column type="index" align="center" label="序号" width="80"></el-table-column>
          <el-table-column prop="attrName"  label="属性名称" width="150"></el-table-column>
          <el-table-column prop="prop" label="属性值列表">
            <template slot-scope="{row}">
              <el-tag type="success" v-for="attrValue in row.attrValueList" :key="attrValue.id" style="margin:0px 20px">{{attrValue.valueName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column  label="操作" width="150">
            <template slot-scope="{row}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteAttr(row)"></el-button> 
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性的结构-->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" size="small">添加属性值</el-button>
        <el-button @click="isShowTable = true" size="small">取消</el-button>
        <el-table style="width:100%;margin: 20px 0px;" border>
          <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
          <el-table-column type="index" label="属性值名称"></el-table-column>
          <el-table-column type="index" label="操作" width="230"></el-table-column>
        </el-table>
        <el-button type="primary" size="small">保存</el-button>
        <el-button @click="isShowTable = true" size="small">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
    name:'Attr',
    data() {
      return {
        category1Id:'',
        category2Id:'',
        category3Id:'',
        // 平台属性数据
        attrList: [],
        // 控制属性数据table的展示与隐藏
        isShowTable: true
      }
    },
    methods: {
      // 父子组件通信获取select一二三级选中的id
      getCategoryId(obj) {
        const {categoryId, level} = obj
        if(level == 1){
          this.category1Id = categoryId
          this.category2Id = ''
          this.category3Id = ''
        }else if(level == 2){
          this.category2Id = categoryId
          this.category3Id = ''
        }else{
          this.category3Id = categoryId
          this.getAttrList()
        }
      },
      // 获取平台属性数据
      async getAttrList() {
        let result = await this.$API.attr.reqGetAttrList(this.category1Id, this.category2Id, this.category3Id)
        if(result.code == 200){
          this.attrList = result.data
        }
      },
      addAttr() {
        this.isShowTable = false
      },
      updateAttr(row) {
        this.isShowTable = false
      },
      deleteAttr() {

      }
    }
}
</script>

<style>

</style>