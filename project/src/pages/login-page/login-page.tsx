import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {useRef, FormEvent} from 'react';
import Header from '../../components/header/header';
import {useAppDispatch} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import {LOGIN_REGEXP, MIN_LENGTH_OF_PASSWORD, TIMEOUT_SHOW_ERROR} from '../../const';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [isPasswordValidate, setPasswordValidate] = useState(false);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setPasswordValidate(false);

    if (loginRef.current !== null && passwordRef.current !== null) {
      const password = passwordRef.current.value;

      if (password.length > MIN_LENGTH_OF_PASSWORD && LOGIN_REGEXP.test(password)) {
        dispatch(loginAction({
          login: loginRef.current.value,
          password: password,
        }));
      } else {
        setPasswordValidate(true);
        setTimeout(
          () => (setPasswordValidate(false)),
          TIMEOUT_SHOW_ERROR,
        );
      }
    }
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Login</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>

            <form className="login__form form" action="" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="login">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="login"
                  id="login"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                { isPasswordValidate ? <div>Invalid password</div> : ''}
              </div>

              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#todo">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
