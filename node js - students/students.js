const http = require('http');

const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer( (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type','text/html');

	const mysql = require('mysql');

	const con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "student_dormitory"
	});


	//objektas su stiliais html-elementams. Visiškai nebutinai, bet taip gražiau
	let styles = {
		ul: 'style="list-style: none; margin: 20px auto; width: 80px; padding-left: 0"',
		li: 'style="padding: 5px 10px; margin-bottom: 8px; text-align: center; border-radius: 5px; background-color: tomato; width: 100%"',
		a: 'style="text-decoration: none; color: #fff"',
		table: 'border="1px" style="border-collapse: collapse; margin: 25px auto; width: 70vw"',
		h1: 'style="margin: 10px auto 0; text-align: center"'
	}

	//kintamieji su html-elementais, kurie kartojasi
	const beforeBodyContent = '<!DOCTYPE html><head><meta charset="utf-8"><title>Students</title></head><body>';
	const afterBodyContent = '</body></html>';
	const homeLink = `<a href="/" style="text-decoration: none; color: tomato">HOME</a>`;

	//funkcija, kuri ima užklauso į duomenų bazę rezultatą ir grąžina lėntelės ėilutę su stulpelių antraštėmis 
	const getTableHeaders = (querryResultArr) => {
		//querryResultArr[0] - tai pirmas objektas iš rezultatų masyvo.
		//Object.keys(querryResultArr[0]) - metod, kuris grąžina masyvą su objekto raktais
		// metodas map daro kažkas su kiekviena masyvo elementu ir grąžina naują masyvą su pakeistais elementais
		// metodas .split('_') iš, pvz 'student_name' daro ['student', 'name']
		// metodas .join('_') iš ['student', 'name'] daro 'student name'
		// vietoj `<th>${header.split('_').join(' ').toUpperCase()}${' '}</th>` galima parašyti ir tik `<th>${header}</th>`, bet būs ne teip gražu =) 

		return Object.keys(querryResultArr[0]).map(header => {return (`<th>${header.split('_').join(' ').toUpperCase()}${' '}</th>`)}).join('') + '</tr>';
	};

	//funkcija, kuri ima užklauso į duomenų bazę rezultatą ir grąžina kitas lėntelės ėilutes. Su tokia funkcija nereikia rankomis dirbti su kiekvienu užklauso rezultatu.
	const getTableRows = (querryResultArr) => {
		let rows = '';
		for (let rowObj of querryResultArr) {
			//rowObj - tai vienas objektas iš rezultatų masyvo
			//šita kilpa daro ėilutes
			let row = '<tr>';

			for (let key in rowObj) {
				//tai jau įdėtoji kilpa (angl. nested loop), kur dirba su kiekvienu objektu (rowObj) iš rezultatų masyvo
				//šita kilpa daro langelius ir pridėda juos prie ėilutę
				row += `<td>${rowObj[key] ?? '-'}</td>`;
			}
			row += '</tr>';
			rows += row;
		}

		return rows;
	};

	//funkcija, kuri kuri ima užklauso į duomenų bazę rezultatą ir lėntelės vardą (mes pati sugalvojame ir duodame šitą vardą)
	//naudojant aukščiau aprašytas funkcijas šita funkcija sujungia visus html-elementus į vieną html-puslapį ir grąžina šį puslapį
	//tableName
	const getFullHtml = (querryResult, tableName) => {
		let tableHeader = getTableHeaders(querryResult);
		let tableRows = getTableRows(querryResult);

		//stilius imame iš objekto su stiliais (žiūr. 21-oji ėilutė)
		const table = `<table ${styles.table}> ${tableHeader} ${tableRows} </table>`;
		const html = `${beforeBodyContent} ${homeLink} <h1 ${styles.h1}>${tableName}</h1> ${table} ${afterBodyContent}`;

		return html;
	}

	//kintamieji su užklausų tekstu
	const sqlStudents = 'SELECT `student_name`, `student_surname`, `city_name` FROM student LEFT JOIN city ON city_id = student_city_id;';
	const sqlRooms = 'SELECT `room_name`, `room_capacity` FROM room';
	const sqlLiving = 'SELECT `room_name`, ' +
										'CONCAT(`student_room_date_start`, " - ", `student_room_date_end`) AS Period, ' + 
										'CONCAT(`student_name`, " ", `student_surname`) AS Student ' +
										'FROM student_room ' +
										'LEFT JOIN student ON student_room_student_id = student_id ' +
										'LEFT JOIN room ON student_room_room_id = room_id;';

//toliau ėina tas kodas, kokį visi turi, bet jau labai trumpiau.
	if (req.url === '/students') {
		con.connect(function (err) {
			if (err) throw err;
			
			//sqlStudents - (žiūr. 81-oji ėilutė)
			con.query(sqlStudents, function (err, result) {
				if (err) throw err;
				
				//getFullHtml(result, 'Students') - (žiūr. 69-oji ėilutė)
				res.end(getFullHtml(result, 'Students'));
			});
		});

		//toliau analogiškai
	} else if (req.url === '/rooms') {
		con.connect(function (err) {
			if (err) throw err;
			
			con.query(sqlRooms, function (err, result) {
				if (err) throw err;
				
				res.end(getFullHtml(result, 'Rooms'));
			});
		});
	} else if (req.url === '/living') {
		con.connect(function (err) {
			if (err) throw err;
			
			con.query(sqlLiving, function (err, result) {
				if (err) throw err;
				
				res.end(getFullHtml(result, 'Living'));
			});
		});
	} else {
		//šita dalis nebūtinai daryti, bet su ji patogiau. Čia būs home page
		let pages = ['students', 'rooms', 'living']; // kitų puslapių vardai
		//darom sąrašą su nuorodomis į kitus puslapius
		let content = `<ul ${styles.ul}>
										${pages.map(page => { return `<li ${styles.li}>
											<a href="/${page}" ${styles.a}> ${page.toUpperCase()} </a>
										</li>`}).join('')}
									</ul>`;
		//naudojant aukščiau aprašytus kintamuosius, darom pilną html-puslapį
		let html = beforeBodyContent + content + afterBodyContent;
		res.end(html);
	}	
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});