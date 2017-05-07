<template>
  <div>
    <v-toolbar class="secondary">
      <v-toolbar-title class="">Información</v-toolbar-title>
    </v-toolbar>

    <v-card class="mb-4">
      <v-card-text class="text-xs-left">
        <div>
          <h6>¿Que es?</h6>
          <p>Esta es una WebApp con utilidades para cualquier juego de rol. Esta desarrollada por
            <a href="http://github.com/guumaster">guumaster</a>
            sin ningun objetivo concreto, por la diversion de programar.
          </p>
          <p>
            Todo el código de la web se puede ver en github <a href="http://github.com/guumaster">aquí</a>. Es un proyecto
            abierto a ver, participar, replicar, mejorar como quieras. Solo tienes que tener ganas y una cuenta de
            <a href="https://github.com/join" target="_blank">GitHub</a>.
          </p>

          <h6>¿Porque?</h6>
          <p>A diferencia de las paginas enlazadas como fuentes de inspiracion, esta app se puede usar (casi) perfectamente
          en PC, tablet y dispositivos moviles.</p>
          <p>Además tiene cantidad de contenido en español, que a veces es dificil de encontrar para este tipo de utilidades.</p>


        </div>
      </v-card-text>
    </v-card>

    <!-- inspiracion -->
    <v-expansion-panel >
      <v-expansion-panel-content >
        <div slot="header">
          <v-icon class="panel-icon ">lightbulb_outline</v-icon><span class="header-label">Inspiración</span></div>
        <v-card class="mb-4">
          <v-card-text class="grey lighten-3 text-xs-left">
            <div class="mb-4">
              Sitios de donde he sacado ideas. Roleando no sería posible sin estas fuentes de inspiración.
            </div>

            <tool-card link-to="https://www.reddit.com/r/BehindTheTables/">
              <span slot="title">Reddit Behind the Tables</span>
              <div slot="content">
                Un tablon de reddit con un bot que genera comentarios con contenido aleatorio.
                Similiar a la idea de los generadores de esta web.
              </div>
            </tool-card>

            <tool-card link-to="http://autorolltables.github.io/">
              <span slot="title">Auto Roll Tables</span>
              <div slot="content">
                Una web app en inglés similar a esta. Con mucho mas contenido y funcionalidades.
              </div>
            </tool-card>

          </v-card-text>

        </v-card>

      </v-expansion-panel-content>

    <!-- recursos -->
      <v-expansion-panel-content >
        <div slot="header">
          <v-icon class="panel-icon">link</v-icon><span class="header-label">Recursos</span></div>
        <v-card class="mb-4">
          <v-card-text class="grey lighten-3 text-xs-left">
            <div class="mb-4">
              Fuentes, iconos, imagenes, todo lo necesario para montar esta web.
            </div>

            <tool-card link-to="https://nagoshiashumari.github.io/Rpg-Awesome/">
              <span slot="title">RPG Awesome Icon Font</span>
              <div slot="content">
                <p>Una fuente con iconos muy utiles.</p>

                <p>Como estos:
                  <i class="ra ra-blade-bite ra-lg"></i>
                  <i class="ra ra-fire ra-lg"></i>
                  <i class="ra  ra-feather-wing ra-lg"></i>
                </p>
              </div>
            </tool-card>

            <tool-card link-to="http://autorolltables.github.io/">
              <span slot="title">Auto Roll Tables</span>
              <div slot="content">
                Una web app en inglés similar a esta. Con mucho mas contenido y funcionalidades.
              </div>
            </tool-card>

          </v-card-text>

        </v-card>

      </v-expansion-panel-content>


    <!-- herramientas -->
      <v-expansion-panel-content >
          <div slot="header">
            <v-icon class="panel-icon ">code</v-icon><span class="header-label">Herramientas</span></div>
        <v-card class="mb-4">
          <v-card-text class="grey lighten-3 text-xs-left">
            <div class="mb-4">
              Estas son algunas de las herramientas utlizadas para desarrollar
            </div>

            <tool-card link-to="https://nuxtjs.org">
              <span slot="title">Nuxt.js</span>
              <div slot="content">
                Se utiliza NuxtJS como base de la app. Esto permite generar código servidor y cliente en el mismo proyecto.
              </div>
            </tool-card>

            <tool-card link-to="https://vuejs.org">
              <span slot="title">Vue.js</span>
              <div slot="content">
                Framework de desarrollo de aplicaciones web. Incorporado con Nuxt.
              </div>
            </tool-card>


            <tool-card link-to="https://heroku.com">
              <span slot="title">Heroku</span>
              <div slot="content">
                Esta web esta alojada gratuitamente en Heroku.
              </div>
            </tool-card>

          </v-card-text>

        </v-card>

      </v-expansion-panel-content>
    </v-expansion-panel>



  </div>
</template>
<script>
  import ToolCard from '../components/acerca/ToolCard.vue'
  export default {
    components: {
      ToolCard
    }
  }
</script>
<style scoped>
  a {
    color: red;
  }
  .panel-icon {
    position: relative;
    top: 3px;
  }
  .header-label {
    position: relative;
    top: -4px;
  }

</style>
