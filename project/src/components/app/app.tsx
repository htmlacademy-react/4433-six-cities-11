import MainPage from '../../pages/main-page/main-page';

type AppScreenProps = {
  citiesCount: number;
}

function App({citiesCount}: AppScreenProps): JSX.Element {
  return (
    <MainPage citiesCount={citiesCount} />
  );
}

export default App;
