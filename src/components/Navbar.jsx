import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-600">
          CSE Dept
        </h1>

        <div className="flex gap-8 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/faculty" className="hover:text-blue-600">Faculty</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;