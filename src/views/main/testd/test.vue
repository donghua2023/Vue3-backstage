<template>
  <div>
    <div>
      <el-tabs type="border-card" v-model="nowPane" @tab-click="handleClick">
        <el-tab-pane :label="$nt('待出货')" :name="$nt('待出货')">
          <el-row :gutter="10" style="margin-bottom: 10px; margin-top: 10px">
            <el-col :span="6">
              <span class="colStyle">{{ $nt('销售订单') }}</span>
              <el-input
                size="mini"
                v-model="searchParamsTwo.so"
                style="width: 60%"
                clearable
                :placeholder="$nt('销售订单')"
                prefix-icon="el-icon-search">
              </el-input>
            </el-col>
            <el-col :span="6">
              <span class="colStyle">{{ $nt('客户订单') }}</span>
              <el-input
                size="mini"
                v-model="searchParamsTwo.cpo"
                style="width: 60%"
                clearable
                :placeholder="$nt('客户订单')"
                prefix-icon="el-icon-search">
              </el-input>
            </el-col>
            <el-col :span="6">
              <span class="colStyle">{{ $nt('颜色') }}</span>
              <el-input
                size="mini"
                v-model="searchParamsTwo.model_id"
                style="width: 60%"
                clearable
                :placeholder="$nt('颜色')"
                prefix-icon="el-icon-search">
              </el-input>
            </el-col>
            <el-col :span="6"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span class="colStyle">{{ $nt('客户') }}</span>
              <el-select
                clearable
                filterable
                ref="target"
                @change="getDataByCustomer"
                v-model="searchParamsTwo.customer_id"
                size="mini"
                style="width: 60%">
                <el-option
                  v-for="(item, index) in customer_list"
                  :key="index"
                  :value="item.customer_id"
                  :label="item.customer_name"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="margin-bottom: 10px">
            <el-col :span="6"
              >&nbsp;&nbsp;
              <span class="colStyle">{{ $nt('生产线') }}</span>
              <el-select
                clearable
                v-model="searchParamsTwo.production_line_id"
                size="mini"
                filterable
                :disabled="searchParamsTwo.customer_id === ''"
                style="width: 60%">
                <el-option
                  v-for="(item, index) in sProductLineList"
                  :key="index"
                  :value="item.production_line_id"
                  :label="item.production_line_name"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span class="colStyle">{{ $nt('款号') }}</span>
              <el-select
                filterable
                clearable
                :disabled="searchParamsTwo.customer_id === ''"
                v-model="searchParamsTwo.style_id"
                size="mini"
                style="width: 60%">
                <el-option
                  v-for="(item, index) in sStyleNoList"
                  :key="index"
                  :value="item.style_id"
                  :label="item.style_code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <span class="colStyle">{{ $nt('季节') }}</span>
              <el-select
                v-model="searchParamsTwo.season_id"
                :disabled="searchParamsTwo.customer_id === ''"
                filterable
                :placeholder="$nt('季节')"
                size="mini"
                style="width: 60%"
                clearable>
                <el-option
                  v-for="item in slSeasonList"
                  :key="item.season_id"
                  :label="item.season_name"
                  :value="item.season_id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <span class="colStyle">{{ $nt('交货地点') }}</span>
              <el-select
                clearable
                filterable
                ref="target"
                :disabled="searchParamsTwo.customer_id === ''"
                v-model="searchParamsTwo.delivery_address_id"
                size="mini"
                style="width: 60%">
                <el-option
                  v-for="(item, index) in delivery_address_list"
                  :key="index"
                  :value="item.delivery_address_id"
                  :label="item.delivery_address_name"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6"
              >&nbsp;&nbsp;
              <span class="colStyle">{{ $nt('业务员') }}</span>
              <el-input clearable v-model="searchParamsTwo.factory_clerk" size="mini" style="width: 60%"> </el-input>
            </el-col>
            <el-col :span="6">
              <span class="colStyle">{{ $nt('交期EHD从') }}</span>
              <el-date-picker
                v-model="searchParamsTwo.supplier_date_from"
                type="date"
                size="mini"
                :placeholder="$nt('选择日期')"
                style="width: 55%"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-col>
            <el-col :span="6"
              >&nbsp;&nbsp;&nbsp;
              <span class="colStyle">{{ $nt('至') }}</span>
              <el-date-picker
                v-model="searchParamsTwo.supplier_date_to"
                type="date"
                size="mini"
                :placeholder="$nt('选择日期')"
                style="width: 60%"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-col>
            <el-col :span="6">
              <el-button size="mini" type="primary" @click="getSoList">{{ $nt('搜索') }}</el-button>
              <el-button size="mini" type="primary" @click="bShowHistory = true">{{ $nt('批量查询') }}</el-button>
              <el-button size="mini" @click="addSoItem" type="primary">{{ $nt('新建') }}</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="so_list" @selection-change="handleSelectionChangeTwo" style="width: 100%">
              <el-table-column type="selection" :selectable="isOptional" width="60"> </el-table-column>
              <el-table-column prop="so" :label="$nt('订单号')"> </el-table-column>
              <el-table-column prop="customer.customer_name" :label="$nt('客户')"> </el-table-column>
              <el-table-column :label="$nt('客户订单')">
                <template slot-scope="scope">
                  {{ scope.row.cpo }}
                </template>
              </el-table-column>
              <el-table-column :label="$nt('颜色')">
                <template slot-scope="scope">
                  {{ scope.row.model_str }}
                </template>
              </el-table-column>
              <el-table-column prop="style.style_code" :label="$nt('款式')"> </el-table-column>
              <el-table-column prop="delivery_date" :label="$nt('交期CDD')"> </el-table-column>
              <el-table-column prop="as_real_date" :label="$nt('AS日期')"> </el-table-column>
              <el-table-column :label="$nt('季节')">
                <template slot-scope="scope">
                  {{ $pub_fun.getManyLevelData(scope.row, 'order.season.season_name') }}
                </template>
              </el-table-column>
              <el-table-column :label="$nt('工厂')">
                <template slot-scope="scope">
                  {{ $pub_fun.getManyLevelData(scope.row, 'order.receive_company.receive_company_name') }}
                </template>
              </el-table-column>
              <el-table-column :label="$nt('业务员')">
                <template slot-scope="scope">
                  {{ $pub_fun.getManyLevelData(scope.row, 'order.factory_clerk') }}
                </template>
              </el-table-column>
              <el-table-column :label="$nt('交期EHD')">
                <template slot-scope="scope">
                  {{ scope.row.supplier_date }}
                </template>
              </el-table-column>
              <el-table-column prop="shipping_type.shipping_type_name" :label="$nt('出货方式')"> </el-table-column>
              <el-table-column :label="$nt('数量')" prop="size_list">
                <template slot-scope="scope">
                  <el-tooltip placement="bottom" effect="light">
                    <div slot="content" v-for="item in scope.row.size_list">
                      {{ item.size_name }} : {{ item.d_count }} <br />
                    </div>
                    <el-button size="mini">{{ scope.row.count }}</el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column :label="$nt('交地')">
                <template slot-scope="scope">
                  <span
                    class="spValue"
                    :title="scope.row.delivery_address && scope.row.delivery_address.delivery_address_name">
                    {{ scope.row.delivery_address && scope.row.delivery_address.delivery_address_name }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="is_no_1" :label="$nt('首单')"></el-table-column>
            </el-table>
            <div
              class="block"
              style="float: right; margin-top: 0.5%; margin-bottom: 0.5%; display: flex; margin-top: 8px">
              <div>
                <span>数量合计：{{ totalSum }}</span>
              </div>
              <el-pagination
                @size-change="handleSizeChangeTwo"
                @current-change="handleCurrentChangeTwo"
                :current-page.sync="searchParamsTwo.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="searchParamsTwo.per_page"
                layout="sizes, prev, pager, next"
                :total="totalTwo">
              </el-pagination>
            </div>
          </el-row>
        </el-tab-pane>

        <el-tab-pane :label="$nt('出货计划列表')" :name="$nt('出货计划列表')">
          <el-form ref="form" :model="searchParams">
            <el-row :gutter="10">
              <el-col :span="5">
                <el-form-item :label="$nt('状态')">
                  <el-radio-group v-model="searchParams.status">
                    <el-radio :label="1" @change="getShippingPlanList">{{ $nt('已下发') }}</el-radio>
                    <el-radio :label="0" @change="getShippingPlanList">{{ $nt('草稿') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item :label="$nt('客户订单')">
                  <el-input
                    size="mini"
                    v-model="searchParams.cpo"
                    style="width: 60%"
                    clearable
                    :placeholder="$nt('客户订单')"
                    prefix-icon="el-icon-search">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item :label="$nt('款号')">
                  <el-input
                    size="mini"
                    v-model="searchParams.style_code"
                    style="width: 60%"
                    clearable
                    :placeholder="$nt('款号')"
                    prefix-icon="el-icon-search">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$nt('出货时间')">
                  <el-date-picker
                    v-model="dp_date"
                    @change="getSoByTime"
                    type="daterange"
                    align="right"
                    style="width: 80%"
                    size="mini"
                    unlink-panels
                    :range-separator="$nt('至')"
                    :start-placeholder="$nt('开始日期')"
                    :end-placeholder="$nt('结束日期')"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions2">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="18">
                <el-button-group>
                  <el-button size="mini" type="primary" @click="getShippingPlanList">{{ $nt('搜索') }}</el-button>
                  <!-- <el-button size="mini"
                            type="primary"
                            @click="addShippingPlan('add')">{{$nt('新增')}}</el-button> -->
                  <!-- <el-button size="mini"
                            type="primary"
                            @click="exportDp">{{$nt('导出发货单')}}</el-button> -->
                  <el-button size="mini" type="primary" @click="showManySearch = true" v-popover:popover5>{{
                    $nt('批量查询')
                  }}</el-button>
                  <el-button size="mini" type="primary" @click="multipleExport">{{ $nt('批量导出') }}</el-button>
                </el-button-group>
              </el-col>
            </el-row>
          </el-form>
          <cm-table-list
            ref="cmTable"
            :s-data-url="dataUrl"
            :btn-width="6"
            :iAnotherHeight="-150"
            :bShowSearchBtn="false"
            :item-list="itemList"
            name="shipping_plan_list"
            :s-page-data="sPageData"></cm-table-list>
        </el-tab-pane>
      </el-tabs>

      <!-- <el-table :data="shipping_plan_list"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="30">
        </el-table-column>
        <el-table-column prop="dp_no"
                         :label="$nt('出货单号')">
        </el-table-column>
        <el-table-column :label="$nt('客户订单')">
          <template slot-scope="scope">
            <span class="spValue"
                  :title="scope.row.cpo">
              {{scope.row.cpo}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="dp_time"
                         :label="$nt('出货时间')">
        </el-table-column>
        <el-table-column prop="create_time"
                         :label="$nt('创建时间')">
        </el-table-column>
        <el-table-column prop="creator_name"
                         :label="$nt('创建人')">
        </el-table-column>
        <el-table-column width="150"
                         :label="$nt('操作')">
          <template slot-scope="scope">
            <el-tooltip :content="$nt('详情')"
                        placement="top">
              <el-button type="text"
                         size="medium"
                         @click="addShippingPlan(scope.row.dp_id)"
                         icon="el-icon-document"></el-button>
            </el-tooltip>
            <el-tooltip :content="$nt('下发')"
                        placement="top">
              <el-button type="text"
                         size="medium"
                         v-show="scope.row.status==0"
                         @click="issuedDp(scope.row.dp_id, 1, 1)"
                         icon="el-icon-download"></el-button>
            </el-tooltip>
            <el-tooltip :content="$nt('取消下发')"
                        placement="top">
              <el-button type="text"
                         size="medium"
                         v-show="scope.row.status==1"
                         @click="issuedDp(scope.row.dp_id, 0, 1)"
                         icon="el-icon-back"></el-button>
            </el-tooltip>
            <el-tooltip :content="$nt('删除')"
                        placement="top">
              <el-button type="text"
                         size="medium"
                         v-show="scope.row.status==0"
                         @click="delDp(scope.$index, scope.row.dp_id)"
                         icon="el-icon-delete"></el-button>
            </el-tooltip>
            <el-tooltip :content="$nt('导出')"
                        placement="top">
              <el-button type="text"
                         size="medium"
                         v-show="scope.row.status==1"
                         @click="exportExcel(scope.row.dp_id)"
                         icon="el-icon-download"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="block"
           style="float: right; margin-top: 0.5%; margin-bottom: 0.5%;">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="searchParams.page"
                       :page-sizes="[10, 20, 30, 40]"
                       :page-size="searchParams.per_page"
                       layout="sizes, prev, pager, next"
                       :total="total ">
        </el-pagination>
      </div>
      -->
    </div>
    <!-- 批量查询弹出框 -->
    <el-dialog :title="$nt('客户订单号批量查询')" :visible.sync="bShowHistory">
      <el-row>
        <el-col>
          <el-input type="textarea" v-model="cpos"></el-input>
        </el-col>
      </el-row>
      <el-button style="float: right; margin-top: 10px" type="primary" @click="getSoList">{{ $nt('搜索') }}</el-button>
      <div style="clear: both"></div>
    </el-dialog>

    <el-dialog :title="$nt('批量查询')" :visible.sync="showManySearch">
      <div style="margin-top: -20px">
        <span>{{ $nt('请从Excel直接粘贴客户订单号(CPO)') }}</span>
      </div>
      <el-row>
        <el-col>
          <el-input type="textarea" v-model="searchParams.customer_pos"></el-input>
        </el-col>
      </el-row>
      <el-button style="float: right; margin-top: 10px" type="primary" @click="queryMore">{{ $nt('搜索') }}</el-button>
      <div style="clear: both"></div>
    </el-dialog>
  </div>
</template>

<script>
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
export default {
  name: 'shipping_plan_list',
  data() {
    return {
      totalSum: 0,
      cpos: '',
      firstData: false,
      bShowHistory: false,
      sStyleNoList: [],
      slSeasonList: [],
      so_list: [],
      shipping_list: [],
      customer_list: [],
      sProductLineList: [],
      searchParamsTwo: {
        cpos: '',
        style_id: '',
        season_id: '',
        factory_clerk: '',
        production_line_id: '',
        customer_id: '',
        so: '',
        cpo: '',
        delivery_address_id: '',
        model_id: '',
        supplier_date_from: '',
        supplier_date_to: '',
        // 分页
        page: 1,
        per_page: 10
      },
      nowPane: '待出货',
      dataUrl: '',
      sPageData: ['page', 'per_page', 'paging', 'data', 'total'],
      itemList: [
        {
          type: 'selection',
          key: 'dp_no',
          minWidth: 150
        },
        {
          title: this.$nt('出货单号'),
          key: 'dp_no',
          minWidth: 150
        },
        {
          title: this.$nt('款号'),
          key: 'style_code',
          minWidth: 150
        },
        {
          title: this.$nt('客户订单'),
          key: 'cpo',
          minWidth: 150
        },
        {
          title: this.$nt('出货时间'),
          key: 'dp_time',
          minWidth: 150
        },
        {
          title: this.$nt('交地'),
          key: 'delivery_address_name',
          minWidth: 150
        },
        {
          title: this.$nt('创建时间'),
          key: 'create_time',
          minWidth: 150
        },
        {
          title: this.$nt('创建人'),
          key: 'creator_name',
          minWidth: 150
        },
        {
          title: this.$nt('操作'),
          key: 'action',
          width: 140,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            var status = params.row.status
            var data = []
            data.push(
              h(
                'el-tooltip',
                {
                  props: {
                    content: this.$nt('详情'),
                    placement: 'top'
                  }
                },
                [
                  h('el-button', {
                    props: {
                      icon: 'el-icon-document',
                      size: 'medium',
                      type: 'text'
                    },
                    on: {
                      click: () => {
                        this.addShippingPlan(params.row.dp_id)
                      }
                    }
                  })
                ]
              )
            )
            if (status === '0') {
              data.push(
                h(
                  'el-tooltip',
                  {
                    props: {
                      content: this.$nt('下发'),
                      placement: 'top'
                    }
                  },
                  [
                    h('el-button', {
                      props: {
                        icon: 'el-icon-download',
                        size: 'medium',
                        type: 'text'
                      },
                      on: {
                        click: () => {
                          this.issuedDp(params.row.dp_id, 1, 1)
                        }
                      }
                    })
                  ]
                )
              )
              data.push(
                h(
                  'el-tooltip',
                  {
                    props: {
                      content: this.$nt('删除'),
                      placement: 'top'
                    }
                  },
                  [
                    h('el-button', {
                      props: {
                        icon: 'el-icon-delete',
                        size: 'medium',
                        type: 'text'
                      },
                      on: {
                        click: () => {
                          this.delDp(params.index, params.row.dp_id)
                        }
                      }
                    })
                  ]
                )
              )
            }
            if (status === '1') {
              data.push(
                h(
                  'el-tooltip',
                  {
                    props: {
                      content: this.$nt('取消下发'),
                      placement: 'top'
                    }
                  },
                  [
                    h('el-button', {
                      props: {
                        icon: 'el-icon-back',
                        size: 'medium',
                        type: 'text'
                      },
                      on: {
                        click: () => {
                          this.issuedDp(params.row.dp_id, 0, 1)
                        }
                      }
                    })
                  ]
                )
              )
              data.push(
                h(
                  'el-tooltip',
                  {
                    props: {
                      content: this.$nt('导出'),
                      placement: 'top'
                    }
                  },
                  [
                    h('el-button', {
                      props: {
                        icon: 'el-icon-download',
                        size: 'medium',
                        type: 'text'
                      },
                      on: {
                        click: () => {
                          this.exportExcel(params.row.dp_id)
                        }
                      }
                    })
                  ]
                )
              )
            }
            return h('div', data)
          }
        }
      ],
      showManySearch: false,
      searchParams: {
        status: 0,
        cpo: '',
        dp_time_from: '',
        dp_time_to: ''
        // 分页
        // page: 1,
        // per_page: 10
      },
      dp_date: '',
      total: 10,
      totalTwo: 10,
      shipping_plan_list: [],
      multipleSelection: [],
      multipleSelectionTwo: [],
      dialogFormVisible: false,
      delivery_address_list: [],
      model_list: [],
      pickerOptions2: {
        shortcuts: [
          {
            text: `${this.$nt('最近一周')}`,
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: `${this.$nt('最近一个月')}`,
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: `${this.$nt('最近三个月')}`,
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  methods: {
    handleClick() {
      if (this.nowPane === '出货计划列表') {
        this.getShippingPlanList()
      } else {
        this.getSoList()
      }
    },
    // 获取客户列表 设置默认值
    getMdCustomers() {
      this.$api.getCustomerListJay().then((res) => {
        if (res.status === 200) {
          this.customer_list = res.data.customers
        }
      })
    },
    // so是否可选
    isOptional(row, index) {
      if (row.is_optional === true) {
        return true
      } else {
        return false
      }
    },
    // 获取发货计划单信息列表
    getSoList() {
      if (this.cpos !== '') {
        this.bShowHistory = false
        let arr = this.cpos.split('\n')
        arr.forEach((item, index) => {
          if (item === '') {
            arr.splice(index, 1)
          }
        })
        this.searchParamsTwo.cpos = arr.toString()
      }
      this.so_list = []
      let ret = Object.entries(this.searchParamsTwo)
      this.$api.getSoList(ret).then((res) => {
        this.so_list = []
        if (res.status === 200) {
          this.totalSum = 0
          res.data.data.forEach((item) => {
            item.sm = 0
            item.size_list.forEach((just) => {
              item.sm += just.count
            })
            this.totalSum += item.sm
          })
          this.cpos = ''
          this.searchParamsTwo.cpos = ''
          this.totalTwo = res.data.paging.total
          let soItemList = res.data.data
          soItemList.forEach((item) => {
            item.total_quantity = 0
            if (item.size_list) {
              item.size_list.forEach((size) => {
                item.total_quantity += size.d_count
              })
            } else {
              item.total_quantity = 0
            }
          })
          if (soItemList) {
            for (var i = 0; i < soItemList.length; i++) {
              var item = soItemList[i]
              var data = {}
              data['order'] = item['order']
              data['order_item_id'] = item['order_item_id']
              data['contract_no'] = item.order.contract_no
              data['count'] = item['total_quantity']
              data['delivery_date'] = item['delivery_date']
              data['delivery_address'] = item['delivery_place']
              data['delivery_address_id'] = item['delivery_address_id']
              data['cpo'] = item['customer_po']
              data['so'] = item.order.order_no
              data['customer'] = item.order.customer
              data['customer_id'] = item['customer_id']
              data['shipping_type_id'] = item['shipping_type_id']
              data['shipping_type'] = item['shipping_type']
              data['style_id'] = item['style']['style_id']
              data['style'] = item['style']
              data['as_real_date'] = item['as_real_date']
              data['supplier_date'] = item['supplier_date']
              let str = ''
              for (var j = 0; j < item['color'].length; j++) {
                str = str + item['color'][j]['color_code'] + ','
              }
              data['model_str'] = str.substring(0, str.length - 1)
              data['model_id'] = item['model_id']
              data['size_list'] = item['size_list']
              data['is_optional'] = true
              data['is_no_1'] = item['is_no_1']
              this.so_list.push(data)
              // console.log(this.so_list)
            }
            // 如果之前选过物料数据了
            if (this.shipping_list.length > 0) {
              for (var m = 0; m < this.shipping_list.length; m++) {
                var dpItem = this.shipping_list[m]
                for (var n = 0; n < this.so_list.length; n++) {
                  var soItem = this.so_list[n]
                  // 说明已经选择过了
                  if (soItem['order_item_id'] === dpItem['order_item_id']) {
                    soItem['is_optional'] = false
                    break
                  }
                }
              }
            }
          }
        }
      })
    },
    // 分页size cb
    handleSizeChangeTwo(pageSize) {
      this.searchParamsTwo.per_page = pageSize
      this.getSoList('arg1', 'arg2')
    },
    // 当前页 change cb
    handleCurrentChangeTwo(currentPage) {
      this.searchParamsTwo.page = currentPage
      this.getSoList('arg1', 'arg2')
    },
    // 把选中的soItem 添加上去
    addSoItem() {
      var sData = this.multipleSelectionTwo
      if (this.multipleSelectionTwo.length === 0) {
        this.$message.warning('至少选择一项')
        return
      }
      this.$router.push({ path: '/add_shipping_plan/add', query: { name: sData } })
    },
    handleSelectionChangeTwo(val) {
      this.multipleSelectionTwo = val
    },
    // 获取季节
    getSeasonList(customerId) {
      this.$api.getMdSeason(customerId).then((res) => {
        if (res.status !== 200) return
        this.slSeasonList = res.data.seasons
      })
    },
    // 获取生产线
    getProductLineList(id) {
      this.$api
        .getERPProductLineList1(id)
        .then((res) => {
          if (res.status === 200) {
            this.sProductLineList = res.data.datas
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 获取工厂列表
    getFactoryList() {
      this.$api
        .getFactoryList()
        .then((res) => {
          if (res.status === 200) {
            this.sFactoryList = []
            for (var j = 0; j < res.data.length; j++) {
              var item = res.data[j]
              item.factory_id = item.company_id
              item.factory_name = item.company_name
              item.bHdr = 1
              for (var i = 0; i < item.data.length; i++) {
                var subItem = item.data[i]
                subItem.company_id = item.company_id
                this.sFactoryList.push(subItem)
              }
            }
            let doData = []
            if (this.chooseSType === 'DO') {
              doData = res.data
              doData.forEach((item) => {
                item.data = []
              })
              this.sOriginalFactoryList = doData
            } else if (this.chooseSType === 'MO') {
              this.sOriginalFactoryList = res.data
            }
            // this.sOriginalFactoryList = res.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 客户改变获取数据
    getDataByCustomer() {
      let param = this.searchParamsTwo.customer_id
      this.getDeliveryList(param)
      this.getStyleList(param)
      this.getSeasonList(param)
      this.getProductLineList(param)
      this.searchParamsTwo.style_id = ''
      this.searchParamsTwo.delivery_address_id = ''
      this.searchParamsTwo.season_id = ''
      this.searchParamsTwo.production_line_id = ''
    },
    // 获取交地列表
    getDeliveryList(customerId) {
      this.$api.getDeliverAddress(customerId).then((res) => {
        if (res.status === 200) {
          this.delivery_address_list = res.data.delivery_addresses
        }
      })
    },
    // 根据客户选model
    getModel(customerId) {
      this.$api.getCustomerColors(customerId, 1000).then((res) => {
        if (res.status === 200) {
          this.sModelList = res.data.colors
        }
      })
    },
    // 根据客户选款
    getStyleList(customerId) {
      this.$api.getCustomerModelList(customerId).then((res) => {
        this.sStyleNoList = res.data.styles
      })
    },
    // 批量导出
    multipleExport() {
      this.multipleSelection = this.$refs.cmTable.getSelection()
      if (this.multipleSelection.length === 0) {
        this.$message.error(`${this.$nt('请至少选择一项进行导出')}`)
        return
      }
      let str = ''
      this.multipleSelection.forEach((item) => {
        str += item.dp_id + ','
      })
      str = str.substr(0, str.length - 1)
      window.location.href = '/dp/export/?dp_ids=' + str
    },
    // 批量查询
    queryMore() {
      this.showManySearch = false
      this.customerPos = this.searchParams.customer_pos.toString()
      var arr = this.customerPos.split('\n')
      arr.forEach((item, index) => {
        if (item === '') {
          arr.splice(index, 1)
        }
      })
      this.customerPos = arr.toString()
      this.searchParams.page = 1
      this.searchParams.cpos = this.customerPos
      this.getShippingPlanList()
    },
    // 获取发货计划单信息列表
    getShippingPlanList() {
      // if (arguments.length < 2) {
      //   this.searchParams.page = 1
      // }
      let ret = this.$pub_fun.getStringFilter(this.searchParams)
      let str = '/po/dp/?'
      let tempUrl = str + ret
      if (this.dataUrl === tempUrl) {
        this.$refs.cmTable.getDataList()
      } else {
        this.dataUrl = tempUrl
      }
      // this.$api.getShippingPlanList(ret).then((res) => {
      //   if (res.status === 200) {
      //     this.shipping_plan_list = res.data.data
      //     this.total = res.data.paging.total
      //   }
      // })
    },
    // 分页size
    handleSizeChange(pageSize) {
      this.searchParams.per_page = pageSize
      this.getShippingPlanList('arg1', 'arg2')
    },
    // 当前页 change cb
    handleCurrentChange(currentPage) {
      this.searchParams.page = currentPage
      this.getShippingPlanList('arg1', 'arg2')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 创建发货单
    addShippingPlan(dpId) {
      this.$router.push('/add_shipping_plan/' + dpId)
    },
    // 根据时间段查询
    getSoByTime() {
      if (this.delivery_dates !== '') {
        let dateList = this.dp_date.toString().split(',')
        this.searchParams.dp_time_from = dateList[0]
        this.searchParams.dp_time_to = dateList[1]
      }
      this.getShippingPlanList()
    },
    // 删除整个发货单
    delDp(index, dpId) {
      let temp = []
      temp.push(dpId)
      this.$confirm(`${this.$nt('确定删除该发货单吗?')}`, `${this.$nt('提示')}`, {
        confirmButtonText: `${this.$nt('确定')}`,
        cancelButtonText: `${this.$nt('取消')}`,
        type: 'warning'
      })
        .then(() => {
          this.$api.delDp(temp).then((res) => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: `${this.$nt('删除成功!')}`
              })
              this.getShippingPlanList()
              this.$refs.cmTable.getDataList()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: `${this.$nt('已取消删除')}`
          })
        })
    },
    // 下发
    issuedDp(dpId, status, type) {
      let ret = []
      if (type === 1) {
        let data = {}
        data['dp_id'] = dpId
        data['status'] = status
        ret.push(data)
        this.$api.issuedDp(ret).then((res) => {
          if (res.status === 200) {
            if (status === 1) {
              this.$message({
                type: 'success',
                message: `${this.$nt('下发成功')}`
              })
            } else {
              this.$message({
                type: 'success',
                message: `${this.$nt('已取消下发')}`
              })
            }
            // this.getShippingPlanList()
            this.$refs.cmTable.getDataList()
          }
        })
      } else {
        // 批量下发
        if (!this.multipleSelection.length) {
          this.$message({
            type: 'error',
            message: `${this.$nt('请至少选择一项')}`
          })
          return false
        }
        this.multipleSelection.forEach((item, index, self) => {
          let data = {}
          data['dp_id'] = item.dp_id
          data['status'] = status
          ret.push(data)
        })
        this.$api.issuedDp(ret).then((res) => {
          if (res.status === 200) {
            if (status === 1) {
              this.$message({
                type: 'success',
                message: `${this.$nt('下发成功')}`
              })
            } else {
              this.$message({
                type: 'success',
                message: `${this.$nt('已取消下发')}`
              })
            }
            this.getShippingPlanList()
          }
        })
      }
    },
    // 导出发货单
    exportDp() {
      let ret = Object.entries(this.searchParams)
      let str = `dp_excel/dp_export_excel/?`
      for (let item of ret) {
        if (item[1] !== '' && item[1] !== null) {
          str += `${item[0]}=${item[1]}&`
        }
      }
      window.location.href = `/pu_order/${str}`
    },
    // 新导出
    exportExcel(dpId) {
      this.$api.getDpItemByDpId(dpId).then((res) => {
        if (!res.data.length) {
          this.$message.error('没有可导出的数据')
          return
        }
        if (res.status === 200) {
          let excelName = res.data[0].dp.dp_no
          let jsonData = []
          let detailJsonData = []
          res.data.forEach((item) => {
            if (this.$pub_fun.getManyLevelData(item, 'delivery_address.area')) {
              item.delivery_address.area = JSON.parse(item.delivery_address.area).join('/')
            }
            jsonData.push({
              出货单号: item.dp.dp_no,
              出货时间: item.dp.dp_time,
              单号: item.so,
              客户: item.customer.customer_name,
              客户订单号: item.cpo,
              颜色: item.model_str,
              款式: item.style.style_code,
              款名: item.style.style_name,
              交期CDD: item.delivery_date,
              交期EHD: item.dp_sizes[0].supplier_date,
              交期CHD: item.contractual_date,
              出货方式: item.shipping_type.shipping_type_name,
              数量: item.count,
              品牌: item.style.brand.brand_name,
              季节: item.season,
              成衣颜色: item.model[0].color_name,
              SPL: item.customer_clerk,
              业务员: item.factory_clerk,
              箱数: item.total_cartons,
              '总箱体积/立方': item.total_volume,
              工厂: item.factory_name,
              交地: item.delivery_address.delivery_address_name,
              国家及交货地址:
                item.delivery_address.area +
                ',' +
                this.$pub_fun.getManyLevelData(item, 'delivery_address.country_obj.country_name'),
              备注: item.dp_remarks
            })
            if (item.dp_sizes.length > 0) {
              item.dp_sizes.forEach((size) => {
                detailJsonData.push({
                  交期EHD: item.dp_sizes[0].supplier_date,
                  订单号码: item.cpo,
                  工厂: item.factory_name,
                  款号: item.style.style_code,
                  model: item.model[0].color_code,
                  颜色: item.model[0].color_name,
                  'item Code': size.color_size.item_code,
                  'Size 尺码': size.color_size.size.size_name,
                  '数量(pcs)': size.quantity,
                  箱数: size.cartons,
                  'Parcels N° 箱号': size.carton_no,
                  PCB每箱件数: size.pcb,
                  UE: size.ue,
                  纸箱尺寸: size.box_spec,
                  'Net weight (kgs)净重': size.net_weight,
                  '毛重(Gross Weigh)': size.gross_weight,
                  'Volume (CBM)体积': size.volume
                })
              })
            }
          })
          // let header = ['出货单号', '出货时间', '单号', '客户', '客户订单号', '颜色', '款式', '交期CDD', '出货方式', '季节', '工厂', '业务员', '数量', '交地', '备注']
          this.$pub_fun.multipleJson2Excel(
            [
              { json: jsonData, sheetName: 'sheet1' },
              { json: detailJsonData, sheetName: 'sheet2' }
            ],
            excelName
          )
          // let workbook = XLSX.utils.book_new()
          // let wb = XLSX.utils.json_to_sheet(jsonData, { header: ['出货单号', '出货时间', '单号', '客户', '客户订单号', '颜色', '款式', '交期CDD', '出货方式', '季节', '工厂', '业务员', '数量', '交地', '备注'] })
          // XLSX.utils.book_append_sheet(workbook, wb, 'sheet1')
          // let wbout = XLSX.write(workbook, {
          //   bookType: 'xlsx',
          //   bookSST: true,
          //   type: 'array'
          // })
          // try {
          //   FileSaver.saveAs(
          //     new Blob([wbout], { type: 'application/octet-stream' }),
          //     excelName + '.xlsx'
          //   )
          // } catch (e) {
          //   if (typeof console !== 'undefined') console.log(e, wbout)
          // }
          // return wbout
        }
      })
    }
  },
  created() {
    // this.getShippingPlanList()
    this.getSoList()
    this.getMdCustomers()
    this.getFactoryList()
  },
  activated() {
    this.getSoList()
    this.$refs.cmTable.getDataList()
  }
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 5px;
}
.el-dialog__body {
  padding: 5px 20px;
}
.spValue {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.headerHeight {
  height: 50px;
  display: flex;
  align-items: center;
}
</style>
