import React from 'react'

const Signout = () => {

  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }
  
  return (
    <div onClick={signOut}>Signout</div>
  )
}

export default Signout