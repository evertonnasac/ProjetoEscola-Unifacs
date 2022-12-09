
import "./Footer.sass"
import alfineteIcon from "../../src/images/alfinete.png"
import phoneIcon from "../../src/images/whats.png"
import instaIcon from "../../src/images/insta.png"
import twiterIcon from "../../src/images/twitter.png"
import faceIcon from "../../src/images/face.png"

export const Footer = () => {
    return (
        <footer>
            <div className="container_footer_info">
                <p className="footer_name">Escolinha do Pato</p>
                <div className="container_footer_phone">
                    <span className="footer_cnpj">CNPJ: 11.000.111/0001-10 {'\u00A0'} {'\u00A0'}</span>
                    <span className="footer_phone">Tel. :71-55555-9999</span>
                </div>
                <div className="container_footer_addrees">
                    <img src={alfineteIcon} alt="" className="" />
                    <span className="street"> {'\u00A0'} Rua Carmelinda Silva, 205 {'\u00A0'} {'\u00A0'} </span>
                    <span>Salvador City - Bahia</span>
                </div>
            </div>
        </footer>
    )
}