from flask import Flask, render_template

def create_app():
    app = Flask(__name__)
    app.config.update(
        TEMPLATES_AUTO_RELOAD=True,    # atualiza HTML sem reiniciar
        SEND_FILE_MAX_AGE_DEFAULT=0,   # evita cache chato em dev
    )

    HEROES = [
  # DC
  {"name": "Batman", "img": "heroes/batman.jpg"},
  {"name": "Superman", "img": "heroes/superman.jpg"},
  {"name": "Mulher-Maravilha", "img": "heroes/mulher-maravilha.jpg"},
  {"name": "Flash", "img": "heroes/flash.jpg"},
  {"name": "Aquaman", "img": "heroes/aquaman.jpg"},

  # Marvel
  {"name": "Capitão América", "img": "heroes/capitao-america.jpg"},
  {"name": "Homem de Ferro", "img": "heroes/homem-de-ferro.jpg"},
  {"name": "Thor", "img": "heroes/thor.jpg"},
  {"name": "Hulk", "img": "heroes/hulk.jpg"},
  {"name": "Homem-Aranha", "img": "heroes/homem-aranha.jpg"},
]


    @app.route("/")
    def index():
        return render_template("index.html", heroes=HEROES)

    @app.route("/health")
    def health():
        return {"status": "ok"}

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="127.0.0.1", port=5000, debug=True)
