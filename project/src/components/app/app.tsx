import MainPage from '../../pages/main-page/main-page';

type Props = {
  citiesCount: number;
}

function App({citiesCount}: Props): JSX.Element {
  return (
    <MainPage citiesCount={citiesCount} />
  );
}

export default App;
