def pergunta_sim_nao(texto):
    """Pede s/n até receber resposta válida. Retorna True para 's', False para 'n'."""
    while True:
        r = input(f"{texto} (s/n): ").strip().lower()
        if r in ('s', 'n'):
            return r == 's'
        print("Resposta inválida. Digite 's' para sim ou 'n' para não.")


def fazer_perguntas(lista_perguntas, perguntas_feitas):
    """Faz cada pergunta da lista, conta as respostas True/False e atualiza o contador."""
    respostas = []
    for p in lista_perguntas:
        resp = pergunta_sim_nao(p)
        respostas.append(resp)
        perguntas_feitas += 1
    return respostas, perguntas_feitas


def garantir_minimo_5(perguntas_feitas):
    """Faz perguntas extras genéricas até atingir pelo menos 5 perguntas feitas."""
    while perguntas_feitas < 5:
        pergunta_sim_nao("Pergunta extra: O herói aparece frequentemente em filmes/séries?")
        perguntas_feitas += 1
    return perguntas_feitas


def confirmar_por_score(respostas, nome_heroi, perguntas_feitas, minimo_confirm=3):
    """Confirma o herói se o número de 'True' em respostas >= minimo_confirm."""
    score = sum(1 for r in respostas if r)
    perguntas_feitas = garantir_minimo_5(perguntas_feitas)
    return score >= minimo_confirm


def jogo_akinator():
    print("Pense em um super-herói! Responda com 's' (sim) ou 'n' (não).\n")
    perguntas_feitas = 0
    heroi_encontrado = None  # Se nenhum herói for encontrado, será "Zé Ninguém"

    # Pergunta 1
    marvel = pergunta_sim_nao("O herói é da Marvel?")
    perguntas_feitas += 1

    if marvel:
        # Pergunta 2
        armadura = pergunta_sim_nao("Ele usa uma armadura tecnológica?")
        perguntas_feitas += 1
        if armadura:
            perguntas = [
                "Ele é bilionário?",
                "Ele é um gênio inventor?",
                "Ele tem um reator arc no peito?",
                "Ele liderou os Vingadores em alguns momentos?"
            ]
            respostas, perguntas_feitas = fazer_perguntas(perguntas, perguntas_feitas)
            if confirmar_por_score(respostas, "Homem de Ferro", perguntas_feitas):
                heroi_encontrado = "Homem de Ferro"

        if not heroi_encontrado:
            adolescente = pergunta_sim_nao("Ele é um adolescente?")
            perguntas_feitas += 1
            if adolescente:
                perguntas = [
                    "Ele ganhou poderes após ser picado por uma aranha?",
                    "Ele vive em Nova York?",
                    "Ele tem um 'sentido-aranha'?",
                    "Ele usa teias para se locomover?"
                ]
                respostas, perguntas_feitas = fazer_perguntas(perguntas, perguntas_feitas)
                if confirmar_por_score(respostas, "Homem-Aranha", perguntas_feitas):
                    heroi_encontrado = "Homem-Aranha"

        if not heroi_encontrado:
            martelo = pergunta_sim_nao("Ele empunha um martelo místico?")
            perguntas_feitas += 1
            if martelo:
                perguntas = [
                    "Ele é filho de Odin?",
                    "Ele controla trovões?",
                    "Ele é príncipe de Asgard?",
                    "Ele tem um machado chamado Stormbreaker?"
                ]
                respostas, perguntas_feitas = fazer_perguntas(perguntas, perguntas_feitas)
                if confirmar_por_score(respostas, "Thor", perguntas_feitas):
                    heroi_encontrado = "Thor"

        if not heroi_encontrado:
            forca = pergunta_sim_nao("Ele se transforma em uma criatura gigante e extremamente forte quando fica com raiva?")
            perguntas_feitas += 1
            if forca:
                perguntas = [
                    "Ele é um cientista?",
                    "Ele tem pele esverdeada quando transforma?",
                    "Ele foi exposto a radiação gama?",
                    "Ele já foi membro dos Vingadores?"
                ]
                respostas, perguntas_feitas = fazer_perguntas(perguntas, perguntas_feitas)
                if confirmar_por_score(respostas, "Hulk", perguntas_feitas):
                    heroi_encontrado = "Hulk"

        if not heroi_encontrado:
            perguntas = [
                "Ele tem um escudo feito de vibranium?",
                "Ele lutou na Segunda Guerra Mundial?",
                "Ele foi congelado e despertou no futuro?",
                "Ele é conhecido como 'Primeiro Vingador'?"
            ]
            respostas, perguntas_feitas = fazer_perguntas(perguntas, perguntas_feitas)
            if confirmar_por_score(respostas, "Capitão América", perguntas_feitas):
                heroi_encontrado = "Capitão América"

    else:
        capa = pergunta_sim_nao("Ele usa capa?")
        perguntas_feitas += 1

        if capa:
            alien = pergunta_sim_nao("Ele é alienígena?")
            perguntas_feitas += 1
            if alien:
                perguntas = [
                    "Ele veio do planeta Krypton?",
                    "Ele tem visão de calor?",
                    "Ele é vulnerável à kriptonita?",
                    "Ele pode voar?"
                ]
                respostas, perguntas_feitas = fazer_perguntas(perguntas, perguntas_feitas)
                if confirmar_por_score(respostas, "Superman", perguntas_feitas):
                    heroi_encontrado = "Superman"
            if not heroi_encontrado:
                perguntas = [
                    "Ele é bilionário?",
                    "Ele é considerado o maior detetive do mundo?",
                    "Ele opera em Gotham?",
                    "Ele não tem superpoderes mas compensa com treino?"
                ]
                respostas, perguntas_feitas = fazer_perguntas(perguntas, perguntas_feitas)
                if confirmar_por_score(respostas, "Batman", perguntas_feitas):
                    heroi_encontrado = "Batman"
        else:
            mulher = pergunta_sim_nao("É uma mulher?")
            perguntas_feitas += 1
            if mulher:
                perguntas = [
                    "Ela é uma amazona?",
                    "Ela usa um laço da verdade?",
                    "Ela é princesa de Themyscira?",
                    "Ela tem braceletes indestrutíveis?"
                ]
                respostas, perguntas_feitas = fazer_perguntas(perguntas, perguntas_feitas)
                if confirmar_por_score(respostas, "Mulher-Maravilha", perguntas_feitas):
                    heroi_encontrado = "Mulher-Maravilha"

            if not heroi_encontrado:
                veloz = pergunta_sim_nao("Ele tem supervelocidade?")
                perguntas_feitas += 1
                if veloz:
                    perguntas = [
                        "Ele tem acesso à Força de Aceleração?",
                        "Ele pode viajar no tempo em algumas histórias?",
                        "Ele usa um uniforme vermelho?",
                        "Ele trabalha como cientista/forense em algumas versões?"
                    ]
                    respostas, perguntas_feitas = fazer_perguntas(perguntas, perguntas_feitas)
                    if confirmar_por_score(respostas, "Flash", perguntas_feitas):
                        heroi_encontrado = "Flash"

            if not heroi_encontrado:
                perguntas = [
                    "Ele é rei de Atlântida?",
                    "Ele consegue respirar debaixo d'água?",
                    "Ele se comunica com criaturas marinhas?",
                    "Ele carrega um tridente?"
                ]
                respostas, perguntas_feitas = fazer_perguntas(perguntas, perguntas_feitas)
                if confirmar_por_score(respostas, "Aquaman", perguntas_feitas):
                    heroi_encontrado = "Aquaman"

    # Resultado final
    if heroi_encontrado:
        print(f"\n💡 Seu herói é o: {heroi_encontrado}!!!")
    else:
        print("\n🤔 Você pensou em... **Zé Ninguém**! Não consegui adivinhar seu herói.")


if __name__ == "__main__":
    jogo_akinator()
