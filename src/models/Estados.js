export default class Estados {

	static getListaEstados(){
		return [
		{sigla: "AC", nome:  "ACRE"},
		{sigla: "AL", nome:  "ALAGOAS"},
		{sigla: "AM", nome:  "AMAZONAS"},
		{sigla: "AP", nome:  "AMAPÁ"},
		{sigla: "BA", nome:  "BAHIA"},
		{sigla: "CE", nome:  "CEARÁ"},
		{sigla: "DF", nome:  "DISTRITO FEDERAL"},
		{sigla: "ES", nome:  "ESPIRÍTO SANTO"},
		{sigla: "GO", nome:  "GOIÁS"},
		{sigla: "MA", nome:  "MARANHÃO"},
		{sigla: "MG", nome:  "MINAS GERAIS"},
		{sigla: "MS", nome:  "MATO GROSSO DO SUL"},
		{sigla: "MT", nome:  "MATO GROSO"},
		{sigla: "PA", nome:  "PARÁ"},
		{sigla: "PB", nome:  "PARAÍBA"},
		{sigla: "PE", nome:  "PERNAMBUCO"},
		{sigla: "PI", nome:  "PIAUÍ"},
		{sigla: "PR", nome:  "PARANÁ"},
		{sigla: "RJ", nome:  "RIO DE JANEIRO"},
		{sigla: "RN", nome:  "RIO GRANDE DO NORTE"},
		{sigla: "RO", nome:  "RONDÔNIA"},
		{sigla: "RR", nome:  "RORAIMA"},
		{sigla: "RS", nome:  "RIO GRANDE SO SUL"},
		{sigla: "SC", nome:  "SANTA CATARINA"},
		{sigla: "SE", nome:  "SERGIPE"},
		{sigla: "SP", nome:  "SÃO PAULO"},
		{sigla: "TO", nome:  "TOCANTINS"}
		];
	}

	static getUfs(){
		var ufs = [];
		this.getListaEstados().forEach((estado) => { ufs.push(estado.sigla); });
		return ufs;
	}

	static getEstados(){
		var estados = [];
		this.getListaEstados().forEach((estado) => { estados.push(estado.nome); });
		return estados;	
	}

	static getEstadoPorUf(query){
		var result = this.getListaEstados().find((estado) => { return estado.sigla === query});
		return result.nome;
	}

	static getUfPorEstado(query){
		var result = this.getListaEstados().find((estado) => { return estado.nome === query});
		return result.sigla;
	}
}
