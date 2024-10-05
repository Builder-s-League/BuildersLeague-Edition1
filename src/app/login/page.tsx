import LoginForm from '../../components/LoginForm'

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-sm p-8">
        <h1 className="mb-6 text-center text-2xl">Login</h1>
        <LoginForm />
      </div>
    </div>
  )
}
