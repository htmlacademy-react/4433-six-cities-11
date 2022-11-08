import OfferItem from '../offer-item/offer-item';
import {Offers} from '../../types/offer';

type Props = {
  offers: Offers;
};

function OfferList(props: Props): JSX.Element {
  const {offers} = props;

  return(
    <>
      {offers.map((offer) => <OfferItem offer={offer} key={offer.id}/> )}
    </>
  );
}

export default OfferList;
