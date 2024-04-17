import { useState } from 'react'
import { ListSectionProps } from '../../Types';
export default function ListSection({ friend, setFriends, friends }: Readonly<ListSectionProps>) {
    const [inputName, setInputName] = useState<string>(friend.name);
    const [inputAmount, setInputAmount] = useState<number>(friend.amount);
    const [confirm, setConfirm] = useState<boolean>(false);
    const onConfirm = () => {
        const friendIndex = friends.findIndex(f => f.id === friend.id);
        const newFriends = [...friends];
        const amount = Number.isNaN(inputAmount) ? 0 : inputAmount;
        newFriends[friendIndex] = { id: friend.id, amount, name: inputName, debt: 0, receive: 0 };
        setFriends(newFriends);
        setConfirm(true);
    }

    return (
        <div className='w-[200px] flex  justify-center items-center gap-4'>
            <div className='flex flex-col justify-center gap-2'>
                <div className='flex items-center justify-center gap-2'>
                    <div className='flex items-center justify-center gap-2'>
                        <span className='font-semibold'>Name</span>
                        {confirm ? <div>{inputName}</div> :
                            <input onChange={e => setInputName(e.target.value)} className='h-8 outline-none rounded-md w-full' type="text" value={inputName} />}
                    </div>

                </div>

                <div className='flex items-center justify-center gap-2'>
                    <span className='font-semibold'>Amount</span>
                    {
                        confirm ? <div><span>$</span><span>{inputAmount}
                        </span></div> :
                            <input onChange={e => setInputAmount(parseFloat(e.target.value))} className='h-8 outline-none w-full rounded-md' type="number" value={inputAmount} />
                    }
                </div>
            </div>
            <div>
                {
                    confirm ?
                        <button onClick={() => setConfirm(!confirm)}>
                            <svg width="24px" height="24px" viewBox="-0.96 -0.96 25.92 25.92" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#4040f7" stroke-width="1.032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#4040f7"></path> </g></svg>
                        </button>
                        : <></>
                }
                {
                    confirm ? <></> :
                        <button className='' onClick={() => onConfirm()}>
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#4040f7" stroke-width="2.4"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6097 5.20743C21.0475 5.54416 21.1294 6.17201 20.7926 6.60976L10.7926 19.6098C10.6172 19.8378 10.352 19.9793 10.0648 19.9979C9.77765 20.0166 9.49637 19.9106 9.29289 19.7072L4.29289 14.7072C3.90237 14.3166 3.90237 13.6835 4.29289 13.2929C4.68342 12.9024 5.31658 12.9024 5.70711 13.2929L9.90178 17.4876L19.2074 5.39034C19.5441 4.95258 20.172 4.87069 20.6097 5.20743Z" fill="#4040f7"></path> </g></svg>
                        </button>
                }

            </div>
        </div>
    )
}
