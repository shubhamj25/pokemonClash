import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'
import '../App.scss'
import ToDoList from './toDoList'

const ToDoListMain = () => {

  const [account, setAccount] = useState(null)
  const [contract, loadSmartContract] = useState(null)
  const [, setTaskCount] = useState(0)
  const [tasks, setTasks] = useState([])
  const [isLoading, setLoading] = useState(true)
  async function loadWeb3() {
    const web3 = new Web3(Web3.givenProvider)
    const account = await web3.eth.getAccounts()
    setAccount(account)
    const toDoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    loadSmartContract(toDoList)
    await toDoList.methods.taskCount().call().then(async (val) => {
      setTaskCount(val)
      let list = [...tasks]
      for (let i = 1; i <= val; i++) {
        const _task = await toDoList.methods.tasks(i).call()
        list = [...list, _task]
        setTasks([...list])
      }
      setLoading(false)
    })
  }

  function createTask(content) {
    setLoading(true)
    contract.methods.createTask(content).send({ from: account[0] }).once('receipt', (receipt) => {
      console.log(receipt)
      setLoading(false)
      window.location.reload()
    })
  }

  function toggleCompleted(id) {
    contract.methods.toggleCompleted(id).send({ from: account[0] })
  }

  useEffect(() => {
    loadWeb3()
  }, [])

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0">Todo List</a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small><a className="nav-link" href="#"><span id="account"></span></a></small>
          </li>
        </ul>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex justify-content-center">
            <div id="loader" className="text-center">
              {isLoading ? <p className="text-center">Loading...</p> : <ToDoList tasks={tasks} createTask={createTask} toggleCompleted={toggleCompleted} />}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ToDoListMain
