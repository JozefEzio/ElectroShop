import InsertChartIcon from '@mui/icons-material/InsertChart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import { Link } from 'react-router-dom';
import equipeImg from '../assets/equipe.jpg';

const LandingPage = () => {
    return (
        <>
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-bold mb-6 text-primary">ElectroShop</h1>
                    <p className="text-2xl text-third mb-4 font-semibold">Tableau de Bord des Ventes</p>
                    <p className="text-xl text-fourth max-w-3xl mx-auto leading-relaxed">
                        Solution digitale complète pour la gestion des ventes d'électronique à Marrakech. 
                        Enregistrez vos transactions, suivez vos performances et obtenez des statistiques en temps réel.
                    </p>
                </div>

                <div className="bg-background rounded-xl p-8 mb-16 shadow-lg">
                    <h2 className="text-3xl font-bold text-center mb-6 text-primary">À Propos du Projet</h2>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg text-fourth mb-4 leading-relaxed">
                            ElectroShop est une application web moderne développée pour répondre aux besoins de 
                            M. Karim, gérant d'un magasin d'électronique à Marrakech. Fini les enregistrements 
                            manuels ! Notre système digital permet d'enregistrer toutes les ventes, de suivre les 
                            performances de l'équipe et d'obtenir des analyses détaillées en temps réel.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-main rounded-lg p-6 shadow">
                                <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                                    <ShoppingCartOutlinedIcon /> Gestion des Ventes
                                </h3>
                                <ul className="text-fourth space-y-2">
                                    <li>• Enregistrement rapide des transactions</li>
                                    <li>• Modification et suppression faciles</li>
                                    <li>• Calcul automatique du montant total</li>
                                    <li>• Support de multiples modes de paiement</li>
                                </ul>
                            </div>
                            <div className="bg-main rounded-lg p-6 shadow">
                                <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                                    <AssessmentOutlinedIcon /> Analyses Avancées
                                </h3>
                                <ul className="text-fourth space-y-2">
                                    <li>• Chiffre d'affaires journalier et mensuel</li>
                                    <li>• Top 5 des produits les plus vendus</li>
                                    <li>• Répartition des modes de paiement</li>
                                    <li>• Graphiques d'évolution sur 7 jours</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10 text-primary">Fonctionnalités Principales</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-600">
                            <div className="flex justify-center mb-4">
                                <InsertChartIcon fontSize="large" className="text-btn" />
                            </div>
                            <h3 className="text-center mb-3 text-primary font-semibold">Analyses en Temps Réel</h3>
                            <p className="text-center text-fourth">
                                Suivez vos performances avec des statistiques détaillées : CA du jour, du mois, 
                                panier moyen et plus encore
                            </p>
                        </div>

                        <div className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-600">
                            <div className="flex justify-center mb-4">
                                <ShoppingCartOutlinedIcon fontSize="large" className="text-green-600" />
                            </div>
                            <h3 className="text-center mb-3 text-primary font-semibold">Enregistrement des Ventes</h3>
                            <p className="text-center text-fourth">
                                Formulaire complet : produit, quantité, prix, client, date, mode de paiement et vendeur
                            </p>
                        </div>

                        <div className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-600">
                            <div className="flex justify-center mb-4">
                                <TrendingUpOutlinedIcon fontSize="large" className="text-purple-600" />
                            </div>
                            <h3 className="text-center mb-3 text-primary font-semibold">Graphiques Détaillés</h3>
                            <p className="text-center text-fourth">
                                Visualisez l'évolution de vos ventes sur les 7 derniers jours avec Recharts
                            </p>
                        </div>

                        <div className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-orange-600">
                            <div className="flex justify-center mb-4">
                                <PeopleOutlineOutlinedIcon fontSize="large" className="text-orange-600" />
                            </div>
                            <h3 className="text-center mb-3 text-primary font-semibold">Multi-Vendeurs</h3>
                            <p className="text-center text-fourth">
                                Gérez et suivez les performances individuelles de votre équipe de vente
                            </p>
                        </div>

                        <div className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-yellow-600">
                            <div className="flex justify-center mb-4">
                                <PaymentOutlinedIcon fontSize="large" className="text-yellow-600" />
                            </div>
                            <h3 className="text-center mb-3 text-primary font-semibold">Modes de Paiement</h3>
                            <p className="text-center text-fourth">
                                Support complet : Espèces, Carte bancaire, Virement et Chèque avec statistiques
                            </p>
                        </div>

                        <div className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-600">
                            <div className="flex justify-center mb-4">
                                <AssessmentOutlinedIcon fontSize="large" className="text-red-600" />
                            </div>
                            <h3 className="text-center mb-3 text-primary font-semibold">Top Produits</h3>
                            <p className="text-center text-fourth">
                                Identifiez rapidement vos 5 produits les plus vendus pour optimiser votre stock
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-background rounded-xl p-8 mb-16 shadow-lg">
                    <h2 className="text-3xl font-bold text-center mb-6 text-primary">Technologies Utilisées</h2>
                    <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
                        <div className="bg-main rounded-lg p-6 shadow">
                            <h3 className="font-semibold text-primary mb-3">Frontend</h3>
                            <ul className="text-fourth space-y-2">
                                <li>• React 18+ avec composants fonctionnels</li>
                                <li>• Redux pour la gestion d'état</li>
                                <li>• React Router pour la navigation</li>
                                <li>• Tailwind CSS pour le design moderne</li>
                            </ul>
                        </div>
                        <div className="bg-main rounded-lg p-6 shadow">
                            <h3 className="font-semibold text-primary mb-3">Fonctionnalités</h3>
                            <ul className="text-fourth space-y-2">
                                <li>• Interface responsive et intuitive</li>
                                <li>• Validation des formulaires côté client</li>
                                <li>• Calculs automatiques en temps réel</li>
                                <li>• Graphiques interactifs avec Recharts</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mb-16">
                    <Link
                        to="/dashboard"
                        className="bg-btn text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg font-semibold text-lg"
                    >
                        Accéder au Tableau de Bord
                    </Link>
                    <Link
                        to="/ventes"
                        className="bg-background text-btn px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors shadow-lg border-2 border-btn font-semibold text-lg"
                    >
                        Voir les Ventes
                    </Link>
                </div>

                <div className="bg-background rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8 text-primary">Équipe du Projet</h2>

                    <div className="flex flex-col items-center">
                        <div className="w-40 h-40 rounded-full overflow-hidden mb-8 shadow-xl bg-gray-100 border-4 border-btn">
                            <img
                                src={equipeImg}
                                alt="Créateurs du projet"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 text-center w-full">
                            <div className="bg-main rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-bold text-primary mb-2">Youssef Ahrouch</h3>
                                <p className="text-third font-semibold mb-2">Co-Créateur</p>
                            </div>

                            <div className="bg-main rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-bold text-primary mb-2">Hamza Iddou</h3>
                                <p className="text-third font-semibold mb-2">Co-Créateur</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage