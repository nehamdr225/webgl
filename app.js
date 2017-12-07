var vertexShaderText=
[
	'precision mediump float;',
	'',
	'attribute vec2 vertPosition;',
	'attribute vec3 vertColor;',
	'varying vec3 fragColor;',
	'',
	'void main()',
	'{',
	'fragColor=vertColor;',
	'gl_Position=vec4(vertPosition, 0.0, 1.0);'
	'}'
]
.join('\n');

var fragmentShaderText=
[
'precision medium float;',
'',
'varying vec3 fragColor;'
'void main()',
'{'
'fragColor=vertColor'
'gl_fragColor= vec4(fragColor,1.0);'
'}'
].join('\n');
var InitDemo = function() {
	console.log('this is working');

	var canvas= document.getElementById('game-surface');
	var gl= canvas.getContext('webgl');
	if(!gl){
		console.log('webgl not supported, falling back on experimental')
		gl= canvas.getContext('experimental-webgl');
	}
	if(!gl){
		alert('your browser does not support webGL');

	}
	gl.clearColor(0.75, 0.85,0.8,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	var vertexShader =gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader= gl.createShade(gl.FRAGMENT_SHADER);
// create shader 
	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if(!gl.getShaderParameter(vertexShader,gl.COMPILE_STATUS)){
		console.error('ERROR compiling vertex Shader', gl.getShaderInfoLog(vertexShader));
		return;
	}


	gl.compileShader(fragmentShader);
	if(!gl.getShaderParameter(fragmentShader,gl.COMPILE_STATUS)){
		console.error('ERROR fragmentShader vertex Shader', gl.getShaderInfoLog(vertexShader));
		return; }

		var program = gl. createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		if(!gl.getProgramParameter(program, gl.LINK_STATUS))
		{
			console.error("error linking program", gl.getProgramInfoLog(program));
			return;
		}
		gl.validateProgram(program);
		if(!gl.getProgramParameter(program,gl.VALIDATE_STATUS))
		{
			console.error("error validating program", gl.getProgramInfoLog(program));
			return;
		}

		// create buffer
		var triangleVertices=
		[//x,y               R, G, B
			0.0,0.5, 		1.0,1.0,0.0,
			-0.5,-0.5,		0.7,0.0,1.0,
			0.5,-0.5		0.1,1.0,0.6
		];

		var triangleVertexBufferObject= gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

		var positionAttriblocation= gl.getAttriblocation(program, 'vertPosition');
		var colorAttriblocation= gl.getAttriblocation(program, 'vertColor');
		gl.vertexAttribPointer
		{
			positionAttriblocation, // Attribute locaion
			2, //number of element per attribute
			gl.FLOAT, //type of elements
			gl.FALSE,
			5*Float32Array.BYTES_PER_ELEMENT,//size of an individual vertex
			0//offset from the beginning of a single vertex to this attribute
		};
		gl.vertexAttribPointer
		{
			colorAttriblocation, // Attribute locaion
			3, //number of element per attribute
			gl.FLOAT, //type of elements
			gl.FALSE,
			5*Float32Array.BYTES_PER_ELEMENT,//size of an individual vertex
			2*Float32Array.BYTES_PER_ELEMENT//offset from the beginning of a single vertex to this attribute
		};
	gl.enableVertexAttributeArray(positionAttriblocation);

		//main render
		gl.useProgram(program);
		gl.drawArray(gl.TRIANGLES,0, 3);

};

