
import { cubicOut } from 'svelte/easing'

const
    horizontalSlide =
        (node, {
            delay = 0,
            duration = 400,
            easing = cubicOut,
            axis = 'x'
        } = {}) => {
            const
                style = getComputedStyle(node),
                opacity = +style.opacity,
                primary_property = axis === 'y' ? 'height' : 'width',
                primary_property_value = parseFloat(style[primary_property]),
                secondary_properties = axis === 'y' ? ['top', 'bottom'] : ['left', 'right'],
                capitalized_secondary_properties = secondary_properties.map((e) => `${e[0].toUpperCase()}${e.slice(1)}`),
                padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]),
                padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]),
                margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]),
                margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]),
                border_width_start_value = parseFloat(style[`border${capitalized_secondary_properties[0]}Width`]),
                border_width_end_value = parseFloat(style[`border${capitalized_secondary_properties[1]}Width`]);
            return {
                delay,
                duration,
                easing,
                css: t =>
                    'overflow: hidden;' +
                    `opacity: ${Math.min(t * 20, 1) * opacity};` +
                    `${primary_property}: ${t * primary_property_value}px;` +
                    `padding-${secondary_properties[0]}: ${t * padding_start_value}px;` +
                    `padding-${secondary_properties[1]}: ${t * padding_end_value}px;` +
                    `margin-${secondary_properties[0]}: ${t * margin_start_value}px;` +
                    `margin-${secondary_properties[1]}: ${t * margin_end_value}px;` +
                    `border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;` +
                    `border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
            };
        },

    clickOutside = (node) => {
        const handleClick = event => {
            if (node && !node.contains(event.target) && !event.defaultPrevented) {
                node.dispatchEvent(new CustomEvent('click_outside', node))}}
        document.addEventListener('click', handleClick, true);

        return {destroy() {document.removeEventListener('click', handleClick, true);}}
    };

export {horizontalSlide, clickOutside}