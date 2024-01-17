import styles from './Contact.module.css'
import {FaLinkedin, FaGithub, FaInstagram} from 'react-icons/fa'

function Contact(){
    return(
        <>  
            <div className={styles.contact}>
                <h1>Rafael Gomes Pereira</h1>
                <p>Estudante de Engenharia de Software na Universidade de Brasília - UnB</p>
            </div>

            <ul className={styles.contact_list}>
                <li>
                    <a href="https://github.com/rafgpereira" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/rafael-pereira-3729b6295/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/rafgpereira" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                </li>
            </ul>
        </>
    )
}
export default Contact