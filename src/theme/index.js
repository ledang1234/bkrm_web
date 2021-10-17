import React from 'react'
import { createTheme ,responsiveFontSizes} from '@material-ui/core/styles';
// assets
import colors from '../assets/scss/_themes-vars.module.scss';

//project import
import themeTypography from './typography';
import themePalette from './palette';
import componentStyleOverrides from './compStyleOverride';

export function theme(customization) {
  const color = colors;

  const themeOption = {
      colors: color,
      heading: color.grey900,
      
      paper: color.paper,
      backgroundDefault: color.paper,
      background: color.primaryLight,
      
      darkTextPrimary: color.grey700,
      darkTextSecondary: color.grey500,
      textDark: color.grey900,
      menuSelected: color.secondaryDark,
      menuSelectedBack: color.secondaryLight,
      divider: color.grey200,
      customization
  };

  return createTheme({
      customization:customization,
      palette: themePalette(themeOption),
      typography: themeTypography(themeOption),
      components: componentStyleOverrides(themeOption),
      mixins: {
          toolbar: {
              minHeight: '48px',
              padding: '16px',
              '@media (min-width: 600px)': {
                  minHeight: '48px'
              }
          }
      },
      breakpoints: {
          values: {
              xs: 0,
              sm: 600,
              md: 960,
              lg: 1280,
              xl: 1920
          }
      },
     
  });
}

export default theme;