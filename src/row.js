import u from './util.js';
import state from './app-state.js';
import update from './update.js';


//sprawdzic zajetosc pamieciowa jesli daje 1 glownego listenera zamiast wielu mniejszych - i jak to zadziala na szybkosci funkcji

var trClicked = null;

exports.createRow = createRow;
function createRow(item) {
	let tr = u.create('tr');

	tr.addEventListener('click', function() {
		clickRow(tr);
	}, false);

	var td1 = u.create('td');
	var td2 = u.create('td');
	var td3 = u.create('td');
	var td4 = u.create('td');
	var td5 = u.create('td');
	var td6 = u.create('td');
	td1.className = 'col-md-1';
	td2.className = 'col-md-2';
	td3.className = 'col-md-2';
	td4.className = 'col-md-2';
	td5.className = 'col-md-2';
	td6.className = 'col-md-2';
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	tr.appendChild(td6);

	//mozna sprawdzic wydajnosc takich odwołań

	// tr.cells[0].appendChild(text(item.id));
	// tr.cells[1].appendChild(text(item.label));

	// td1.appendChild(text(item.id));
	// td2.appendChild(text(item.label));

	td1.innerText = item.id;
	td2.innerText = item.c1;
	td3.innerText = item.c2;
	td4.innerText = item.c3;
	td5.innerText = item.c4;

	//btn remove
	var btn = u.create('button');
	btn.className = 'btn btn-default';
	var span = u.create('span');
	span.className = 'glyphicon glyphicon-remove';
	btn.appendChild(span);
	btn.addEventListener('click', function(e) {
		deleteRow(item);
		e.stopPropagation();
	}, false);
	td6.appendChild(btn);

	return tr;
}

//tworzenie wielu listenerow vs 1 wiekszy - wydajnosc pamieciowa oraz szybkosc dzialania - mozna zmirzyc
function clickRow(tr) {
	if(!trClicked) {
		trClicked = tr;
		trClicked.classList.toggle('selected');
	}
	else if(trClicked !== tr) {
		trClicked.classList.toggle('selected');
		trClicked = tr;
		trClicked.classList.toggle('selected');
	} else if (trClicked === tr) {
		trClicked.classList.toggle('selected');
		trClicked = null;
	}
}

//non-keyed
function deleteRow(item) {
	var {data} = state;
	var idx = data.findIndex(it => it.id === item.id);
	var last = state.data.length-1;

	for(var i = idx; i < last; i++) {
		updateSingle(data[i], data[i+1]);
		update.updateRow(data[i]);
	}
	
	data[last].ref.remove();
	state.data.splice(last, 1);
}

function updateSingle(item1, item2) {
	item1.id = item2.id;
	item1.c1 = item2.c1;
	item1.c2 = item2.c2;
	item1.c3 = item2.c3;
	item1.c4 = item2.c4;
}

//keyed
function deleteRow2(tr, item) {
	tr.remove();
	var i = state.data.findIndex(it => it.id === item.id);
	if(i > -1) {
		state.data.splice(i, 1);
	}
}