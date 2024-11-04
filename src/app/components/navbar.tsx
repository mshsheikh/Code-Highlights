import Link from "next/link";

export default function NavBar() {
    return(
            <nav className="
        flex
        justify-between
        bg-black
        text-2xl
        text-white
        h-14
        pt-2.5
        ">
            <h1 className="pl-8 font-bold">COFFEE SHOP</h1>
            <ul className="text-right pr-8">
                <li className="inline-block px-2"><Link href="/">Home</Link></li>  
                <li className="inline-block px-2"><Link href="/menu">Menu</Link></li> 
                <li className="inline-block px-2"><Link href="/order">Order</Link></li>
                <li className="inline-block px-2"><Link href="/location">Location</Link></li>
                <li className="inline-block px-2"><Link href="/careers">Careers</Link></li>
            </ul>
        </nav>        
    );
}