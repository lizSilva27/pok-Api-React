import '../SASS/Button.scss';

function Button( { icon, handleClikc } ) {
  return (
    <div className='button__box'>
        <button className='button' onClick = { handleClikc } > { icon } </button>
        <div className='button__box-shadow'> </div>
    </div>
  )
}

export { Button }