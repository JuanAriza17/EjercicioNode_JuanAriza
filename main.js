// Se importan los módulos
const http = require('http');
const fs = require('fs');
const url = require('url');
const axios = require('axios').default;

const proveedores = axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json');
const clientes = axios.get('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json')

http.createServer((req, res)=>{

})
.listen(8081)
