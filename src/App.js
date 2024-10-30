import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Web3 from "web3";

const ADDRESS = "0xacECF93A77391748cFB7544c08124ceb5e88604d";
const ABI =[{"inputs":[{"internalType":"uint256","name":"startingpoint","type":"uint256"},{"internalType":"string","name":"_startingMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"decreaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getnumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}];
function App() {
  const [number, setNumber] = useState("none");
  const [currentMessage, setCurrentMessage] = useState("none");
  const [newMessage, setNewMessage] = useState("");

  const web3 = new Web3(window.ethereum);
  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  async function getNumber(){
    const result = await myContract.methods.getnumber().call();
    setNumber(result.toString());
  }
  
  async function getMessage(){
    const message = await myContract.methods.message().call();
    setCurrentMessage(message);
  }
  async function increaseNumber(){
    const accounts = await web3.eth.requestAccounts();
    await myContract.methods.increaseNumber().send({ from: accounts[0] });
    getNumber();    
  }

  async function decreaseNumber(){
    const accounts = await web3.eth.requestAccounts();
    await myContract.methods.decreaseNumber().send({ from: accounts[0] });
    getNumber();
  }

  async function updateMessage(){
    const connectedAccounts= await web3.eth.requestAccounts();
    const Transaction = await myContract.methods.setMessage(newMessage).send({ from: connectedAccounts[0]});
    getMessage();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getNumber}>Get number</button>
        <br />
        <button onClick={getMessage}>Get message</button>
        <br />
        <p>Message: {currentMessage}</p>
        <br />
        <button onClick={increaseNumber}>Increase Number</button>
        <br />
        <button onClick={decreaseNumber}>Decrease Number</button>
        <br/>
        <p>Number: {number}</p>
        <br />
        <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Enter new message"
        />
        <br/>
        <button onClick={updateMessage}>Update message</button>
        <br />
      </header>
    </div>
  );
}

export default App;