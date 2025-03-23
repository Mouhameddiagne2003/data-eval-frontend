import { Outlet } from "react-router-dom"
import Navbar from "./Navbar.jsx"
import Footer from "@/components/layout/Footer.jsx";
// import Footer from "./Footer"

function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />

        </div>
    )
}

export default Layout

