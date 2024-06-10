import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold">
          Create Expenses
        </Link>
      </div>
      <hr />
    </>
  );
};

export default Navbar;
