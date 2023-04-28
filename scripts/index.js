const debounce = function(func, wait, immediate) { //função debounce da Lodash, biblioteca para segurar a frequencia da animação.
    let timeout;
    return function(...args) {
      const context = this;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

const target = document.querySelectorAll('[data-anime]'); //Selecionar as propriedades que eu quero alterar
const animationClass = 'animate';

function animeScroll() {
    const windowTop = window.pageYOffset + ((window.innerHeight *3)/4);//Garantir certa responsividade, de modo a calcular 3/4 da altura de tela para iniciar a animação
    target.forEach(function(e){
        if ((windowTop) > e.offsetTop) {
            e.classList.add(animationClass);
        }
        else{
            e.classList.remove(animationClass);
        }
    })
}
animeScroll(); //Garantindo que a função seja sempre ativada desde o momento que o usuario entrou no site.


if(target.length) {//Esse comando avalia se tem algum target a ser animado na página, se não tiver ele não vai executar o comando, porque o leght vai trazer o resulta do 0 caso não tenha e por consequencia será negativo. Isso é bom para caso a pagina não precise desse código.
    window.addEventListener('scroll', debounce(function() {
      animeScroll();
    }, 5));
  }