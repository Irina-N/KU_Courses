const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// užkrauname mysql biblioteką
const mysql = require("mysql");
const { req } = require("express");

// prisijungimaas prie mysql
const db = mysql.createConnection({
	host: "localhost",
	user: "root", // db vartotojas
	password: "root", // reikia nurodyti savo vartotojo slaptažodį
	database: "fe_autonuoma", // db pavadinimas
	timezone: 'utc'
});

// vykdomas prisijungimas su DB
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("Prisijungta prie DB");
});

// automobilių sąrašas
app.get("/api/v1/automobiliai", (req, res) => {
	let sql = `
				SELECT
				a.id,
				a.numeris,
				mr.pavadinimas AS marke,
				md.pavadinimas AS modelis,
				at.pavadinimas AS tipas,
				a.aprasymas,
				a.pastabos
				FROM automobilis AS a
				JOIN modelis AS md ON md.id = a.modelio_id
				JOIN marke AS mr ON mr.id = md.markes_id
				JOIN automobilioTipas AS at ON at.id = md.automobilio_tipo_id
				WHERE a.nebenaudojamas <> 1;`;
	db.query(sql, (err, db_rezultatas) => {
		if (err) {
			throw err;
		}

		// išsiunčia duomenis
		res.send(db_rezultatas);
	});
});

// konkretaus automobilio informacija
app.get("/api/v1/automobiliai/:auto_id", (req, res) => {
	
	let sql = `
				SELECT
								a.id, 
								a.numeris, 
								mr.pavadinimas AS marke, 
								md.pavadinimas AS modelis, 
								at.pavadinimas AS tipas, 
								a.aprasymas, 
								a.pastabos 
				FROM automobilis AS a 

				JOIN modelis AS md ON md.id = a.modelio_id 
				JOIN marke AS mr ON mr.id = md.markes_id 
				JOIN automobilioTipas AS at ON at.id = md.automobilio_tipo_id 

				WHERE 
						a.nebenaudojamas <> 1 
						AND a.id = ?;`;

	db.query(sql, [req.params.auto_id], (err, db_rezultatas) => {
		if (err) {
			throw err;
		}
		
		// išsiunčia duomenis
		res.send(db_rezultatas);
	});
});

// konkretaus automobilio informacija
app.get("/api/v1/automobiliai/:auto_id/uzsakymai", (req, res) => {
	let sql = `
				SELECT 
					u.id,
					a.id AS automobilio_id,
					CONCAT(mr.pavadinimas, " ", md.pavadinimas) AS automobilis,
					a.numeris,
					u.data_nuo,
					u.data_iki,
					u.suma,
					ub.pavadinimas AS busena,
					u.pastabos,
					k.id AS kliento_id,
					CONCAT(k.vardas, " ", k.pavarde) AS klientas
				FROM uzsakymas AS u
				LEFT JOIN automobilis AS a ON a.id = u.automobilio_id

				JOIN modelis AS md ON md.id = a.modelio_id
				JOIN marke AS mr ON mr.id = md.markes_id

				JOIN klientas AS k ON k.id = u.kliento_id
				JOIN uzsakymuBusena AS ub ON ub.id = u.busenos_id

				WHERE a.id = ?
				ORDER BY u.data_nuo DESC;`;

	db.query(sql, [req.params.auto_id], (err, db_rezultatas) => {
		if (err) {
			throw err;
		}

		// išsiunčia duomenis
		res.send(db_rezultatas);
	});
});

// klientų sąrašas select elementui
app.get("/api/v1/klientai/select", (req, res) => {
	let sql = `
				SELECT 
						k.id,
						CONCAT(k.vardas, " ", k.pavarde) AS klientas
				FROM klientas AS k
				ORDER BY k.pavarde, k.vardas;`;

	db.query(sql, (err, db_rezultatas) => {
		if (err) {
			throw err;
		}

		// išsiunčia duomenis
		res.send(db_rezultatas);
	});
});

// automobilių būsenų sąrašas select elementui
app.get("/api/v1/uzsakymuBusenos/select", (req, res) => {
	let sql = `SELECT ub.id, ub.pavadinimas
		FROM uzsakymuBusena AS ub;`;

	db.query(sql, [req.params.auto_id], (err, db_rezultatas) => {
		if (err) {
			throw err;
		}

		// išsiunčia duomenis
		res.send(db_rezultatas);
	});
});


app.use('/api/v1/uzsakyti', function (req, res, next) {	

	const {auto_id, kliento_id, data_nuo, data_iki} = {...req.body};
	
	//tikriname request data, jeigu auto_id ir kliento_id yra skaičiai, o data_nuo anksčiau nėgu data_iki, kviečiame kitą užklauso dalį

	if ( Number.isInteger(+auto_id) && Number.isInteger(+kliento_id) && data_iki >= data_nuo) {

		next();

	} else {

		return res.status(406).send({ message: "Duomenys neteisingi" });
	}
});


app.use('/api/v1/uzsakyti', function (req, res, next) {

	const {auto_id, data_nuo, data_iki} = {...req.body};

	//darome užklausą į DB, tikriname ar šitas utomobilis jau rezervuotas. Jeigu ne, kviečiame kitą užklauso dalį

	let sql = `SELECT
									u.automobilio_id AS a_id
								FROM uzsakymas AS u
								WHERE
									u.busenos_id <> 4
									AND u.data_nuo <= ? 
									AND u.data_iki >= ?
									AND u.automobilio_id = ?
							GROUP BY u.automobilio_id;`;

	db.query(sql, [data_iki, data_nuo, +auto_id], (err, db_rezultatas) => {
		
		if (err) {
			throw err;
		}

		if (db_rezultatas.length === 0) {
			next();
		}	else if (db_rezultatas[0].a_id === +auto_id) {
			return res.status(406).send({ message: "Automobilis jau rezervuotas" });
		}
		
	});
});


app.use('/api/v1/uzsakyti', function (req, res, next) {

	const {auto_id, data_nuo, data_iki, suma} = {...req.body};

	if (!suma || +suma < 0) {

		//darome užklausą į DB, kad gauti užsakymo sumą. Pridėdame gautą sumą į request body, po to kviečiame kitą užklauso dalį

		const uzsakymoTrukme = ((new Date(data_iki) - new Date(data_nuo)) / (1000 * 3600 * 24) + 1);

		let sql = `SELECT	
							min(k.kaina) * ? AS uzsakymoKaina
							FROM kaina AS k
							WHERE 
							k.trukme <= ?
							AND automobilio_id = ?;`;

		db.query(sql, [uzsakymoTrukme, uzsakymoTrukme, auto_id], (err, db_rezultatas) => {
			
			if (err) {
				throw err;
			}

			req.body.suma = db_rezultatas[0].uzsakymoKaina ?? null;

			next();
			
		});	

	} else {
		next();
	}
	
});


app.post("/api/v1/uzsakyti", (req, res) => {

	let {auto_id, kliento_id, busenos_id = 1, suma, data_nuo, data_iki, data_pastabos} = {...req.body};

	//darome paskutinį užklausą, kad pridėti užsakymą į DB.

	let sql = 'INSERT INTO uzsakymas(kliento_id, automobilio_id, busenos_id, data_nuo, data_iki, suma, pastabos) VALUES(?, ?, ?, ?, ?, ?, ?);'
		
	db.query(sql, [kliento_id, auto_id, busenos_id, data_nuo, data_iki, suma, data_pastabos], (err, db_rezultatas) => {

		if (err) {
			throw err;
		}

		res.status(201).send({
			message: `Uzsakymas sėkmingai pridetas su ID: ${db_rezultatas.insertId}`,
			id: db_rezultatas.insertId
		});

	});

});


app.get("/api/v1/uz", (req, res) => {
	let sql = `
				SELECT
				*
				FROM uzsakymas;`;
	db.query(sql, (err, db_rezultatas) => {
		if (err) {
			throw err;
		}

		res.send(db_rezultatas);
	});
});

app.get("/api/v1/uz", (req, res) => {
	res.sendFile(__dirname + "/uz.html");
});

app.get("/automobiliai", (req, res) => {
	res.sendFile(__dirname + "/automobiliai.html");
});

app.get("/", (req, res) => {
	res.send(`Go to <a href="/automobiliai">here</a>`);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});


//pagalbinė lentelė (pašalinti pakeitimus bazėje);

/* app.get("/api/v1/uzdel", (req, res) => {
	let sql = `
	DELETE FROM uzsakymas
	WHERE uzsakymas.id > 26;`;
	//let sql = `ALTER TABLE uzsakymas AUTO_INCREMENT = 27;`;
	db.query(sql, (err, db_rezultatas) => {
		if (err) {
			throw err;
		}

		// išsiunčia duomenis
		res.send(db_rezultatas);
	});
}); */