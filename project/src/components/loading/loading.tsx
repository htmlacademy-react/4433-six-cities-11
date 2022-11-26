import GridLoader from 'react-spinners/ClipLoader';
import './loading.css';

const override: React.CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: '#4481c3',
};

function Loading(): JSX.Element {
  return(
    <div className='loading'>
      <GridLoader
        color='#36d7b7'
        cssOverride={override}
        size={150}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
}

export default Loading;
