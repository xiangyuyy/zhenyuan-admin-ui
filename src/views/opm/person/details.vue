<template>
  <div class="container">
    <!-- 基本信息 -->
    <el-card shadow="never">
      <h2>基本信息</h2>
      <div class="left40">
        <el-row>
          <el-col :span="8">
            <label>姓名：</label><span>{{ baseInfoData.name }}</span>
          </el-col>
          <el-col :span="7">
            <label>单位：</label><span>{{ baseInfoData.company }}</span>
          </el-col>
          <el-col :span="9">
            <label>出生日期：</label>
            <span>{{ baseInfoData.birthday | formatDateTime }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <label>进入本单位时间：</label>
            <span>{{ baseInfoData.workTime | formatDateTime }}</span>
          </el-col>
          <el-col :span="7">
            <label>性别：</label><span>{{ baseInfoData.sex }}</span>
          </el-col>
          <el-col :span="9">
            <label>身份证号：</label>
            <span>{{ baseInfoData.idCard }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <label>民族：</label><span>{{ baseInfoData.mingzu }}</span>
          </el-col>
          <el-col :span="7">
            <label>籍贯：</label><span>{{ baseInfoData.nativePlace }}</span>
          </el-col>
          <el-col :span="9">
            <label>户口所在地：</label><span>{{ baseInfoData.adress }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <label>户口性质：</label><span>{{ baseInfoData.household }}</span>
          </el-col>
          <el-col :span="7">
            <label>年龄：</label><span>{{ baseInfoData.age }}</span>
          </el-col>
          <el-col :span="9">
            <label>拼音简码：</label>
            <span>{{ baseInfoData.pyjm }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <label>手机号码：</label>
            <span>{{ baseInfoData.mobile }}</span>
          </el-col>
          <el-col :span="7">
            <label>人员类别：</label>
            <span>{{ baseInfoData.pkind }}</span>
          </el-col>
          <el-col :span="9">
            <label>到本单位时间：</label>
            <span>{{ baseInfoData.getWorkTime | formatDateTime }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <label>电子邮箱：</label>
            <span>{{ baseInfoData.email }}</span>
          </el-col>
          <el-col :span="7">
            <label>人员编码：</label>
            <span>{{ baseInfoData.pnum }}</span>
          </el-col>
          <el-col :span="9">
            <label>最高学历：</label>
            <span>{{ baseInfoData.education }}</span>
          </el-col>
        </el-row>
        <el-row>
          <label>现住址：</label>
          <span>{{ baseInfoData.nowAdress }}</span>
        </el-row>
        <el-row>
          <label>信息备注：</label><span>{{ baseInfoData.mark }}</span>
        </el-row>
      </div>
    </el-card>

    <!-- 学历学位 -->
    <el-card shadow="never">
      <h2>学历学位</h2>
      <div>
        <el-table :data="educationData" border style="width: 100%">
          <el-table-column
            prop="kind"
            label="学历性质"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="education"
            label="学历"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="school"
            label="毕业学校"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="major"
            label="所学专业"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="isManager"
            label="是否管理"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="isHigh"
            label="是否最高学历"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="decs"
            label="所学专业描述"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 合同信息 -->
    <el-card shadow="never">
      <h2>合同信息</h2>
      <div>
        <el-table :data="contractInfoData" border style="width: 100%">
          <el-table-column
            prop="kind"
            label="合同类型"
            align="center"
          ></el-table-column>
          <el-table-column label="合同起始时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.beginTime | formatDateTime }}
            </template>
          </el-table-column>
          <el-table-column label="合同终止时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.endTime | formatDateTime }}
            </template>
          </el-table-column>
          <el-table-column label="实际终止时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.sjEndTime | formatDateTime }}
            </template>
          </el-table-column>
          <el-table-column
            prop="mark"
            label="合同备注"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 政治面貌 -->
    <el-card shadow="never">
      <h2>政治面貌</h2>
      <div class="box">
        <el-row :gutter="20">
          <el-col :span="8"
            ><label>参加党派时间：</label
            ><span>{{ politicalData.time | formatDateTime }}</span></el-col
          >
          <el-col :span="8"
            ><label>政治面貌：</label
            ><span>{{ politicalData.politics }}</span></el-col
          >
          <el-col :span="8"
            ><label>异常类别：</label
            ><span>{{ politicalData.status }}</span></el-col
          >
        </el-row>
      </div>
    </el-card>

    <!-- 离职信息 -->
    <el-card shadow="never">
      <h2>离职信息</h2>
      <div class="box">
        <el-row>
          <el-col :span="8">
            <label>离职日期：</label
            ><span>{{ departInfoData.outTime }}</span></el-col
          >
          <el-col :span="8">
            <label>离职原因：</label>
            <span>{{ departInfoData.reason }}</span></el-col
          >
          <el-col :span="8">
            <label>离职前类别：</label>
            <span>{{ departInfoData.kind }}</span></el-col
          >
        </el-row>
        <el-row>
          <el-col>
            <label>离职说明：</label>
            <span>{{ departInfoData.mark }}</span>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 离退休 -->
    <el-card shadow="never">
      <h2>离退休</h2>
      <div class="box">
        <el-row>
          <el-col :span="8">
            <label>离退类别：</label><span>{{ retiredData.kind }}</span></el-col
          >
          <el-col :span="8">
            <label>离退日期：</label>
            <span>{{ retiredData.retireTime }}</span></el-col
          >
          <el-col :span="8">
            <label>办理时间：</label>
            <span>{{ retiredData.dealTime }}</span></el-col
          >
        </el-row>
        <el-row>
          <el-col>
            <label>离退原因：</label>
            <span>{{ retiredData.mark }}</span>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 返聘 -->
    <el-card shadow="never">
      <h2>返聘</h2>
      <div class="box">
        <el-row>
          <el-col :span="8">
            <label>返聘单位：</label
            ><span>{{ backWorkData.company }}</span></el-col
          >
          <el-col :span="8">
            <label>返聘类别：</label>
            <span>{{ backWorkData.kind }}</span></el-col
          >
          <el-col :span="8">
            <label>返聘岗位：</label>
            <span>{{ backWorkData.work }}</span></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="8">
            <label>返聘起始时间：</label>
            <span>{{ backWorkData.beginTime }}</span></el-col
          >
          <el-col :span="8">
            <label>返聘终止时间：</label>
            <span>{{ backWorkData.endTime }}</span></el-col
          >
          <el-col :span="8">
            <label>返聘原因：</label>
            <span>{{ backWorkData.reason }}</span>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 药监职称 -->
    <el-card shadow="never">
      <h2>药监职称</h2>
      <div>
        <el-table :data="drugInfoData" border style="width: 100%">
          <el-table-column
            prop="num"
            label="药监职称证书编号"
            align="center"
          ></el-table-column>
          <el-table-column
            label="药监职称时间"
            align="center"
          >
           <template slot-scope="scope">
              {{ scope.row.time | formatDateTime }}
            </template>
          </el-table-column>
          <el-table-column
            prop="kind"
            label="药监职称级别"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
    </el-card>

    <div class="gobackBtn">
      <el-button @click="goBack" type="primary">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getMemberInfor } from "@/api/person";
import { formatDate } from "@/utils/date";
export default {
  data() {
    return {
      baseInfoData: [],
      educationData: [],
      contractInfoData: [],
      politicalData: [],
      departInfoData: [],
      retiredData: [],
      backWorkData: [],
      drugInfoData: [],
    };
  },
  methods: {
    getDataInfo() {
      console.log(this.$route.query.id);
      getMemberInfor(this.$route.query.id).then((res) => {
        //基本信息
        this.baseInfoData = res.data.memberBaseInforDto;
        //学历学位
        this.educationData = res.data.memberEducationInforDtoList;
        //合同信息
        this.contractInfoData = res.data.memberWorkInforDtoList;
        //政治面貌
        this.politicalData = res.data.memberPoliticsInforDtoList[0];
        //离职信息
        this.departInfoData = res.data.memberOutWorkInforDtoList;
        //离退休
        this.retiredData = res.data.memberRetireWorkInforDtoList;
        //返聘
        this.backWorkData = res.data.memberBackWorkInforDtoList;
        //药监职称
        this.drugInfoData = res.data.memberDrugInforDtoList;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.getDataInfo();
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  .el-card {
    background-color: #ccc;
    margin-bottom: 40px;
    h2 {
      margin: 0 0 20px 0;
    }
  }
  .left40 {
    padding-left: 40px;
  }
  .box {
    .el-row {
      line-height: 40px;
      background-color: #fff;
      border-bottom: 0.1px solid #ccc;
      .el-col {
        padding-left: 5px;
        border-right: 0.1px solid #ccc;
      }
    }
  }
  .gobackBtn {
    position: relative;
    .el-button {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      padding: 15px 40px;
    }
  }
}
</style>