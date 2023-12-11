// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Web3ATM {
    address owner;
    mapping(address => uint256) balances;

    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    

    function checkBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        require(amount > 0 && amount <= balances[msg.sender], "Invalid withdrawal amount");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }

    function transfer(address to, uint256 amount) external {
    require(to != address(0), "Invalid recipient address");
    require(amount > 0 && amount <= balances[msg.sender], "Invalid transfer amount");

    balances[msg.sender] -= amount;
    payable(to).transfer(amount);

    emit Transfer(msg.sender, to, amount);
}


   
}

// 0x4801C01AB41b7Ec0C437b8B95d133Ab82BA1d0d0