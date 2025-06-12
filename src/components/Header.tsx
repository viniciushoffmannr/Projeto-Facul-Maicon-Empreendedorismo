import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-[#fdf6e3]  shadow-sm py-2.5 flex justify-center items-center">
      <img src={logo} alt="Logo do app" className="h-24 object-contain" />
    </header>
  );
};

export default Header;
