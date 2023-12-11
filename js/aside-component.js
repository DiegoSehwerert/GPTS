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
      aside{
        background-color: hsl(0, 0%, 0%);
        max-width: 235px;
        min-width: 235px;
      }
      host:{
        display: flex;
        margin: 0;
        min-height: 100vh; 
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
      </div>
      `

    }
     
}




customElements.define('aside-component', AsideComponent);