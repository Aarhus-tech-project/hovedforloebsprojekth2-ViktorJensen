import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { SlLogin } from "react-icons/sl";

function NavBar() {
    return(
        <div className="absolute w-screen h-15 bg-red-700">
            <div className="flex justify-between items-center h-15 p-5">
                <div>Logo</div>
                <div className="hidden md:flex">
                    <div className="pr-1 pl-1">Market</div>
                    <div className="pr-1 pl-1">Learn more</div>
                    <div className="pr-1 pl-1">Customer support</div>
                </div>
                <div className="flex items-center">
                    <div className="pr-1"><SlLogin size={20}/></div>
                    <div className="flex md:hidden"><HiOutlineMenuAlt4 size={20}/>
</div>
                </div>
            </div>
        </div>
    )
}

export default NavBar;