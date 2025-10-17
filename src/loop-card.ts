import { Entity, LoopCardConfig, LoopCardStyles } from './types'
import { LovelaceCard, LovelaceCardConfig, HomeAssistant } from 'custom-card-helpers'

import { version } from '../package.json'

class LoopCard extends HTMLElement {
	private entities: Entity[] = []
	private hassObj?: HomeAssistant
	private cardTemplate?: LovelaceCardConfig
	private styles?: LoopCardStyles

	set hass(hass: HomeAssistant) {
		this.hassObj = hass
	}

	setConfig(config: LoopCardConfig) {
		if (config.entities === undefined || !Array.isArray(config.entities)) {
			throw new Error('Invalid configuration: "entities" must be an array.')
		}

		if (config.entities.length === 0) {
			throw new Error('Invalid configuration: "entities" array cannot be empty.')
		}

		if (config.card === undefined || typeof config.card !== 'object') {
			throw new Error('Invalid configuration: "card" must be an object.')
		}

		this.entities = config.entities
		this.cardTemplate = config.card
		this.styles = config.styles
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' })

		 console.log(
			`%cLoop Card%c [${version}] %cis enabled`,
			'color: white; background: #0078D7; padding: 2px 4px; border-radius: 2px;',
			'color: #0078D7; font-weight: bold;',
			'color: green;',
		)

		if (!this.hassObj) {
			return
		}

		this.render()
	}

	render() {
		if (!this.cardTemplate) {
			console.error('Card template is not defined.')
			return
		}

		if (!this.hassObj) {
			console.error('HASS object is not defined.')
			return
		}

		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ''
		}

		// Clear existing content before rendering
		this.innerHTML = ''

		const haCard = document.createElement('ha-card')

		const style = document.createElement('style')
		style.textContent = ''

		let childrenCssText = ''
		if (this.styles?.children && Array.isArray(this.styles.children)) {
			const customChildrenStyles = this.styles.children
			childrenCssText = customChildrenStyles
				.reduce((acc: string[], styleObj: Record<string, string>) => {
					Object.entries(styleObj).forEach(([ key, value ]) => {
						acc.push(`${key}: ${value};`)
					})
					return acc
				}, [])
				.join(' ')
		}

		if (this.styles?.card && Array.isArray(this.styles.card)) {
			const customStyles = this.styles.card

			// Combine all style objects into a single style string
			const styleRules = customStyles
				.reduce((acc: string[], styleObj: Record<string, string>) => {
					Object.entries(styleObj).forEach(([ key, value ]) => {
						acc.push(`${key}: ${value};`)
					})
					return acc
				}, [])
				.join(' ')

			// Apply the combined styles to the ha-card element
			style.textContent = `ha-card { ${styleRules} }`
		}

		if (childrenCssText) {
			// style applied to host child elements (may not penetrate child shadow DOM, so we also set inline)
			style.textContent += `\nha-card > * { ${childrenCssText} }`
		}

		if (this.styles?.extra) {
			// Append extra styles for advanced CSS rules like media queries
			style.textContent += `\n${this.styles.extra}`
		}

		this.entities.forEach(entityObj => {
			const cardType = this.cardTemplate!.type.startsWith('custom:')
				? this.cardTemplate!.type.replace('custom:', '')
				: this.cardTemplate!.type

			const cardClass = customElements.get(cardType)

			if (!cardClass) {
				console.error(`Custom element "${cardType}" is not registered.`)
				// Skip this iteration instead of returning
				return
			}

			// Create the card using the class constructor
			const card = new cardClass() as LovelaceCard

			// Deep clone the template config so we don't mutate it
			const cardConfig = JSON.parse(JSON.stringify(this.cardTemplate)) as LovelaceCardConfig

			// Set the entity dynamically
			cardConfig.entity = entityObj.entity

			// Update variables dynamically
			if (!cardConfig.variables) cardConfig.variables = {}
			cardConfig.variables.ulm_card_battery_charger_type_entity_id = entityObj.entity
			cardConfig.variables.ulm_card_battery_name
            	= this.hassObj?.states[entityObj.entity]?.attributes.friendly_name || entityObj.entity

			if (typeof card.setConfig === 'function') {
				card.setConfig(cardConfig)
			} else {
				console.error(`The card "${cardType}" does not implement setConfig.`)
				return
			}

			// Pass down the hass object
			card.hass = this.hassObj

			// Add it to the parent ha-card
			haCard.appendChild(card)
		})

		if (this.shadowRoot) {
			this.shadowRoot.appendChild(style)
			this.shadowRoot.appendChild(haCard)
		}
	}
}

customElements.define('loop-card', LoopCard)
