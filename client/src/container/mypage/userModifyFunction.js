import axios from "axios";
import {ip} from "../../store/ip"

export const updatePssword = (info) => {
  return axios.put(ip+"/users?type=1", {info}).then((response) => {
    console.log(response.data);
  });
};

export const updatePhone = (info) => {
  return axios.put(ip+"/users?type=2", {info}).then((response) => {
    console.log(response.data);
  });
};

export const updateNick = (info) => {
  return axios.put(ip+"/users?type=3", {info}).then((response) => {
    console.log(response.data);
  });
};

//비밀번호 유효성 체크
export function isPassword(asValue) {
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/; //  8 ~ 10자 영문, 숫자 조합

  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

//아이디 유효성 체크
export function isId(asValue) {
  var regExp = /^[a-zA-Z0-9]{5,20}$/;
  return regExp.test(asValue);
}
