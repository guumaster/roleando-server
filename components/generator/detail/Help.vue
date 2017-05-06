<template>
  <div class="text-box">
    <div class="help-box">

      <h2 id="usobsico">Uso Básico</h2>

      <p>Un generador aleatorio consta de dos partes. Plantillas y tablas.</p>

      <p><strong>Las plantillas</strong> son texto de una o mas lineas que incluye marcadores que serán reemplazados con textos aleatorios obtenidos de las tablas.</p>

      <p><strong>Las tablas</strong> son las listas que se utilizan para seleccionar los contenidos aleatorios.</p>

      <p>Los generadores aleatorios cumplen unas pocas reglas de formato relativamente sencillas. Tantos las plantillas como las tablas tienen una linea de cabecera que indica el inicio y su nombre.</p>

      <h2 id="plantillas">Plantillas</h2>

      <p>Una plantilla comienza con una linea indicadora de plantilla y un nombre. El formato de la linea de cabecera es el siguiente: <code>;@plantilla|NOMBRE_PLANTILLA</code>.</p>

      <p>Una plantilla de ejemplo:</p>

      <pre><code class="code language-code">;@plantilla|mi_super_generador
Este texto es fijo y no cambia.
Solo cambia el texto que esta entre parentesis.
Un ejemplo de contenido variable es: [tabla_ejemplo]
</code></pre>

      <h2 id="tablas">Tablas</h2>

      <p>Una tabla comienza con una linea indicadora de tabla y un nombre. El formato de la linea de cabecera es el siguiente: <code>;NOMBRE_DE_TABLA</code>.</p>

      <p>Cada linea de una tabla es una opcion que se escogerá de forma aleatoria al momento de ser reemplazada en una plantilla.</p>

      <p>Un generador puede contener todas las tablas necesarias para dar variedad a las plantillas.</p>

      <p>Una tabla de ejemplo:</p>

      <pre><code class="code language-code">;tabla_ejemplo
la primera opcion
otra variante de ejemplo
siguiente opcion
ya se entendiendo como va?
seguro? dale otra vez
etc, etc, etc.
</code></pre>

      <h2 id="usoavanzado">Uso Avanzado</h2>

      <p>Los generadores tienen mas opciones de uso avanzado. Por ejemplo se puede incluir filtros y modificadores</p>

      <h2 id="modificadores">Modificadores</h2>

      <p>Se puede modificar la cantidad de veces que se selecciona de una tabla añadiendo un multiplicador con el siguiente formato al hacer referencia a una tabla. Los modificadores posibles son:</p>

      <ul>
        <li><code>[x5@una_tabla]</code>: Selecciona 5 veces de la tabla [una_tabla]</li>

        <li><code>[2d8@una_tabla]</code>: Selecciona 2d8 veces de la tabla [una_tabla]</li>

        <li><code>[20%@una_tabla]</code>: Selecciona de la tabla [una_tabla] el 20% de las veces</li>

        <li><code>[1/5@una_tabla]</code>: Selecciona de la tabla [una_tabla] 1 de cada 5 veces</li>
      </ul>

      <h2 id="filtros">Filtros</h2>

      <p>Los filtros se aplican una vez que la seleccion se ha realizado y sirven para cambiar el texto obtenido de la tabla. Los filtros posibles son:</p>

      <ul>
        <li><strong>[una_tabla|may]</strong>:</li>

        <li>Convierte a mayúscula la linea seleccionada de [una_tabla]. Ej: 'El Rio Anduín' a 'EL RIO ANDUÍN'</li>

        <li><strong>[una_tabla|min]</strong>:</li>

        <li>Convierte a minúscula la linea seleccionada de [una_tabla].Ej: 'LA MONTAÑA SOLITARIA' a 'la montaña solitaria'</li>

        <li><strong>[una_tabla|nombre]</strong>:</li>

        <li>Convierte modo nombre la linea seleccionada de [una_tabla]. Ej: 'gandalf el gris' a 'Gandalf el Gris'</li>

        <li><strong>[una_tabla|frase]</strong>:</li>

        <li>Convierte modo titulo la linea seleccionada de [una_tabla]. Ej: 'ConTenIdo sin FormaTo' a 'Contenido sin formato'</li>

        <li><strong>[una_tabla|masc]</strong>:</li>

        <li>Convierte a su forma masculina un adjetivo seleccionado de [una_tabla]. Ej: 'Destructora' a 'Destructor'</li>

        <li><strong>[una_tabla|fem]</strong>:</li>

        <li>Convierte a su forma femenina un adjetivo seleccionado de [una_tabla]. Ej: 'Destructor' a 'Destructora'</li>

        <li><strong>[una_tabla|+ar.gen]</strong>:</li>

        <li>Agrega el articulo necesario a un adjetivo seleccionado de [una_tabla]. Ej: 'Destructor' a 'el Destructor'</li>

        <li><strong>[una_tabla|+ar.genf]</strong>:</li>

        <li>Agrega el articulo necesario a un adjetivo seleccionado de [una_tabla]. En caso de adjetivo neutro, agrega uno femenino. Ej: 'Valiente' a 'la Valiente'</li>

        <li><strong>[una_tabla|+ar.genm]</strong>:</li>

        <li>Agrega el articulo necesario a un adjetivo seleccionado de [una_tabla]. En caso de adjetivo neutro, agrega uno femenino. Ej: 'Constante' a 'el Constante'</li>

        <li><strong>[una_tabla|+ar.ind]</strong>:</li>

        <li>Agrega el articulo indefinido necesario a un adjetivo seleccionado de [una_tabla]. Ej: 'Destructor' a 'un Destructor'</li>

        <li><strong>[una_tabla|+ar.indf]</strong>:</li>

        <li>Agrega el articulo indefinido necesario a un adjetivo seleccionado de [una_tabla]. En caso de adjetivo neutro, agrega uno femenino. Ej: 'Valiente' a 'una Valiente'</li>

        <li><strong>[una_tabla|+ar.indm]</strong>:</li>

        <li>Agrega el articulo indefinido necesario a un adjetivo seleccionado de [una_tabla]. En caso de adjetivo neutro, agrega uno femenino. Ej: 'Constante' a 'un Constante'</li>
      </ul>

      <h2 id="pesos">Pesos</h2>

      <p>La seleccion aleatoria de una tabla puede llevar un peso. El peso indica la chance que tiene una linea de ser seleccionada sobre las demas.</p>

      <p>El peso se indica de forma opcional como primer numero en cada linea, separando del texto con una coma <code>(,)</code>.</p>

      <p>Por ejemplo, en la siguiente tabla, la primera linea tendra un 50% de posiblidades de salir sobre las cuatro restantes:</p>

      <pre><code class="code language-code">;tabla_con_peso
5,esta linea saldra 50% de veces
1,linea 2 solo el 10% de las veces
1,linea 3 solo el 10% de las veces
1,linea 4 solo el 10% de las veces
1,linea 5 solo el 10% de las veces
1,linea 6 solo el 10% de las veces
</code></pre>
    </div>
  </div>
</template>
<style scoped>
  .text-box {
    padding-top: 1.5em;
    padding-left: 2.5em;
    display: flex;
    flex-direction: column;
    height: 68vh;
  }

  .help-box {
    flex: 1 1 100% !important;
    overflow-y: auto !important;
  }
</style>
