import pirelliImg from "../assets/images/pirelli-logo.png";
const Header = () => {
  return (
    <header className="App-header">
      <img src={pirelliImg} alt="logo_pirelli" className="logo" />
      <p>Pirelli Technical Challenge</p>
    </header>
  );
};

export default Header;
