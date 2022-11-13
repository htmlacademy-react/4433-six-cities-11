import OfferItem from '../offer-item/offer-item';
import {Offer} from '../../types/offer';

type Props = {
  offers: Offer[];
  className?: string;
  imageWrapperClassName?: string;
  imageWidth?: number;
  imageHeight?: number;
};

function OfferList(props: Props): JSX.Element {
  const {offers, className, imageWrapperClassName, imageWidth, imageHeight} = props;

  return(
    <>
      {offers.map((offer) => (
        <OfferItem
          offer={offer}
          key={offer.id}
          className={className}
          imageWrapperClassName={imageWrapperClassName}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
        />
      ))}
    </>
  );
}

export default OfferList;
