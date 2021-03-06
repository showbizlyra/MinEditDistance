
/* Arranged By Faisal S.A 
	18 October 2017
	about.me/faisalsyfl
*/
/* Edited in 23 October 2017*/
/**
 * Minimum Edit Distance Algorithm, to check similarty between 2 string.
 * The output is MED value inside of matrix
 * Criteria:
 * if string do an insertion, ED + 1
 * if string do a deletion, ED + 1
 * if string do a substitution, ED + 1
 * 
 * @param {String} string1 First string as ROW
 * @param {String} string2 Second string as COLUMN
 * @return {Array} Matrix Minimum Edit distance
 */
function MED(string1, string2){
	var l1 = string1.length+1;
	var l2 = string2.length+1;

	/*Create var matrix*/
	var matrix = new Array(l1);
	for (var i = 0; i < l1; i++) {
	  matrix[i] = new Array(l2);
	}

	/*First, init matrix with default value*/
	/*
		Matrix(String1,string2) will look like this

		| |#|S|T|R|2|
		|#|0|1|2|3|4|
		|S|1| | | | |
		|T|2| | | | |
		|R|3| | | | |
		|1|4| | | | |

		Note : > Row = string1.length
             > Column = string2.length
	 */
	/*Filling first row*/
	for(i=0;i<1;i++){
		for(j=0;j<l2;j++){
			matrix[i][j] = j;
		}
	}
	/*Filling first column*/
	for(i=0;i<1;i++){
		for(j=0;j<l1;j++){
			matrix[j][i] = j;
		}
	}

	/*
	MED PseudoCode
	1. if char(ROW) != char(Column) 
	Matrix[i,j]  = min(Matrix[i-1,j],matrix[i,j-1],matrix[i-1,j-1]) + 1
	
	2. if char(ROW) = char(Column)
	Matrix[i,j] = matrix[i-1,j-1]; 
	 */
	
	/* Implement MED to Matrix */
	for(i=1;i<l1;i++){
		for(j=1;j<l2;j++){
			// check whether character
			if(string1.charAt(i-1) == string2.charAt(j-1)){
				matrix[i][j] = matrix[i-1][j-1];
			}else{
				matrix[i][j] = Math.min(matrix[i-1][j-1],matrix[i-1][j],matrix[i][j-1])+1
			}
		}
	}

	return matrix;
}

/**
 * Levensthein Distance Algorithm, to check similarty between 2 string.
 * The output is Distance value inside of matrix
 * Criteria:
 * if string do an insertion, ED + 1
 * if string do a deletion, ED + 1
 * if string do a substitution, ED + 2
 * 
 * @param {String} string1 First string as ROW
 * @param {String} string2 Second string as COLUMN
 * @return {Array} Matrix Levensthein distance
 */
function LED(string1, string2){
	var l1 = string1.length+1;
	var l2 = string2.length+1;

	/*Create var matrix*/
	var matrix = new Array(l1);
	for (var i = 0; i < l1; i++) {
	  matrix[i] = new Array(l2);
	}

	/*First, init matrix with default value*/
	/*
		Matrix(String1,string2) will look like this

		| |#|S|T|R|2|
		|#|0|1|2|3|4|
		|S|1| | | | |
		|T|2| | | | |
		|R|3| | | | |
		|1|4| | | | |

		Note : > Row = string1.length
             > Column = string2.length
	 */
	/*Filling first row*/
	for(i=0;i<1;i++){
		for(j=0;j<l2;j++){
			matrix[i][j] = j;
		}
	}
	/*Filling first column*/
	for(i=0;i<1;i++){
		for(j=0;j<l1;j++){
			matrix[j][i] = j;
		}
	}

	/*
	MED PseudoCode
	1. if char(ROW) != char(Column) 
	Matrix[i,j]  = min(Matrix[i-1,j],matrix[i,j-1],matrix[i-1,j-1]) + 1
	
	2. if char(ROW) = char(Column)
	Matrix[i,j] = matrix[i-1,j-1]; 
	 */
	
	/* Implement MED to Matrix */
	for(i=1;i<l1;i++){
		for(j=1;j<l2;j++){

			temp = Math.min(matrix[i-1][j-1],matrix[i-1][j],matrix[i][j-1])
			if(temp == matrix[i-1][j-1]){
				// console.log(string1.charAt(i-1)+"_"+string2.charAt(j-1));
				if(string1.charAt(i-1) == string2.charAt(j-1)){
					matrix[i][j] = temp + 0;
				}else{
					matrix[i][j] = temp + 2;
				}
			}else{
				matrix[i][j] = temp + 1;
			}
			
		}
	}

	return matrix;
}

/**
 * This is BackTrace algorithm, to backTrack previous operation of Edit Distance.
 * IMPORTANT: There could be MULTI PATH to EDIT between 2 string because every operation are equal to 1, except(Levenstein) +2
 * @param  {Array2D} matrix matrix value of MED/LED that can be obtain from LED(),MED() function.
 * @return {Array2D}        Array of Matrix that contain i,j,operation property.
 */
function backTrace(matrix){
	
	var seqResult = [];
	var l1 = matrix.length;
	var l2 = matrix[0].length;

	/* Fill array with 0 */
	for(i=0;i<matrix.length+matrix[0].length;i++){
		seqResult[i] = {i:0,j:0,operation:0};
	}

	/*
		Backgrack Algorithm, Find minimun between upper left cell value, above cell value, left cell value
	 */
	seq = 0;
	i = l1-1;
	j = l2-1;
	do{
		if(i-1>=0 && j-1>=0){
			var smallest = Math.min(matrix[i-1][j-1],matrix[i-1][j],matrix[i][j-1]);
			if(smallest == matrix[i-1][j-1]){
				if(matrix[i][j] == matrix[i-1][j-1]){
					seqResult[seq].i = i;
					seqResult[seq].j = j;
					seqResult[seq].operation = 4;
					i--;
					j--;
				}else{
					seqResult[seq].i = i;
					seqResult[seq].j = j;
					seqResult[seq].operation = 3;
					i--;
					j--;
				}
			}else if(smallest == matrix[i-1][j]){
				seqResult[seq].i = i;
				seqResult[seq].j = j;
				seqResult[seq].operation = 2;
				i--;
			}else if(smallest == matrix[i][j-1]){
				seqResult[seq].i = i;
				seqResult[seq].j = j;
				seqResult[seq].operation = 1;
				j--;
			}
		}else{
			if(i-1<0){
				seqResult[seq].i = 0;
				seqResult[seq].j = j;
				seqResult[seq].operation = 1;
				j--;
			}else if(j-1<0){
				seqResult[seq].i = i;
				seqResult[seq].j = j;
				seqResult[seq].operation = 2;
				i--;
			}
		}
		seq++;
	}while(i>=0 && j>=0);
	
	// console.log(seqResult);
	
	/*return seuence of Operation*/
	return seqResult;
}
