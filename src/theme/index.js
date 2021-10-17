import React from 'react'
import { createTheme ,responsiveFontSizes} from '@material-ui/core/styles';
// assets
import colors from '../assets/scss/_themes-vars.module.scss';

//project import
import themeTypography from './typography';
import themePalette from './palette';
import componentStyleOverrides from './compStyleOverride';

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
  // customization
};

let themes = createTheme({
    components: componentStyleOverrides(themeOption),
    typography: themeTypography(themeOption),
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
          minHeight: '48px',
          padding: '16px',
          '@media (min-width: 600px)': {
              minHeight: '48px'
          }
      }
  },

    
    
    
});
themes = responsiveFontSizes(themes);

export default themes
