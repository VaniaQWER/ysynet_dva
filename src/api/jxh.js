import { _local } from './local';

export default {
 GETSUBSYSTEMS : `${_local}/hscmSubSystemController/getSubSystems`,// 查询机构管理员的子系统列表

 FINDSUBSYSTEMMANAGER : `${_local}/hscmSubSystemController/findSubSystemsManager`,// 精细化--子系统管理员 子系统管理员列表

 DEPT_LIST: `${_local}/departmentController/findOrgDeptList4kehu`,//查询科室信息列表

 FINDDEPTCONFIGLIST:`${_local}/Configure/findDeptConfigList`,//查询临床科室子系统配置管理页面列表

 SAVEDEPTCONFIG:`${_local}/Configure/saveDeptConfig`,//保存科室子系统配置

 FINDSTORAGECONFIGLIST: `${_local}/Configure/findStorageConfigList`,//查询 非 临床科室子系统配置管理页面列表
}