import './Card.css'
import Kachow from '../../pictures/Kachow.jpg'

function Card(){
    return(
    <div className='card'>
        <img src={Kachow} alt='bla' />
        Lightning McQueen
        </div>

    )
}

export default Card;