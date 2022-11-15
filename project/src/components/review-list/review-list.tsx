import {Review} from '../../types/review';
import ReviewItem from '../review-item/review-item';

type Props = {
  reviews: Review[];
}

function ReviewList({reviews}: Props): JSX.Element {
  if (reviews.length === 0) {
    return <div>Нет отзывов</div>;
  }

  return(
    <ul className="reviews__list">
      {reviews.map((review) => <ReviewItem key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewList;
