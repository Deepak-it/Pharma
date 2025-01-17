'use client'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react"
import axios from "axios";
function Login () {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          debugger;
          const response = await axios.post('/api/validateLogin', { username, password });
          if (response?.data?.message === "Login successful") {
            router.push('/products')
          }
        } 
        catch (error) {
          console.error('Login error:', error);
          setError('Invalid credentials. Please try again.');
        }
      };

      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

return <section class="bg-light p-3 p-md-4 p-xl-5">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-xxl-11">
        <div class="card border-light-subtle shadow-sm">
          <div class="row g-0">
            <div class="col-12 col-md-6">
              <img class="img-fluid rounded-start w-100 h-100 object-fit-cover" loading="lazy" src="/logo-img-1.webp" alt="Welcome back you've been missed!"></img>
            </div>
            <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <div class="col-12 col-lg-11 col-xl-10">
                <div class="card-body p-3 p-md-4 p-xl-5">
                  <div class="row">
                    <div class="col-12">
                      <div class="mb-5">
                        <div class="text-center mb-4">
                          <a href="#!">
                            <img src="./assets/img/bsb-logo.svg" alt="BootstrapBrain Logo" width="175" height="57"></img>
                          </a>
                        </div>
                        <h4 class="text-center">Welcome back you've been missed!</h4>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="d-flex gap-3 flex-column">
                        <a href="#!" class="btn btn-lg btn-outline-dark">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                          </svg>
                          <span class="ms-2 fs-6">Log in with Google</span>
                        </a>
                      </div>
                      <p class="text-center mt-4 mb-5">Or sign in with</p>
                    </div>
                  </div>
                  <form onSubmit = {handleSubmit} action="#!">
                    <div class="row gy-3 overflow-hidden">
                      <div class="col-12">
                        <div class="form-floating mb-3">
                        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id = "username"
            name = "username"
            placeholder="username"
            className="form-control"
            required
          />
                          <label htmlFor="username" class="form-label">Username</label>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-floating mb-3">
                        <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id = "password"
            placeholder="password"
            name = "password"
            className="form-control"
            required
          />
                          <label htmlFor="password" class="form-label">Password</label>
                          <span
                                                                className="position-absolute top-50 end-0 translate-middle-y pe-3"
                                                                onClick={togglePasswordVisibility}
                                                                style={{ cursor: 'pointer' }}
                                                            >
                                                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                                            </span>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" name="remember_me" id="remember_me"></input>
                          <label class="form-check-label text-secondary" for="remember_me">
                            Keep me logged in
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                      </div>
                      <div class="col-12">
                        <div class="d-grid">
                          <button onClick={handleSubmit} class="btn btn-dark btn-lg" type="submit">Log in now</button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div class="row">
                    <div class="col-12">
                      <div class="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                        <a href="#!" class="link-secondary text-decoration-none">Create new account</a>
                        <a href="#!" class="link-secondary text-decoration-none">Forgot password</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>}

export default Login