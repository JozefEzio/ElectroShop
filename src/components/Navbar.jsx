import React from "react";
import ThemeToggle from "./ThemeToggle";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SellIcon from "@mui/icons-material/Sell";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-background text-secondary px-6 py-4 flex items-center justify-between shadow-md shadow-gray-300 dark:shadow-gray-700">
            <div className="flex items-center gap-2">
                <h3 className="text-primary font-bold text-2xl"><Link to={'/'}>ElectroShop</Link></h3>
            </div>

            <div className="flex gap-6 items-center">
                <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                    <DashboardIcon />
                    <Link to={'/dashboard'}>
                        <span>Dashboard</span>
                    </Link>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                    <SellIcon />
                    <Link to={'/ventes'}>
                        <span>Ventes</span>
                    </Link>
                </div>
            </div>

            <div>
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
