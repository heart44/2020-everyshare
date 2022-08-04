import axios from 'axios'
import {ip} from "../../store/ip"

//회원가입 정보 확인
export const register = newUser => {
  return axios
    .post(ip+'/users/register', {
      userID : newUser.userID,
      password: newUser.password,
      phoneNum: newUser.phoneNum,
      nickName: newUser.nickName,
    })
    .then(response => {
      console.log(response.data)
    })
}

//로그인 정보 확인
export const login = user => {
  return axios
    .post(ip+'/users/login', {
      userID: user.userID,
      password: user.password
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

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

 