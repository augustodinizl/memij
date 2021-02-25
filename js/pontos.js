(function(){
    var pontos = [{
        nome: 'Sinagoga Kehilat Israel (Rua da Graça)',
        // Rua da Graça, 160 - Bom Retiro
        x: 3108,
        y: 2676,
        texto: 'Fundada em 12 de janeiro de 1912 por imigrantes do Leste Europeu, principalmente da região da Bessarábia, é a primeira sinagoga do Estado de S. Paulo. O nome "Kehilat Israel", que significa "Comunidade Israelita", denota que foi criada com o intuito de servir à comunidade existente na época, com todos os serviços religiosos necessários. Fica situada na bifurcação das ruas da Graça e Rua Lubavitch (antiga Correia dos Santos) e hoje abriga o Memorial da Imigração Judaica.',
        imagens: ['kehilat02.png', 'kehilat01.png']
    }, {
        nome: 'Cooperativa de Crédito Popular do Bom Retiro',
        // Rua da Graça, 121 - Bom Retiro
        x: 3094,
        y: 2736,
        texto: 'Conhecida também como "Lai-Spar Kasse" (Caixa de Empréstimos e Poupança), foi fundada em 1928, para apoiar os imigrantes recém-chegados. Sediada na Rua da Graça, emprestava dinheiro a juros baixos para vendedores ambulantes (<em>clientelshik</em>), para pequenos comerciantes ou para qualquer pessoa que quisesse trabalhar. Muitos foram seus diretores: Benjamin Kulikovsky, Manoel Epstein, Guilherme Krasilchik, Carol Goldenstein, Abram Idel Portnoy, Marcos Zaitz e outros. Funcionou até 1972.',
        imagens: ['cooperativa02.png','cooperativa01.png']
    }, {
        nome: 'ICIB - Casa do Povo – TAIB',
        // Rua Três Rios, 252
        x: 3436,
        y: 2616,
        texto: 'Trata-se de uma instituição cultural que teve vários nomes. Inicialmente foi chamada "Futuro"; logo em seguida, o nome foi mudado para <em>"Yugend Club"</em> (Clube da Juventude). Após a Segunda Guerra Mundial, quando se instalou na Rua Três Rios, transformou-se no " Instituto Cultural Israelita Brasileiro – ICIB", mais conhecido como “Casa do Povo”. Assinado pelo arquiteto Jorge Wilheim, o edifício abrigava a Escola Israelita Brasileira Scholem Aleichem e também um clube. A partir dos anos 1960, ali começou a funcionar o Teatro de Arte Israelita Brasileiro – TAIB.',
        imagens: ['icib01.png', 'icib02.png']
    }, {
        nome: 'Pletzale ou Pletzele',
        // Praça Carmine Pate (encontro da Rua da Graça, Rua Silva Pinto e Rua Ribeiro de Lima)
        x: 3180,
        y: 2920,
        texto: 'Em iídiche significa “pracinha” (que denota "lugar" ou "lugar de encontro ou reunião"). Na confluência da Rua Ribeiro de Lima, Rua Correia de Melo  e Rua da Graça era o lugar onde os homens se encontravam para discutir os mais variados assuntos, falar das últimas notícias, fazer pequenos negócios, arranjar casamentos, etc. Nos domingos pela manhã, era quase um compromisso – uma multidão se reunia no local.',
        imagens: ['pletzale02.png', 'silva-pinto-tres-rios01.png']
    }, {
        nome: 'Escola e Sinagoga Talmud Thorá',
        // Rua Talmud Thorá, 296
        x: 3081,
        y: 1939,
        texto: 'Fundada em 1933, a princípio com 47 alunos, estabeleceu-se na Rua Newton Prado, mudando rapidamente para a antiga Rua Tocantins, 296 (hoje a rua tem o nome da escola: Rua Talmud Thorá). Foi a segunda escola judaica a ser criada. Em 1946, foi inaugurada a sinagoga que levou o mesmo nome. Centenas de alunos ali se formaram.',
        imagens: ['talmud04.png', 'talmud01.png']
    }, {
        nome: 'Escola e Sinagoga Lubavitch',
        //Rua Prates, 770 (atualmente)
        x: 3638,
        y: 2360,
        texto: 'Os irmãos Rabinos Jacob e Hersh Leib Begun fundaram o <em>"Mossad Oholei Yossef  Yitschak"</em> – Instituto de Ensino Lubavitch, em 1960, na então Rua Correia dos Santos. A escola iniciou suas atividades com cerca de 20 alunos. Após muitos anos, surgiu a oportunidade de a Sinagoga Lubavitch se unir com a Sinagoga Talmud Thorá. Unificadas, passaram a funcionar em instalações mais amplas. Mais tarde, a Escola Talmud Thorá foi incorporada ao Ensino Lubavitch, quando foram construídas as instalações da nova sede.',
        imagens: ['lubavitch02.png', 'lubavitch01.png']
    }, {
        nome: 'Colégio Renascença',
        //Rua Prates, 770 (antigamente)
        x: 3667,
        y: 2295,
        texto: 'Iniciou suas atividades na esquina das Ruas Amazonas e Três Rios, em 21 de abril de 1922. Fundada originalmente por imigrantes da Europa Oriental, foi a primeira escola judaica paulistana a oferecer o diploma do Primário (hoje Ensino Fundamental I) juntamente com o do Ensino Judaico. Em 1924, estabeleceu-se na Rua Florêncio de Abreu, na época uma rua formada por palacetes. Em 1937, instalou-se na Rua Prates.',
        imagens: ['renascenca01.png', 'renascenca02.png']
    }, {
        nome: 'Groisse Shil – Sinagoga Knesset Israel',
        // Rua Newton Prado 176
        x: 3013,
        y: 2029,
        texto: 'Criada em 1917, foi a segunda sinagoga estabelecida em S. Paulo. Com sede à Rua Newton Prado, 76, funcionou até o final da década de 2000, quando se mudou para Higienópolis. No local, hoje reformado, ainda funciona uma sinagoga e é onde fica a sede da Instituição Beneficente Israelita Ten Yad.',
        imagens: ['sinagoga-newton03.png', 'sinagoga-newton02.png']
    }, {
        nome: 'Sociedade Cemitério de S. Paulo: Chevra Kadisha',
        // Rua Prates, 435 
        x: 3475,
        y: 2787,
        texto: 'Apesar de a organização ter sido fundada em 1923, a denominação Sociedade Cemitério Israelita de S. Paulo data de 1956. Tinha o Rabino David Valt como consultor religioso. Em 1974, foi reconstruída e ampliada sua sede administrativa na Rua Prates, 435. A partir de 2007, por exigência da legislação brasileira, a sociedade passou a se chamar Associação Cemitério Israelita de S. Paulo.',
        imagens: ['chevra02.png', 'rua-prates-chevra01.png']
    }, {
        nome: 'Bar do Jacob',
        // Primeira localização: Rua José Paulino, quase esquina com a Rua Silva Pinto
        // Segunda localização Rua Prates, 121
        x: 2886,
        y: 2612,
        texto: 'Jacob Givertz, imigrante polonês, abriu seu bar em S. Paulo em 1924, na Rua José Paulino, quase na esquina com a Rua Silva Pinto. Ali funcionava também um empório que vendia licores e arenques, além de pão <em>ázimo</em> na época de <em>Pessach</em>. O Sr. Jacob vendia fiado aos imigrantes, dava conselhos sobre o ofício de mascate e vendia entradas para o teatro iídiche. Cartas endereçadas a imigrantes recém-chegados eram entregues no local, até que eles se estabelecessem em um endereço fixo. ',
        imagens: ['jacob02.png', 'buffet-jacob.png']
    }];
    
    if(typeof module != 'undefined' && module.exports) {
        module.exports = pontos;
    } else {
        window.pontos = pontos;
    }
}());