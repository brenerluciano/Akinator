# Projeto Acadêmico Akinator de Heróis

> Um jogo simples no estilo Akinator para adivinhar um herói da DC ou Marvel. Desenvolvido como projeto acadêmico da faculdade UNA, implementado com **Flask** (Python) no backend e **JavaScript** no frontend.


## 👥 Integrantes do grupo

* Alef Cezario
* Brener Luciano
* João Vitor


## 🛠️ Tecnologias

* **Backend:** Python com Flask
* **Frontend:** HTML5, CSS (Tailwind CSS), JavaScript


## 🧠 Modelagem e Estrutura

O jogo opera com uma lógica de **fluxo sequencial de decisões** (árvore de decisão) no JavaScript.

| Arquivo | Estrutura | Função |
| :--- | :--- | :--- |
| `app.py` (Python) | **Lista de Dicionários** | Lista os heróis exibidos e seus dados (nome, imagem). |
| `app.js` (JS) | **Lista de Objetos** (`queue`) | Gerencia a **sequência de perguntas**. Cada pergunta aciona uma função que define o próximo passo (filtrar ou adivinhar). |
| `app.js` (JS) | **Lógica de Bloco** | Após o filtro inicial, o jogo usa um **bloco de 4 perguntas** específicas para confirmar um herói. |


## 🚀 Como Executar o Projeto

1.  **Instale o Flask:**
    ```bash
    pip install -r requirements.txt
    ```
2.  **Organize a estrutura:** Certifique-se de que `index.html` está em `templates/` e `app.js`/`style.css` (e a pasta `heroes/`) estão em `static/`.
3.  **Execute o servidor:**
    ```bash
    python app.py
    ```
4.  **Acesse:** `http://127.0.0.1:5000/`
