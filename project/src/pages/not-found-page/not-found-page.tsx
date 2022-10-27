import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>Page not found</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">404</h1>
            <h1 className="login__title">Not found</h1>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
