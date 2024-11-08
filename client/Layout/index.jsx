import Footer from "../components/Footer"
import Header from "../components/Header"
import Navbar from "../components/Navbar"

function Layout({children}){
    return(
        <>
            <Navbar/>
            <Header />
                {children}
            <Footer/>
        </>
    )
}
export default Layout