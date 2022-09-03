module.exports = solve = (a, b, c) => {

	const d = Math.pow(b, 2) - (4 * a * c);

	if (d > 0) {

		const x1 = (-b + Math.sqrt(d)) / (a * 2);
		const x2 = (-b - Math.sqrt(d)) / (a * 2);

		return [x1, x2];

	} else if (d === 0) {

		const x = -1 * (b / (a * 2));
		return [x];

	} else {

		return [];
	}
};