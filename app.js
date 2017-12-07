var vertexShaderText=
[
	'precision mediump float;',
	'',
	'attribute vec2 vertPosition;',
	'',
	'void main()',
	'{',
	'gl_Position=vec4(vertPosition, 0.0, 1.0);'
	'}'
]
.join('\n');

var fragmentShaderText=
[
'precision medium float;',
'',
'void main()',
'{'
'gl_fragColor= vec4(1.0,0.0,0.0,1.0);'
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

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if(!gl.getShaderParameter(vertexShader,gl.COMPILE_STATUS)){
		console.error('ERROR compiling vertex Shader', gl.getShaderInfoLog(vertexShader))
		return;
	}


	gl.compileShader(fragmentShader);

};
