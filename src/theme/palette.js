/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */
import {red, pink, purple, blue, cyan,  green, yellow, amber, orange, grey} from '@material-ui/core/colors'

export default function themePalette(theme) {
    const level = theme.customization.colorLevel;
    return {
        primary: {
            light: theme.customization.primaryColor[level],
            // light: theme.customization.primaryColor[50],
            main: theme.customization.primaryColor[500],
        },
        secondary: {
            light: theme.customization.secondaryColor[50],
            main:theme.customization.secondaryColor[500],
        },
        text: {
            primary: theme.darkTextPrimary,
            secondary: theme.darkTextSecondary,
        },
        background: {
           paper: theme.paper,
           default: theme.paper
        }
    };
}
