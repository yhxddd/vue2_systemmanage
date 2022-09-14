<template>
  <div>
    <!-- inline 代表行内表单-->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
        <el-form-item label="一级分类">
            <el-select placeholder="请选择" v-model="cForm.cate1" @change="handler1">
                <el-option :label="c1.name" :value="c1.id" v-for="c1 in category1List" :key="c1.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
            <el-select placeholder="请选择" v-model="cForm.cate2" @change="handler2">
                <el-option :label="c2.name" :value="c2.id" v-for="c2 in category2List" :key="c2.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
            <el-select placeholder="请选择" v-model="cForm.cate3" @change="handler3">
                <el-option :label="c3.name" :value="c3.id" v-for="c3 in category3List" :key="c3.id"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name:'CategorySelect',
    data() {
        return {
            // 一级分类数据
            category1List:[],
            category2List:[],
            category3List:[],
            // 收集相应选择的一级二级三级分类的id
            cForm: {
                cate1:'',
                cate2:'',
                cate3:''
            }
        }
    },
    // 组件华仔完毕就需要获取一级分类数据
    mounted() {
        this.getCategory1List()
    },
    methods: {
        async getCategory1List() {
            let result = await this.$API.attr.reqGetCategory1List()
            if(result.code==200){
                this.category1List = result.data
            }
        },
        // 一级分类的select的事件回调
        async handler1() {
            this.category2List = []
            this.category3List = []
            this.cForm.cate2 = ''
            this.cForm.cate3 = ''
            let result = await this.$API.attr.reqGetCategory2List(this.cForm.cate1)
            if(result.code==200){
                this.category2List = result.data
            }
            this.$emit('getCategoryId',{categoryId: this.cForm.cate1, level: 1})
        },
        // 二级分类的select的事件回调
        async handler2() {
            this.category3List = []
            this.cForm.cate3 = ''
            let result = await this.$API.attr.reqGetCategory3List(this.cForm.cate2)
            if(result.code==200){
                this.category3List = result.data
            }
            this.$emit('getCategoryId',{categoryId: this.cForm.cate2, level: 2})
        },
        handler3() {
            this.$emit('getCategoryId',{categoryId: this.cForm.cate3, level: 3})
        }
    }
}
</script>

<style>

</style>