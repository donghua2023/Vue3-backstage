<template>
  <div class="store_list">
    <el-tabs type="border-card" v-model="nowPane" @tab-click="handleClick">
      <el-tab-pane :label="$nt('印花待办')" :name="$nt('印花待办')">
        <cm-table-list
          ref="cmTableY"
          sTitle=""
          name="embroidery_outsourcingY"
          :iAnotherHeight="-50"
          s-data-url="md/outsource_order/todo/?process=印花"
          :s-filter-data="slStyleFilterData"
          :s-page-data="sStylePageData"
          :s-another-button="sStyleButton"
          :item-list="sStyleDataCaption">
        </cm-table-list>
      </el-tab-pane>
      <el-tab-pane :label="$nt('绣花待办')" :name="$nt('绣花待办')">
        <cm-table-list
          ref="cmTableX"
          sTitle=""
          name="embroidery_outsourcingX"
          :iAnotherHeight="-120"
          s-data-url="md/outsource_order/todo/?process=绣花"
          :s-filter-data="slStyleFilterData"
          :s-page-data="sStylePageData"
          :s-another-button="sStyleButton"
          :item-list="sStyleDataCaption">
        </cm-table-list>
      </el-tab-pane>
      <el-tab-pane :label="$nt('成衣待办')" :name="$nt('成衣待办')">
        <cm-table-list
          ref="cmTableC"
          sTitle=""
          name="embroidery_outsourcingC"
          :iAnotherHeight="-150"
          s-data-url="md/outsource_order/todo/?sType=clothes"
          :s-filter-data="slStyleFilterTwo"
          :s-page-data="sStylePageData"
          :s-another-button="sStyleButton"
          :item-list="sStyleDataCaption">
        </cm-table-list>
      </el-tab-pane>
      <el-tab-pane :label="$nt('合同列表')" :name="$nt('合同列表')">
        <cm-table-list
          ref="cmTableH"
          :s-data-url="dataUrl"
          :item-list="itemList"
          :iAnotherHeight="-150"
          name="embroidery_List"
          :s-page-data="sPageData"
          :s-filter-data="sFilterData"
          :s-another-button="sAnotherButton"></cm-table-list>
      </el-tab-pane>
    </el-tabs>
    <!-- 创建的dialog -->
    <el-dialog
      :title="
        '创建' +
        $nt(nowPane === '印花待办' ? '印花' : nowPane === '绣花待办' ? '绣花' : nowPane === '成衣待办' ? '成衣' : '') +
        '合同'
      "
      :visible.sync="createSign"
      v-if="createSign"
      @close="closeDialog"
      width="90%">
      <!--  -->
      <el-row :span="12" type="flex" align="middle" style="margin-bottom: 10px">
        <el-col :span="8">
          <span>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $nt('合同号:') }}</span>
          <el-input size="mini" disabled clearable style="width: 70%"></el-input>
        </el-col>
        <el-col :span="8">
          <span style="color: #1483cc"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $nt('甲方:') }}</span
          >
          <el-select
            style="width: 70%"
            clearable
            filterable
            v-model="founddata.receive_company_id"
            size="mini"
            @change="jiaipone(founddata)">
            <el-option
              v-for="(item, index) in companiesList"
              :key="index"
              :value="item.company_id"
              :label="item.company_name"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $nt('收货地址') }}:</span>
          <el-input size="mini" v-model="founddata.receive_address" clearable style="width: 70%"></el-input>
        </el-col>
        <el-col :span="8">
          <span>{{ $nt('收货联系人') }}:</span>
          <el-input
            size="mini"
            placeholder="请输入"
            v-model="founddata.receive_linkman"
            clearable
            style="width: 70%"></el-input>
        </el-col>
      </el-row>
      <el-row :span="12" type="flex" align="middle" style="margin-bottom: 10px">
        <el-col :span="8">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $nt('联系电话') }}:</span>
          <el-input size="mini" v-model="founddata.receiver_phone" clearable style="width: 70%"></el-input>
        </el-col>
        <el-col :span="8">
          <span style="color: #1483cc"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $nt('乙方:') }}</span
          >
          <el-select
            style="width: 70%"
            clearable
            filterable
            v-model="founddata.outsource_factory_id"
            size="mini"
            @change="yiipone(founddata)">
            <el-option
              v-for="(item, index) in factoryList"
              :key="index"
              :value="item.factory_id"
              :label="item.factory_name"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $nt('乙方地址') }}:</span>
          <el-input size="mini" v-model="founddata.outsource_factory_address" clearable style="width: 70%"></el-input>
        </el-col>
        <el-col :span="8">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;{{ $nt('乙方电话') }}:</span>
          <el-input size="mini" v-model="founddata.outsource_factory_phone" clearable style="width: 70%"></el-input>
        </el-col>
      </el-row>
      <el-row :span="12" type="flex" align="middle" style="margin-bottom: 10px">
        <el-col :span="8">
          <span style="color: #1483cc">{{ $nt('乙方运费承担') }}:</span>
          <el-select style="width: 70%" clearable filterable v-model="founddata.freight_undertake" size="mini">
            <el-option
              v-for="(item, index) in freightList"
              :key="index"
              :value="item.name"
              :label="item.name"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8" style="margin-left: 20px">
          <span>{{ $nt('加工内容') }}:</span>
          <el-input size="mini" disabled v-model="founddata.process" clearable style="width: 71%"></el-input>
        </el-col>
        <el-col :span="8">
          <span>{{ $nt('计划创建人') }}:</span>
          <el-input size="mini" v-model="founddata.creator_name" clearable disabled style="width: 71%"></el-input>
        </el-col>
        <el-col :span="8">
          <span>{{ $nt('计划创建时间') }}:</span>
          <el-input size="mini" v-model="founddata.create_time" clearable disabled style="width: 70%"></el-input>
        </el-col>
      </el-row>
      <el-table
        border
        :data="bomData"
        style="width: 100%; overflow: auto"
        max-height="473"
        :render-header="addRedStar"
        @selection-change="handleSelectionChange"
        default-expand-all>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column :label="$nt('CPO')" prop="customer_po" show-overflow-tooltip></el-table-column>
        <el-table-column :label="$nt('款号')" prop="style_code"></el-table-column>
        <el-table-column :label="$nt('季节')" prop="season_name"></el-table-column>
        <el-table-column :label="$nt('颜色')" prop="color_name"></el-table-column>
        <el-table-column :label="$nt('工序详情')" prop="desc"></el-table-column>
        <el-table-column :label="$nt('订单数量')" prop="quantity">
          <template slot-scope="scope">
            <span :title="scope.row.quantity">
              {{ parseFloat(parseFloat(Number(scope.row.quantity)).toFixed(2)) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :render-header="addRedStar" :label="$nt('计划部询价')" width="120">
          <template slot-scope="scope">
            <el-input
              clearable
              type="number"
              @change="sync_price(scope.row)"
              :placeholder="$nt('请输入')"
              v-model="scope.row.consultation_price"
              size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column :render-header="addRedStar" :label="$nt('发料日期')" prop="shipment_date" width="160">
          <template slot-scope="scope">
            <el-date-picker
              size="mini"
              @change="sync_shipment(scope.row)"
              v-model="scope.row.shipment_date"
              type="date"
              style="width: 100%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column :render-header="addRedStar" :label="$nt('合同交货期')" prop="delivery_date" width="160">
          <template slot-scope="scope">
            <el-date-picker
              size="mini"
              @change="sync_delivery(scope.row)"
              v-model="scope.row.delivery_date"
              type="date"
              style="width: 100%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column :label="$nt('备注')" width="160">
          <template slot-scope="scope">
            <el-input
              type="textarea"
              autosize
              clearable
              :placeholder="$nt('请输入')"
              v-model="scope.row.remark"
              size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column :label="$nt('操作')" width="120">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClickcopy(scope.row)" type="text" size="small">复制</el-button> -->
            <el-button
              @click="handleSplit(scope.row, scope.$index)"
              type="text"
              size="small"
              v-show="!scope.row.isSplit"
              >拆分</el-button
            >
            <el-button @click="handleDelete(scope.row, scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-button class="dialog-data" type="primary" @click="Bhold">{{ $nt('保存') }}</el-button>
      </div>
    </el-dialog>
    <!-- 拆分明细dialog -->
    <el-dialog title="拆分明细" :visible.sync="splitDetailSync" width="80%" @close="closeSplitDetail">
      <el-table border :data="splitDetailData" style="width: 100%; overflow: auto" max-height="473">
        <el-table-column :label="$nt('CPO')" prop="customer_po" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tooltip
              placement="top-start"
              width="600"
              effect="light"
              trigger="manual"
              v-model="tooltipVs"
              :manual="true">
              <div slot="content">
                <el-table :data="SMContentData" border fit>
                  <el-table-column :label="$nt('颜色')" prop="color_name"></el-table-column>
                  <el-table-column v-for="(item, index) in sizeList" :label="item" :key="index">
                    <template slot-scope="scope">
                      <span>{{ scope.row[item] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$nt('合计')" prop="total"></el-table-column>
                </el-table>
              </div>
              <div @click="tooltipVs = !tooltipVs" style="cursor: pointer; color: #2d8cf0">
                {{ scope.row.customer_po }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column :label="$nt('款号')" prop="style_code"></el-table-column>
        <el-table-column :label="$nt('季节')" prop="season_name"></el-table-column>
        <el-table-column :label="$nt('颜色')" prop="color_name"></el-table-column>
        <el-table-column :label="$nt('工序详情')" prop="desc"></el-table-column>
        <el-table-column :label="$nt('订单数量')" prop="quantity">
          <template slot-scope="scope">
            <el-input
              size="mini"
              type="number"
              v-model="scope.row.quantity"
              style="width: 100%"
              placeholder="请填写拆分数量"
              clearable
              oninput="value=value.replace(/[^\d]/g,'')">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column :label="$nt('发料日期')" prop="shipment_date" width="160">
          <template slot-scope="scope">
            <el-date-picker
              size="mini"
              v-model="scope.row.shipment_date"
              type="date"
              style="width: 100%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column :label="$nt('合同交货期')" prop="delivery_date" width="160">
          <template slot-scope="scope">
            <el-date-picker
              size="mini"
              v-model="scope.row.delivery_date"
              type="date"
              style="width: 100%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-data">
        <el-button type="primary" @click="splitDetailSave">{{ $nt('保存') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import cmTableList from '../../components/common/cmTableList.vue'
export default {
  name: 'embroidery_outsourcing',
  components: {
    cmTableList
  },
  data() {
    return {
      Cjroles: '',
      Jhroles: '',
      Cbroles: '',
      Cwroles: '',
      Zroles: '',
      multipleSelection: [],
      founddata: {},
      freightList: [
        {
          name: '单程'
        },
        {
          name: '双程'
        },
        {
          name: '不承担'
        }
      ],
      roles: [],
      OPData: [],
      sumAllA: [],
      dtlArrs: [],
      sumAlls: [],
      sourceSizeList: [],
      tbhList: [],
      showArr: [],
      dtlArray: [],
      disableArr: [],
      btData: [],
      keyArr: [],
      cutNum: [],
      totalNum: 0,
      totalObj: [],
      sumData: [],
      cutRate: [],
      SMData: [],
      isShow: false,
      showSplitSkuColor: [],
      getpartsListId: [],
      specialProcesses: [],
      createSign: false,
      plan_date: [],
      bill_date: '',
      batch: '',
      createFactory: '',
      workOrder: null,
      showArr: [],
      factoryList: [],
      companiesList: [],
      // 新建字段..........//
      create_time: '',
      creator_name: '',
      b_phone: '',
      b_address: '',
      b_factory_name: '',
      a_phone: '',
      a_address: '',
      a_company_name: '',
      wo_order_no: '',
      wo_order_id: '',
      contract_time: '',
      delivery_date: '',
      payment_rate: '',
      is_prepay: false,
      contract_address: '',
      contract_no: '',
      a_company_id: '',
      b_company_id: '',
      // ................//
      bomData: [],
      dataUrl: '',
      slStyleFilterData: [
        {
          sKey: 'customer_id',
          sValue: '',
          sCaption: this.$nt('客户'),
          sType: 'select',
          sSelectItems: [],
          clearable: true,
          sOnChange: () => {
            this.customerChanges()
          }
        },
        {
          sKey: 'style_id',
          sValue: '',
          sCaption: this.$nt('款号'),
          sType: 'select',
          sSelectItems: [],
          clearable: true
        },
        {
          sKey: 'outsource_factory_id',
          sValue: '',
          sCaption: this.$nt('外协工厂'),
          sType: 'select',
          sSelectItems: [],
          clearable: true
        },
        {
          sKey: 'customer_po',
          sValue: '',
          sCaption: this.$nt('CPO号'),
          sType: 'text'
        }
      ],
      slStyleFilterTwo: [
        {
          sKey: 'customer_id',
          sValue: '',
          sCaption: this.$nt('客户'),
          sType: 'select',
          sSelectItems: [],
          clearable: true,
          sOnChange: () => {
            this.customerChanges()
          }
        },
        {
          sKey: 'style_id',
          sValue: '',
          sCaption: this.$nt('款号'),
          sType: 'select',
          sSelectItems: [],
          clearable: true
        },
        {
          sKey: 'outsource_factory_id',
          sValue: '',
          sCaption: this.$nt('外协工厂'),
          sType: 'select',
          sSelectItems: [],
          clearable: true
        },
        {
          sKey: 'customer_po',
          sValue: '',
          sCaption: this.$nt('CPO号'),
          sType: 'text'
        },
        {
          sKey: 'wo_order_no',
          sValue: '',
          sCaption: this.$nt('工单号'),
          sType: 'text'
        },
        {
          sKey: 'process',
          sValue: '',
          sCaption: this.$nt('工序'),
          sType: 'select',
          clearable: true,
          sSelectItems: []
        }
      ],
      sStyleButton: [
        {
          sName: `${this.$nt('创建合同')}`,
          sClick: () => {
            this.addOne()
          }
        }
      ],
      sStylePageData: ['page', 'per_page', 'paging', 'data', 'total'],
      // 待办
      sStyleDataCaption: [
        {
          title: '',
          type: 'selection',
          minWidth: 50
        },
        {
          title: this.$nt('销售单号'),
          sManyKey: 'so_order_no',
          minWidth: 100
        },
        {
          title: this.$nt('CPO'),
          Key: 'customer_po',
          minWidth: 130,
          ellipsis: true,
          render: (h, params) => {
            let data = params.row.customer_po
            return h(
              'span',
              {
                attrs: {
                  title: params.row.customer_po
                }
              },
              data
            )
          }
        },
        {
          title: this.$nt('工单号'),
          sManyKey: 'wo_order_no',
          minWidth: 100
        },
        {
          title: this.$nt('客户'),
          sManyKey: 'customer_name',
          minWidth: 100
        },
        {
          title: this.$nt('款号'),
          sManyKey: 'style_code',
          minWidth: 100
        },
        {
          title: this.$nt('季节'),
          sManyKey: 'season_name',
          minWidth: 100
        },
        {
          title: this.$nt('颜色'),
          sManyKey: 'color_name',
          minWidth: 100
        },
        {
          title: this.$nt('订单数量'),
          key: 'quantity',
          minWidth: 100,
          render: (h, params) => {
            let str = parseFloat(parseFloat(Number(params.row.quantity)).toFixed(2))
            return h('span', str)
          }
        },
        {
          title: this.$nt('工序'),
          key: 'process',
          minWidth: 100
        },
        {
          title: this.$nt('工单类型'),
          key: 'wo_order_type',
          minWidth: 100,
          render: (h, params) => {
            let str =
              params.row.wo_order_type == 0
                ? '面料'
                : params.row.wo_order_type == 1
                ? '辅料'
                : params.row.wo_order_type == 0
                ? '面辅料'
                : ''
            return h('span', str)
          }
        },
        {
          title: this.$nt('工序详情'),
          sManyKey: 'desc',
          minWidth: 100
        },
        {
          title: this.$nt('外协工厂'),
          sManyKey: 'outsource_factory_name',
          minWidth: 100
        },
        {
          title: this.$nt('开单人'),
          sManyKey: 'wo_creator_name',
          minWidth: 100
        },
        {
          title: this.$nt('开单时间'),
          sManyKey: 'wo_create_time',
          minWidth: 100
        }
      ],
      nowPane: '印花待办',
      sPageData: ['page', 'per_page', 'paging', 'data', 'total'],
      sAnotherButton: [],
      sDataList: [],
      searchParams: {
        status: '0',
        style_id: '',
        customer_id: '',
        supplier_id: '',
        production_line_id: '',
        re_order_no: '',
        bill_no: '',
        page: 1,
        per_page: 10
      },
      visible2: false,
      sCreateDate: null,
      sInDate: null,
      dialogFormVisible: false,
      multipleSelection: [],
      iPageDataCount: 0,
      slCustomerList: [],
      slStyleList: [],
      slProductionLineList: [],
      slProductionLineLists: [],
      multipleData: [],
      splitDetaiIndex: -1,
      splitDetailSync: false,
      SMContentData: [],
      splitDetailData: [],
      sizeList: [],
      tooltipVs: false
    }
  },
  computed: {
    sFilterData() {
      let arr = [
        { sKey: 'order_no', sValue: '', sCaption: `${this.$nt('合同号')}`, sType: 'text', clearable: true },
        { sKey: 'process', sValue: '', sCaption: this.$nt('工序'), sType: 'select', clearable: true, sSelectItems: [] },
        {
          sKey: 'outsource_factory_id',
          sValue: '',
          sCaption: this.$nt('外协工厂'),
          sType: 'select',
          sSelectItems: [],
          clearable: true
        },
        {
          sKey: 'receive_company_id',
          sValue: '',
          sCaption: `${this.$nt('接单公司')}`,
          sType: 'select',
          sSelectItems: [],
          clearable: true
        },
        {
          sKey: 'status',
          sValue: '',
          iCaptionWidth: '50px',
          sCaption: `${this.$nt('状态')}`,
          sType: 'select',
          span: 4,
          sSelectItems: []
        }
      ]
      arr.forEach((element) => {
        if (element.sKey === 'status') {
          element.sSelectItems = [
            { sKey: '0', sValue: `${this.$nt('草稿')}` },
            { sKey: '3', sValue: `${this.$nt('已提交')}` },
            { sKey: '9', sValue: `${this.$nt('审核中')}` },
            { sKey: '1', sValue: `${this.$nt('已审核')}` },
            { sKey: '4', sValue: `${this.$nt('已发出')}` },
            { sKey: '5', sValue: `${this.$nt('已收回')}` },
            { sKey: '6', sValue: `${this.$nt('已发货')}` },
            { sKey: '22', sValue: `${this.$nt('被驳回')}` },
            { sKey: 'all', sValue: `${this.$nt('全部')}` }
          ]
          element.sValue = 'all'
        }
      })
      return arr
    },
    itemList() {
      let List = [
        {
          title: this.$nt('合同号'),
          key: 'order_no',
          minWidth: 100
        },
        {
          title: this.$nt('接单公司'),
          key: 'receive_company_name',
          minWidth: 100
        },
        {
          title: this.$nt('订单数量'),
          key: 'quantity',
          minWidth: 100,
          render: (h, params) => {
            let str = parseFloat(parseFloat(Number(params.row.quantity)).toFixed(2))
            return h('span', str)
          }
        },
        {
          title: this.$nt('工序'),
          sManyKey: 'process',
          minWidth: 100
        },
        {
          title: this.$nt('外协工厂'),
          key: 'outsource_factory_name',
          minWidth: 100
        },
        {
          title: this.$nt('计划创建人'),
          key: 'creator_name',
          minWidth: 100
        },
        {
          title: this.$nt('计划创建时间'),
          key: 'create_time',
          sType: 'date',
          minWidth: 100
        },
        {
          title: this.$nt('合同状态'),
          key: 'status',
          minWidth: 100,
          render: (h, params) => {
            let str =
              params.row.status === 1
                ? this.$nt('已审核')
                : params.row.status === 0
                ? this.$nt('草稿')
                : params.row.status === 9
                ? this.$nt('审核中')
                : params.row.status === 2
                ? this.$nt('关单')
                : params.row.status === 3
                ? this.$nt('已提交')
                : params.row.status === 4
                ? this.$nt('已发出')
                : params.row.status === 5
                ? this.$nt('已收回')
                : params.row.status === 6
                ? this.$nt('已发货')
                : params.row.status === 22
                ? this.$nt('被驳回')
                : ''
            return h('span', str)
          }
        },
        {
          title: this.$nt('审批备注'),
          key: 'approval_remark',
          minWidth: 100
        },
        {
          title: this.$nt('操作'),
          key: 'action',
          width: 140,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            var status = params.row.status
            var contract_no_sign = params.row.contract_no_sign
            const data = [
              h(
                'el-tooltip',
                {
                  props: {
                    content: `${this.$nt('详情')}`,
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
                        this.editDtl(params.row)
                      }
                    }
                  })
                ]
              )
            ]
            if (status == 0) {
              data.push(
                h(
                  'el-tooltip',
                  {
                    props: {
                      content: `${this.$nt('删除')}`,
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
                          this.editDel(params.row)
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
      ]
      return List
    }
  },
  methods: {
    // 工序的接口
    ALLcraftList() {
      this.$api.getAll_CraftList().then((res) => {
        if (res.status === 200) {
          console.log(res.data, 'res')
          const filteredArray = res.data.datas.filter((obj) => {
            const keywords = []
            return !keywords.some((keyword) => obj.meta_name.includes(keyword))
          })
          var sSlData = []
          for (var i = 0; i < filteredArray.length; i++) {
            var item = filteredArray[i]
            var sItem = {}
            sItem.sKey = item.meta_code
            sItem.sValue = item.meta_code
            sSlData.push(sItem)
          }
          this.slStyleFilterTwo[5].sSelectItems = sSlData
          this.sFilterData[1].sSelectItems = sSlData
        }
      })
    },
    // 必选标识
    addRedStar(h, { column }) {
      return [h('span', { style: 'color: #F56C6C' }, '*'), h('span', ' ' + column.label)]
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    sync_price(row) {
      this.multipleSelection.forEach((item) => {
        this.$set(item, 'consultation_price', row.consultation_price)
      })
    },
    sync_shipment(row) {
      this.multipleSelection.forEach((item) => {
        this.$set(item, 'shipment_date', row.shipment_date)
      })
    },
    sync_delivery(row) {
      this.multipleSelection.forEach((item) => {
        this.$set(item, 'delivery_date', row.delivery_date)
      })
    },
    addRedStar(h, { column }) {
      console.log(column, 'column')
      return [h('span', { style: 'color: red' }, '*'), h('span', ' ' + column.label)]
    },
    // 创建
    Bhold() {
      if (this.founddata.receive_company_id === undefined || this.founddata.receive_company_id === '') {
        this.$message.error('请选择甲方')
        return
      }
      if (this.founddata.outsource_factory_id === undefined || this.founddata.outsource_factory_id === '') {
        this.$message.error('请选择乙方')
        return
      }
      if (this.founddata.freight_undertake === undefined || this.founddata.freight_undertake === '') {
        this.$message.error('请选择乙方运费承担')
        return
      }
      this.bomData.forEach((item) => {
        item.outsource_order_todo_id = item.id
      })
      for (let i = 0; i < this.bomData.length; i++) {
        const item = this.bomData[i]
        if (item.consultation_price == '' || item.consultation_price == null || !item.consultation_price) {
          this.$message.error('计划部询价必填')
          return
        }
        if (item.shipment_date == '' || item.shipment_date == null || !item.shipment_date) {
          this.$message.error('发料日期必填')
          return
        }
        if (item.delivery_date == '' || item.delivery_date == null || !item.delivery_date) {
          this.$message.error('合同交货期必填')
          return
        }
      }
      this.bomData.forEach((item) => {
        item.quantity = Number(item.quantity)
      })
      let data = {
        receive_company_id: this.founddata.receive_company_id,
        outsource_factory_id: this.founddata.outsource_factory_id,
        receive_address: this.founddata.receive_address,
        receive_linkman: this.founddata.receive_linkman,
        receiver_phone: this.founddata.receiver_phone,
        outsource_factory_id: this.founddata.outsource_factory_id,
        outsource_factory_address: this.founddata.outsource_factory_address,
        outsource_factory_phone: this.founddata.outsource_factory_phone,
        freight_undertake: this.founddata.freight_undertake,
        process: this.founddata.process,
        wo_order_type: this.founddata.wo_order_type,
        items: this.bomData
      }
      this.$api.postYXHfound(data).then((res) => {
        if (res.status !== 200) return
        this.$message.success(this.$nt('确认成功'))
        if (this.nowPane === '成衣待办') {
          this.$refs.cmTableC.getDataList()
        }
        if (this.nowPane === '绣花待办') {
          this.$refs.cmTableX.getDataList()
        }
        if (this.nowPane === '印花待办') {
          this.$refs.cmTableY.getDataList()
        }
        this.createSign = false
        this.founddata = {}
        this.goDtl(res.data.id)
      })
    },
    // 拆分明细保存
    splitDetailSave() {
      if (Number(this.splitDetailData[0].quantity) <= 0) {
        return this.$message.error('拆分的数量不能为负数或者0')
      }
      const index = this.splitDetaiIndex
      const splitDetaiNum = Number(this.splitDetailData[0].quantity)
      const bomNum = Number(this.bomData[index].quantity)
      if (bomNum <= splitDetaiNum) {
        return this.$message.error('拆分的数量不能大于/等于原本的数量')
      }
      // 控制拆分按钮的显隐标志
      this.splitDetailData[0].isSplit = true

      this.bomData[index].quantity = bomNum - splitDetaiNum + ''
      this.bomData.push(this.splitDetailData[0])
      console.log(this.bomData, '000')
      this.closeSplitDetail()
    },
    // 款色码(copy卡尔美的过来)
    getDetail(row) {
      const data = {
        wo_order_id: row.wo_order_id,
        is_clothes: row.is_clothes,
        so_order_id: row.so_order_id,
        customer_po: row.customer_po
      }
      this.$api.embroideryNumSearch(data).then((res) => {
        if (res.status === 200) {
          const data = res.data
          // 获取所有尺码
          this.sizeList = [...new Set(data.map((obj) => obj.size_name))]
          // 将相同颜色的数据处理成一行
          const transformedData = data.reduce((result, obj) => {
            const existingRow = result.find((row) => row.color_name === obj.color_name)
            if (existingRow) {
              existingRow[obj.size_name] = obj.pro_order_quantity
              existingRow.total = (existingRow.total || 0) + obj.pro_order_quantity
            } else {
              const newRow = {
                color_name: obj.color_name,
                [obj.size_name]: obj.pro_order_quantity,
                total: obj.pro_order_quantity
              }
              result.push(newRow)
            }
            return result
          }, [])

          this.SMContentData = transformedData
        }
      })
    },

    jiaipone(row) {
      this.companiesList.forEach((item) => {
        if (row.receive_company_id === item.company_id) {
          // row.receiver_phone = item.telephone
          row.receive_address = item.address
          // row.receive_linkman = item.contact_name
        }
      })
    },
    yiipone(row) {
      this.factoryList.forEach((item) => {
        if (row.outsource_factory_id === item.factory_id) {
          this.$set(row, 'outsource_factory_address', item.factory_address)
          if (item.links == undefined || item.links.length == 0) {
            this.$set(row, 'outsource_factory_phone', '')
          } else {
            this.$set(row, 'outsource_factory_phone', item.links[0].link_phone)
          }
        }
      })
    },
    // 弹框关闭的回调
    closeDialog() {
      console.log('弹框关闭的回调')
    },
    // 拆分明细弹窗关闭事件
    closeSplitDetail() {
      this.splitDetaiIndex = -1
      this.splitDetailData = []
      this.splitDetailSync = false
    },
    saveF() {
      console.log('裁剪/缝制')
    },
    saveH() {
      console.log('绣印花')
    },
    // 甲方
    getAllCompaniesList() {
      this.$api.getCompaniesV2().then((res) => {
        if (res.status === 200) {
          this.companiesList = res.data.companies
          var sSlData = []
          for (var i = 0; i < res.data.companies.length; i++) {
            var item = res.data.companies[i]
            var sItem = {}
            sItem.sKey = item.company_id
            sItem.sValue = item.company_name
            sSlData.push(sItem)
          }
          this.sFilterData[3].sSelectItems = sSlData
        }
      })
    },
    // 乙方
    getAllFactoryList() {
      this.$api.getSubContractorListTwo().then((res) => {
        if (res.status === 200) {
          this.factoryList = res.data.factory_list
          var sSlData = []
          for (var i = 0; i < res.data.factory_list.length; i++) {
            var item = res.data.factory_list[i]
            var sItem = {}
            sItem.sKey = item.factory_id
            sItem.sValue = item.factory_name
            sSlData.push(sItem)
          }
          this.slStyleFilterData[2].sSelectItems = sSlData
          this.slStyleFilterTwo[2].sSelectItems = sSlData
          this.sFilterData[2].sSelectItems = sSlData
        }
      })
    },
    onGetedData(data) {
      data.forEach((item) => {
        this.slStyleFilterData[0].sValue.push(item.customer_id)
        this.slStyleFilterTwo[0].sValue.push(item.customer_id)
      })
    },
    handleClick() {
      if (this.nowPane === '合同列表') {
        if (this.dataUrl) {
          this.$refs.cmTableH.getDataList()
          return
        }
        this.dataUrl = '/md/outsource_orders/'
      } else {
        if (this.nowPane === '成衣待办') {
          this.$refs.cmTableC.getDataList()
        }
        if (this.nowPane === '绣花待办') {
          this.$refs.cmTableX.getDataList()
        }
        if (this.nowPane === '印花待办') {
          this.$refs.cmTableY.getDataList()
        }
      }
    },
    // 新建
    async addOne() {
      this.$pub_fun.buttonRate('cpm800011', 'cpm8001')
      let Ddata =
        this.nowPane === '印花待办'
          ? this.$refs.cmTableY.getSelection()
          : this.nowPane === '绣花待办'
          ? this.$refs.cmTableX.getSelection()
          : this.nowPane === '成衣待办'
          ? this.$refs.cmTableC.getSelection()
          : []
      // console.log(Ddata)
      if (!Ddata.length) {
        this.$message.error('请选择数据')
        return
      }
      let processID = Ddata[0].wo_order_type
      let isTrue = true
      let factoryID = Ddata[0].outsource_factory_name
      let isfactory = true
      Ddata.forEach((item) => {
        if (processID !== item.wo_order_type) {
          isTrue = false
        }
        if (factoryID !== item.outsource_factory_name) {
          isfactory = false
        }
      })
      if (isTrue === false) {
        this.$message.warning('请选择同一种工单类型')
        return
      }
      if (this.nowPane === '成衣待办') {
        if (isfactory === false) {
          this.$message.warning('请选择同一种外协工厂')
          return
        }
      }
      if (isfactory === false) {
        this.$confirm(
          this.$nt('选择的数据为不同的外协工厂,是否继续创建合同。'),
          this.$nt('是否继续?'),
          this.$nt('提示'),
          {
            confirmButtonText: this.$nt('确定'),
            cancelButtonText: this.$nt('取消'),
            type: 'warning'
          }
        )
          .then(() => {
            this.bomData = Ddata
            this.$set(this.founddata, 'outsource_factory_id', this.bomData[0].outsource_factory_id)
            this.$set(this.founddata, 'receive_company_id', this.bomData[0].receive_company_id)
            this.$set(this.founddata, 'wo_order_type', this.bomData[0].wo_order_type)
            const p_arr = []
            this.bomData.forEach((item) => {
              p_arr.push(item.process)
            })
            const p_str = [...new Set(p_arr)].join(',')
            this.$set(this.founddata, 'process', p_str)
            this.factoryList.forEach((item) => {
              if (this.founddata.outsource_factory_id === item.factory_id) {
                this.$set(this.founddata, 'outsource_factory_address', item.factory_address)
                if (item.links == undefined || item.links.length == 0) {
                  this.$set(this.founddata, 'outsource_factory_phone', '')
                } else {
                  this.$set(this.founddata, 'outsource_factory_phone', item.links[0].link_phone)
                }
              }
            })
            this.companiesList.forEach((item) => {
              if (this.founddata.receive_company_id === item.company_id) {
                // this.$set(this.founddata, 'receiver_phone' ,item.telephone)
                this.$set(this.founddata, 'receive_address', item.address)
                // this.$set(this.founddata, 'receive_linkman' ,item.contact_name)
              }
            })
            this.createSign = true
          })
          .catch(() => {
            this.$message.success(this.$nt('已取消'))
          })
      } else {
        this.bomData = Ddata
        this.$set(this.founddata, 'outsource_factory_id', this.bomData[0].outsource_factory_id)
        this.$set(this.founddata, 'receive_company_id', this.bomData[0].receive_company_id)
        this.$set(this.founddata, 'wo_order_type', this.bomData[0].wo_order_type)
        const p_arr = []
        this.bomData.forEach((item) => {
          p_arr.push(item.process)
        })
        const p_str = [...new Set(p_arr)].join(',')
        this.$set(this.founddata, 'process', p_str)
        this.factoryList.forEach((item) => {
          if (this.founddata.outsource_factory_id === item.factory_id) {
            this.$set(this.founddata, 'outsource_factory_address', item.factory_address)
            if (item.links == undefined || item.links.length == 0) {
              this.$set(this.founddata, 'outsource_factory_phone', '')
            } else {
              this.$set(this.founddata, 'outsource_factory_phone', item.links[0].link_phone)
            }
          }
        })
        this.companiesList.forEach((item) => {
          if (this.founddata.receive_company_id === item.company_id) {
            // this.$set(this.founddata, 'receiver_phone' ,item.telephone)
            this.$set(this.founddata, 'receive_address', item.address)
            // this.$set(this.founddata, 'receive_linkman' ,item.contact_name)
          }
        })
        this.createSign = true
      }
    },
    customerChanges() {
      if (!this.slStyleFilterData[0].sValue) {
        this.slStyleFilterData[1].sSelectItems = []
        this.slStyleFilterData[1].sValue = ''
        this.slStyleFilterData = this.$pub_fun.deepCopy(this.slStyleFilterData)
      } else {
        this.getSlStyleList(this.slStyleFilterData[0].sValue)
      }
      if (!this.slStyleFilterTwo[0].sValue) {
        this.slStyleFilterTwo[1].sSelectItems = []
        this.slStyleFilterTwo[1].sValue = ''
        this.slStyleFilterTwo = this.$pub_fun.deepCopy(this.slStyleFilterTwo)
      } else {
        this.getSlStyleList(this.slStyleFilterTwo[0].sValue)
      }
    },

    // 获取供应商列表
    getSupplierList() {
      this.$api.getSupplierList().then((res) => {
        if (res.status !== 200) return
        var sSlData = []
        for (var i = 0; i < res.data.suppliers.length; i++) {
          var item = res.data.suppliers[i]
          var sItem = {}
          sItem.sKey = item.supplier_id
          sItem.sValue = item.supplier_name
          sSlData.push(sItem)
        }
        // this.slStyleFilterData[3].sSelectItems = sSlData;
        // this.slStyleFilterData = this.$pub_fun.deepCopy(this.slStyleFilterData)
      })
    },

    getSlColorList(styleId) {
      if (!styleId || styleId === '') return
      this.$api.getCSMColorList(styleId).then((res) => {
        if (res.status !== 200) return
        var sSlData = []
        for (var i = 0; i < res.data.colors.length; i++) {
          var item = res.data.colors[i]
          var sItem = {}
          sItem.sKey = item.color_id
          sItem.sValue = item.color_name
          sSlData.push(sItem)
        }
        // this.slStyleFilterData[3].sSelectItems = sSlData;
        // this.slStyleFilterData = this.$pub_fun.deepCopy(this.slStyleFilterData);
      })
    },
    getSlStyleList(customerId) {
      if (!customerId || customerId === '') return
      this.$api.getCSMStyleList(customerId).then((res) => {
        if (res.status !== 200) return
        var sSlData = []
        for (var i = 0; i < res.data.styles.length; i++) {
          var item = res.data.styles[i]
          var sItem = {}
          sItem.sKey = item.style_id
          sItem.sValue = item.style_code
          sSlData.push(sItem)
        }
        this.slStyleFilterData[1].sSelectItems = sSlData
        this.slStyleFilterTwo[1].sSelectItems = sSlData
        this.slStyleFilterData = this.$pub_fun.deepCopy(this.slStyleFilterData)
        this.slStyleFilterTwo = this.$pub_fun.deepCopy(this.slStyleFilterTwo)
      })
    },
    getDataList(bPage) {
      if (this.slStoreId === '') return
      if (!bPage) this.searchParams.page = 1
      this.$api.getDemandDataList(this.$pub_fun.getStringFilter(this.searchParams)).then((res) => {
        if (res.status !== 200) return
        this.sDataList = res.data.data
        this.iPageDataCount = res.data.paging.total
      })
    },
    // 复制的 申购单的列表
    getDatashen(bPage) {
      if (this.slStoreId === '') return
      if (!bPage) this.searchParams.page = 1
      this.$api.getPRDataList(this.$pub_fun.getStringFilter(this.searchParams)).then((res) => {
        if (res.status !== 200) return
        this.sDataList = res.data.data
        this.iPageDataCount = res.data.paging.total
      })
    },
    // 下发一条  下发
    confirmOne(item) {
      this.$api.commitDemandBill(item.guid).then((res) => {
        if (res.status !== 200) return
        this.$message.success(this.$nt('确认成功'))
        this.$refs.cmTableH.getDataList()
        this.getDatashen()
      })
    },
    // 查看明细
    editDtl(item) {
      this.goDtl(item.id)
    },
    editDel(row) {
      this.$confirm(this.$nt('删除后不可恢复'), this.$nt('是否继续?'), this.$nt('提示'), {
        confirmButtonText: this.$nt('确定'),
        cancelButtonText: this.$nt('取消'),
        type: 'warning'
      })
        .then(() => {
          this.$api.deloutsourceOrder(row.id).then((res) => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: this.$nt('删除成功')
              })
              this.$refs.cmTableH.getDataList()
            }
          })
        })
        .catch(() => {
          console.log(this.$nt('取消删除'))
        })
    },
    goDtl(hdrId) {
      document.querySelector('#app').click()
      this.$router.push({
        path: '/embroidery_edit/' + hdrId + '/',
        replace: true,
        query: { type: 'goIncrease' },
        meta: { keepAlive: true }
      })
    },
    // 获取客户列表
    getCustomerList() {
      this.slCustomerList = []
      this.$api.getCustomerListJay().then((res) => {
        if (res.status !== 200) return
        this.slCustomerList = res.data.customers
        let arr = []
        res.data.customers.forEach((item) => {
          let obj = {}
          obj.sKey = item.customer_id
          obj.sValue = item.customer_name
          arr.push(obj)
        })
        this.slStyleFilterData[0].sSelectItems = arr
        this.slStyleFilterTwo[0].sSelectItems = arr
        // 客户默认值取消(客户默认值取消，也不需要重新获取列表接口了)
        // this.slStyleFilterData[0].sValue = arr[0].sKey
        this.getSlStyleList(this.slStyleFilterData[0].sValue)
        this.getSlStyleList(this.slStyleFilterTwo[0].sValue)
      })
    },
    // 删除行数
    handleDelete(row, index) {
      const i = index
      if (row.isSplit) {
        this.bomData.forEach((item, index) => {
          if (item.id === row.id && !item.isSplit) {
            const splitDetaiNum = Number(row.quantity)
            const bomNum = Number(this.bomData[index].quantity)
            this.bomData[index].quantity = bomNum + splitDetaiNum + ''
            this.bomData.splice(i, 1)
          }
        })
      }
      this.bomData.splice(i, 1)
    },
    // 拆分
    handleSplit(row, index) {
      // 先保存一份修改数据的下标
      console.log(row, 'row')
      this.splitDetaiIndex = index
      this.getDetail(row)
      const data = this.$pub_fun.deepCopy(row)
      // 清空数量，客户手动填
      data.quantity = ''
      data.shipment_date = row.shipment_date
      data.delivery_date = row.delivery_date
      this.splitDetailData.push(data)
      this.splitDetailSync = true
    },
    // 复制
    handleClickcopy(row) {
      // console.log(row)
      //添加新的行数
      let arr = JSON.parse(JSON.stringify(row))
      this.bomData.push(arr)
    }
  },
  beforeRouteLeave(to, from, next) {
    //参数（马上去的页面，现在的页面，跳转）
    if (to.query.type == 'increase' && to.query.type == 'goIncrease') {
      to.meta.keepAlive = true //将要去的那个页面的缓存清空
    }
    next()
  },
  mounted() {
    this.getCustomerList()
  },
  created() {
    this.getAllCompaniesList()
    this.getAllFactoryList()
    this.ALLcraftList()
    this.roles = JSON.parse(sessionStorage.getItem('roles'))
    let rolesList = sessionStorage.getItem('roles')
    this.Cjroles = rolesList.indexOf('超级系统管理员')
    this.Zroles = rolesList.indexOf('总经理审批-非DKL')
    this.Jhroles = rolesList.indexOf('计划部')
    this.Cbroles = rolesList.indexOf('成本部')
    this.Cwroles = rolesList.indexOf('财务专员-非DKL')
  }
}
</script>

<style scoped>
.dialog-footer {
  margin-top: 10px;
  margin-right: 80%;
}
.dialog-data {
  margin-left: 95%;
  margin-top: 20px;
}
::v-deep .el-table td {
  text-align: center !important;
}
/deep/.el-table th > .cell {
  text-align: center;
}

/deep/.el-table .cell {
  text-align: center;
}
.poItemNum {
  width: 200px;
  text-align: center;
  font-weight: bold;
}
</style>
