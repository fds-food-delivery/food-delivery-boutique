import React from 'react';
import './APropos.css';

const APropos = () => {
	return (
		<div
			className="apropos-container mt-5 pt-5 relative bg-cover bg-center"

		>
			<div className="apropos-overlay absolute inset-0 "></div>
			<div className="apropos-content relative max-w-4xl mx-auto p-8 bg-white bg-opacity-90 rounded-lg shadow-lg"

			>
				<div className="apropos-header text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-800">À propos de Thurquoise</h1>
				</div>
				<div className="text-lg text-gray-700 space-y-6">
					<p>
						Chez Thurquoise, nous croyons en la puissance d'un bon repas pour rapprocher les gens. Fondé en 2xxx, notre fast-food a été créé avec la vision de proposer des repas délicieux, rapides, et abordables pour tous.
					</p>
					<p>
						Notre menu est soigneusement conçu pour offrir une variété de plats savoureux, des burgers juteux aux salades fraîches, en passant par nos célèbres frites croustillantes. Nous utilisons uniquement des ingrédients de qualité, sourcés auprès de fournisseurs locaux de confiance.
					</p>
					{/* Tableau du menu */}
					<div className="overflow-x-auto">
						<table className="table-auto w-full text-left text-gray-800">
							<thead>
							<tr>
								<th className="px-4 py-2 bg-gray-200">Menu</th>
								<th className="px-4 py-2 bg-gray-200">Prix</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td className="border px-4 py-2">Burger</td>
								<td className="border px-4 py-2">2000 FCFA</td>
							</tr>
							<tr>
								<td className="border px-4 py-2">Frites</td>
								<td className="border px-4 py-2">1000 FCFA</td>
							</tr>
							<tr>
								<td className="border px-4 py-2">Sandwich</td>
								<td className="border px-4 py-2">1500 FCFA</td>
							</tr>
							<tr>
								<td className="border px-4 py-2">Salade</td>
								<td className="border px-4 py-2">1500 FCFA</td>
							</tr>
							</tbody>
						</table>
					</div>
					<p>
						Merci de faire partie de notre histoire. Nous sommes impatients de continuer à vous servir et à grandir avec vous.
					</p>
				</div>

			</div>
		</div>
	);
};

export default APropos;
