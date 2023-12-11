class UserContainerActions extends HTMLElement {


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
        .user-interaction-container{
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem 0;
          width: 45%;
        }
        :host{
          align-items: center;
          display: flex;
          width: 100%;
          flex-direction: column;
        }
      </style>
      <div class="user-interaction-container">
        <div class="user-sugestion">
          <slot name="sugestions"></slot>
        </div>
        <div class="user-interaction">
          <slot name="form"></slot>
        </div>
      </div>

      `

    }
     
}




customElements.define('user-actions-container', UserContainerActions);