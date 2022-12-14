import {useState, useRef, ChangeEvent, FormEvent, Fragment} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {addReviewAction} from '../../store/api-actions';
import {getUserData} from '../../store/user-process/selectors';
import {getCurrentOffer} from '../../store/offer-data/selectors';
import {MIN_LENGTH_OF_REVIEW, MAX_LENGTH_OF_REVIEW} from '../../const';

const ratings = [1, 2, 3, 4, 5];

function AddReviewForm(): JSX.Element {
  const author = useAppSelector(getUserData);
  const currentOffer = useAppSelector(getCurrentOffer);
  const reviewRef = useRef<HTMLTextAreaElement | null>(null);

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    reviewText: '',
    rating: '',
  });

  const [formDisabled, setFormDisabled] = useState(false);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => setFormData({...formData, rating: evt.target.value});
  const reviewChangeHandle = (evt: ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, reviewText: evt.target.value});

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setFormDisabled(true);
    if(!author || !currentOffer) {
      return false;
    }

    if (reviewRef.current !== null) {
      dispatch(addReviewAction({
        id: currentOffer.id,
        comment: reviewRef.current.value,
        rating: Number(formData.rating),
      }));

      setFormDisabled(false);
      setFormData({...formData, rating: '', reviewText: ''});
    }
  };

  return(
    <form className="reviews__form form" action="" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {ratings.map((rating) => (
          <Fragment key={rating}>
            <input
              className="form__rating-input visually-hidden"
              checked={Number(formData.rating) === rating}
              disabled={formDisabled}
              onChange={handleRatingChange}
              name="rating" value={rating}
              id={`${rating}-stars`}
              type="radio"
              required
            />
            <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>

      <textarea
        ref={reviewRef}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        required
        minLength={MIN_LENGTH_OF_REVIEW}
        maxLength={MAX_LENGTH_OF_REVIEW}
        onChange={reviewChangeHandle}
        disabled={formDisabled}
        value={formData.reviewText}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={formData.reviewText.length < MIN_LENGTH_OF_REVIEW || formData.rating === '' || formDisabled}
        >
            Submit
        </button>
      </div>
    </form>
  );
}

export default AddReviewForm;
