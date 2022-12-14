import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import Footer from '../../components/footer/footer';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">404. Page not found</h1>
            <Link to="/">Вернуться на главную</Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotFoundPage;
