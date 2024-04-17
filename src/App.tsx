import { useEffect, useState } from 'react';
import { v4 as uuid } from "uuid";
import ListSection from './components/ListSection/ListSection';
import { Friend } from './Types';
function App() {
  const [friends, setFriends] = useState<Friend[]>([{ id: uuid(), amount: 0, name: '', debt: 0, receive: 0 }]);
  const [result, setResult] = useState<boolean>(false);

  const handleAdd = () => {
    const id = uuid();
    const amount = 0;
    const name = '';
    const friend: Friend = { id, amount, name, receive: 0, debt: 0 };
    if (amount < 0) return;
    setFriends(prev => {
      return [...prev, friend];
    });
  }
  const calculateResult = () => {
    let tolalSpent = 0;
    for (const friend of friends) {
      tolalSpent += friend.amount;
    }
    const splitAmount = tolalSpent / friends.length;
    for (let i = 0; i < friends.length; i++) {
      const friend = friends[i];
      const balance: number = parseFloat((splitAmount - friend.amount).toFixed(2));
      if (balance > 0) {
        friend.debt = balance;
        friends[i] = friend;
        const newFriends = [...friends]
        setFriends(newFriends);
        setResult(true)
        continue;
      }
      friend.receive = balance;
      friends[i] = friend;
      const newFriends = [...friends]
      setFriends(newFriends);
      setResult(true);
    }

  }
  return (
    <>
      <h1 className=' p-3 mt-4 mx-auto text-4xl w-fit font-semibold'>Split <span className=' text-[#4040f7]'>Budget</span></h1>
      <div className='w-[100vw] flex flex-col items-center gap-6 justify-center mt-8 mb-8'>
        <div className='flex flex-col gap-8 bg-[#e0e6f5] h-fit p-6 rounded-2xl'>
          <div className="flex flex-col justify-center items-center gap-5">
            {
              friends.map(f => {
                return (
                  <ListSection key={f.id} friend={f} setFriends={setFriends} friends={friends} />
                )
              })
            }
          </div>
          <button className='font-semibold rounded-2xl border-[#4962b6] text-[#4962b6] border-2 p-2 w-32 mx-[auto] hover:bg-[#4962b6] hover:text-[#fff] transition' onClick={() => handleAdd()}>
            <span>Add friend</span>
          </button>
        </div>

        <button className='w-60 p-2 rounded-2xl bg-[#4040f7] text-[#fff] font-semibold hover:bg-[#3131f9] transition-all' onClick={() => calculateResult()}>
          Calculate slpit
        </button>
      </div>
      {
        result &&
        <div className=' w-96 bg-[#e0e6f5] mx-auto p-3 rounded-2xl flex justify-center gap-8 mb-8'>
          <div>
            <h2 className=' text-3xl'>Debtors</h2>
            {
              friends.filter(f => f.debt !== 0).map(f => {
                return (
                  <div key={f.id}>
                    <div>
                      {f.name}
                    </div>
                    <div>
                      <span>Debt:</span>
                      <span>{f.debt}</span>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div>
            <h2 className=' text-3xl'>Creditors</h2>
            <div>
              {
                friends.filter(f => f.receive !== 0).map(f => {
                  return (
                    <div key={f.id}>
                      <div>
                        {f.name}
                      </div>
                      <div>
                        <span>Receive:</span>
                        <span>{Math.abs(f.receive)}</span>
                      </div>
                    </div>
                  )
                })

              }
            </div>
          </div>


        </div>
      }
    </>

  )
}

export default App
