import {inputConf} from "./control/Input";
import {selectConf} from "./control/Select";
import {radioConf} from "./control/Radio";
import {checkBoxConf} from "./control/CheckBox";
import {cascaderConf} from "./control/Cascader";
import {textConf} from "./control/Text";
import {titleConf} from "./control/Title";
import {hrConf} from "./control/Hr";
import {pConf} from "./control/P";
import {uploadsConf} from './control/Uploads';
import {datePickerConf} from './control/DatePicker'
import {addressConf} from './control/Address';
import {recordTableConf} from "./control/RecordTable";
import {xiaomiConf} from "./control/XiaomiGateway";
import {ledLightConf} from "./control/LEDLight";
import {illumiSensorConf} from "./control/IllumiSensor";
import {singleStateConf} from "./control/SingleState";
import {singleDataUploadConf} from "./control/SingleDataUpload";


const formList = {
  title: titleConf,
  hr: hrConf,
  p: pConf,
  // input: inputConf,
  // select: selectConf,
  // radio: radioConf,
  // checkbox: checkBoxConf,
  // datepicker: datePickerConf,
  // cascader: cascaderConf,
  // address: addressConf,
  // uploads: uploadsConf,
  // text: textConf,
  // test: testConf,
  // xiaomi :xiaomiConf,
  ledlight:ledLightConf,
  singlestate:singleStateConf,
  recordtable:recordTableConf,
  singledataupload:singleDataUploadConf,
};
let list_arr = [];
for (let i in formList) {
  list_arr.push({
    ele: i,
    obj: formList[i]
  });
}
export default list_arr;
