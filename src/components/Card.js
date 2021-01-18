import React from 'react'

const Card = ({ user }) => {
  return (
    <div >
      <div className="break" />
          <div>
            <h5 style={{color:'blue',textAlign:'center',fontWeight:600}}>{user.caption}</h5>
            <p style={{color:'blue',textAlign:'center',fontWeight:200}}>{user.timestamp}</p>
          </div>
    </div>
      
  )
}

export default Card