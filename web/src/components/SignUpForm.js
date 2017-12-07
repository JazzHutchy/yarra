import React from 'react'

function SignUpForm({
  onSignUp
}) {
  return (
    <form
      onSubmit={(event) => {
        // Prevent old-school form submission
        event.preventDefault()

        const form = event.target
        const elements = form.elements
        const email = elements.email.value
        const password = elements.password.value

        // Pass this information along to the parent component
        onSignUp({ email, password })
      }}
    >
      <label
        className='mb-2'
      />
      {'Email: '}
      <input
        type='email'
        name='email'
      />
      <label
        className='mb-2'
      />
      {'Password: '}
      <input
        type='password'
        name='password'
      />
      <label
        className='mb-2'
      />
      <button className="button-animate">
        Sign-Up
      </button>
    </form>
  )
}

export default SignUpForm