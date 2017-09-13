// PLUGIN 
var booblePuzzleFinder = (function() {
//revealing module pattern  https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc
	// private variables in the closure 

	// esposing functions via an interface while hiding the implementation of the module within the function() block

	// LIFO structure 
	var LIFO = function() {
		var functionSet = (function() {
			var _elements = [];
			return [
				function() {
					return _elements.push.apply(_elements, arguments);
				},
				function() {
					return _elements.pop.apply(_elements, arguments);
				},
				function() {
					return _elements.length;
				},
				function(n) {
					return _elements.length = n;
				},
				function(n) {
					return _elements[n];;
				},
				function(n, m) {
					return _elements.splice.apply(_elements,arguments);
				},
				function() {
					for(var i = 0 ; i < _elements.length; i++) {
						console.log(_elements[i]);
					}
				}
			];
		})();
		this.push 		 = functionSet[0];
		this.pop 	 	 = functionSet[1];
		this.getLength   = functionSet[2];
		this.setLength   = functionSet[3];
		this.peekElement = functionSet[4];
		this.splice 	 = functionSet[5];
		this.show		 = functionSet[6];
		// initiaizing the stack with given arguments
		this.push.apply(this, arguments);
	}
	

	// size of the grid - check if they're reset on en or whatever
	var N = -1;
	var ninePositions = new LIFO();
	var nineCount = 0;
	var GRID = [];
	var fileHolder;

	// helper array - storing distinct 2's
	var goodTwos = [];
	// amount of good - closed - 9's
	var goodNines = 0;

	// helper array - storing "neighbouring" nines
	var searchNinesArray = [];
	// helper array - neighbouring nines visited 2's - so we don't count the same 2'
	var visitedTwos = [];

	var indexer = 0;

	// clear variables on start
	function resetSettings() {
		N = -1;
		ninePositions.setLength = 0;
		nineCount = 0;
		GRID.length = 0;

		goodTwos.length = 0;
		goodNines = 0;
		searchNinesArray.length = 0;
		visitedTwos.length = 0;
		indexer = 0;
	}

	// helper functions - symchronous reading 
	function readFile(file) {


		var tempArray = [];
		var reader = new FileReader();

		reader.readAsText(file);
		reader.onload = function(progressEvent) {


			// get by lines
			var lines = this.result.split('\n');
			for (var line = 0; line < lines.length; line++) {
				if(line === 0) {
					N = lines[line];
				} else {
					var lineCurrent = lines[line].replace(/(\r\n|\n|\r)/gm, "");

					var lastNumber     = -1;
					var initialNumber  = -1;
					for (var i = 0, len = lineCurrent.length; i < len; i++) {
						initialNumber = parseInt(+lineCurrent.charAt(i));

						if(initialNumber === 9) {
							// add nine to lifo array
							ninePositions.push({x:i, y:(line-1)});
							nineCount++;
						}

						tempArray.push(initialNumber);
					}

					GRID.push(tempArray);
					tempArray = [];
				}
			}

		}

		// return error if error... duh
	};


	//  promised ReadFile
	function readFilePromised(file) {
		console.log("promised file))");
		var tempArray = [];
		return new Promise((resolve, reject) => {
			var reader = new FileReader();
			reader.readAsText(file);
			reader.onload = function(progressEvent) {

			console.log(this.result);

			// get by lines
			var lines = this.result.split('\n');
			for (var line = 0; line < lines.length; line++) {
				if(line === 0) {
					N = lines[line];
				} else {
					var lineCurrent = lines[line].replace(/(\r\n|\n|\r)/gm, "");

					var lastNumber     = -1;
					var initialNumber  = -1;
					for (var i = 0, len = lineCurrent.length; i < len; i++) {
						initialNumber = parseInt(+lineCurrent.charAt(i));

						if(initialNumber === 9) {
							// add nine to lifo array
							ninePositions.push({x:i, y:(line-1)});
							nineCount++;
						}

						tempArray.push(initialNumber);
					}

					GRID.push(tempArray);
					tempArray = [];
				}
			}
			resolve(file);


		}

		})

	};

	// helper search functions
	function search(PointObject, array) {
		for (i = 0; i <array.length; i++) {
			if(array[i].x === PointObject.x && array[i].y === PointObject.y) {
				return array[i];
			}
		}
	};

	// return lifo object id
	function searchLIFO(PointObject, array) {
		for (var i = 0; i < array.getLength(); i++) {

            if (array.peekElement(i).x === PointObject.x && array.peekElement(i).y === PointObject.y ) {
                return i;
            }
        }
	};

	function checkNeighbour(x,y) { // prob just use ninePosition here - so not to make additional coppies
     //   console.log("-- x:" +x+" y:"+y)
        var number = GRID[y][x];
        console.log(number);

        var tempObj = {x:x,y:y};
        if(number === 0 ) {
            return true;
        } else if (number === 9) { // tutaj nigdy nie bedzie open true
            var nineID = searchLIFO(tempObj, ninePositions);
            if(nineID != null && nineID !== undefined) { // here... here is problem  we're looking for id
      
                searchNinesArray.push(ninePositions.splice(nineID, 1)[0]); // slice them up -- and then just compare diff and delete that much ??? indexing problem 

                indexer++;;
            }
        } else {
            if(!search(tempObj, visitedTwos)) {
              //  console.log("Pushing -object");
                visitedTwos.push(tempObj);
            }
        }
        return false;
    };


	function findTheAbyss() {
		if(!(ninePositions.getLength() > 0)) {return 0;}

		// go through LIFO array - from the back
		for(var i = 0; i < ninePositions.getLength(); i++) {

			indexer = 0;

			// peek upcoming element
			console.log("-- Next Element - X:"+ninePositions.peekElement(ninePositions.getLength() - i - 1).x +
				" Y:"+ ninePositions.peekElement(ninePositions.getLength() - i - 1).y);

			// get last 9 from lifo 
			searchNinesArray = [ninePositions.pop()]; i--; // update counting for 'for'

			visitedTwos = [];
			var _x = -1;
			var _y = -1;

			// check if abyss structure is open - if it's not -> count all neighboruing 2's  - else just ignore that structure	
			var isOpen = false;

			// empty structure - no more 9's connected
			var closedFigure = false;

			var localGoodNines = 0;

			// loop till we can't find more connection;s to 9's
			while(!closedFigure) {
				var _nine = {x: -1, y: -1};
				// take next element from serachedNines array
				if(searchNinesArray.length > 0 ) {
					_nine = searchNinesArray.pop();
				}
				_x = _nine.x;
				_y = _nine.y;
				// checking all neighbours
				// y > 0  				&& !isOpen 		- look UP
                if(_y > 0 && !isOpen){
                	isOpen = checkNeighbour(_x, (_y-1));
            	}
				// y < N-1				&& !isOpen 		- look DOWN
                if(_y < N-1 && !isOpen){
                	isOpen = checkNeighbour(_x, (_y+1));
            	}
				// x > 0				&& !isOpen 		- look LEFT
                if(_x > 0 && !isOpen){
                	isOpen = checkNeighbour((_x-1), _y);
            	}
				// x < N-1 				&& !isOpen 		- look RIGHT
                if(_x < N-1 && !isOpen){
                	isOpen = checkNeighbour((_x+1), _y);
            	}
				// x > 0    && y > 0 	&& !isOpen 		- look UP-LEFT
                if(_x > 0 && _y > 0 && !isOpen){
                	isOpen = checkNeighbour((_x-1), (_y-1));
            	}
				// x < N-1  && y > 0	&& !isOpen 		- look UP-RIGHT
                if(_x < N-1 && _y > 0 && !isOpen){
                	isOpen = checkNeighbour((_x+1), (_y-1));
            	}
				// x > 0 	&& y < N-1	&& !isOpen 		- look DOWN-LEFT
                if(_x > 0 && _y < N-1 && !isOpen){
                	isOpen = checkNeighbour((_x-1), (_y+1));
            	}
				// x < N-1 	&& y < N-1	&& !isOpen 		- look DOWN-RIGHT
                if(_x < N-1 && _y < N-1 && !isOpen){
                	isOpen = checkNeighbour((_x+1), (_y+1));
            	}
				// if structure is open - just ignore neighbouring 2's and take out all neighbouring 9's
				if(isOpen) {
					for(var j = 0; j<ninePositions.getLength(); j++) {
						var peekLast = ninePositions.peekElement(j);
						if((Math.abs(peekLast.x - _x) == 1 || Math.abs(peekLast.x - _x) == 0) &&
							(Math.abs(peekLast.y - _y) == 1 || Math.abs(peekLast.y - _y) == 0)) {
							searchNinesArray.push(ninePositions.splice(j,1)[0]);
						}
					}
				} else {
					// closed good nine
					localGoodNines++;
				}
				if(searchNinesArray.length == 0) closedFigure = true;

			}

			if(!isOpen) {
				// structure was good - so now we just need to merge neighbours with overall visited nodes
				for(var j = 0; j <visitedTwos.length; j++) {
					if(!search(visitedTwos[j], goodTwos)) {
						goodTwos.push(visitedTwos[j]);
					}
				}
			} else {
				visitedTwos.length = 0;
				localGoodNines = 0;
			}
			goodNines += localGoodNines;
		}
		console.log("-------------");
		console.log(goodNines + goodTwos.length);
		return goodNines + goodTwos.length;
		// return count !!
	};


	// functions
	var getPuzzleCountFromFile = function(file, callback) {
		resetSettings();
		fileHolder = file;
		console.log(file);
		var tempArray = [];
		var reader = new FileReader();

		//var amazing = Promise.resolve(readFile(file)).then(console.log("super"));
		// readFile(file);
		var result = undefined;

	


		readFilePromised(file).then(function(){

			console.log("dos");

			result =  findTheAbyss();
			console.log("----------promised?!");
			callback(result);

		});//.then(function(){console.log("hmmhmhm");return result;});

		console.log("getPuzzleCountFromFile");
		


		//read file
		//do file
		//return number
	}


	return {
		getPuzzleCountFromFile: getPuzzleCountFromFile
	}

})();


//////// TESTING
//document.getElementById('fileInput').onchange = function() {
	//var file = this.files[0];
	//booblePuzzleFinder.getPuzzleCountFromFile(file, function(results) {
	//	console.log(results);
	//});
//}