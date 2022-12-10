import '../SASS/Card.scss';

function Card({ name, img }) {
  return (
    <div className='card'> 
      <p className='card__name'> { name } </p>
      <div className='card__circle'></div>
      <img className='card__image' src = { img } alt='Pokemon Image' />
    </div>
  )
}

export { Card }