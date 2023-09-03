import {TbMenu2} from "react-icons/tb"
import {AiOutlineMenu} from "react-icons/ai"

export const Burger = ({props}) => <TbMenu2 {...props} />
export const Burger2 = ({props, onClick}) => <AiOutlineMenu {...props} onClick={onClick}  />
