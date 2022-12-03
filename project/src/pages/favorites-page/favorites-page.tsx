// import {AppRoute} from '../../const';
// import {Link} from 'react-router-dom';
// import {Helmet} from 'react-helmet-async';
// import Header from '../../components/header/header';
// import Footer from '../../components/footer/footer';
// import OfferItem from '../../components/offer-item/offer-item';
// import {useAppSelector} from '../../hooks';
// import getOffersGrouppedByCity from '../../util';
// import {getOffers} from '../../store/offer-data/selectors';

export {};

// function FavoritesPage(): JSX.Element {
//   const offers = useAppSelector(getOffers);
//   const offersGrouppedByCity = getOffersGrouppedByCity(offers);
//   const offersGrouppedByCityArray = Object.entries(offersGrouppedByCity);

//   return (
//     <div className="page">
//       <Helmet>
//         <title>Favorites Rooms</title>
//       </Helmet>

//       <Header />

//       <main className="page__main page__main--favorites">
//         <div className="page__favorites-container container">
//           <section className="favorites">
//             <h1 className="favorites__title">Saved listing</h1>
//             <ul className="favorites__list">
//               {offersGrouppedByCityArray.map(([city, offers]) => (
//                 <li className="favorites__locations-items" key={city}>
//                   <div className="favorites__locations locations locations--current">
//                     <div className="locations__item">
//                       <Link className="locations__item-link" to={`${AppRoute.Room}/${city}`}>
//                         <span>{city}</span>
//                       </Link>
//                     </div>
//                   </div>
//                   <div className="favorites__places">
//                     {offers.map((offer) => <OfferItem key={offer.id} offer={offer} className="favorites__card" imageWrapperClassName="favorites__image-wrapper" imageWidth={150} imageHeight={110} /> )}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </section>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default FavoritesPage;
