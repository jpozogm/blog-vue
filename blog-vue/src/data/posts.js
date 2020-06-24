import axios from 'axios';


class Post {
    constructor(id, title, postAuthorName,  postContent, postComments, postAuthorNickName, user, postDate) {

      this._id = id;
      this.postTittle = title;
      this.postAuthorName = postAuthorName;
      this.postContent = postContent;
      
      this.postComments = postComments;
      this.postAuthorNickName =  postAuthorNickName;
      this.user = user
      this.postDate = postDate
    }
  }
  
  class Posts {
  
    constructor() {
      this.posts = [
        new Post(11, 'SUEÑOS DE ACERO Y NEON', 'Rajoy',
          'Los personajes que protagonizan este relato sobreviven en una sociedad en decadencia a la que, no obstante, lograrán devolver la posibilidad de un futuro. Año 2484. En un mundo dominado por las grandes corporaciones, solo un hombre, Jordi Thompson, detective privado deslenguado y vividor, pero de gran talento y sentido d...'),
        new Post(12, 'LA VIDA SECRETA DE LA MENTE', 'Rajoy',
          'La vida secreta de la mentees un viaje especular que recorre el cerebro y el pensamiento: se trata de descubrir nuestra mente para entendernos hasta en los más pequeños rincones que componen lo que somos, cómo forjamos las ideas en los primeros días de vida, cómo damos forma a las decisiones que nos constituyen, cómo soñamos y cómo imaginamos, por qué sentimos ciertas emociones hacia los demás, cómo los demás influyen en nosotros, y cómo el cerebro se transforma y, con él, lo que somos.'),
        new Post(13, 'CASI SIN QUERER', 'Rajoy',
          'El amor algunas veces es tan complicado como impredecible. Pero al final lo que más valoramos son los detalles más simples, los más bonitos, los que llegan sin avisar. Y a la hora de escribir sobre sentimientos, no hay nada más limpio que hacerlo desde el corazón. Y eso hace Defreds en este libro.'),
        new Post(14, 'TERMINAMOS Y OTROS POEMAS SIN TERMINAR', 'Rajoy',
          'Recopilación de nuevos poemas, textos en prosa y pensamientos del autor. Un sabio dijo una vez: «Pocas cosas hipnotizan tanto en este mundo como una llama y como la luna, será porque no podemos cogerlas o porque nos iluminan en la penumbra». Realmente no sé si alguien dijo esta cita o me la acabo de inventar pero deberían de haberla escrito porque el poder hipnótico que ejercen esa mujer de rojo y esa dama blanca sobre el ser humano es digna de estudio.'),
        new Post(15, 'LA LEGIÓN PERDIDA', 'Rajoy',
          'En el año 53 a. C. el cónsul Craso cruzó el Éufrates para conquistar Oriente, pero su ejército fue destrozado en Carrhae. Una legión entera cayó prisionera de los partos. Nadie sabe a ciencia cierta qué pasó con aquella legión perdida.150 años después, Trajano está a punto de volver a cruzar el Éufrates. ...')
      ]
    }

    data(){
      return{
        articles: []
      }
    }
  
    getPosts() {

      return axios.get('http://localhost:3000/posts/')
                .then(res => {
                  if(res.data.status == 'sucess') {
                    this.articles= res.data.articles
                    console.log(this.articles)
                  }
                });
      /* return this.posts; */
    }


  
    getPost(id) {
      return this.posts.find(posts => posts._id === +id);
    }
  }
  
  export default new Posts();


