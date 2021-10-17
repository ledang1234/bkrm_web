/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */
export default function themePalette(theme) {
    return {
        primary: {
            light: theme.colors.primaryLight,
            main: theme.colors.primaryMain,
            dark: theme.colors.primaryDark,
        },
        secondary: {
            light: theme.colors.secondaryLight,
            main: theme.colors.secondaryMain,
            dark: theme.colors.secondaryDark,

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
