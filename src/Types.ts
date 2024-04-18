import { Dispatch, SetStateAction } from "react";

interface Friend {
    id: string;
    name: string;
    amount: number;
    debt: number;
    receive: number;
}
interface ListSectionProps {
    friend: Friend;
    index: number;
    friends: Friend[];
    setFriends: Dispatch<SetStateAction<Friend[]>>;
}
export {
    type Friend,
    type ListSectionProps
}