import React, { Component } from "react";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Web3 from 'web3';
import axios from 'axios'
import {ip} from "../../store/ip"
const ethers = require('ethers')


let shareAddress = '0x852c1bf7306224ab5588cadbab70c4aece0dac5c';
let shareABI =  [ { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "tradeInfo", "outputs": [ { "name": "tradeNum", "type": "uint256" }, { "name": "ownerAddress", "type": "address" }, { "name": "borrowerAddress", "type": "address" }, { "name": "ownerId", "type": "bytes32" }, { "name": "borrowerId", "type": "bytes32" }, { "name": "stage", "type": "uint256" }, { "name": "fee", "type": "uint256" }, { "name": "deposit", "type": "uint256" }, { "name": "pot", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xf3f84084" }, { "constant": true, "inputs": [], "name": "contractAddress", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xf6b4dfb4" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor" }, { "constant": false, "inputs": [ { "name": "_tradeNum", "type": "uint256" }, { "name": "_ownerId", "type": "bytes32" }, { "name": "_borrowerId", "type": "bytes32" }, { "name": "_fee", "type": "uint256" }, { "name": "_deposit", "type": "uint256" } ], "name": "makeTrade", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x029bbda7" }, { "constant": false, "inputs": [ { "name": "_tradeNum", "type": "uint256" }, { "name": "_ownerId", "type": "bytes32" }, { "name": "_borrowerId", "type": "bytes32" }, { "name": "_fee", "type": "uint256" }, { "name": "_deposit", "type": "uint256" } ], "name": "ownerApproved", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x498bc556" }, { "constant": false, "inputs": [ { "name": "_tradeNum", "type": "uint256" } ], "name": "borrowerApproved", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xe5e4ae48" }, { "constant": false, "inputs": [ { "name": "_tradeNum", "type": "uint256" } ], "name": "rentalTakeover", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xe2645153" }, { "constant": false, "inputs": [ { "name": "_tradeNum", "type": "uint256" } ], "name": "rentalConfirm", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function", "signature": "0xa99efc88" }, { "constant": false, "inputs": [ { "name": "_tradeNum", "type": "uint256" } ], "name": "returnTakeover", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xf86b924b" }, { "constant": false, "inputs": [ { "name": "_tradeNum", "type": "uint256" } ], "name": "returnConfirm", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function", "signature": "0x5dcbff07" }, { "constant": false, "inputs": [ { "name": "_tradeNum", "type": "uint256" } ], "name": "ownerCancel", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xec3a204f" }, { "constant": false, "inputs": [ { "name": "_tradeNum", "type": "uint256" } ], "name": "borrowerCancel", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x9ef97877" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "transEth", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function", "signature": "0xfa5c1098" }, { "constant": true, "inputs": [ { "name": "_tradeNum", "type": "uint256" } ], "name": "getStage", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x2e325020" }, { "constant": true, "inputs": [ { "name": "_tradeNum", "type": "uint256" } ], "name": "getDeposit", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x9f9fb968" }, { "constant": true, "inputs": [ { "name": "_tradeNum", "type": "uint256" } ], "name": "getFee", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xfcee45f4" }, { "constant": true, "inputs": [ { "name": "_tradeNum", "type": "uint256" } ], "name": "getPot", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x28d3ad3f" }, { "constant": true, "inputs": [ { "name": "_tradeNum", "type": "uint256" } ], "name": "getOwnerAddress", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xdd550958" }, { "constant": true, "inputs": [ { "name": "_tradeNum", "type": "uint256" } ], "name": "getBorrowerAddress", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xd58ed1dc" }, { "constant": true, "inputs": [ { "name": "_tradeNum", "type": "uint256" } ], "name": "getOwnerId", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x570e8706" }, { "constant": true, "inputs": [ { "name": "_tradeNum", "type": "uint256" } ], "name": "getBorrowerId", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x92e6422b" }, { "constant": true, "inputs": [], "name": "getContractAddress", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x32a2c5d0" } ]

class Modal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      //contract를 위한 상태변수들
      tradeNum: 13, // 요걸 조작하면 다른 거래로 바뀜
      stage: 0,
      stage_str: '',
      contractAddress: '',
      ownerAddress: '',
      borrowerAddress: '',
      fee: '',
      pot: '',
      deposit: '',
      ownerId: '',
      borrowerId: '',

      //쿼리를 위한 상태변수들  
      viewType : this.props.viewType,
      q_ownerNick: '',
      q_borrowerNick: '',
      q_ownerNum: 0,
      q_borrowerNum: 0,
      q_deposit: 0,
      q_fee: 0
    };

  }

  async componentDidMount() {
    await this.initWeb3();
    //await this.getRentalConfirmEvents();
    await this.pollData();
    setInterval(this.pollData, 1000); //1초마다 호출
  }

  // for contract
  pollData = async () => {
    await this.getInfo();
  }

  initWeb3 = async () => {
    if (window.ethereum) {
      console.log('Recent mode')
      this.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
        // this.web3.eth.sendTransaction({/* ... */});
      } catch (error) {
        // User denied account access...
        console.log(`User denied account access error : ${error}`)
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      console.log('legacy mode')
      this.web3 = new Web3(Web3.currentProvider);
      // Acccounts always exposed
      // web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    this.shareContract = new this.web3.eth.Contract(shareABI, shareAddress);

  }
  getInfo = async () => {
    // borrowerId: ''
    //stage
    let stage = await this.shareContract.methods.getStage(this.state.tradeNum).call()
    let stage_str;
    if(stage === "0") {stage_str = "소유자의 거래승인 대기"}
    if(stage === "1") {stage_str = "대여자의 거래승인 대기"}
    if(stage === "2") {stage_str = "소유자의 대여인계확인 대기 "}
    if(stage === "3") {stage_str = "대여자의 대여인수확인 대기"}
    if(stage === "4") {stage_str = "대여중"}
    if(stage === "5") {stage_str = "소유자의 반납인수확인 대기"}
    if(stage === "6") {stage_str = "거래 종료"}
    if(stage === "7") {stage_str = "거래 취소"}


    //ownerAddress
    let ownerAddress_b32 = await this.shareContract.methods.getOwnerAddress(this.state.tradeNum).call()
    //Address
    let borrowerAddress_b32 = await this.shareContract.methods.getBorrowerAddress(this.state.tradeNum).call()
    let contractAddress_b32 = await this.shareContract.methods.getContractAddress().call()
    //id
    let ownerId_b32 = await this.shareContract.methods.getOwnerId(this.state.tradeNum).call()
    let ownerId_str = ethers.utils.parseBytes32String(ownerId_b32)
    let borrowerId_b32 = await this.shareContract.methods.getBorrowerId(this.state.tradeNum).call()
    let borrowerId_str = ethers.utils.parseBytes32String(borrowerId_b32)
    //fee
    let fee = await this.shareContract.methods.getFee(this.state.tradeNum).call()
    let feeString = this.web3.utils.fromWei(fee.toString(), 'ether');
    //deposit
    let deposit = await this.shareContract.methods.getDeposit(this.state.tradeNum).call()
    let depositString = this.web3.utils.fromWei(deposit.toString(), 'ether');
    //pot
    let pot = await this.shareContract.methods.getPot(this.state.tradeNum).call()
    let potString = this.web3.utils.fromWei(pot.toString(), 'ether');

    this.setState({
      tradeNum: this.props.modalTradeNum,
      viewType : this.props.viewType,
      stage: stage,
      stage_str: stage_str,
      contractAddress: contractAddress_b32,
      ownerAddress: ownerAddress_b32,
      borrowerAddress: borrowerAddress_b32,
      fee: feeString,
      deposit: depositString,
      pot: potString,
      ownerId: ownerId_str,
      borrowerId: borrowerId_str
    })
  }

  //tradeNum 으로 ownerId, borrowerId, 

  //소유자 승인 및 거래 생성
  ownerApproved = async () => {

    const accounts = await this.web3.eth.getAccounts();
                this.account_owner = accounts[0]; // 현재 계정은 owner
                console.log(this.account_owner);

    axios
      .get(ip+"/contract/", {
        params: {
          tradeNum: this.state.tradeNum
        },
      })
      .then((data) => {
        let tradeData = data.data[0];
        this.setState({
          q_ownerNum: tradeData[0].owner,
          q_borrowerNum: tradeData[0].borrower,
          q_deposit: tradeData[0].guarantee,
          q_fee: tradeData[0].totalPrice
        })
        
        //get owner nickName
        axios
          .get(ip+"/users/", {
            params: {
              userNum: this.state.q_ownerNum
            },
          })
          .then((data) => {
            let tradeData = data.data[0];
            this.setState({
              q_ownerNick: tradeData[0].nickName,
            })
            //get borrower nickName
            axios
              .get(ip+"/users/", {
                params: {
                  userNum: this.state.q_borrowerNum
                },
              })
              .then((data) => {
                let tradeData = data.data[0];
                // console.log(tradeData);
                this.setState({
                  q_borrowerNick: tradeData[0].nickName,
                })

                console.log(this.state.tradeNum);
                console.log(this.state.q_ownerNum);
                console.log(this.state.q_ownerNick);
                console.log(this.state.q_borrowerNum);
                console.log(this.state.q_borrowerNick);
                console.log(this.state.q_deposit);
                console.log(this.state.q_fee);

                let ownerId_b32 = ethers.utils.formatBytes32String(this.state.q_ownerNick);
                let borrowerId_b32 = ethers.utils.formatBytes32String(this.state.q_borrowerNick);
                let deposit = this.state.q_deposit * 10 ** 18;
                let fee = this.state.q_fee * 10 ** 18;
                let deposit_str = String(deposit);
                let fee_str = String(fee)

                this.shareContract.methods.ownerApproved(this.state.tradeNum, ownerId_b32, borrowerId_b32, fee_str, deposit_str).send({ from: this.account_owner});

              });
          });
      });    
  }

  //대여자 승인
  borrowerApproved = async () => {
    let accounts = await this.web3.eth.getAccounts();
    this.account_borrower = accounts[0]; // 현재 계정은 borrower

    this.shareContract.methods.borrowerApproved(this.state.tradeNum).send({ from: this.account_borrower});
  }
  //대여 인계확인
  rentalTakeover = async () => {
    this.shareContract.methods.rentalTakeover(this.state.tradeNum).send({ from: this.state.ownerAddress });
  }
  //대여 인수확인
  rentalConfirm = async () => {
    console.log("rentalConfirm");
    // let nonce = await this.web3.eth.getTransactionCount(this.account_owner);
    let cost = parseFloat(this.state.deposit) + parseFloat(this.state.fee);

    cost = cost * 1000000000000000000 //이더를 웨이로
    this.shareContract.methods.rentalConfirm(this.state.tradeNum).send({ from: this.state.borrowerAddress, value: cost});
  }

  //반납 인계확인
  returnTakeover = async () => {
    this.shareContract.methods.returnTakeover(this.state.tradeNum).send({ from: this.state.borrowerAddress});
  }

  //반납 인수확인
  returnConfirm = async () => {
    // let nonce = await this.web3.eth.getTransactionCount(this.account);

    this.shareContract.methods.returnConfirm(this.state.tradeNum).send({ from: this.state.ownerAddress});
  }

  //소유자 거래 취소
  ownerCancel = async () => {

    this.shareContract.methods.ownerCancel(this.state.tradeNum).send({ from: this.state.ownerAddress});
 
  }

  borrowerCancel = async () => {

    this.shareContract.methods.borrowerCancel(this.state.tradeNum).send({ from: this.state.borrowerAddress});

  }


  render() {
    return (
      <Dialog open={this.props.modal} onClose={this.props.close}>
      <DialogTitle align="center">거래관리</DialogTitle>
      <Divider variant="middle" style={{ marginBottom: 25 }} />
      <DialogContent>
        <Typography gutterBottom>거래번호 : {this.state.tradeNum}</Typography>
        {/* <Typography gutterBottom>물품명(기간): 청소기(2020-06-05 ~ 2020-06-20)</Typography> */}
        <Typography gutterBottom>요금: {this.state.fee}</Typography>
        <Typography gutterBottom>보증금: {this.state.deposit}</Typography>
        <Typography gutterBottom>거래상태: {this.state.stage_str}</Typography>
        <Typography gutterBottom>소유자 지갑주소: {this.state.ownerAddress === "0x0000000000000000000000000000000000000000"? "거래승인 이후 등록됩니다." : this.state.ownerAddress} 
        </Typography>
        <Typography gutterBottom>대여자 지갑주소: {this.state.borrowerAddress === this.state.ownerAddress? "거래승인 이후 등록됩니다." : this.state.borrowerAddress} </Typography>
        <Typography gutterBottom>viewType: {this.state.viewType}</Typography>
      </DialogContent>
      <Divider variant="middle" style={{ marginBottom: 25 }} />
      <DialogActions >
        {this.state.stage === "0" && this.state.viewType === "2" ? <Button variant="outlined" color="secondary" onClick={this.ownerApproved}>거래승인</Button> : null}
        {this.state.stage === "0" && this.state.viewType === "2" ? <Button variant="outlined" color="secondary" onClick={this.ownerCancel}>거래취소</Button> : null}
        {this.state.stage === "0" && this.state.viewType === "1" ? <Button variant="outlined" color="secondary" onClick={this.borrowerCancel}>거래취소</Button> : null}
        {this.state.stage === "1" && this.state.viewType === "1" ? <Button variant="outlined" color="secondary" onClick={this.borrowerApproved}>거래승인</Button> : null}
        {this.state.stage === "1" && this.state.viewType === "2" ? <Button variant="outlined" color="secondary" onClick={this.ownerCancel}>거래취소</Button> : null}
        {this.state.stage === "2" && this.state.viewType === "2" ? <Button variant="outlined" color="secondary" onClick={this.rentalTakeover}>대여인계확인</Button> : null}
        {this.state.stage === "2" && this.state.viewType === "2" ? <Button variant="outlined" color="secondary" onClick={this.ownerCancel}>거래취소</Button> : null}
        {this.state.stage === "3" && this.state.viewType === "1" ? <Button variant="outlined" color="secondary" onClick={this.rentalConfirm}>대여인수확인</Button> : null}
        {this.state.stage === "4" && this.state.viewType === "1" ? <Button variant="outlined" color="secondary" onClick={this.returnTakeover}>반납인계확인</Button> : null}
        {this.state.stage === "5" && this.state.viewType === "2" ? <Button variant="outlined" color="secondary" onClick={this.returnConfirm}>반납인수확인</Button> : null}
        <Button variant="outlined" onClick={this.props.close}>닫기</Button>
      </DialogActions>
    </Dialog>

    )
  }
}

export default Modal;