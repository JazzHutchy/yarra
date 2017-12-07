import React from 'react'

function SignInForm({
  onSignIn
}) {
  return (
    <form
      onSubmit={(event) => {
        // Prevent old-school form submission
        event.preventDefault()

        const form = event.target
        const elements = form.elements // Allows looking up fields using their 'name' attributes
        // Get entered values from fields
        const email = elements.email.value
        const password = elements.password.value

        // Pass this information along to the parent component
        onSignIn({ email, password })
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
      <button>
        Sign-In
    </button>
    </form>
  )
}

export default SignInForm