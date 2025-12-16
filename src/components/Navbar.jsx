import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SellIcon from "@mui/icons-material/Sell";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    return (
        <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to={'/'} className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-btn to-indigo-600 rounded-lg shadow-md">
                            <ElectricBoltIcon className="w-5 h-5 text-white" />
                        </div>
                        <button className="group">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-btn to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-btn transition-all">
                                ElectroShop
                            </h1>
                        </button>
                    </Link>

                    <div className="hidden md:flex items-center gap-2">
                        <Link to={'/dashboard'}
                            onClick={() => setActiveLink('dashboard')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeLink === 'dashboard'
                                ? 'bg-btn text-white shadow-md'
                                : 'text-five hover:text-secondary hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                        >
                            <DashboardIcon className="w-5 h-5" />
                            <span>Dashboard</span>
                        </Link>
                        <Link to={'/ventes'}
                            onClick={() => setActiveLink('ventes')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeLink === 'ventes'
                                ? 'bg-btn text-white shadow-md'
                                : 'text-five hover:text-secondary hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                        >
                            <SellIcon className="w-5 h-5" />
                            <span>Ventes</span>
                        </Link>

                        <div className="ml-2">
                            <ThemeToggle />
                        </div>
                    </div>

                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <CloseIcon className="w-6 h-6" />
                            ) : (
                                <MenuIcon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col gap-2">
                            <Link to={'/dashboard'}
                                onClick={() => setActiveLink('dashboard')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeLink === 'dashboard'
                                    ? 'bg-btn text-white shadow-md'
                                    : 'text-five hover:text-secondary hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <DashboardIcon className="w-5 h-5" />
                                <span>Dashboard</span>
                            </Link>
                            <Link to={'/ventes'}
                                onClick={() => setActiveLink('ventes')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeLink === 'ventes'
                                    ? 'bg-btn text-white shadow-md'
                                    : 'text-five hover:text-secondary hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <SellIcon className="w-5 h-5" />
                                <span>Ventes</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>

    );
};

export default Navbar;
