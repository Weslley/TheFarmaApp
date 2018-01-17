'use strict';

import Realm from 'realm';

class Configuracao extends Realm.Object {}
Configuracao.schema = {
    name: 'Configuracao',
    primaryKey: 'id',
    properties: {
        id: 'int',
        latitude: 'double',
        longitude: 'double',
        state: 'string',
        token: 'string',
        data: 'int'
    }
}

class CacheMedicamento extends Realm.Object {}
CacheMedicamento.schema = {
    name: 'CacheMedicamento',
    primaryKey: 'id',
    properties: {
        id: 'int',
        medicamento: 'Medicamento',
        data: 'int'
    }
}

class UsuarioPost extends Realm.Object {}
UsuarioPost.schema = {
    name: 'UsuarioPost',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nome: 'string',
        email: 'string',
        foto: 'string'
    }
}

class Post extends Realm.Object {}
Post.schema = {
    name: 'Post',
    primaryKey: 'id',
    properties: {
        id: 'int',
        titulo: 'string',
        conteudo: 'string',
        urlImagePerfil: 'string',
        urlImageContent: 'string',
        urlVideoContent: 'string',
        urlReferencia: 'string',
        like: 'bool',
        usuarioPost: 'UsuarioPost',
        curtidas: 'int',
        data: 'int',
        dataAtualizacao: 'int',
        tipo: 'int'
    }
}

class Usuario extends Realm.Object {}
Usuario.schema = {
    name: 'Usuario',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nome: 'string',
        sobrenome: 'string',
        email: 'string',
        token: 'string',
    }
}

class Cliente extends Realm.Object {}
Cliente.schema = {
    name: 'Cliente',
    primaryKey: 'id',
    properties: {
        id: 'int',
        cpf: 'string',
        dataNascimento: 'date',
        sexo: 'string',
        celular: 'string',
        facebookId: 'string',
        facebookToken: 'string',
        deviceToken: 'string',
        foto: 'string',
        usuario: 'Usuario'

    }
}

class UF extends Realm.Object {}
UF.schema = {
    name: 'UF',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nome: 'string',
        sigla: 'string',
        icms: 'double'
    }
}

class Cidade extends Realm.Object {}
Cidade.schema = {
    name: 'Cidade',
    primaryKey: 'ibge',
    properties: {
        ibge: 'int',
        nome: 'string',
        uf: 'UF'
    }
}

class Bairro extends Realm.Object {}
Bairro.schema = {
    name: 'Bairro',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nome: 'string',
        cidade: 'Cidade'
    }
}

class PrincipioAtivo extends Realm.Object {}
PrincipioAtivo.schema = {
    name: 'PrincipioAtivo',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nome: 'string',
        tipoVenda: 'int'
    }
}

class Laboratorio extends Realm.Object {}
Laboratorio.schema = {
    name: 'Laboratorio',
    primaryKey: 'id',
    properties: {
        id: 'int',
        cnpj: 'string',
        nome: 'string',
        endereco: 'string'
    }
}

class Apresentacao extends Realm.Object {}
Apresentacao.schema = {
    name: 'Apresentacao',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nome: 'string',
        classeTerapeutica: 'string',
        quantidade: 'int',
        registroMs: 'string',
        pmc: 'string',
        preco: 'string',
        unidade: 'string',
        imagem: 'string',
        codigoBarras: 'string',
        medicamento: 'Medicamento',
    }
}

class Medicamento extends Realm.Object {}
Medicamento.schema = {
    name: 'Medicamento',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nome: 'string',
        laboratorio: 'Laboratorio',
        principioAtivo: 'PrincipioAtivo',
        tipoMedicamento: 'int',
        tipo: 'int',
        apresentacoes: 'Apresentacao[]',
    }
}

class Endereco extends Realm.Object {}
Endereco.schema = {
    name: 'Endereco',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nome: 'string',
        cep: 'string',
        uf: 'UF',
        cidade: 'Cidade',
        bairro: 'Bairro',
        logradouro: 'string',
        numero: 'string',
        complemento: 'string',
        latitude: 'double',
        longitude: 'double',
        deletado: 'bool',
        principal: 'bool'
    }
}

class Pagamento extends Realm.Object {}
Pagamento.schema = {
    name: 'Pagamento',
    primaryKey: 'id',
    properties: {
        id: 'int',
        nome: 'string',
        numeroCartao: 'string',
        dataVencimento: 'int',
        mesExpiracao: 'int',
        anoExpiracao: 'int',
        cvv: 'int',
        bandeira: 'string',
        deletado: 'bool',
        principal: 'bool'
    }
}

class HorarioFuncionamento extends Realm.Object {}
HorarioFuncionamento.schema = {
    name: 'HorarioFuncionamento',    
    properties: {
        id: 'int',
        diaSemana: 'string',
        horario: 'string'
    }
}

class Farmacia extends Realm.Object {}
Farmacia.schema = {
    name: 'Farmacia',
    primaryKey: 'id',
    properties: {
        id: 'int',
        cnpj: 'string',
        nomeFantasia: 'string',        
        razaoSocial: 'string',
        telefone: 'string',
        cep: 'string',
        logradouro: 'string',
        numero: 'string',
        complemento: 'string',
        cidade: 'Cidade',
        bairro: 'Bairro',
        latitude: 'double',
        longitude: 'double',
        tempoEntrega: 'string',
        horarioFuncionamento: 'string',
        distancia: 'string',
        servicoEntregador: 'bool',
        horarios: 'HorarioFuncionamento[]'
    }
}

class Carrinho extends Realm.Object {}
Carrinho.schema = {
    name: 'Carrinho',
    primaryKey: 'id',
    properties: {
        id: 'int',
        cliente: 'Cliente',
        endereco: 'Endereco',
        formaPagamento: 'int',
        nomeEndereco: 'string',
        nomeDestinatario: 'string',
        cep: 'string',
        logradouro: 'string',
        numero: 'string',
        complemento: 'string',
        cidade: 'string',
        uf: 'string',
        bairro: 'string',
        latitude: 'double',
        longitude: 'double',
        delivery: 'bool',
        troco: 'double',
        valorFrete: 'double',
        valorTotal: 'double',
        numeroParcelas: 'int',
        farmacia: 'Farmacia',
        itens: 'PedidoItem[]',
        pagamentos: 'Pagamento[]',
        proposta: 'Proposta',
        propostas: 'Proposta[]',
        dataCriacao: 'date',
        status: 'int'
    }
}

class CarrinhoItem extends Realm.Object {}
CarrinhoItem.schema = {
    name: 'CarrinhoItem',
    primaryKey: 'id',
    properties: {
        id: 'int',
        pedido: 'Pedido',
        farmacia: 'Farmacia',
        apresentacao: 'Apresentacao',
        quantidade: 'int',
        pmc: 'string',
        valorUnitario: 'double',
        deletado: 'bool',
        status: 'int'
    }
}

class Pedido extends Realm.Object {}
Pedido.schema = {
    name: 'Pedido',
    primaryKey: 'id',
    properties: {
        id: 'int',
        cliente: 'Cliente',
        endereco: 'Endereco',
        formaPagamento: 'int',
        nomeEndereco: 'string',
        nomeDestinatario: 'string',
        cep: 'string',
        logradouro: 'string',
        numero: 'string',
        complemento: 'string',
        cidade: 'string',
        uf: 'string',
        bairro: 'string',
        latitude: 'double',
        longitude: 'double',
        delivery: 'bool',
        troco: 'double',
        valorFrete: 'double',
        valorTotal: 'double',
        numeroParcelas: 'int',
        farmacia: 'Farmacia',
        itens: 'PedidoItem[]',
        pagamentos: 'Pagamento[]',
        proposta: 'Proposta',
        propostas: 'Proposta[]',
        dataCriacao: 'date',
        status: 'int'
    }
}

class PedidoItem extends Realm.Object {}
PedidoItem.schema = {
    name: 'PedidoItem',
    primaryKey: 'id',
    properties: {
        id: 'int',
        pedido: 'Pedido',
        farmacia: 'Farmacia',
        apresentacao: 'Apresentacao',
        quantidade: 'int',
        pmc: 'string',
        valorUnitario: 'double',
        deletado: 'bool',
        status: 'int'
    }
}

class Proposta extends Realm.Object {}
Proposta.schema = {
    name: 'Proposta',
    primaryKey: 'id',
    properties: {
        id: 'int',
        pedido: 'Pedido',
        farmacia: 'Farmacia',
        possueTodosItens: 'bool',
        valorTotal: 'double',
        itens: 'PropostaItem[]',
        quantidadeMaximaParcelas: 'int',
        status: 'int'
    }
}

class PropostaItem extends Realm.Object {}
PropostaItem.schema = {
    name: 'PropostaItem',
    primaryKey: 'id',
    properties: {
        id: 'int',
        proposta: 'Proposta',
        farmacia: 'Farmacia',
        medicamento: 'Medicamento',
        apresentacao: 'Apresentacao',
        quantidade: 'int',
        valorUnitario: 'double',
        possue: 'bool'
    }
}

export default new Realm({schema: [Configuracao, UsuarioPost, Post, Usuario, Cliente, UF, Cidade, Bairro, PrincipioAtivo, Laboratorio, Medicamento, Apresentacao, Endereco, Pagamento, HorarioFuncionamento, Farmacia, Carrinho, CarrinhoItem, Pedido, PedidoItem, Proposta, PropostaItem]});