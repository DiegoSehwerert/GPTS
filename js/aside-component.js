class AsideComponent extends HTMLElement {


    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }


    connectedCallback() {
        this.render();
    }

    render() {

      this.shadow.innerHTML =
      `<style>
        .aside{
          background-color: black;
          max-width: 235px;
          min-width: 235px;
          height: 100%;
          transition: margin-left 0.3s;
        }

        .aside.active{
          margin-left: -235px;
          transition: margin-left 0.3s;
        }

        .hide-button{
          background-color: none;
          position: absolute;
          left: 245px;
          bottom: 50%;
          transition: left 0.3s;
          z-index: 2;
        }

        .hide-button button{
          width: 1rem;
          height: 1rem;
        }
        
        .hide-button button:hover {
          cursor: pointer;
        }

        .hide-button.active{
          background-color: none;
          position: absolute;
          left: 10px;
          bottom: 50%;
        }

        .new-chat-button{
          display:none;
        }
        .new-chat-button button{
          background-color: transparent;
          border: 1px solid rgb(86,88,105);
          border-radius: 0.5rem;
          padding: 10px;
          color: white;
        }
        .new-chat-button button svg{
          width:1rem;
          height:1rem;
        }

        .new-chat-button.active{
          display:flex;
          width:1rem;
          position: absolute;
          top: 2%;
          left: 10px;
        }
      </style>

      <div class="aside">
        <div class="start-new-conversation">
          <slot name="new-conversation"></slot>
        </div>
        <div class="hystory-record">
          <slot name="hystory-record"></slot>
        </div>
        <div class="user-configuration">
          <slot name="user-configuration"></slot>
        </div>
        <div class="new-chat-button">
          <button>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-black dark:text-white"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.7929 2.79289C18.0118 1.57394 19.9882 1.57394 21.2071 2.79289C22.4261 4.01184 22.4261 5.98815 21.2071 7.20711L12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16H9C8.44772 16 8 15.5523 8 15V12C8 11.7348 8.10536 11.4804 8.29289 11.2929L16.7929 2.79289ZM19.7929 4.20711C19.355 3.7692 18.645 3.7692 18.2071 4.2071L10 12.4142V14H11.5858L19.7929 5.79289C20.2308 5.35499 20.2308 4.64501 19.7929 4.20711ZM6 5C5.44772 5 5 5.44771 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34314 4.34315 3 6 3H10C10.5523 3 11 3.44771 11 4C11 4.55228 10.5523 5 10 5H6Z" fill="currentColor"></path></svg>
          </button>
        </div>
        <div class="hide-button">
          <button>
          </button>
        </div>
      </div>
      `

      let hideButton = this.shadow.querySelector(".hide-button");
      let aside = this.shadow.querySelector(".aside");
      let newChat = this.shadow.querySelector(".new-chat-button");

      hideButton.addEventListener("click", () => {
        hideButton.classList.toggle("active");
        aside.classList.toggle("active");
        newChat.classList.toggle("active");
      })

      newChat.addEventListener("click",(event) => {
        event.preventDefault();
        const customEvent = new CustomEvent('start-new-chat');
        document.dispatchEvent(customEvent);
      })
    }
    
}

customElements.define('aside-component', AsideComponent);