import OfferItem from '../offer-item/offer-item';
import {Offer} from '../../types/offer';

type Props = {
  offers: Offer[];
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
