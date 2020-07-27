import { h, Component } from 'preact'

import EmailButton from '../email_button'

export default class Layout extends Component {
  render() {
    return (
      <div>
        <div class="layout">
          <EmailButton />
        </div>
      </div>
    )
  } 
}
