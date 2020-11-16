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
import {ledLightLargeConf} from "./control/LEDLightLarge";
import {ledLightSmallConf} from "./control/LEDLightSmall";
import {illumiSensorConf} from "./control/IllumiSensor";
import {singleStateConf} from "./control/SingleState";
import {singleDataUploadConf} from "./control/SingleDataUpload";
import {singleStringUploadConf} from "./control/SingleStringUpload";
import {photoGallaryConf} from "./control/PhotoGallary";
import {printerHistoryConf} from "./control/PrinterHistory";
import {printerFileConf} from "./control/PrinterFile";
import {shiftControlConf} from "./control/ShiftControl";
import {routerSettingsConf} from "./control/RouterSettings";
import {routerSpeedConf} from "./control/RouterSpeed";
import {cameraImageConf} from "./control/CameraImage";
import {cameraControlConf} from "./control/CameraControl";
import {ovenControlConf} from "./control/OvenControl";
import {ovenModeConf} from "./control/OvenMode";
import {jumpToConf} from "./control/JumpTo";
import {singleSwitchConf} from "./control/SingleSwitch";

const formList = {
  // title: titleConf,
  // hr: hrConf,
  // p: pConf,
  // input: inputConf,
  // select: selectConf,
  // radio: radioConf,
  // checkbox: checkBoxConf,
  singleswitch:singleSwitchConf,
  shiftcontrol:shiftControlConf,

  ledlightsmall:ledLightSmallConf,
  cameracontrol:cameraControlConf,
  ledlightlarge:ledLightLargeConf,
  singlestate:singleStateConf,
  recordtable:recordTableConf,

  cameraimage:cameraImageConf,
  singlestringupload:singleStringUploadConf,
  printerfile:printerFileConf,
  datepicker: datePickerConf,
  jumpto:jumpToConf,
  // cascader: cascaderConf,
  // address: addressConf,
  // uploads: uploadsConf,
  // text: textConf,
  // test: testConf,
  // xiaomi :xiaomiConf,
  // singledataupload:singleDataUploadConf,
  // photoGallary:photoGallaryConf,
  // printerhistory:printerHistoryConf,
  // routersettings:routerSettingsConf,
  // routerspeed:routerSpeedConf,
  // ovencontrol:ovenControlConf,
  // ovenmode:ovenModeConf,


};
let list_arr = [];
for (let i in formList) {
  list_arr.push({
    ele: i,
    obj: formList[i]
  });
}
export default list_arr;
