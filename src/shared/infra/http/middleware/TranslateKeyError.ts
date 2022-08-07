export const getEntityKeyName = (key:string) => {
    switch(key){
        case 'id':
            return 'id';
        case 'name':
            return 'nome';
        case 'description':
            return 'descricao';
        case 'price':
            return 'preco';
        case 'stock':
            return 'estoque';
        case 'requirements':
            return 'requisitos';
        case 'publisher':
            return 'editora';
        case 'developer':
            return 'desenvolvedor';
        case 'guarantee':
            return 'garantia';
        case 'language':
            return 'idioma';
        case 'subtitle':
            return 'legenda';
        case 'release_date':
            return 'data lancamento';
        case 'recomended_age':
            return 'idade recomendada';
        case 'players_offline':
            return 'jogadores offline';
        case 'players_online':
            return 'jogadores online';
        case 'resolution':
            return 'resolucao';
        case 'image':
            return 'imagem';
        default:   
            return key;
    }
}