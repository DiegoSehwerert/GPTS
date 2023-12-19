class UserInteraction extends HTMLElement {

  constructor() {

    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    
    //Declaramos startChat como una variable inicializada en true
    this.startChat = true 

    //escuchando start-new-chat y llamando a connectedCallback si se escucha
    document.addEventListener("start-new-chat", this.connectedCallback.bind(this));
    document.addEventListener('responseState', this.handleResponseState.bind(this));
  }

  static get observedAttributes() {
    return ['response-state'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if(name === 'response-state'){
      if(newValue === "true"){
        this.shadow.querySelector('.send-button').classList.remove('visible')
        this.shadow.querySelector('.stop-button').classList.add('visible')
      }else{
        this.shadow.querySelector('.send-button').classList.add('visible')
        this.shadow.querySelector('.stop-button').classList.remove('visible')
      }
    }
  }


  render() {

    this.shadow.innerHTML =
      /*Html*/`
      <style>

      :host{
        width: 100%;
      }

      .message-input{
        width: 100%;
      }
      
      .attach-button button{
        background-color: hsl(0, 0%, 100%, 0);
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
      }
      
      .attach-button svg{
        color: hsl(0, 0%, 100%);
        width: 1.3rem;
      }
      
      form{
        align-items: center;
        border: 1px solid hsl(0, 0%, 40%);
        border-radius: 1rem;
        display: flex;
        justify-content: center;
        padding: 0.5rem;
      }
      
      .form-element{
        height: max-content;
        width: 90%
      }
      
      .form-element textarea{
        background-color: hsl(235, 11%, 23%);
        border: none;
        color: hsl(0, 0%, 100%);
        font-family: 'SoehneBuch', Arial;
        font-size: 0.9rem;
        height: 1.2rem;
        max-height: 5rem;
        resize: none;
        width: 100%;
      }
     
      .form-element textarea::placeholder{
        color: hsl(0, 0%, 100%, 0.5);
        font-weight: 300;
      }
      
      .form-element textarea:focus{
        outline: none;
      }

      .send-button{
        display:none;
        pointer-events: none;
        cursor: not-allowed;
      }

      .send-button.visible{
        display:block;
      }
 
      .send-button button{
        align-items: center;
        background-color: hsl(235, 7%, 31%);
        border: none;
        border-radius: 0.5rem;
        display: flex;
        padding: 0.1rem 0.2rem;
      }
      
      .send-button svg{
        color:hsl(0, 0%, 0%, 0.3);
        width: 1.3rem;
      }
      
      .send-button.active button{
        background-color: rgb(255, 255, 255);
        cursor: pointer;
        pointer-events: auto;
      }
      
      .send-button.active svg{
        color:hsl(0, 0%, 0%);
      }
      
      .send-button .tooltiptext{
        background-color: black;
        border-radius: 0.5rem;
        color: #fff;
        font-family: 'SoehneBuch', sans-serif;
        font-size: 0.8rem;
        margin-top: -5rem;
        margin-left: -3rem;
        opacity: 0;
        padding: 0.5rem 0;
        pointer-events: none; 
        position: absolute;
        text-align: center;
        transition: opacity 0.3s;
        width: 120px;
        z-index: 1001;
      }
      
      .send-button .tooltiptext::after {
        border-width: 5px;
        border-style: solid;
        border-color: rgb(0, 0, 0) transparent transparent transparent;
        content: "";
        left: 45%;
        position: absolute;
        top: 100%;   
      }
      
      .send-button:hover .tooltiptext{
        opacity: 1;
        visibility: visible;
      }


      .stop-button {
          align-items: center;
          background-color: transparent;
          border: 0.1rem solid hsl(0, 0%, 100%);
          border-radius: 50%;
          display: none;
          height: 1rem;
          justify-content: center;
          padding: 0.3rem;
          width: 1rem;
        }

        .stop-button.visible {
          display: flex;
        }

        .stop-button button {
          background-color: hsl(0, 0%, 100%);
          border: none;
          border-radius: 0;
          cursor: pointer;
          height: 0.75rem;
          width: 0.25rem;
        }

      </style>
      <section class="message-input">
        <form>
          <div class="attach-button">
            <button>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z" fill="currentColor"></path>
              </svg> 
              <input multiple="" type="file" tabindex="-1" class="hidden" style="display: none;">
            </button>
          </div>
          <div class="form-element">
            <textarea placeholder="Message ChatGPT..."></textarea>
          </div>
          <div class="interaction-button">
            <div class="stop-button">
              <button></button>
            </div>
            <div class="send-button visible">
              <button disabled>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-white dark:text-black">
                  <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>            
                <span class="tooltiptext">Enviar mensaje</span>                  
              </button>
          </div>
        </form>
      </section>
      `
    
    let textArea = this.shadow.querySelector(".form-element textarea");
    let sendButton = this.shadow.querySelector(".send-button");
    let button = this.shadow.querySelector(".send-button button");
    let stopButton = this.shadow.querySelector('.stop-button button');

    textArea.focus(); // le damos focus a textarea desde que se carga la pagina siempre podemos escribir

    //si el valor del evento es "" le quitamos el active a sendButton y a button.disabled le damos true
    //si el valor del evento es cualquier otra cosa que no sea "" se le añade active a sendButton y volvemos false button.disabled
    textArea.addEventListener("input", (event) => {
      if (event.target.value == "") {
        sendButton.classList.remove("active");
        button.disabled = true;
      } else {
        sendButton.classList.add("active");
        button.disabled = false;
      }
    });

    //sendButton tiene un listener que cuando escuche el click se llame a si mismo y que previene su comportasmiento default
    sendButton.addEventListener("click", (event) => { 
      event.preventDefault(); 
      this.sendButton();
    });

    //textArea tiene un listener que escucha keydown y se lo da a event
    //en el condicional decalramos que si la tecla del evento es igual a enter y NO es la tecal del evento + la tecla shift
    //primero se previene el comportamiento default y luego se lee si el boton esta activo(que pueda ser clickeable) para llamar a la funcion sendButton
    textArea.addEventListener("keydown", (event) => { 
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();

        if (sendButton.classList.contains('active')){
          this.sendButton();
        }
      }
    });

    stopButton.addEventListener('click', (event) => {
      event.preventDefault()
      this.setAttribute('response-state', "false");
      document.dispatchEvent(new CustomEvent('stopModelResponse'))
    });
  }

    //La funcion sendButton empieza con una condicion que limpia el mensaje de render y luego le da false a startChat
    //Asi solo se limpia el texto la primera vez que le das al boton
    //Dispachea un evento llamado new-prompt y pasa un detail del textarea.value
    //Asi recogemos lo que ha escrito el usuario
  sendButton(){
    if (this.startChat){
      document.dispatchEvent(new CustomEvent('clean-chat'));
      this.startChat = false;
    }

    document.dispatchEvent(new CustomEvent('new-prompt', {
      detail: {
        prompt: this.shadow.querySelector("textarea").value
      }
    }));

    //Hacemos this render otra vez para limpiar lo que ha escrito el usuario
    this.render();
    this.setAttribute('response-state', "true") 
  }
}

customElements.define('user-interaction-component', UserInteraction);