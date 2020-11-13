import {
    LitElement,
    html,
    css
} from "https://unpkg.com/lit-element@2.2.1/lit-element.js?module";


class MiniValueCard extends LitElement {
    constructor() {
        super();
    }

    setConfig(config) {
        if (!config.entity) {
            throw new Error('Please define an entity');
        }

        this.config = config;
    }

    render() {
        //console.info(this.hass);
        //console.info(this.config);
        const name = this.config.title;
        const icon = this.config.icon;
        const state = this.hass.states[this.config.entity].state;
        const uom = this.hass.states[this.config.entity].attributes.unit_of_measurement || "";
        const fontSize    = (this.config.fontSize    == undefined) ? 2.4 : (this.config.fontSize / 10);
        const showChanged = (this.config.showChanged == undefined) ? true    : this.config.showChanged;

        return html`
        <ha-card class="flex">
            <div class="header flex">
                <div class="name flex">
                    <span class="ellipsis">${name}</span>
                </div>
                <div class="icon">
                    <ha-icon .icon=${icon}></ha-icon>
                </div>
            </div>
            <div class="states flex">
                <span class="state__value ellipsis" style="font-size: ${fontSize}em;">${this.computeState(state)}</span>
                <span class="state__uom ellipsis">${uom}</span>
                ${this.renderChanged(showChanged)}
            </div>
        </ha-card>
        `;
    }

    renderChanged(show) {
        var date = new Date(this.hass.states[this.config.entity].last_changed);
        const chDate = this.formatTime(date);
        const chTime = this.formatDate(date);

        return (show)
            ? html `
                <div style="text-align: right">
                    <span class="state__changed ellipsis">${chDate}</span><br/>
                    <span class="state__changed ellipsis">${chTime}</span>
                </div>
            `
            : '';

    }

    computeState(inState) {
        if(this.config.state_map != undefined) {
            if (this.config.state_map.length > 0) {
                const stateMap = Number.isInteger(inState)
                    ? this.config.state_map[inState]
                    : this.config.state_map.find(state => state.value === inState);

                if (stateMap) {
                    return stateMap.label;
                } else {
                    log(`value [${inState}] not found in state_map`);
                }
            }
        }
        else {
            return inState;
        }
    }

    formatDate(date) {
        return date.getFullYear() + "-"
             + ('0' + (date.getMonth()+1)).slice(-2) + '-'
             + ('0' + date.getDate()).slice(-2);
    }

    formatTime(date) {
        return ('0' + date.getHours()).slice(-2) + ':'
             + ('0' + date.getMinutes()).slice(-2);
    }

    static get properties() {
        return {
            hass: {},
            config: {}
        };
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
            }
            ha-card {
                flex-direction: column;
                flex: 1;
                padding: 16px 0;
                position: relative;
                overflow: hidden;
            }
            ha-card > div {
                padding: 0px 16px 16px 16px;
            }
            ha-card > div:last-child {
                padding-bottom: 0;
            }
            .flex {
                display: flex;
                display: -webkit-flex;
                min-width: 0;
            }
            .header {
                justify-content: space-between;
            }
            .name {
                align-items: center;
                min-width: 0;
                letter-spacing: var(--mcg-title-letter-spacing, normal);
            }
            .name > span {
                font-size: 1.2em;
                font-weight: var(--mcg-title-font-weight, 500);
                max-height: 1.4em;
                min-height: 1.4em;
                opacity: .65;
            }
            .icon {
                color: var(--paper-item-icon-color, #44739e);
                display: inline-block;
                flex: 0 0 1.7em;
                text-align: center;
            }
            .icon > ha-icon {
                height: 1.7em;
                width: 1.7em;
            }
            .ellipsis {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .states {
                align-items: flex-start;
                font-weight: 300;
                justify-content: space-between;
                flex-wrap: nowrap;
            }
            .state__value {
                display: inline-block;
                margin-right: .25rem;
                line-height: 1.2em;
            }
            .state__uom {
                flex: 1;
                align-self: flex-end;
                display: inline-block;
                font-size: 1.4em;
                font-weight: 400;
                line-height: 1.6em;
                margin-top: .1em;
                opacity: .6;
                vertical-align: bottom;
            }
            .state__changed {
                align-self: flex-end;
                display: inline-block;
                font-size: 1.0em;
                margin-right: .25rem;
                line-height: 1.6em;
                opacity: .6;
                vertical-align: bottom;
            }
        `;
    }

    getCardSize() {
        return 1;
    }
}

customElements.define('mini-value-card', MiniValueCard);
