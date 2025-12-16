import InsertChartIcon from '@mui/icons-material/InsertChart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import { Link } from 'react-router-dom';
import equipeImg from '../assets/equipe.jpg';
const LandingPage = () => {
    return (
        <>
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-6xl mb-6 text-primary">ElectroShop</h1>
                    <p className="text-2xl text-third mb-4">Tableau de Bord des Ventes</p>
                    <p className="text-xl text-fourth max-w-2xl mx-auto">
                        Gérez vos ventes d{"'"}électronique à Marrakech avec un système digital moderne et efficace
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <div className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex justify-center mb-4">
                            <InsertChartIcon fontSize="large" className="text-btn" />
                        </div>
                        <h3 className="text-center mb-2 text-primary">Analyses en Temps Réel</h3>
                        <p className="text-center text-fourth">
                            Suivez vos performances avec des statistiques détaillées
                        </p>
                    </div>

                    <div className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex justify-center mb-4">
                            <ShoppingCartOutlinedIcon fontSize="large" className="text-green-600" />
                        </div>
                        <h3 className="text-center mb-2 text-primary">Gestion des Ventes</h3>
                        <p className="text-center text-fourth">
                            Enregistrez et gérez toutes vos transactions facilement
                        </p>
                    </div>

                    <div className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex justify-center mb-4">
                            <TrendingUpOutlinedIcon fontSize="large" className="text-purple-600" />
                        </div>
                        <h3 className="text-center mb-2 text-primary">Graphiques Détaillés</h3>
                        <p className="text-center text-fourth">
                            Visualisez l{"'"}évolution de vos ventes sur 7 jours
                        </p>
                    </div>

                    <div className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex justify-center mb-4">
                            <PeopleOutlineOutlinedIcon fontSize="large" className="text-orange-600" />
                        </div>
                        <h3 className="text-center mb-2 text-primary">Multi-Vendeurs</h3>
                        <p className="text-center text-fourth">
                            Gérez les performances de votre équipe de vente
                        </p>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/dashboard"
                        className="bg-btn text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
                    >
                        Accéder au Tableau de Bord
                    </Link>
                    <Link
                        to="/ventes"
                        className="bg-background text-btn px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors shadow-lg border-2 border-btn"
                    >
                        Voir les Ventes
                    </Link>
                </div>

                <div className="mt-16 bg-background rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
                    <h2 className="text-center mb-8 text-primary">Équipe du Projet</h2>

                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-lg bg-gray-100">
                            <img
                                src={equipeImg}
                                alt="Créateurs du projet"
                                className="w-full h-full object-cover"
                            />

                        </div>

                        <div className="grid md:grid-cols-2 gap-8 text-center">
                            <div>
                                <h3 className="text-primary mb-1">Youssef Ahrouch</h3>
                                <p className="text-fourth">Co-Créateur</p>
                            </div>

                            <div>
                                <h3 className="text-primary mb-1">Hamza Iddou</h3>
                                <p className="text-fourth">Co-Créateur</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default LandingPage