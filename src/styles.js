import { createGlobalStyle } from 'styled-components'
import { darken } from 'polished'

const variables = {}

variables.body_background = '#aaa'
variables.font_family = `"Lato", "Roboto", "Oxygen",
"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
sans-serif`  

variables.panel_background = `radial-gradient(circle at top right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.57) 70%),
linear-gradient(70deg, rgba(105,105,105,0.05) 0%, rgba(0,0,0,0.28) 27%, rgba(181,181,181,0.82) 40%, rgba(255,255,255,0.1) 66%)`
variables.panel_border = '3px inset rgba(0,0,0,0.28)'
variables.panel_box_shadow = '0 5px 15px 2px rgba(50, 50, 50, 0.08) inset'
variables.panel_box_shadow_outer = '0 5px 20px 3px rgba(50, 50, 50, 0.2)'  

variables.number_font_family = "'Open Sans Condensed', sans-serif"

variables.confirm_color = '#0a0'
variables.notification_color = '#08f'
variables.warning_color = '#870'
variables.danger_color = '#d33'

variables.confirm_color_darker = darken(0.3, '#0a0')
variables.notification_color_darker = darken(0.3, '#08f')
variables.warning_color_darker = darken(0.3, '#870')
variables.danger_color_darker = darken(0.3, '#d33')

variables.tablet_breakpoint = '768px'
variables.desktop_breakpoint = '1025px'

variables.colors_resolver = (a, darker = false) => {
    let color
    if (a) {
        switch(a) {
            case "danger": 
                color = darker ? variables.danger_color_darker : variables.danger_color
                break
            case "warning": 
                color = darker ? variables.warning_color_darker : variables.warning_color
                break
            case "notification": 
                color = darker ? variables.notification_color_darker : variables.notification_color
                break
            case "confirm": 
                color = darker ? variables.confirm_color_darker : variables.confirm_color
                break
            default: 
                color = darker ? "#000" : "#444"
        }
    }
    return color
}


const GlobalStyle = createGlobalStyle`

* {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }

html {
    font-size: 18px;	
}

body {
	padding: 0;
    margin: 0;
    font-family: ${variables.font_family};
    font-weight: 200;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${variables.body_background};           
}
  
code {
	font-family: "Courier New", monospace;
}
.error {
    color: ${variables.danger_color};
}
.notification {
    color: ${variables.notification_color};
}
.warning {
    color: ${variables.warning_color};
}
.confirm {
    color: ${variables.confirm_sscolor};
}

.container {
	padding: 0 15px;
	@media screen and (min-width: ${variables.tablet_breakpoint}) {
		max-width: 1200px;
		margin: 0 auto;
	}
}

`

export { GlobalStyle, variables }
